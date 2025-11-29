import { useNavigate } from "react-router-dom"
import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";
import { Character } from "../utils/characters.util"

import CharacterCard from "../common/CharacterCard"
import "../style/App.css"

function Lobby() {
    const [characters, setCharacters] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        invoke("get_all_characters")
            .then(api_character => {
                let obj_characters = []
                for(const i in api_character){
                    obj_characters.push(new Character(api_character[i]))
                }
                setCharacters(obj_characters || []) // assert data is an array 
                setLoading(false)         // display the page
            })
    }, [])

    const navigate = useNavigate()

    function handleCharaCreation() {
        navigate("/character-creation")
    }

    return (
        loading ? (
            <p>Loading...</p>
        ) : (
            <div className="lobby-container parchment-effect">
                <h1>D&D 3.5 Fiches de personnages</h1>

                <h2>Personnages déjà créés :</h2>

                <div className="characters-grid">
                    {characters.map((chara, index) => (
                        <CharacterCard
                            key={index}
                            character={chara}
                        />
                    ))}
                </div>

                <button
                    className="create-button"
                    onClick={handleCharaCreation}
                >
                    Créer un personnage
                </button>
            </div>)
    )
}

export default Lobby