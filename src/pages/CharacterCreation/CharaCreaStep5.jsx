import { useState } from "react";

function CharaCreaStep5({ next, submitData }) {
  const [data, setData] = useState({
    "weapons": [],
    "armor": null,
    "shield": null,
    "shield_ac": 0, 
    "armor_ac" : 0
  })
  const [newWeapon, setNewWeapon] = useState({
    name: "",
    damage: "",
    dice: "",
    touch: "",
    critics: "",
    range: 0,
    description: ""
  })

  function handleChange(e) {
    const { name, value } = e.target;
    // Champs du formulaire arme
    if (["name", "dice", "critics", "description"].includes(name)) {
      setNewWeapon(prev => ({ ...prev, [name]: value }));
    } else if (["damage", "touch", "range"].includes(name)) {
      setNewWeapon(prev => ({ ...prev, [name]: parseInt(value == '' ? 0 : value) }));
    } else {
      setData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  }

  function addWeapon() {
    // Vérifie qu'au moins le nom est rempli
    if (newWeapon.name.trim() !== "") {
      setData(prevData => ({
        ...prevData,
        weapons: [...prevData.weapons, newWeapon]
      }))
      setNewWeapon({
        name: "",
        damage: "",
        dice: "",
        touch: "",
        critics: "",
        range: 0,
        description: ""
      })
    }
  }

  function handleNextPage() {
    submitData("combat", data)
    next()
  }

  return (
    <>
      <h3>Étape 5 : le matériel de combat</h3>
      <p className="note">Configurez votre équipement de combat</p>
      <div>
        <h4>Weapons :</h4>
        <p className="note">List your weapons</p>
        <p>Weapons:</p>
        <ul>
          {data["weapons"].map((weapon, index) => (
            <li key={index}>
              <b>{weapon.name}</b>
              {" | Damage: "}{weapon.damage}
              {weapon.dice && ` (${weapon.dice})`}
              {weapon.touch && ` | Touch: ${weapon.touch}`}
              {weapon.critics && ` | Crit: ${weapon.critics}`}
              {weapon.range && ` | Range: ${weapon.range}`}
              {weapon.description && ` | ${weapon.description}`}
            </li>
          ))}
        </ul>
        <div className="line" style={{ flexWrap: 'wrap', gap: '0.5em' }}>
          <input
            type="text"
            name="name"
            placeholder="Nom de l'arme"
            value={newWeapon.name}
            onChange={handleChange}
            style={{ minWidth: '120px' }}
          />
          <input
            type="text"
            name="damage"
            placeholder="Dégâts"
            value={newWeapon.damage}
            onChange={handleChange}
            style={{ minWidth: '80px' }}
          />
          <input
            type="text"
            name="dice"
            placeholder="Dé (ex: d6)"
            value={newWeapon.dice}
            onChange={handleChange}
            style={{ minWidth: '60px' }}
          />
          <input
            type="text"
            name="touch"
            placeholder="Toucher"
            value={newWeapon.touch}
            onChange={handleChange}
            style={{ minWidth: '60px' }}
          />
          <input
            type="text"
            name="critics"
            placeholder="Critiques"
            value={newWeapon.critics}
            onChange={handleChange}
            style={{ minWidth: '60px' }}
          />
          <input
            type="text"
            name="range"
            placeholder="Portée"
            value={newWeapon.range}
            onChange={handleChange}
            style={{ minWidth: '60px' }}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newWeapon.description}
            onChange={handleChange}
            style={{ minWidth: '120px' }}
          />
          <button onClick={addWeapon}>Ajouter</button>
        </div>
        <div className="line">
          <p>Armure :</p>
          <input
            type="text"
            name="armor"
            placeholder="Type d'armure"
            onChange={handleChange}
          />
          <input
            type="number"
            name="armor_ac"
            placeholder="CA Armure"
            onChange={handleChange}
          />
        </div>
        <div className="line">
          <p>Bouclier :</p>
          <input
            type="text"
            name="bouclier"
            placeholder="Type de bouclier"
            onChange={handleChange}
          />
          <input
            type="number"
            name="shield_ac"
            placeholder="CA bouclier"
            onChange={handleChange}
          />
        </div>
      </div>
      <button onClick={handleNextPage}>Page suivante</button>
    </>
  )
}

export default CharaCreaStep5