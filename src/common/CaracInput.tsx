import React, { useState } from 'react'
import '../style/characterCreation.css'

type Props = {
  carac: string
  change?: React.ChangeEventHandler<HTMLInputElement>
  name?: string
}

function CaracInput({ carac, change, name }: Props) {
  const [mod, setMod] = useState<number | ''>('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.valueAsNumber
    if (!Number.isNaN(value)) setMod(Math.round((value - 11) / 2))
    change?.(e)
  }

  return (
    <div className="cara-input line">
      <p className="name">{carac} :</p>
      <input type="number" onChange={handleChange} name={name} />
      <p className="mod">mod : {mod}</p>
    </div>
  )
}

export default CaracInput
