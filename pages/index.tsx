import { Box, Button, Checkbox, Container, FormControlLabel, FormGroup, Grid, Typography, FormControl } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import local from "../styles/local.module.css"
import Participants from "../components/Participants";
import { assertConfiguration, configureAbly } from "@ably-labs/react-hooks";
import Articles from "../components/Articles";
import { getHistoricalMessages } from "../lib/history";
import Voicechat from '../components/Voicechat';
import React, { SyntheticEvent, useState } from 'react';

configureAbly({
  authUrl: `${process.env.NEXT_PUBLIC_HOSTNAME || 'https://' + process.env.VERCEL_URL}/api/createTokenRequest`,
});

const ably = assertConfiguration();
const interests = ["Gaming", "Music", "Drawing"]

const Home = (props: {history: any}) => {
  const [kms, setKms] = useState('waitNO')
  const test = <Participants channelName={kms}/>

  let formInterests: {[key: string]: any} = []
  interests.map((interest) => {    
    formInterests[interests.indexOf(interest)] = false
  })
  const [formData, setFormData] = useState(formInterests)

  function populateInterests() {
    const interestElements: JSX.Element[] = []
    interests.map((interest, key) => {
      interestElements.push(
        <FormControlLabel
          control={<Checkbox />}
          label={interest}
          name={interest}
          key={key}
          onChange={onChange}
          sx={{ color: '#5cb567' , '&.Mui-checked':{color:'#5cb567'}}}
        />
      )
    })
    return interestElements
  }

  function onChange(event: SyntheticEvent<Element, Event>) {
    let newFormData = {...formData}
    // @ts-ignore
    newFormData[interests.indexOf(event.target.name)] = event.target.checked
    setFormData(newFormData)
  }
  
  async function sendToMatching(event: { preventDefault: () => void; }) {
    const stuff = {
      interests: formData,
      userId: ably.auth.clientId
    }
    console.log(stuff)
    event.preventDefault()
    console.log(formData)
    const res = await fetch('/api/matching', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(stuff)
    })

    if (res.status === 201) {
      const body = await res.json()
      console.log(body.channel as string)
      setKms(body.channel as string)
    }
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
              Find a friend!
            </Typography>
            <form onSubmit={sendToMatching}>
              <Box className={styles.descriptionspecific} >
                <Button variant="contained" type="submit" >Text Chat</Button>
                <Button variant="contained" type="submit" >Voice Chat</Button>
                <Voicechat></Voicechat>
              </Box>
              <FormGroup>
                <Box className={styles.descriptionspecific}>
                  {populateInterests()}
                </Box>
              </FormGroup>
            </form>
              
              <Participants channelName='waiting' />
              <Articles channelName='waiting' />
          </Box>
        </Box>
        <Box className={styles.mainpageright}>
          <Participants channelName={kms} />
          <Articles channelName={kms} />
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
