import Head from 'next/head'
import LinkList from '../components/LinkList'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>List</title>
      </Head>

      <main>
        <LinkList />
      </main>
    </div>

  )
}
