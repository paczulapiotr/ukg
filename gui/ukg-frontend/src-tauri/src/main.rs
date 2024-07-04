// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::path::Path;
use std::process::Command;
use tauri::command;

use std::process::Child;
use std::sync::{Arc, Mutex};
use tauri::{api::path::resource_dir, Manager, WindowEvent};

fn main() {
    let backend_process = Arc::new(Mutex::new(None)); // Initialize with None

    tauri::Builder::default()
        .setup(move |app| {
            let main_window = app.get_window("main").unwrap();
            let package_info = app.package_info().clone();
            let env = app.env();

            // Start backend and store the Child process
            let backend_child = start_backend(&package_info, &env);
            let backend_process_clone = Arc::clone(&backend_process);

            if let Ok(mut backend_guard) = backend_process_clone.lock() {
                *backend_guard = Some(backend_child);
            }

            main_window.on_window_event(move |event| {
                if let WindowEvent::CloseRequested { api, .. } = event {
                    api.prevent_close();
                    // Stop the backend process before exiting
                    if let Ok(mut backend_guard) = backend_process.lock() {
                        if let Some(child) = backend_guard.as_mut() {
                            stop_backend(child);
                        }
                    }
                    std::process::exit(0); // Exit the application
                }
            });
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![open_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn start_backend(package_info: &tauri::PackageInfo, env: &tauri::Env) -> Child {
    #[cfg(target_os = "windows")]
    let backend_executable = "server/Ukg.Api.exe";
    #[cfg(target_os = "macos")]
    let backend_executable = "server/UKG.Api";
    #[cfg(target_os = "linux")]
    let backend_executable = "server/UKG.Api";

    let resource_dir = resource_dir(package_info, env).expect("failed to get resource directory");
    let backend_path = resource_dir.join(backend_executable);

    // Hide console for release
    let mut command = Command::new(backend_path);
    #[cfg(target_os = "windows")]
    {
        use std::os::windows::process::CommandExt;
        command.creation_flags(0x08000000); // CREATE_NO_WINDOW
    }

    #[cfg(not(target_os = "windows"))]
    {
        command
            .stdout(std::process::Stdio::null())
            .stderr(std::process::Stdio::null())
            .stdin(std::process::Stdio::null());
    }

    command.spawn().expect("failed to start backend process")

    // Show console for debugging
    // Command::new(backend_path)
    //     .spawn()
    //     .expect("failed to start backend process")
}

fn stop_backend(child: &mut Child) {
    match child.kill() {
        Ok(_) => println!("Backend process was stopped successfully."),
        Err(e) => eprintln!("Failed to stop backend process: {}", e),
    }
}

#[command]
fn open_file(pathy: String) -> Result<(), String> {
    let path = Path::new(&pathy);

    if !path.exists() {
        return Err(format!("File not found: {}", pathy));
    }

    #[cfg(target_os = "windows")]
    let command = "cmd";
    #[cfg(target_os = "windows")]
    let args = ["/C", "start", ""];

    #[cfg(target_os = "macos")]
    let command = "open";
    #[cfg(target_os = "macos")]
    let args: [&str; 0] = [];

    #[cfg(target_os = "linux")]
    let command = "xdg-open";
    #[cfg(target_os = "linux")]
    let args: [&str; 0] = [];

    match Command::new(command).args(args).arg(&pathy).spawn() {
        Ok(_) => Ok(()),
        Err(e) => Err(format!("Failed to open file: {}", e)),
    }
}
