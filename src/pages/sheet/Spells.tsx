import React from 'react'
import SpellCard from '@/common/SpellCard'
import '@/style/spell.css'

import spells from '@/assets/someSpells.json'

function Spells(): React.ReactElement {
  return (
    <>
      <h2>Page des Sortillèges</h2>
      <div className="line">
        <p>Trier par: </p>
        <select name="sort" id="sort">
          <option value="level">Niveau</option>
          <option value="name">Nom</option>
        </select>
        <button>Ajouter un sort</button>
      </div>
      <div className="spell-list">
        {spells.map((spell: any, index: number) => (
          <SpellCard spellObj={spell} key={index} />
        ))}
      </div>
    </>
  )
}

export default Spells
