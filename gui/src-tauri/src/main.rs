// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::path::Path;
use std::process::{Child, Command};
use std::sync::{Arc, Mutex};
use tauri::{api::path::resource_dir, command, Manager, WindowEvent};

fn main() {
    let backend_process = Arc::new(Mutex::new(None));

    tauri::Builder::default()
        .setup(move |app| {
            let main_window = app.get_window("main").unwrap();
            let package_info = app.package_info().clone();
            let env = app.env();

            let backend_child = start_backend(&package_info, &env);
            *backend_process.lock().unwrap() = Some(backend_child);

            main_window.on_window_event(move |event| {
                if let WindowEvent::CloseRequested { api, .. } = event {
                    api.prevent_close();
                    if let Some(child) = backend_process.lock().unwrap().as_mut() {
                        stop_backend(child);
                    }
                    std::process::exit(0);
                }
            });
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![open_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn start_backend(package_info: &tauri::PackageInfo, env: &tauri::Env) -> Child {
    let backend_executable = match std::env::consts::OS {
        "windows" => "server/Ukg.Api.exe",
        _ => "server/UKG.Api",
    };

    let resource_dir = resource_dir(package_info, env).expect("failed to get resource directory");
    let backend_path = resource_dir.join(backend_executable);

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
}

fn stop_backend(child: &mut Child) {
    if let Err(e) = child.kill() {
        eprintln!("Failed to stop backend process: {}", e);
    } else {
        println!("Backend process was stopped successfully.");
    }
}

#[command]
fn open_file(pathy: String) -> Result<(), String> {
    let path = Path::new(&pathy);

    if !path.exists() {
        return Err(format!("File not found: {}", pathy));
    }

    let (command_path, args) = match std::env::consts::OS {
        "windows" => ("cmd", vec!["/C", "start", ""]),
        "macos" => ("open", vec![]),
        "linux" => ("xdg-open", vec![]),
        _ => return Err("Unsupported OS".into()),
    };

    let mut command = Command::new(command_path);

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

    match command.args(&args).arg(&pathy).spawn() {
        Ok(_) => Ok(()),
        Err(e) => Err(format!("Failed to open file: {}", e)),
    }
}
