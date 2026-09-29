import React from 'react'
import { useNavigate } from 'react-router-dom'
import type { CreateCharacter } from '@/models/CreateCharacter'

function CharacterCard({ character }: { character: CreateCharacter }) {
  const navigate = useNavigate()

  function handleClick() {
    navigate('/sheet', {
      state: {
        character,
        fromLobby: true,
      },
    })
  }

  return (
    <div
      className={`character-card class-${(character.classe || 'guerrier').toLowerCase()}`}
      onClick={handleClick}
      role="button"
    >
      <p className="character-name">{character.name}</p>
      <p>{character.race}</p>
      <p className="character-level">{character.classe} {character.level}</p>
    </div>
  )
}

export default CharacterCard
