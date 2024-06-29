// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::path::Path;
use std::process::Command;
use tauri::command;

// use std::path::PathBuf;
// use std::process::{Child, Command};
// use std::sync::{Arc, Mutex};
// use tauri::{Manager, WindowEvent};

fn main() {
    // let backend_process = Arc::new(Mutex::new(start_backend()));

    tauri::Builder::default()
        // .setup(move |app| {
        //     let main_window = app.get_window("main").unwrap();
        //     let backend_process_clone = Arc::clone(&backend_process);
        //     main_window.on_window_event(move |event| {
        //         if let WindowEvent::CloseRequested { api, .. } = event {
        //             api.prevent_close();
        //             // Now we can borrow `backend_process` as mutable safely across threads
        //             if let Ok(mut child) = backend_process_clone.lock() {
        //                 stop_backend(&mut *child);
        //             }
        //             std::process::exit(0); // Exit the application
        //         }
        //     });
        //     Ok(())
        // })
        .invoke_handler(tauri::generate_handler![open_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

// fn start_backend() -> Child {
//     let backend_executable = "./bin/UKG.Api";

//     let backend_path = PathBuf::from(env!("CARGO_MANIFEST_DIR")).join(backend_executable);

//     Command::new(backend_path)
//         .spawn()
//         .expect("failed to start backend process")
// }

// fn stop_backend(child: &mut Child) {
//     match child.kill() {
//         Ok(_) => println!("Backend process was stopped successfully."),
//         Err(e) => eprintln!("Failed to stop backend process: {}", e),
//     }
// }

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
