type Props = {
  label: string
  type: string
  placeholder: string
  value?: string
  onChange?: any
  domId?: string
}

const InputField = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  domId,
}: Props) => {
  return (
    <>
      <label className='form-label fw-bold'>{label}</label>
      {type === 'password' ? (
        <input
          type={type}
          className='form-control shadow-none'
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          id={domId}
        />
      ) : (
        <input
          type={type}
          className='form-control shadow-none'
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </>
  )
}

export default InputField
