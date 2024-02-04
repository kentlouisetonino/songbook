import { Fragment } from 'react';

interface Props {
  label: string;
  placeholder: string;
  value?: string;
  onChange?: any;
}

export default function TextAreaField({
  label,
  placeholder,
  value,
  onChange
}: Props) {
  return (
    <Fragment>
      <label className='form-label fw-bold'>{label}</label>
      <textarea
        name='ingredients'
        className='form-control shadow-none'
        placeholder={placeholder}
        rows={15}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Fragment>
  );
}
