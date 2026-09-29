import React from 'react'

type Props = {
  text: string
  change?: React.ChangeEventHandler<HTMLInputElement>
  textStyle?: string
  inputtype?: string
  inputStyle?: string
  name?: string | null
}

function LabelledInput({ text, change, textStyle = '', inputtype = 'text', inputStyle = '', name = null }: Props) {
  return (
    <div className="line">
      <p className={textStyle}>{text} :</p>
      <input
        onChange={change}
        name={name ? name : text.toLowerCase()}
        type={inputtype}
        className={inputStyle}
      />
    </div>
  )
}

export default LabelledInput
