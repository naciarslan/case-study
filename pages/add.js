import Head from 'next/head'
import AddLink from '../components/AddLink'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Add</title>
      </Head>
      <main>
        <AddLink />
      </main>
    </div>
  )
}
