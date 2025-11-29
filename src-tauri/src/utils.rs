use std::path::PathBuf;
use tauri::AppHandle;
use tauri::Manager;
use tauri::Emitter;

pub async fn get_data_dir(app_handle: &AppHandle) -> Result<PathBuf, String> {
    if cfg!(debug_assertions) {
        // Mode développement : chemin relatif
        let manifest_dir = std::env::var("CARGO_MANIFEST_DIR")
            .map_err(|e| e.to_string())?;
        
        let mut dev_path = PathBuf::from(manifest_dir);
        dev_path.push("../db_dev");
        
        std::fs::create_dir_all(&dev_path).map_err(|e| e.to_string())?;
        Ok(dev_path)
    } else {
        // Mode production : Tauri 2.x
        app_handle
            .path()
            .app_data_dir()
            .map_err(|e| e.to_string())
    }
}

// function to add notifications on screen
pub fn display_event(app: &tauri::AppHandle, message: impl Into<String>) {
    let msg = message.into();
    app.emit("debug-message", msg.clone())
        .unwrap_or_else(|e| eprintln!("Erreur emit: {}", e));
    
    println!("[DEBUG] {}", msg);
}

#[tauri::command]
pub fn log(message: String) {
    println!("[FRONT] - {:#}", message) 
}

use serde::{Deserialize, Serialize};
use std::fs;

// Trait générique pour toutes les tables
pub trait JsonTable<T>
where
    T: Serialize + for<'de> Deserialize<'de>,
{
    fn table_name() -> &'static str;
    
    fn load(data_dir: &PathBuf) -> Result<Vec<T>, String> {
        let file_path = data_dir.join(format!("{}.json", Self::table_name()));
        
        if !file_path.exists() {
            // Retourner un tableau vide si le fichier n'existe pas
            return Ok(Vec::new());
        }
        
        let json_string = fs::read_to_string(file_path).map_err(|e| e.to_string())?;
        let data: Vec<T> = serde_json::from_str(&json_string).map_err(|e| e.to_string())?;
        
        Ok(data)
    }
    
    fn save(data_dir: &PathBuf, records: &Vec<T>) -> Result<(), String> {
        fs::create_dir_all(data_dir).map_err(|e| e.to_string())?;
        
        let file_path = data_dir.join(format!("{}.json", Self::table_name()));
        let json_string = serde_json::to_string_pretty(records).map_err(|e| e.to_string())?;
        
        fs::write(file_path, json_string).map_err(|e| e.to_string())
    }
}