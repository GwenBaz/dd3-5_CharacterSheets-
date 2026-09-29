import React, { useState } from 'react'

function Skills({ character }: { character: any }) {
  if (!character) return <p>Aucun personnage chargé.</p>

  const [editMode, setEditMode] = useState(false)
  const [editInate, setEditInate] = useState<any[]>(character.inate_skills || [])
  const [editNonInate, setEditNonInate] = useState<any[]>(character.non_inate_skills || [])

  const safeGetModifier = (carac: string) => {
    try {
      return character.getModifier(carac)
    } catch (e: any) {
      console.warn('getModifier failed for', carac, e?.message)
      return ''
    }
  }

  function handleChangeNonInate(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    const [indexStr, field] = name.split('/')
    const skillIndex = parseInt(indexStr)

    setEditNonInate((prevData) => {
      const newData = [...prevData]
      newData[skillIndex] = {
        ...newData[skillIndex],
        [field]: value === '' ? '' : parseFloat(value) || 0,
      }
      return newData
    })
  }
  function handleChangeInate(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    const [indexStr, field] = name.split('/')
    setEditInate((prevData) => {
      const newData = [...prevData]
      const skillIndex = parseInt(indexStr)
      if (skillIndex !== -1) {
        newData[skillIndex] = {
          ...newData[skillIndex],
          [field]: value === '' ? '' : parseFloat(value) || 0,
        }
      }
      return newData
    })
  }

  function handleSubmit() {
    character.updateSkills(editInate, editNonInate)
    setEditMode(false)
  }

  const displayNonZero = (v: any) => {
    if (v === 0 || v === '0' || v == null) return ''
    return v
  }

  const tableLineNonInate = (val: any, index: number) => (
    <tr key={val.name || index}>
      <td className="cara-head">{val.name}</td>
      <td>{val.carac[0] + val.carac[1] + val.carac[2]}</td>
      <td>{val.value}</td>
      <td>{safeGetModifier(val.carac)}</td>
      <td>{!editMode ? displayNonZero(val.points) : <input type="number" onChange={handleChangeNonInate} value={editNonInate[index].points} name={index + '/points'} />}</td>
      <td>{!editMode ? displayNonZero(val.mod_divers) : <input type="number" onChange={handleChangeNonInate} value={editNonInate[index].mod_divers} name={index + '/mod_divers'} />}</td>
      <td>{displayNonZero(val.synergy)}</td>
    </tr>
  )

  const tableLineInate = (val: any, index: number) => (
    <tr key={val.name || index}>
      <td className="cara-head">{val.name}</td>
      <td>{val.carac[0] + val.carac[1] + val.carac[2]}</td>
      <td>{val.value}</td>
      <td>{safeGetModifier(val.carac)}</td>
      <td>{!editMode ? displayNonZero(val.points) : <input type="number" onChange={handleChangeInate} value={editInate[index].points} name={index + '/points'} />}</td>
      <td>{!editMode ? displayNonZero(val.mod_divers) : <input type="number" onChange={handleChangeInate} value={editInate[index].mod_divers} name={index + '/divers'} />}</td>
      <td>{displayNonZero(val.synergy)}</td>
    </tr>
  )

  return (
    <div>
      <h3>Compétences</h3>
      {editMode ? (
        <div>
          <button onClick={() => setEditMode(false)}>Annuler</button>
          <button onClick={handleSubmit}>Valider</button>
        </div>
      ) : (
        <button onClick={() => setEditMode(true)}>Modifier</button>
      )}
      <section>
        <h4>Compétences non-innées</h4>
        {Array.isArray(character.non_inate_skills) && character.non_inate_skills.length > 0 ? (
          <table className="cara-table">
            <thead>
              <tr>
                <th>Nom de la compétence</th>
                <th>carac</th>
                <th>mod de compétence</th>
                <th>mod de carac</th>
                <th>degré de maitrise</th>
                <th>mod divers</th>
                <th>bonus synergie</th>
              </tr>
            </thead>
            <tbody>{character.non_inate_skills.map((val: any, index: number) => tableLineNonInate(val, index))}</tbody>
          </table>
        ) : (
          <p>Aucune compétence non-innée.</p>
        )}
      </section>

      <section>
        <h4>Compétences innées</h4>
        {Array.isArray(character.inate_skills) && character.inate_skills.length > 0 ? (
          <table className="cara-table">
            <thead>
              <tr>
                <th>Nom de la compétence</th>
                <th>carac</th>
                <th>mod de compétence</th>
                <th>mod de carac</th>
                <th>degré de maitrise</th>
                <th>mod divers</th>
                <th>bonus synergie</th>
              </tr>
            </thead>
            <tbody>{character.inate_skills.map((val: any, index: number) => tableLineInate(val, index))}</tbody>
          </table>
        ) : (
          <p>Aucune compétence innée.</p>
        )}
      </section>
    </div>
  )
}

export default Skills
