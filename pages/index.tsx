import { Checkbox, FormControlLabel } from "@mui/material";
import Participants from "../components/Participants";
import { assertConfiguration, configureAbly } from "@ably-labs/react-hooks";
import { getHistoricalMessages } from "../lib/history";
import React, { SyntheticEvent, useState } from 'react';
import Theme from "../utils/theme"
import MobilePage from "../components/pages/MobilePage";
import { BrowserView, MobileView } from "react-device-detect";
import DesktopPage from "../components/pages/DesktopPage";

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

  return (
    <ThemeProvider theme={Theme}>
    <>
      <BrowserView>
        <DesktopPage
          sendToMatching={sendToMatching}
          populateInterests={populateInterests()}
          kms={kms}
        />
      </BrowserView>
      <MobileView>
        <MobilePage
          sendToMatching={sendToMatching}
          populateInterests={populateInterests()}
          kms={kms}
        />
      </MobileView>
    </>
  </ThemeProvider>
  );
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
