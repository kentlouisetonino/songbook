import styles from './index.module.css'

interface Props {
  title: string
  content: string
}

export default function Jumbotron({ title, content }: Props) {
  return (
    <div className='container-fluid py-5 bg-dark text-white text-center align-items-center mx-auto justify-content-center mt-4'>
      <h1 className='display-5 fw-bold'>{title}</h1>
      <p className={`display-5 fs-6 fw-lighter ${styles.jumbotronParagraph}`}>
        {content}
      </p>
    </div>
  )
}

