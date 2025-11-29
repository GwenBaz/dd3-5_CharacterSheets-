import { useState } from "react";
import "../style/characterCreation.css"

function CaracInput({carac, change, name}) {
    const [mod, setMod] = useState("")
    function handleChange(e){
        const value = e.target.valueAsNumber;
        setMod(Math.round((value - 11)/2))
        change(e)
    }
    return (
        <>
            <div className="cara-input line">
                <p className="name">{carac} : </p>
                <input 
                    type="number"
                    onChange={handleChange}
                    name={name}
                 />
                 <p className="mod">mod : {mod}</p>
            </div>
        </>
    )
}

export default CaracInput