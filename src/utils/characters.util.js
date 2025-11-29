import { invoke } from "@tauri-apps/api/core";

// Assurez-vous de définir `build.withGlobalTauri` dans `tauri.conf.json` sur true

class Character {
    constructor(API_character = null) {
        this.id = "char_" + Math.round(Math.random() * 100000) // random id 
        
        if (API_character != null) {
            for (const field in API_character) {
                this[field] = API_character[field]
            }
        }
    }

    createFromRaw(chara_raw) {
        this.name = chara_raw.bases.name
        this.level = chara_raw.bases.level
        this.class = chara_raw.bases.class
        this.health = 10
        this.health_max = 10
        this.strength = chara_raw.bases.strength
        this.dexterity = chara_raw.bases.dexterity
        this.constitution = chara_raw.bases.constitution
        this.intelligence = chara_raw.bases.intelligence
        this.wisdom = chara_raw.bases.wisdom
        this.charisma = chara_raw.bases.charisma
        this.temp_strength = null
        this.temp_dexterity = null
        this.temp_constitution = null
        this.temp_intelligence = null
        this.temp_wisdom = null
        this.temp_charisma = null
        this.pp = 0
        this.gp = 0
        this.sp = 0
        this.cp = 0
        this.gemmes = []
        this.other_wealth = []
        this.spell_book = chara_raw.sorts      // spell id / name 
        this.shield = chara_raw.combat.shield +' (+'+chara_raw.combat.shield_ac+')'   // shield name / id
        this.armor = chara_raw.combat.armor+' (+'+chara_raw.combat.armor_ac+')'    // armor name / id
        this.weapons = chara_raw.combat.weapons       // weapon id / name
        this.ac = 10 + this.getModifier("dexterity") + parseInt(chara_raw.combat.armor_ac) + parseInt(chara_raw.combat.shield_ac)
        this.gifts = chara_raw.gifts
        this.attack_base = parseInt(chara_raw.bases.attack_base)
        // sauvgard --> [sum, class, carac, bonus, temp]
        this.reflex = [
            parseInt(chara_raw.bases.reflex) + this.getModifier("dexterity"),
            parseInt(chara_raw.bases.reflex),
            this.getModifier("dexterity"),
            0,
            0
        ],
            this.fortitude = [
                parseInt(chara_raw.bases.fortitude) + this.getModifier("constitution"),
                parseInt(chara_raw.bases.fortitude),
                this.getModifier("constitution"),
                0,
                0
            ],
            this.will = [
                parseInt(chara_raw.bases.will) + this.getModifier("wisdom"),
                parseInt(chara_raw.bases.will),
                this.getModifier("wisdom"),
                0,
                0
            ]

        this.other_capacities = chara_raw.bases.class_capacities

        // handeling skill format 
        // raw skill : "name" : [points, carac_name]
        this.inate_skills = []
        let temp = chara_raw.competences.innees
        for (const elt in temp) {
            const carac = temp[elt][1]
            this.inate_skills.push({
                "name": elt,
                "value": temp[elt][0] + this.getModifier(carac),
                "carac": carac,
                "points": temp[elt][0],
                "synergy": 0,
                "mod_divers": 0
            })
        }

        this.non_inate_skills = []
        temp = chara_raw.competences["non-innees"]
        for (const elt in temp) {
            const carac = temp[elt][1]
            this.non_inate_skills.push({
                "name": elt,
                "value": temp[elt][0] + this.getModifier(carac),
                "carac": carac,
                "points": temp[elt][0],
                "synergy": 0,
                "mod_divers": 0
            })
        }

        // handeling equipement format 
        temp = chara_raw.possessions
        this.inventory = []
        for (let i = 0; i < temp.length; i++) {
            this.inventory.push({
                "name": temp[i][0],
                "quantity": temp[i][1]
            })
        }
    }

    getModifier(statName) {
        if (!(statName in this)) {
            throw new Error(`Caractéristique "${statName}" inexistante`);
        }
        return Math.floor((this[statName] - 10) / 2);
    }

