import { Grid } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import local from "../styles/local.module.css"

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Saamesõbraks</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Saamesõbraks
        </h1>
        <div className={local.containerspecific}>
          <form>
            <div className={styles.description}>
              <label>Gaming</label>
              <input type="checkbox" value="Gaming"></input> 
            </div>
            <Grid container spacing={8}>
              <Grid item xs={6}>
                <input className={local.gridspecific} type="submit" value="Text Channel"></input>
              </Grid>
              <Grid item xs={6}>
                <input className={local.gridspecific} type="submit" value="Voice Channel"></input> 
              </Grid>
            </Grid>
          </form>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
