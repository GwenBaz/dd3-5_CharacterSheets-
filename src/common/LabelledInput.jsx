function LabelledInput({text, change, textStyle='',inputtype="text", inputStyle='', name = null}){
    return (
        <>
            <div className="line">
                <p className={textStyle}>{text} : </p>
                <input 
                    onChange={change}
                    name={name ? name : text.toLowerCase()}
                    type={inputtype}
                    className={inputStyle} />

            </div>
        </>
    )
}

export default LabelledInput