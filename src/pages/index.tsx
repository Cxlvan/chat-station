import Head from 'next/head'
import { useUsername } from '../contexts/UserContext'
import styles from '../styles/Home.module.css'
import {PickUsername} from '../components/PickUsername'
import { Dashboard } from '../components/Dashboard'
export default function Home() {
  // @ts-ignore
  const username = useUsername(state => state.username)
  return (
    <div className={styles.container}>
      <Head>
        <title>Moonlight - Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        username === "" ?  <PickUsername /> : (
          <Dashboard />
        )
      }
        
    </div>
  )
}