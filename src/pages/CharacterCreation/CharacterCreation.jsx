import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

import { Character } from "../../utils/characters.util"

import CharaCreaStep1 from "./CharaCreaStep1"
import CharaCreaStep2 from "./CharaCreaStep2"
import CharaCreaStep3 from "./CharaCreaStep3"
import CharaCreaStep4 from "./CharaCreaStep4"
import CharaCreaStep5 from "./CharaCreaStep5"
import CharaCreaStep6 from "./CharaCreaStep6"

import "../../style/characterCreation.css"

function CharacterCreation() {
    const navigate = useNavigate()
    const [currStep, setCurrStep] = useState(1)
    const [formData, setFormData] = useState({
        "bases": null,
        "gifts": null,
        "competences": null,
        "possessions": null,
        "combat": null,
        "sorts": null
    })
    const chara = new Character()

    useEffect(() => {
        // Vérifie si toutes les données sont remplies
        if (formData.sorts !== null) {
            console.log(formData)
            chara.createFromRaw(formData)
            console.log("classe character crée")
            chara.save()
            alert("Le personnage " + formData.bases.nom + " a été créé avec succès")
            navigate("/")
        }
    }, [formData.sorts]) // Se déclenche quand 'sorts' change


    function updateFormData(step, data) {
        setFormData(prev => ({
            ...prev,
            [step]: data
        }));
    };


    function next() {
        setCurrStep(currStep + 1)

    }
    return (

        <>
            <div className="creation-container parchment-effect">
                <a
                    onClick={() => navigate('/')}
                    className="quit"
                >Quitter</a>
                <button></button>
                <h2>Création de personnage</h2>

                {currStep == 1 && <CharaCreaStep1 next={next} submitData={updateFormData} /> ||
                    currStep == 2 && <CharaCreaStep2 next={next} submitData={updateFormData} level={formData.bases.level} /> ||
                    currStep == 3 && <CharaCreaStep3 next={next} submitData={updateFormData} /> ||
                    currStep == 4 && <CharaCreaStep4 next={next} submitData={updateFormData} /> ||
                    currStep == 5 && <CharaCreaStep5 next={next} submitData={updateFormData} /> ||
                    currStep == 6 && <CharaCreaStep6 next={next} submitData={updateFormData} />
                }
            </div>
        </>
    )
}

export default CharacterCreation