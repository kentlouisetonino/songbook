import Head from 'next/head'

interface Props {
  title?: string
}

export default function Header({ title }: Props) {
  return (
    <Head>
      <link rel='shortcut icon' href='head.ico' />
      <title>{title}</title>
    </Head>
  )
}
