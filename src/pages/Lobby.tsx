import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { invoke } from '@tauri-apps/api/core'
import { Character } from '@/utils/characters.util'

import CharacterCard from '@/common/CharacterCard'
import '@/style/App.css'

function Lobby(): React.ReactElement {
  const [characters, setCharacters] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    invoke('get_all_characters').then((api_character: any) => {
      const obj_characters: any[] = []
      for (const i in api_character) {
        obj_characters.push(new Character(api_character[i]))
      }
      setCharacters(obj_characters || [])
      setLoading(false)
    })
  }, [])

  function handleCharaCreation() {
    navigate('/character-creation')
  }

  return loading ? (
    <p>Loading...</p>
  ) : (
    <div className="lobby-container parchment-effect">
      <h1>D&D 3.5 Fiches de personnages</h1>
      <h2>Personnages déjà créés :</h2>
      <div className="characters-grid">
        {characters.map((chara, index) => (
          <CharacterCard key={index} character={chara} />
        ))}
      </div>
      <button className="create-button" onClick={handleCharaCreation}>
        Créer un personnage
      </button>
    </div>
  )
}

export default Lobby
