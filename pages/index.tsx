import { Box, Button, Checkbox, FormControlLabel, FormGroup, Typography, } from '@mui/material'
import Head from 'next/head'
import homeStyles from '../styles/Home.module.css'
import Participants from "../components/Participants";
import { assertConfiguration, configureAbly } from "@ably-labs/react-hooks";
import Articles from "../components/Articles";
import { getHistoricalMessages } from "../lib/history";
import React, { SyntheticEvent, useState } from 'react';
import Theme from "../utils/theme"
import MobileView from '../components/MobileView';
import { isMobile } from 'react-device-detect';

configureAbly({
  authUrl: `${process.env.NEXT_PUBLIC_URL || process.env.NEXT_PUBLIC_HOSTNAME}/api/createTokenRequest`,
});

const ably = assertConfiguration();
const interests = ["Gaming", "Music", "Drawing"]

const Home = (props: {history: any}) => {
  const [kms, setKms] = useState('')
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
        <ThemeProvider theme={Theme}>
          <FormControlLabel
            control={<Checkbox />}
            label={interest}
            name={interest}
            key={key}
            onChange={onChange}
            sx={{ color: '#5cb567' , '&.Mui-checked':{color:'primary'}}}
          />
        </ThemeProvider>
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
    let stuff: any = {}
    stuff[`${ably.auth.clientId}`] = Object.values(formData)
      //{`${ably.auth.clientId}` = Object.values(formData)}
    
    console.log(stuff, 'stuff')
    event.preventDefault()
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
    if (res.status === 200) {
      const body = await res.json()
      console.log(body.channel as string)
      setKms(body.channel as string)
    }
  }
  if(isMobile){
    return(
      <MobileView
      sendToMatching={sendToMatching} 
      populateInterests={populateInterests()}
      kms={kms}
      />

    )
  } else {
  return (
    <ThemeProvider theme={Theme}>
      <div>
        <Box className={styles.mainpagedivision}>
          <Box className={styles.mainpageleft}>
            <Head>
              <title>Saamesõbraks</title>
            </Head>
            <Box>
              <Typography variant='h3' sx={{ textAlign: 'center', fontFamily: 'Nunito Sans'}}>
                <b>Find a friend for life!</b>
              </Typography>
              <form onSubmit={sendToMatching}>
                <Box className={homeStyles.descriptionspecific} >
                  <Button variant="contained" type="submit" >Text Chat</Button>
                  <Button variant="contained" type="submit" sx={{bgcolor: '#00cc00'}} >Voice Chat</Button>
                </Box>
                <FormGroup>
                  <Box className={homeStyles.descriptionspecific}>
                    {populateInterests()}
                  </Box>
                </FormGroup>
              </form>
                <Participants channelName='waiting - ' />
            </Box>
          </Box>
          <Box className={homeStyles.mainpageright}>
            <Typography variant='h5' className={homeStyles.chatname}>
              You are chatting with {kms}
            </Typography>
            <Articles channelName={kms} />
          </Box>
        </Box>
    </div>
    </ThemeProvider>
  )
  }
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