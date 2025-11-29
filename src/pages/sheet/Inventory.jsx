import { useState } from 'react'
import '../../style/inventory.css'

function Inventory({character}) {


  const [items, setItems] = useState(character.intventory) 
  const [coins, setCoins] = useState(character.getWealth())


  // Diviser l'équipement en 2 colonnes
  const leftColumn = items.filter((_, index) => index % 2 === 0)
  const rightColumn = items.filter((_, index) => index % 2 === 1)
  const maxRows = Math.max(leftColumn.length, rightColumn.length)

  return (
    <div className="inventory-container">
      {/* Section Équipement */}
      <h2>Équipement</h2>
      <table className="equipment-table">
        <thead>
          <tr>
            <th>Objet</th>
            <th>Qté</th>
            <th>Objet</th>
            <th>Qté</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: maxRows }, (_, index) => (
            <tr key={index}>
              <td>{leftColumn[index]?.name || ""}</td>
              <td>{leftColumn[index]?.quantity || ""}</td>
              <td>{rightColumn[index]?.name || ""}</td>
              <td>{rightColumn[index]?.quantity || ""}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Section Richesses */}
      <h2>Richesses</h2>
      <div className="wealth-grid">
        {/* Pièces */}
        <div className="coins-section">
          <div className="section-title">Monnaies</div>
          <div className="coins-list">
            <div className="coin-row">
              <span className="coin-label">PC (Cuivre)</span>
              <span className="coin-amount pc">{coins.cp || 0}</span>
            </div>
            <div className="coin-row">
              <span className="coin-label">PA (Argent)</span>
              <span className="coin-amount pa">{coins.sp || 0}</span>
            </div>
            <div className="coin-row">
              <span className="coin-label">PO (Or)</span>
              <span className="coin-amount po">{coins.gp || 0}</span>
            </div>
            <div className="coin-row">
              <span className="coin-label">PP (Platine)</span>
              <span className="coin-amount pp">{coins.pp || 0}</span>
            </div>
            <div className="coin-row">
              <span className="coin-label">Total (PO)</span>
              <span className="coin-amount">{coins.sum || 0}</span>
            </div>
          </div>
        </div>

        {/* Gemmes */}
        <div className="gems-section">
          <div className="section-title">Gemmes</div>
          <div className="section-content">
            {coins.gemmes ? (
              <div>{coins.gemmes}</div>
            ) : (
              <div>Aucune gemme</div>
            )}
          </div>
        </div>

        {/* Autres richesses */}
        <div className="other-section">
          <div className="section-title">Autres</div>
          <div className="section-content">
            {coins.other ? (
              <div>{coins.other}</div>
            ) : (
              <div>Objets de valeur</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Inventory