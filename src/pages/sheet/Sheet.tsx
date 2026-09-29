import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '@/style/sheet.css'

import Stats from './Stats'
import Inventory from './Inventory'
import Spells from './Spells'
import Capacities from './Capacities'
import Skills from './Skills'

import { Character } from '@/utils/characters.util'

function Sheet(): React.ReactElement {
  const location = useLocation()
  const navigate = useNavigate()

  const [character, setCharacter] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState<'stats' | 'skills' | 'inventory' | 'capacities' | 'spells'>('stats')

  useEffect(() => {
    if ((location as any).state?.character) {
      setCharacter(new Character((location as any).state.character))
      setLoading(false)
      return
    }
  }, [location])

  const changeTo = (pageName: any) => {
    setCurrentPage(pageName)
  }

  return (
    <div className="sheet-container parchment-effect">
      <nav>
        <ul>
          <a onClick={() => { changeTo('stats') }}>Statistiques</a>
          <a onClick={() => { changeTo('skills') }}>Skills</a>
          <a onClick={() => { changeTo('inventory') }}>Inventaire</a>
          <a onClick={() => { changeTo('capacities') }}>Capacités</a>
          <a onClick={() => { changeTo('spells') }}>Sorts</a>
          <a onClick={() => navigate('/')} className="quit">Quitter</a>
        </ul>
      </nav>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div className="sheet-content">
          {currentPage === 'stats' && <Stats character={character} />}
          {currentPage === 'spells' && <Spells />}
          {currentPage === 'inventory' && <Inventory character={character} />}
          {currentPage === 'capacities' && <Capacities character={character} />}
          {currentPage === 'skills' && <Skills character={character} />}
        </div>
      )}
    </div>
  )
}

export default Sheet
