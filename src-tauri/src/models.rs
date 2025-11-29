use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct Character {
    pub id: String,
    pub name: String,
    pub level: i32,
    pub class: String, 
    pub health: i32,
    pub health_max : i32, 
    pub inventory : Vec<Equipement>, 
    pub spell_book : Vec<String>,       // spell id / name 
    pub weapons : Vec<Weapon>,          
    pub inate_skills : Vec<Skill>, 
    pub non_inate_skills : Vec<Skill>, 
    pub pp : i32, 
    pub gp : i32, 
    pub sp : i32, 
    pub cp : i32, 
    pub gemmes : Vec<String>, 
    pub other_wealth : Vec<String>, 
    pub ac : i8, 
    pub shield : String, // shield name / id
    pub armor : String, // armor name / id
    pub strength : i8,
    pub dexterity : i8,
    pub constitution : i8,
    pub intelligence : i8,
    pub wisdom : i8,
    pub charisma : i8,
    pub temp_strength : i8,
    pub temp_dexterity : i8,
    pub temp_constitution : i8,
    pub temp_intelligence : i8,
    pub temp_wisdom : i8,
    pub temp_charisma : i8,
    pub gifts : Vec<String>, // gift name / id 
    pub reflex : Vec<i8>, // [sum, carac, class, bonus]
    pub fortitude : Vec<i8>, // [sum, carac, class, bonus]
    pub will : Vec<i8>, // [sum, carac, class, bonus]
    pub other_capacities : Vec<String>, 
    pub attack_base : i8
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct Spell {
    pub id: String, 
    pub name : String, 
    pub level : i16, 
    pub range : String, 
    pub length : String, 
    pub school : String, 
    pub incantation : String, 
    pub magic_resistance : bool, 
    pub effect : String
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct Weapon {
    pub name : String, 
    pub damage : i16, 
    pub dice : String, 
    pub touch : i16, 
    pub critics : String, 
    pub range : i16, 
    pub description : String 
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct Equipement{
    pub name : String, 
    pub quantity : i32
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct Skill{
    pub name : String, 
    pub carac: String, 
    pub value: i16, 
    pub points : i16, 
    pub synergy : i16, 
    pub mod_divers : i16
}
#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct Shield{
    pub name : String, 
    pub bonus_ac : i8, 
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct Armor {
    pub name : String, 
    pub bonus_ac : i8, 
    pub max_mod_dex : i8
}
