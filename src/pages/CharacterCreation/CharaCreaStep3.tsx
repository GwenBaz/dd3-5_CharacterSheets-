import React, { useEffect, useState } from 'react'
import competences from '@/assets/competences.json'
import LabelledInput from '@/common/LabelledInput'

function CharaCreaStep3({ next, submitData }: { next: () => void; submitData: (k: string, d: any) => void }) {
  const [data, setData] = useState<any>({})
  const [compInnee, setCompInnee] = useState<any>({})
  const [compNonInnee, setCompNonInnee] = useState<any>({})

  useEffect(() => {
    for (const elt in (competences as any)['non-innees']) {
      setCompNonInnee((prevData: any) => ({ ...prevData, [elt]: [0, (competences as any)['non-innees'][elt]] }))
    }
    for (const elt in (competences as any)['innees']) {
      setCompInnee((prevData: any) => ({ ...prevData, [elt]: [0, (competences as any)['innees'][elt]] }))
    }
  }, [])

  function getName(field: string) {
    return field.split(' (')[0]
  }

  function handleChangeInnees(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    const skill = getName(name)
    setCompInnee((prevData: any) => ({ ...prevData, [skill]: [parseInt(value), (competences as any)['innees'][skill]] }))
    updateData(true)
  }

  function handleChangeNonInnees(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    const skill = getName(name)
    setCompNonInnee((prevData: any) => ({ ...prevData, [skill]: [parseInt(value), (competences as any)['non-innees'][skill]] }))
    updateData(false)
  }

  function updateData(innee: boolean) {
    if (innee) {
      setData({ innees: compInnee, 'non-innees': data['non-innees'] })
    } else {
      setData({ 'non-innees': compNonInnee, innees: data['innees'] })
    }
  }

  function handleNextPage() {
    updateData(true)
    updateData(false)
    submitData('competences', data)
    next()
  }

  return (
    <>
      <h2>Étape 3 : Les compétences</h2>
      <p className="note">Répartissez vos points de compétences</p>
      <div className="line">
        <div className="half-page">
          <h3>Compétences non-innées</h3>
          {(Object.entries((competences as any)['non-innees']) as [string, any][]).map(([index, val]) => (
            <LabelledInput key={index} text={index + ' (' + val[0] + val[1] + val[2] + ')'} inputtype="number" change={handleChangeNonInnees} textStyle="skill-text" inputStyle="skill-input" />
          ))}
        </div>
        <div>
          <h3>Compétences innées</h3>
          {(Object.entries((competences as any)['innees']) as [string, any][]).map(([index, val]) => (
            <LabelledInput key={index} text={index + ' (' + val + ')'} inputtype="number" change={handleChangeInnees} textStyle="skill-text" inputStyle="skill-input" />
          ))}
        </div>
      </div>
      <button onClick={handleNextPage} className="button-next">
        Page Suivante
      </button>
    </>
  )
}

export default CharaCreaStep3
