use tauri::AppHandle;
use crate::utils::get_data_dir;

// src-tauri/src/db/characters.rs
use super::models::Character;
use super::utils::JsonTable; 

#[allow(dead_code)]
pub struct CharactersTable;

impl JsonTable<Character> for CharactersTable {
    fn table_name() -> &'static str {
        "characters"
    }
}

#[tauri::command]
pub async fn get_all_characters(app_handle: AppHandle) -> Result<Vec<Character>, String> {
    let data_dir = get_data_dir(&app_handle).await?;
    CharactersTable::load(&data_dir)
}

#[tauri::command]
pub async fn add_character(
    app_handle: AppHandle, 
    json_character: String
) -> Result<Character, String> {
    // Parser le JSON
    println!("Raw character : {:#?}", json_character) ; 

    let character: Character = serde_json::from_str(&json_character)
        .map_err(|e| {
        let error_msg = format!("Erreur de parsing JSON: {}", e);
        eprintln!("{}", error_msg); // Affiche dans la console
        error_msg
    })?;
    
    println!("Parsed Character : {:#?}", character);
    let data_dir = get_data_dir(&app_handle).await?;


    let mut characters = CharactersTable::load(&data_dir)?;
    characters.push(character.clone());

    CharactersTable::save(&data_dir, &characters)?;
    
    Ok(character)
}

#[tauri::command]
pub async fn update_character(
    app_handle: AppHandle,
    json_character: String
) -> Result<Character, String> {
    // Parser le JSON
    println!("Raw character update : {:#?}", json_character);
    let character: Character = serde_json::from_str(&json_character)
        .map_err(|e| {
            let error_msg = format!("Erreur de parsing JSON: {}", e);
            eprintln!("{}", error_msg);
            error_msg
        })?;
    
    println!("Parsed Character for update : {:#?}", character);
    
    let data_dir = get_data_dir(&app_handle).await?;
    let mut characters = CharactersTable::load(&data_dir)?;
    
    // Trouver l'index du personnage à modifier
    let index = characters.iter().position(|c| c.id == character.id)
        .ok_or_else(|| {
            let error_msg = format!("Personnage avec l'ID '{}' non trouvé", character.id);
            eprintln!("{}", error_msg);
            error_msg
        })?;
    
    println!("Personnage trouvé à l'index {}", index);
    
    // Remplacer le personnage
    characters[index] = character.clone();
    
    // Sauvegarder
    CharactersTable::save(&data_dir, &characters)?;
    
    println!("✅ Personnage '{}' mis à jour avec succès", character.name);
    Ok(character)
}