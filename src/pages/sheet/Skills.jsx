import { useState } from "react"


function Skills({ character }) {
    if (!character) return <p>Aucun personnage chargé.</p>

    const [editMode, setEditMode] = useState(false)
    const [editInate, setEditInate] = useState(character.inate_skills)
    const [editNonInate, setEditNonInate] = useState(character.non_inate_skills)

    const safeGetModifier = (carac) => {
        try {
            return character.getModifier(carac)
        } catch (e) {
            console.warn('getModifier failed for', carac, e.message)
            return ''
        }
    }

    function handleChangeNonInate(e) {
        const { name, value } = e.target
        const [indexStr, field] = name.split('/')
        console.log(name, value, indexStr, field)
        const skillIndex = parseInt(indexStr)

        setEditNonInate(prevData => {
            const newData = [...prevData]
            newData[skillIndex] = {
                ...newData[skillIndex],
                [field]: value === '' ? '' : parseFloat(value) || 0
            }
            return newData
        })
    }
    function handleChangeInate(e) {
        const { name, value } = e.target
        const [indexStr, field] = name.split('/')

        setEditInate(prevData => {
            const newData = [...prevData]
            const skillIndex = parseInt(indexStr)

            if (skillIndex !== -1) {
                newData[skillIndex] = {
                    ...newData[skillIndex],
                    [field]: value === '' ? '' : parseFloat(value) || 0
                }
            }
            return newData
        })
    }


    function handleSubmit() {
        character.updateSkills(editInate, editNonInate)
        setEditMode(false)
    }

    const displayNonZero = (v) => {
        // hide numeric 0 and string '0', show everything else (including negative numbers)
        if (v === 0 || v === '0' || v == null) return ''
        return v
    }

    const tableLineNonInate = (val, index) => {
        return (
            <tr key={val.name || index}>
                <td className="cara-head">{val.name}</td>
                <td>{val.carac[0] + val.carac[1] + val.carac[2]}</td>
                <td>{val.value}</td>
                <td>{safeGetModifier(val.carac)}</td>
                <td>{!editMode ? (displayNonZero(val.points)) : (<input type="number" onChange={handleChangeNonInate} value={editNonInate[index].points} name={index + "/points"} className="" />)}</td>
                <td>{!editMode ? (displayNonZero(val.mod_divers)) : (<input type="number" onChange={handleChangeNonInate} value={editNonInate[index].mod_divers} name={index + "/mod_divers"} className="" />)}</td>
                <td>{displayNonZero(val.synergy)}</td>
            </tr>
        )
    }

    const tableLineInate = (val, index) => {
        return (
            <tr key={val.name || index}>
                <td className="cara-head">{val.name}</td>
                <td>{val.carac[0] + val.carac[1] + val.carac[2]}</td>
                <td>{val.value}</td>
                <td>{safeGetModifier(val.carac)}</td>
                <td>{!editMode ? (displayNonZero(val.points)) : (<input type="number" onChange={handleChangeInate} value={editInate[index].points} name={index + "/points"} className="" />)}</td>
                <td>{!editMode ? (displayNonZero(val.mod_divers)) : (<input type="number" onChange={handleChangeInate} value={editInate[index].mod_divers} name={index + "/divers"} className="" />)}</td>
                <td>{displayNonZero(val.synergy)}</td>
            </tr>
        )
    }

    return (
        <div>
            <h3>Compétences</h3>
            {editMode ? (
                <div>
                    <button onClick={() => { setEditMode(false) }}>Annuler</button>
                    <button onClick={handleSubmit}>Valider</button>
                </div>
            ) : (
                <button onClick={() => { setEditMode(true) }}>Modifier</button>
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
                        <tbody>
                            {character.non_inate_skills.map((val, index) => (
                                tableLineNonInate(val, index)
                            ))}
                        </tbody>
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
                        <tbody>
                            {character.inate_skills.map((val, index) => (
                                tableLineInate(val, index)
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Aucune compétence innée.</p>
                )}
            </section>
        </div>
    )
}

export default Skills