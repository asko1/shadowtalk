import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import Head from "next/head";
import homeStyle from "../styles/Home.module.css";
import Participants from "../components/Participants";
import { assertConfiguration, configureAbly } from "@ably-labs/react-hooks";
import Articles from "../components/Articles";
import { getHistoricalMessages } from "../lib/history";
import React, { SyntheticEvent, useState } from "react";
import MobileView from "../components/MobileView";
import { isMobile } from "react-device-detect";
import NextButton from "../components/buttons/NextButton";

configureAbly({
  authUrl: `${
    process.env.NEXT_PUBLIC_URL || process.env.NEXT_PUBLIC_HOSTNAME
  }/api/createTokenRequest`,
});

const ably = assertConfiguration();
const interests = [
  "Gaming",
  "Music",
  "Art",
  "Sports",
  "Technology",
  "Cooking",
  "Traveling",
];

const Home = (props: { history: any }) => {
  const [kms, setKms] = useState("");
  const test = <Participants channelName={kms} />;

  let formInterests: { [key: string]: any } = [];
  interests.map((interest) => {
    formInterests[interests.indexOf(interest)] = false;
  });
  const [formData, setFormData] = useState(formInterests);

  function populateInterests() {
    const interestElements: JSX.Element[] = [];
    interests.map((interest, key) => {
      interestElements.push(
        <FormControlLabel
          control={<Checkbox />}
          label={interest}
          name={interest}
          key={key}
          onChange={onChange}
          sx={{ color: "#5cb567", "&.Mui-checked": { color: "#5cb567" } }}
        />
      );
    });
    return interestElements;
  }

  function onChange(event: SyntheticEvent<Element, Event>) {
    let newFormData = { ...formData };
    // @ts-ignore
    newFormData[interests.indexOf(event.target.name)] = event.target.checked;
    setFormData(newFormData);
  }

  async function sendToMatching(event: { preventDefault: () => void }) {
    let stuff: any = {};
    stuff[`${ably.auth.clientId}`] = Object.values(formData);
    //{`${ably.auth.clientId}` = Object.values(formData)}

    console.log(stuff, "stuff");
    event.preventDefault();
    const res = await fetch("/api/matching", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stuff),
    });

    if (res.status === 201) {
      const body = await res.json();
      console.log(body.channel as string);
      setKms(body.channel as string);
    }
    if (res.status === 200) {
      const body = await res.json();
      console.log(body.channel as string);
      setKms(body.channel as string);
    }
  }
  if (isMobile) {
    return (
      <MobileView
        sendToMatching={sendToMatching}
        populateInterests={populateInterests()}
        kms={kms}
      />
    );
  } else {
    return (
      <div>
        <Box className={homeStyle.mainpagedivision}>
          <Box className={homeStyle.mainpageleft}>
            <Head>
              <title>Shadowtalk</title>
            </Head>
            <Box>
              <Typography
                variant="h3"
                sx={{ textAlign: "center", fontFamily: "Nunito Sans" }}
              >
                <b>Find a friend for life!</b>
              </Typography>
              <form onSubmit={sendToMatching}>
                <FormGroup>
                  <Box className={homeStyle.descriptionspecific}>
                    {populateInterests()}
                  </Box>
                </FormGroup>
                <Box className={homeStyle.descriptionspecific}>
                  <Button variant="contained" type="submit">
                    Text Chat
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ bgcolor: "#00cc00" }}
                  >
                    Voice Chat
                  </Button>
                </Box>
              </form>
              Currently online:
              <Participants channelName="" />
            </Box>
          </Box>
          <Box className={homeStyle.mainpageright}>
            <Box className={homeStyle.topBar}>
              <Typography variant="h5" className={homeStyle.chatname}>
                You are chatting with {kms}
              </Typography>
              <NextButton />
            </Box>
            <Articles channelName={kms} />
          </Box>
        </Box>
      </div>
    );
  }
};

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

export default Home;
