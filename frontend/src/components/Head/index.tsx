import Head from 'next/head'

type Props = {
  title?: string
}

const Header = ({ title }: Props) => {
  return (
    <Head>
      <link rel='shortcut icon' href='head.ico' />
      <title>{title}</title>
    </Head>
  )
}

export default Header
