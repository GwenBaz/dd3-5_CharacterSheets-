

/**
 * The spell object shape :
 * spell{
 *   nom,
 *   niveau
 *   ecole
 *   incantation
 *   portee
 *   duree
 *   sauvegarde : [
 *     cara
 *     dd
 *   ]
 *   effet
 * }
 */
function SpellCard({ spellObj, compact = true, }) {
    const spell = spellObj
    // Classes conditionnelles
    const cardClasses = [
        'spell-card',
        compact && 'spell-card-compact'
    ].filter(Boolean).join(' ')

    return (
        <div className={cardClasses}>
            {/* Niveau du sort */}
            <div className="spell-level">
                {spell.niveau}
            </div>

            {/* Nom du sort avec couleur d'école */}
            <p className={`spell-name ${spell.ecole?.toLowerCase() || 'universelle'}`}>
                {spell.nom}
            </p>

            {/* Séparateur décoratif */}
            <div className="spell-separator"></div>

            {/* Détails du sort */}
            <div className="spell-details">
                {/* Statistiques */}
                <div className="spell-stats">
                    <p className="spell-incantation">{spell.incantation}</p>
                    <p className="spell-portee">{spell.portee}m</p>
                    <p className="spell-duree">{spell.duree}</p>
                    <p className="spell-sauvegarde">
                        {spell.sauvegarde[0]} {spell.sauvegarde[1] ? `DD ${spell.sauvegarde[1]}` : ""}
                    </p>
                </div>

                {/* Effet */}
                <div className="spell-effect">
                    <p>{spell.effet}</p>
                </div>
            </div>
        </div>
    )
}

export default SpellCard