    getWealth() {
        return {
            cp: this.cp,
            sp: this.sp,
            gp: this.gp,
            pp: this.pp,
            gemmes: this.gemmes,
            other: this.other_wealth,
            sum: Math.round((this.cp * 0.01 + this.sp * 0.1 + this.gp + this.pp * 10) * 100) / 100
        }
    }
    toJson(){
       return  {
            id: this.id,
            "name": this.name ? this.name : "truc",
            level: parseInt(this.level),
            class: this.class,
            health: parseInt(this.health),
            health_max: parseInt(this.health_max),
            inventory: this.inventory || [],
            spell_book: this.spell_book || [],
            weapons: this.weapons || [],
            inate_skills: this.inate_skills || [],
            non_inate_skills: this.non_inate_skills || [],
            pp: parseInt(this.pp),
            gp: parseInt(this.gp),
            sp: parseInt(this.sp),
            cp: parseInt(this.cp),
            gemmes: this.gemmes || [],
            other_wealth: this.other_wealth || [],
            ac: parseInt(this.ac),
            shield: this.shield ? this.shield : '',
            armor: this.armor ? this.armor : '',
            strength: parseInt(this.strength),
            dexterity: parseInt(this.dexterity),
            constitution: parseInt(this.constitution),
            intelligence: parseInt(this.intelligence),
            wisdom: parseInt(this.wisdom),
            charisma: parseInt(this.charisma),
            temp_strength: this.temp_strength ? parseInt(this.temp_strength) : -1,
            temp_dexterity: this.temp_dexterity ? parseInt(this.temp_dexterity) : -1,
            temp_constitution: this.temp_constitution ? parseInt(this.temp_constitution) : -1,
            temp_intelligence: this.temp_intelligence ? parseInt(this.temp_intelligence) : -1,
            temp_wisdom: this.temp_wisdom ? parseInt(this.temp_wisdom) : -1,
            temp_charisma: this.temp_charisma ? parseInt(this.temp_charisma) : -1,
            gifts: this.gifts || [],
            reflex: this.reflex,
            fortitude: this.fortitude,
            will: this.will,
            other_capacities: this.other_capacities,
            attack_base: this.attack_base
        };
    }


    async save() {
        let json = this.toJson()
        try {
            const result = await invoke("add_character", {
                jsonCharacter: JSON.stringify(json)
            });
            console.log("Personnage ajouté :", result);
        } catch (err) {
            console.error("Erreur :", err);
        }

    }

    async updateDB(){
        let json = this.toJson()
        try {
            const result = await invoke("update_character", {
                jsonCharacter: JSON.stringify(json)
            });
            console.log("Personnage mis à jour :", result);
        } catch (err) {
            console.error("Erreur :", err);
        }
    }

    skillsValue(skillObj) {
        return skillObj.points + skillObj.mod_divers + skillObj.synergy + this.getModifier(skillObj.carac)
    }

    updateSkills(inate, non_inate) {
        // inate skills update 
        for (let i = 0; i < inate.length; i++) {
            this.inate_skills[i] = {
                ...this.inate_skills[i],
                points: inate[i].points,
                mod_divers: inate[i].mod_divers,
                value: this.skillsValue(inate[i])
            }
        }

        // non inate skills update 
        for (let i = 0; i < non_inate.length; i++) {
            this.non_inate_skills[i] = {
                ...this.non_inate_skills[i],
                points: non_inate[i].points,
                mod_divers: non_inate[i].mod_divers,
                value: this.skillsValue(non_inate[i])
            }
        }
        console.log("Skills updated !")
        this.updateDB()
    }

    addGift(newGift){
        this.gifts.push(newGift)
        this.updateDB()
    }

    addCapacity(newCapa){
        this.other_capacities.push(newCapa)
        this.updateDB()
    }

    updateWeapon(newWeapon, weaponIndex){
        console.log(this.weapons, newWeapon)
        this.weapons[weaponIndex] = newWeapon
        console.log(this.weapons)
        this.updateDB()
    }

    updateStats(newStats){
        for (const stat in newStats) {
            this[stat] = newStats[stat]
        }
        this.reflex[0] = this.reflex.reduce((acc, curr) => acc + curr) - this.reflex[0]
        this.fortitude[0] = this.fortitude.reduce((acc, curr) => acc + curr) - this.fortitude[0]
        this.will[0] = this.will.reduce((acc, curr) => acc + curr) - this.will[0]


        this.updateDB()
    }
}
export { Character }

