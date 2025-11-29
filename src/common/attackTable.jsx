import { useEffect, useState } from "react";
import "../style/table.css"

/**
 * 
 * @param {*} attack : {
        "name": String
        "damage": int,
        "dice": String,
        "touch": int,
        "critics": String,
        "range": int,
        "description": String
      }  
 * @returns 
 */
function AttackTable({ index, del, updt, attack}) {
    const [edit, setEdit] = useState(attack.name == "")
    const [editAttack, setEditAttack] = useState(attack)

    function toggleEdit() {
        setEdit(!edit)
    }

    function handleSubmit() {
        updt(editAttack, index)
        setEdit(!edit)
    }

    function handleDelete() {
        del(index)
    }

    function cancel() {
        setEditAttack(attack)
        setEdit(!edit)
    }

    function handleChange(e) {
        const { name, value } = e.target
        let val = null 
        if (name == "damage" ||name == "touch" ||name == "range") val = parseInt(value)
        setEditAttack((prevData) => ({
            ...prevData,
            [name]: val ? val : value
        }))
    }

    return (
        <>
            <div className="line">
                <div className='attackTable '>
                    <div className="line">

                        {/* WEAPON'S NAME */}
                        {edit ? (
                            <input type="text" name="name" value={editAttack.name} onChange={handleChange} className="field-small" />
                        ) : (
                            <p className="row-name field-small">{editAttack.name}</p>
                        )}
                        {/* WEAPON'S TOUCH */}
                        {edit ? (
                            <input type="text" name="touch" value={editAttack.touch} onChange={handleChange} className="field-small" />
                        ) : (
                            <p className="field-small center">+{editAttack.touch}</p>
                        )}
                        {/* WEAPON'S DAMAGE */}
                        {edit ? (
                            <>
                                <input type="text" name="dice" value={editAttack.dice} onChange={handleChange} className="field-micro" />
                                <p>+</p>
                                <input type="text" name="damage" value={editAttack.damage} onChange={handleChange} className="field-micro" />
                            </>
                        ) : (
                            <p className="field-small">{editAttack.dice}+{editAttack.damage}</p>
                        )}
                        {/* WEAPON'S CRITICS */}
                        {edit ? (
                            <input type="text" name="critics" value={editAttack.critics} onChange={handleChange} className="field-small" />
                        ) : (
                            <p className="field-small">{editAttack.critics}</p>
                        )}
                    </div>
                    <div className="line">
                        {/* WEAPON'S RANGE */}
                        {edit ? (
                            <input type="text" name="range" value={editAttack.range} onChange={handleChange} className="field-small" />
                        ) : (
                            <p className="field-small">{editAttack.range}m</p>
                        )}{/* WEAPON'S DESCIPTION */}
                        {edit ? (
                            <input type="text" name="description" value={editAttack.description} onChange={handleChange} className="field-big" />
                        ) : (
                            <p className="field-big">{editAttack.description}</p>
                        )}
                    </div>
                </div>
                <div className="buttons-column">
                    <button onClick={edit ? handleSubmit : toggleEdit}>🖉</button>
                    <button onClick={edit ? cancel : handleDelete}>X</button>
                </div>
            </div>
        </>
    )

}

export default AttackTable;