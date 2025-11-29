// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod character;
mod spells; 
mod models; // data models
mod utils; // some useful function // function about characters

use character::{add_character, get_all_characters, update_character};
use utils::{display_event, log};
use spells::{add_spell, get_spell_list};

// use utils::get_data_dir;  // Importe la fonction

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let handle = app.handle();

            // Test de la fonction
            display_event(&handle, "Application démarrée");
            #[cfg(debug_assertions)]
            {
                use tauri::Manager;
                let window = app.get_webview_window("main").unwrap();
                window.open_devtools();
            }

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            // vos commandes...
            add_character, 
            get_all_characters, 
            log, 
            update_character, 
            add_spell, 
            get_spell_list
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
