import { useState, useEffect } from "react"

import competences from '../../assets/competences.json'
import LabelledInput from "../../common/LabelledInput"

function CharaCreaStep3({ next, submitData }) {
    const [data, setData] = useState({})
    const [compInnee, setCompInnee] = useState({})
    const [compNonInnee, setCompNonInnee] = useState({})

    useEffect(() => {

        // insert all competences in data
        for (const elt in competences["non-innees"]) {
            setCompNonInnee(prevData => ({
            ...prevData,
            [elt]: [0, competences["non-innees"][elt]]
        }))
        }
        for (const elt in competences["innees"]) {
            setCompInnee(prevData => ({
            ...prevData,
            [elt]: [0, competences["innees"][elt]]
        }))
        }

    }, [])

    function getName(field){
        return field.split(' (')[0]
    }

    function handleChangeInnees(e) {
        
        const { name, value } = e.target;
        const skill = getName(name)
        setCompInnee(prevData => ({
            ...prevData,
            [skill]: [parseInt(value) , competences["innees"][skill]]
        }));
        updateData(true)
    }
    function handleChangeNonInnees(e) {
        const { name, value } = e.target;
        const skill = getName(name)
        setCompNonInnee(prevData => ({
            ...prevData,
            [skill]: [parseInt(value) , competences["non-innees"][skill]]
        }));
        updateData(false)
    }

    function updateData(innee){
        if(innee){
            setData({
                "innees" : compInnee,
                "non-innees" : data["non-innees"]
            })
        } else {
            setData({
                "non-innees" : compNonInnee,
                "innees" : data["innees"]
            })
        }
    }

    function handleNextPage() {
        updateData(true)
        updateData(false)
        submitData("competences", data)
        next()
    }
    return (
        <>
            <h2>Étape 3 : Les compétences</h2>
            <p className="note">Répartissez vos points de compétences</p>
            <div className="line">
                <div className="half-page">
                    <h3>Compétences non-innées</h3>
                    {Object.entries(competences["non-innees"]).map(([index, val]) => (
                        <LabelledInput text={index + ' (' +val[0]+val[1]+val[2]+ ')'} inputtype="number" change={handleChangeNonInnees} textStyle="skill-text" inputStyle="skill-input"/>
                    ))}
                </div>
                <div>
                    <h3>Compétences innées</h3>
                    {Object.entries(competences["innees"]).map(([index, val]) => (
                        <LabelledInput text={index + ' (' + val + ')'} inputtype="number" change={handleChangeInnees} textStyle="skill-text" inputStyle="skill-input"/>
                    ))}
                </div>
            </div>
            <button onClick={handleNextPage} className="button-next">Page Suivante</button>
        </>
    )
}


export default CharaCreaStep3