import { useState, useEffect } from "react"

function CharaCreaStep2({ level, next, submitData }) {
  const [data, setData] = useState([])

  useEffect(() => {
    // initialise un tableau de champs vides
    setData(Array(2 + Math.round(level / 3)).fill(""))
  }, []) 

  function handleChange(e, index) {
    const { value } = e.target
    setData(prevData => {
      const newData = [...prevData]
      newData[index] = value
      return newData
    })
  }

  function handleNextPage() {
    submitData("gifts", data) // data est directement une liste
    next()
  }

  return (
    <>
      <h2>Étape 3 : les dons</h2>
      <div>
        <p className="note">
          Ajoutez des dons (2 au niveau 1 + 1 / 3 niveau)
        </p>
        {data.map((val, i) => (
          <div className="line" key={i}>
            <input
              type="text"
              value={val}
              onChange={e => handleChange(e, i)}
              className="gift-input"
            />
          </div>
        ))}
      </div>
      <button onClick={handleNextPage} className="button-next">Page suivante</button>
    </>
  )
}

export default CharaCreaStep2
