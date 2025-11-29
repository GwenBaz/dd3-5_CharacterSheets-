import { useNavigate } from "react-router-dom"

function CharacterCard({character}) {
    // console.log(character)
    const navigate = useNavigate()
    function handleClick() {
        navigate('/sheet', {
            state: {
                character: character,
                fromLobby: true
            }
        })
        
    }

    return (
        <>
            <div
                className={`character-card class-${character["class"]?.toLowerCase() || 'guerrier'}`}
                onClick={handleClick}
                role="button"
            >
                <p className="character-name">{character.name}</p>
                <p className="">{character.race}</p>
                <p className="character-level">{character["class"]} {character.level}</p>
            </div>
        </>
    )
}

export default CharacterCard