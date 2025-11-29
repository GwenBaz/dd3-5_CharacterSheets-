use tauri::AppHandle ; 
use crate::utils::get_data_dir ; 

use super::models::Spell ; 
use super:: utils::JsonTable ; 

#[allow(dead_code)]
pub struct SpellsTable ; 

impl JsonTable<Spell> for SpellsTable {
    fn table_name() -> &'static str {
        "spells"
    }
}

#[tauri::command]
pub async fn add_spell(
    app_handle: AppHandle, 
    json_spell: String
) -> Result<Spell, String> {
    // Parser le JSON
    println!("Raw spell : {:#?}", json_spell) ; 

    let spell: Spell = serde_json::from_str(&json_spell)
        .map_err(|e| {
        let error_msg = format!("Erreur de parsing JSON: {}", e);
        eprintln!("{}", error_msg); // Affiche dans la console
        error_msg
    })?;
    
    println!("Parsed Spell : {:#?}", spell);
    let data_dir = get_data_dir(&app_handle).await?;

    let mut spells = SpellsTable::load(&data_dir)?;
    spells.push(spell.clone());

    SpellsTable::save(&data_dir, &spells)?;
    Ok(spell)
}

#[tauri::command]
pub async fn get_spell_list(
    app_handle: AppHandle, 
    spell_name_list : Vec<String>
) -> Result<Vec<Spell>, String> {
    let data_dir = get_data_dir(&app_handle).await?;
    let all_spells = SpellsTable::load(&data_dir)?;

    let filtered_spells: Vec<Spell> = all_spells.into_iter()
        .filter(|spell| spell_name_list.contains(&spell.name))
        .collect();

    Ok(filtered_spells)
}