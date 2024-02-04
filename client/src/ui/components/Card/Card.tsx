interface Props {
  title: string;
  content: string;
  link: string;
  linkName: string;
}

export default function Card({ title, content, link, linkName }: Props) {
  return (
    <div className='card text-center my-5' style={{ width: '45%' }}>
      <div className='card-body my-5'>
        <h5 className='card-title fw-bold'>{title}</h5>
        <p className='card-text fst-italic fw-lighter'>{content}</p>
        <a href={link} className='btn btn-secondary w-50'>
          {linkName}
        </a>
      </div>
    </div>
  );
}
