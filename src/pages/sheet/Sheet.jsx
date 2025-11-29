import { useEffect, useState } from "react"
import { useLocation, useNavigate } from 'react-router-dom'
import "../../style/sheet.css"

import Stats from "./Stats.jsx"
import Inventory from "./Inventory.jsx"
import Spells from "./Spells.jsx"
import Capacities from "./Capacities.jsx"
import Skills from "./Skills.jsx"

import { Character } from "../../utils/characters.util.js"


function Sheet() {
    const location = useLocation()
    const navigate = useNavigate()

    const [character, setCharacter] = useState(null)
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState("stats")

    useEffect(() => {
        if (location.state?.character) {
            setCharacter(new Character(location.state.character))
            setLoading(false)
            // console.log(location.state.character)
            return;
        }
    }, [])

    const changeTo = (pageName) => {
        setCurrentPage(pageName)
    }

    return (
        <div className="sheet-container parchment-effect">
            <nav>
                <ul>
                    <a
                        onClick={() => { changeTo('stats') }}
                    >Statistiques</a>
                    <a
                        onClick={() => { changeTo('skills') }}
                    >Skills</a>
                    <a
                        onClick={() => { changeTo('inventory') }}
                    >Inventaire</a>
                    <a
                        onClick={() => { changeTo('capacities') }}
                    >Capacités</a>
                    <a
                        onClick={() => { changeTo('spells') }}
                    >Sorts</a>
                    <a 
                        onClick={() => navigate('/')}
                        className="quit"
                    >Quitter</a>
                </ul>
            </nav>
            {loading ? (
                <p>Chargement...</p>
            ) : (
                <div className="sheet-content">
                    {currentPage === "stats" && <Stats character={character} />}
                    {currentPage === "spells" && <Spells />}
                    {currentPage === "inventory" && <Inventory character={character} />}
                    {currentPage === "capacities" && <Capacities character={character}/>}
                    {currentPage === "skills" && <Skills character={character} />}
                </div>
            )}
        </div>
    )
}

export default Sheet