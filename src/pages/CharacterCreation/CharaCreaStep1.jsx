import { useState } from "react"

import LabelledInput from "../../common/LabelledInput"
import CaracInput from "../../common/CaracInput"

import races from "../../assets/race.json"

function CharaCreaStep1({ next, submitData }) {

    const [newCapa, setNewCapa] = useState("")
    let [data, setData] = useState({
        "name": null,
        "strength": null,
        "dexerity": null,
        "constitution": null,
        "intelligence": null,
        "wisdom": null,
        "charisma": null,
        "class": null,
        "race": "elfe",
        "level": null,
        "reflex": null,
        "fortitude": null,
        "will": null,
        "class_capacities": [], 
        "attack_base" : 0, 
    })

    function handleChange(e) {
        const { name, value } = e.target;
        if (name == "capa") setNewCapa(value)
        else {
            setData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    }

    function handleSubmit() {
        if (newCapa.trim() !== "") {
            // Utiliser la syntaxe spread pour créer un nouveau tableau
            setData(prevData => ({...prevData, class_capacities : [...prevData.class_capacities, newCapa]}))
            // Réinitialiser le formulaire
            setNewCapa("")
            // Réinitialiser les inputs
            document.querySelector('input[name="capa"]').value = "";
        }
    }

    function handleNextPage() {
        submitData("bases", data)
        next()
    }


    return (
        <>
            <h2>Étape 1 : les bases</h2>
            <div>
                <LabelledInput
                    text="nom"
                    name="name"
                    textStyle=""
                    inputStyle=""
                    change={handleChange}
                />
            </div>
            <div className="section">
                <h3>Caractéristique</h3>
                <p className="note">Tirez  les caracériqtiques de votres personnages : </p>
                <CaracInput change={handleChange} name="strength" carac="Force" />
                <CaracInput change={handleChange} name="dexterity" carac="Dexterite" />
                <CaracInput change={handleChange} name="constitution" carac="Constitution" />
                <CaracInput change={handleChange} name="intelligence" carac="Intelligence" />
                <CaracInput change={handleChange} name="wisdom" carac="Sagesse" />
                <CaracInput change={handleChange} name="charisma" carac="Charisme" />
            </div>
            <div className="section">
                <h3>Race</h3>
                <p className="note">Choisissez votre races parmi celles enregistrée</p>
                <select name="race" id="race">
                    {Object.entries(races).map(([index, val]) => (
                        <option value="index" key={index}>{index}</option>
                    ))}
                </select>
            </div>
            <div className="section">
                <h3>Classe</h3>
                <p className="note">Choisissez votre classe : </p>
                <LabelledInput textStyle="text-input" inputStyle="large-input" text="Classe" name="class" change={handleChange} />
                <LabelledInput textStyle="text-input" inputStyle="small-input" text="Niveau" name='level' inputtype="number" change={handleChange} />
                <LabelledInput textStyle="text-input" inputStyle="small-input" text="Bonus d'attaque" name='attack_base' inputtype="number" change={handleChange} />
                
                <p className="note">Indiquez les valeurs des jets de sauvegarde de la classe</p>
                <LabelledInput textStyle="text-input" inputStyle="small-input" text="Réflexe" name='reflex' inputtype="number" change={handleChange} />
                <LabelledInput textStyle="text-input" inputStyle="small-input" text="Vigueur" name='fortitude' inputtype="number" change={handleChange} />
                <LabelledInput textStyle="text-input" inputStyle="small-input" text="Volonté" name='will' inputtype="number" change={handleChange} />
                <p className="note">Insérez les capacités de classes</p>
                <div>
                    <h4>Les capacités :</h4>
                    <p className="note">Liste de vos capacités de classe</p>
                    <ul>
                        {data.class_capacities.map((capa, index) => (
                            <li key={index} className="list-item">{capa}</li>
                        ))}
                    </ul>
                    <div className="line">
                        <input
                            type="text"
                            name="capa"
                            placeholder="Nom de la capacité"
                            onChange={handleChange}
                            className="list-input"
                        />
                        <button onClick={handleSubmit} className="button-add">Ajouter</button>
                    </div>
                </div>

            </div>
            <div className="">
                <button onClick={handleNextPage} className="button-next">Page suivante</button>
            </div>

        </>
    )
}


export default CharaCreaStep1