#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

fn main() {
  tauri::Builder::default()
    .run(tauri::generate_context!())
    .expect("error while running tauri application");

     /*  tauri::Builder::default()
    .setup(|app| {
      let main_window = app.get_window("main").unwrap();
      main_window.with_webview(|webview| {
        
      });
      Ok(())
  }); */
}
