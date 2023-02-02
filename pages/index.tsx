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

const interests = ["Gaming", "Music", "Drawing"]

const Home = (props: {history: any}) => {
  function populateInterests() {
    const interestElements: JSX.Element[] = []
    interests.map((interest, key) => {
      interestElements.push(
        <FormControlLabel
          control={<Checkbox />}
          label={interest}
          key={key}
          sx={{ color: '#5cb567' , '&.Mui-checked':{color:'#5cb567'}}}
        />
      )
    })
    return interestElements
  }
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

              <Box className={styles.descriptionspecific} >
                <Button variant="contained" type="submit" >Text Chat</Button>
                <Button variant="contained" type="submit" >Voice Chat</Button>
              </Box>
              <FormGroup>
                <Box className={styles.descriptionspecific}>
                  {populateInterests()}
                </Box>
              </FormGroup>
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
