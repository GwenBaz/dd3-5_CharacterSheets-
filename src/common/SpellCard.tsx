import React from 'react'

type Spell = {
  nom: string
  niveau?: number | string
  ecole?: string
  incantation?: string
  portee?: number
  duree?: string
  sauvegarde?: (string | number)[]
  effet?: string
}

function SpellCard({ spellObj, compact = true }: { spellObj: Spell; compact?: boolean }) {
  const spell = spellObj
  const cardClasses = ['spell-card', compact && 'spell-card-compact'].filter(Boolean).join(' ')

  return (
    <div className={cardClasses}>
      <div className="spell-level">{spell.niveau}</div>
      <p className={`spell-name ${spell.ecole?.toLowerCase() || 'universelle'}`}>{spell.nom}</p>
      <div className="spell-separator" />
      <div className="spell-details">
        <div className="spell-stats">
          <p className="spell-incantation">{spell.incantation}</p>
          <p className="spell-portee">{spell.portee}m</p>
          <p className="spell-duree">{spell.duree}</p>
          <p className="spell-sauvegarde">{spell.sauvegarde?.[0]} {spell.sauvegarde?.[1] ? `DD ${spell.sauvegarde?.[1]}` : ''}</p>
        </div>
        <div className="spell-effect">
          <p>{spell.effet}</p>
        </div>
      </div>
    </div>
  )
}

export default SpellCard
