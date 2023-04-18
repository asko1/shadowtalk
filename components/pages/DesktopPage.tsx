import { Box, Button, FormGroup, Typography } from "@mui/material";
import Head from "next/head";
import ExitButton from "../buttons/ExitButton";
import NextButton from "../buttons/NextButton";
import Articles from "../Articles";
import homeStyle from "../../styles/Home.module.css";
import Participants from "../Participants";

export default function DesktopPage(props: any) {
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
            <form onSubmit={props.sendToMatching}>
              <FormGroup>
                <Box className={homeStyle.descriptionspecific}>
                  {props.populateInterests}
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
            <ExitButton kms={props.kms} />
            <Typography variant="h5" className={homeStyle.chatname}>
              You are chatting with {props.kms}
            </Typography>
            <NextButton kms={props.kms} />
          </Box>
          <Articles channelName={props.kms} />
        </Box>
      </Box>
    </div>
  );
}
