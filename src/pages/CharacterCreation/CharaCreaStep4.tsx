import React, { useState, useEffect } from 'react'

export default function CharaCreaStep4({ next, submitData }: any): React.ReactElement {
  const [data, setData] = useState<any[]>([])
  const [newEquipement, setNewEquipement] = useState<any>(['', ''])

  useEffect(() => {
    // Initialisation si nécessaire
  }, [])

  function handleChange(e: any) {
    const { name, value } = e.target
    if (name === 'equip') {
      setNewEquipement([value, newEquipement[1]])
    } else {
      setNewEquipement([newEquipement[0], parseInt(value)])
    }
  }

  function handleSubmit() {
    if (newEquipement[0].trim() !== '' && newEquipement[1] !== '') {
      setData([...data, [...newEquipement]])
      setNewEquipement(['', ''])
      const equipInput = document.querySelector('input[name="equip"]') as HTMLInputElement | null
      const qteInput = document.querySelector('input[name="qte"]') as HTMLInputElement | null
      if (equipInput) equipInput.value = ''
      if (qteInput) qteInput.value = ''
    }
  }

  function handleNextPage() {
    submitData('possessions', data)
    next()
  }

  return (
    <>
      <h3>Étape 4 : Les possessions</h3>
      <p className="note">Ajoutez votre équipement et sa quantité</p>
      <div>
        <table className="equip-table">
          <thead>
            <tr>
              <th>Équipement</th>
              <th>Qté</th>
            </tr>
          </thead>
          <tbody>
            {data.map((equip, index) => (
              <tr key={index}>
                <td>{equip[0]}</td>
                <td>{equip[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="line equip-entry">
          <input
            type="text"
            name="equip"
            placeholder="Nom de l'équipement"
            onChange={handleChange}
            className="equip-input"
          />
          <input
            type="number"
            name="qte"
            min="1"
            placeholder="Quantité"
            onChange={handleChange}
            className="qty-input"
          />
          <button onClick={handleSubmit} className="button-add">
            Ajouter
          </button>
        </div>
      </div>
      <button onClick={handleNextPage} className="button-next">
        Page suivante
      </button>
    </>
  )
}
