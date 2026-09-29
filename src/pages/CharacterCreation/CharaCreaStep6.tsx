import React, { useState } from 'react'
import { invoke } from '@tauri-apps/api/core'

export default function CharaCreaStep6({ next, submitData }: any): React.ReactElement {
  const [data, setData] = useState<any[]>([])
  const [newSpell, setNewSpell] = useState<any>({
    id: '',
    name: '',
    level: '',
    range: '',
    length: '',
    school: '',
    incantation: '',
    magic_resistance: false,
    effect: '',
  })

  function handleChange(e: any) {
    const { name, value } = e.target
    if (name === 'level') {
      setNewSpell((prev: any) => ({ ...prev, [name]: parseInt(value) }))
    } else if (name === 'magic_resistance') {
      setNewSpell((prev: any) => ({ ...prev, [name]: value === 'true' }))
    } else {
      setNewSpell((prev: any) => ({ ...prev, [name]: value }))
    }
  }

  async function handleSubmit() {
    if (newSpell.name.trim() !== '') {
      setData((prevData: any) => ([...prevData, newSpell.name]))
      try {
        const result = await invoke('add_spell', { jsonSpell: JSON.stringify(newSpell) })
        console.log('Sort ajouté à la db :', result)
        setNewSpell({
          id: '',
          name: '',
          level: '',
          range: '',
          length: '',
          school: '',
          incantation: '',
          magic_resistance: false,
          effect: '',
        })
      } catch (err) {
        console.error('Erreur :', err)
      }
    }
  }

  function handleNextPage() {
    submitData('sorts', data)
    next()
  }

  return (
    <>
      <h3>Étape 6 : les sorts</h3>
      <p className="note">Ajoutez vos sorts et capacités magiques</p>
      <div>
        <h4>Les sorts :</h4>
        <p className="note">Liste de vos sorts disponibles</p>
        <ul>
          {data.map((spell: any, index: number) => (
            <li key={index}>{spell}</li>
          ))}
        </ul>
        <div className="line">
          <h4>Ajouter un sort</h4>
          <input type="text" name="name" placeholder="Nom du sort" value={newSpell.name} onChange={handleChange} />
          <input type="number" name="level" placeholder="Niveau" value={newSpell.level} onChange={handleChange} />
          <input type="text" name="range" placeholder="Portée" value={newSpell.range} onChange={handleChange} />
          <input type="text" name="length" placeholder="Durée" value={newSpell.length} onChange={handleChange} />
          <input type="text" name="school" placeholder="école | domaine" value={newSpell.school} onChange={handleChange} />
          <input type="text" name="incantation" placeholder="tps incantation" value={newSpell.incantation} onChange={handleChange} />
          <p>Résistance à la magie : </p>
          <select name="magic_resistance" value={String(newSpell.magic_resistance)} onChange={handleChange}>
            <option value={"true"}>Oui</option>
            <option value={"false"}>Non</option>
          </select>
          <input type="text" name="effect" placeholder="Effet du sort" value={newSpell.effect} onChange={handleChange} />

          <button onClick={handleSubmit}>Ajouter</button>
        </div>
      </div>
      <button onClick={handleNextPage}>Page suivante</button>
    </>
  )
}
