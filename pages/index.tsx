import { Box, Button, Checkbox, Container, FormControlLabel, FormGroup, Grid, Typography } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import local from "../styles/local.module.css"
import Participants from "../components/Participants";
import { configureAbly } from "@ably-labs/react-hooks";
import Articles from "../components/Articles";
import { getHistoricalMessages } from "../lib/history";

configureAbly({
  authUrl: `/api/createTokenRequest`,
});

const Home = (props: { history: any; }) => {
  console.log(process.env.NEXT_PUBLIC_HOSTNAME, process.env.NEXT_PUBLIC_VERCEL_URL, process.env.VERCEL_URL)
  console.log(process.env)
  return (
    <div>
      <Box className={styles.mainpagedivision}>
        <Box className={styles.mainpageleft}>
          <Head>
            <title>Saamesõbraks</title>
          </Head>
          <Box>
            <Typography variant='h3' sx={{ textAlign: 'center' }}>
              Welcome to Saamesõbraks
            </Typography>

            <Box >
              <Box className={styles.descriptionspecific} >
                <Button variant="contained" type="submit" >Text Chat</Button>
                <Button variant="contained" type="submit" >Voice Chat</Button>
              </Box>
              <FormGroup>
                <Box className={styles.descriptionspecific}>
                  <FormControlLabel control={<Checkbox defaultChecked sx={{ color: '#5cb567' , '&.Mui-checked':{color:'#5cb567'}}} />} label="Gaming" />
                  <FormControlLabel control={<Checkbox defaultChecked sx={{ color: '#5cb567' , '&.Mui-checked':{color:'#5cb567'}}} />} label="Music" />
                  <FormControlLabel control={<Checkbox defaultChecked sx={{ color: '#5cb567' , '&.Mui-checked':{color:'#5cb567'}}} />} label="Drawing" />
                </Box>
              </FormGroup>
            </Box>
          </Box>
        </Box>
        <Box className={styles.mainpageright}>
        <Typography variant='h3' sx={{ textAlign: 'center' }}>
              Text chat
        </Typography>
        <Box className={styles.container}>
          <h1>Realtime Chat</h1>
          <h3>Participants</h3>
            <Participants />
            <Articles history={props.history} />
        </Box>
        </Box>
      </Box>
    </div>
  )
}

export async function getStaticProps() {
  const historicalMessages = await getHistoricalMessages();

  return {
    props: {
      history: historicalMessages,
    },
    //enable ISR
    revalidate: 10,
  };
}

export default Home
