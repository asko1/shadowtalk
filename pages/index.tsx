import { Box, Button, Checkbox, Container, FormControlLabel, FormGroup, Grid, Typography } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import local from "../styles/local.module.css"
import Voicechat from '../components/Voicechat';

const Home: NextPage = () => {
  return (
    <div>
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
            <Voicechat></Voicechat>
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
    </div>
  )
}

export default Home
