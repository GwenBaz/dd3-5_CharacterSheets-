import { useState } from "react"
/**
 * 
 * @param {Character} character 
 * @returns The page with the gifts and the class an d race capacities of the character
 */
function Capacities({ character }){
    console.log(character)
    const gifts = character.gifts || []
    const other = character.other_capacities || []
    console.log(gifts, character.other_capacities)
    const [giftEdit, setGiftEdit] = useState('')
    const [otherEdit, setOtherEdit] = useState('')

    function handleChange(e){
        const {name, value} = e.target
        if(name == 'gift') setGiftEdit(value)
        else if(name == 'other') setOtherEdit(value)
    }

    function onGiftSubmit(){
        character.addGift(giftEdit)
        setGiftEdit('')
    }
    function onOtherSubmit(){
        character.addCapacity(otherEdit)
        setOtherEdit('')
    }

    return(
        <>
            <h2>Les capacités</h2>
            <p>Il est à noté que l'implementation des dons n'est pas (encore) automatique dans les autres pages</p>
            <div className="line">
                <div className="gifts">
                    <h3>Les dons : </h3>
                    {gifts.map((value, index) => (
                            <p key={index}>{value}</p>
                    ))}
                    <div className="line">
                        <input type="text" name="gift" value={giftEdit} onChange={handleChange} />    
                        <button onClick={onGiftSubmit}>Ajouter</button>
                    </div>
                </div>
                <div className="other">
                    <h3>Les capacités</h3>
                    {other.map((value, index) => (
                        <p key={index}>{value}</p>
                    ))}
                    <div className="line">
                        <input type="text" name="other" value={otherEdit} onChange={handleChange} />    
                        <button onClick={onOtherSubmit}>Ajouter</button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Capacities