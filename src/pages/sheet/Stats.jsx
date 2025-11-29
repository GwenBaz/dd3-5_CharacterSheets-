import AttackTable from "../../common/attackTable"
import competences from "../../assets/competences.json"
import { Character } from "../../utils/characters.util"
import { useState, useEffect } from "react"

function Stats({ character }) {
    // let chara = new Character(character)
    const carac = ["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"]
    const save = ["reflex", "fortitude", "will"]
    const [updt, setUpdt] = useState(false)
    const [edit, setEdit] = useState(false)

    const [statsEdit, setStatsEdit] = useState({
        strength: character.strength,
        dexterity: character.dexterity,
        constitution: character.constitution,
        intelligence: character.intelligence,
        wisdom: character.wisdom,
        charisma: character.charisma,
        temp_strength: character.temp_strength,
        temp_dexterity: character.temp_dexterity,
        temp_constitution: character.temp_constitution,
        temp_intelligence: character.temp_intelligence,
        temp_wisdom: character.temp_wisdom,
        temp_charisma: character.temp_charisma,
        reflex: character.reflex,
        fortitude: character.fortitude,
        will: character.will,
        attack_base: character.attack_base,
        armor: character.armor,
        shield: character.shield,
        ac: character.ac
    })

    useEffect(() => { console.log("reload"), [updt] })


    function weaponUpdate(newWeapon, index) {
        console.log(newWeapon, index)
        character.updateWeapon(newWeapon, index)
    }
    function deleteWeapon(index) {
        character.weapons.splice(index, 1)
        character.updateDB()
        setUpdt(!updt)
    }

    function addWeapon() {
        character.weapons.push({ name: "", damage: "", dice: "", touch: "", critics: "", range: "", description: "" })
        setUpdt(!updt)
    }

    function handleChange(e) {
        const { name, value } = e.target;
        console.log(name, value)
        // handle save change 
        if (name.indexOf('/') != -1) {
            const [ save, index ] = name.split('/')
            const intValue = parseInt(value);
            let newSave = [...statsEdit[save]]
            newSave[parseInt(index)] = intValue
            setStatsEdit(prev => ({ ...prev, [save]: newSave }));
            // handle 
        } else if (name != 'shield' && name != 'armor') {
            const intValue = parseInt(value == '' ? 0 : value);
            setStatsEdit(prev => ({ ...prev, [name]: intValue }));
        } else {
            setStatsEdit(prev => ({ ...prev, [name]: value }));
        }

    }
    function handleSubmit() {
        character.updateStats(statsEdit)
        setEdit(false)

    }

    function handleCancel() {
        setStatsEdit({
            strength: character.strength,
            dexterity: character.dexterity,
            constitution: character.constitution,
            intelligence: character.intelligence,
            wisdom: character.wisdom,
            charisma: character.charisma,
            temp_strength: character.temp_strength,
            temp_dexterity: character.temp_dexterity,
            temp_constitution: character.temp_constitution,
            temp_intelligence: character.temp_intelligence,
            temp_wisdom: character.temp_wisdom,
            temp_charisma: character.temp_charisma,
            reflex: character.reflex,
            fortitude: character.fortitude,
            will: character.will,
            attack_base: character.attack_base,
            armor: character.armor,
            shield: character.shield,
            ac: character.ac
        })
        setEdit(false)
    }

    return (
        <>
            <h2>Stat Page</h2>
            <div className="line">
                <div className="cara-table half-page">
                    <h3>Caractéristiques</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Carastéristique</th>
                                <th>valeur</th>
                                <th>modif</th>
                                <th>valeur<br />temporaire</th>
                                <th>modif<br />temporaire</th>
                            </tr>
                        </thead>
                        <tbody>
                            {carac.map((val, index) => (
                                <tr key={index}>
                                    <td className="cara-head">{val}</td>
                                    <td>{edit ? <input name={val} type="number" onChange={handleChange} value={statsEdit[val]} /> : character[val]}</td>
                                    <td>{character.getModifier(val)}</td>
                                    <td>{edit ? <input name={"temp_" + val} type="number" onChange={handleChange} value={statsEdit["temp_" + val]} /> : character["temp_" + val] = 0 ? character["temp_" + val] : ""}</td>
                                    <td>{character["temp_" + val] > 0 ? character.getModifier("temp_" + val) : ""}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h3>Sauvegarde</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Sauvegarde</th>
                                <th>total</th>
                                <th>base</th>
                                <th>mod<br />carac</th>
                                <th>mod<br />divers</th>
                                <th>mod<br />temporaire</th>
                            </tr>
                        </thead>
                        <tbody>
                            {save.map((val, index) => (
                                <tr key={index}>
                                    <td className="cara-head">{val}</td>
                                    <td>{character[val][0]}</td>
                                    <td>{edit ? <input name={val+'/1'} type='number' value={statsEdit[val][1]} onChange={handleChange}/> : character[val][1]}</td>
                                    <td>{character[val][2]}</td>
                                    <td>{edit ? <input name={val+'/3'} type='number' value={statsEdit[val][3]} onChange={handleChange}/> : character[val][3]}</td>
                                    <td>{edit ? <input name={val+'/4'} type='number' value={statsEdit[val][4]} onChange={handleChange}/> : character[val][4] ? character[val][4] : ""}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h3>La protection</h3>
                    <div className="line">
                        <p>Armure : </p>{edit ? (
                            <>
                                <input type="text" name="armor" value={statsEdit.armor} onChange={handleChange} />
                            </>
                        ) : (
                            <p>{character.armor}</p>
                        )}
                    </div>
                    <div className="line">
                        <p>Bouclier : </p>{edit ? (
                            <>
                                <input type="text" name="shield" value={statsEdit.shield} onChange={handleChange} />
                            </>
                        ) : (
                            <p>{character.shield}</p>
                        )}
                    </div>
                    <div className="line">
                        <p>Classe d'armure : </p>{edit ? (
                            <>
                                <input type="number" name="ac" value={statsEdit.ac} onChange={handleChange} />
                            </>
                        ) : (
                            <p>{character.ac}</p>
                        )}
                    </div>
                    {edit ? (
                        <div className="line">
                            <button onClick={handleSubmit}>Valider</button>
                            <button onClick={handleCancel}>Annuler</button>
                        </div>
                    ) : (
                        <button onClick={() => setEdit(true)}>Modifier</button>
                    )}
                </div>
                <div className="half-page">
                    <h3>Attaques</h3>
                    <p>Bonus de base à l'attaque : {character.attack_base}</p>
                    {Array.isArray(character.weapons) && character.weapons.length > 0 ? (
                        <div>
                            {character.weapons.map((weapon, index) => (
                                <AttackTable key={weapon.name || index} attack={weapon} index={index} del={deleteWeapon} updt={weaponUpdate} />
                            ))}
                        </div>
                    ) : (
                        <p>Aucunes armes</p>
                    )}
                    <button onClick={addWeapon}>Ajouter une attaque</button>
                </div>
            </div>
        </>
    )
}

export default Stats