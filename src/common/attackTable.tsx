import React, { useState } from 'react'
import '../style/table.css'

type Attack = {
  name: string
  damage: number
  dice: string
  touch: number
  critics: string
  range: number
  description: string
}

function AttackTable({ index, del, updt, attack }: { index: number; del: (i: number) => void; updt: (a: Attack, i: number) => void; attack: Attack }) {
  const [edit, setEdit] = useState<boolean>(attack.name === '')
  const [editAttack, setEditAttack] = useState<Attack>(attack)

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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    let val: any = null
    if (name === 'damage' || name === 'touch' || name === 'range') val = parseInt(value)
    setEditAttack((prevData) => ({
      ...prevData,
      [name]: val ? val : value,
    }))
  }

  return (
    <div className="line">
      <div className="attackTable ">
        <div className="line">
          {edit ? (
            <input type="text" name="name" value={editAttack.name} onChange={handleChange} className="field-small" />
          ) : (
            <p className="row-name field-small">{editAttack.name}</p>
          )}
          {edit ? (
            <input type="text" name="touch" value={String(editAttack.touch)} onChange={handleChange} className="field-small" />
          ) : (
            <p className="field-small center">+{editAttack.touch}</p>
          )}
          {edit ? (
            <>
              <input type="text" name="dice" value={editAttack.dice} onChange={handleChange} className="field-micro" />
              <p>+</p>
              <input type="text" name="damage" value={String(editAttack.damage)} onChange={handleChange} className="field-micro" />
            </>
          ) : (
            <p className="field-small">{editAttack.dice}+{editAttack.damage}</p>
          )}
          {edit ? (
            <input type="text" name="critics" value={editAttack.critics} onChange={handleChange} className="field-small" />
          ) : (
            <p className="field-small">{editAttack.critics}</p>
          )}
        </div>
        <div className="line">
          {edit ? (
            <input type="text" name="range" value={String(editAttack.range)} onChange={handleChange} className="field-small" />
          ) : (
            <p className="field-small">{editAttack.range}m</p>
          )}
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
  )
}

export default AttackTable
