import {
  Box,
  Button,
  FormGroup,
  ThemeProvider,
  Typography,
} from "@mui/material";
import Head from "next/head";
import ExitButton from "../buttons/ExitButton";
import NextButton from "../buttons/NextButton";
import Articles from "../Articles";
import homeStyle from "../../styles/Home.module.css";
import Participants from "../Participants";
import Theme from "../../utils/theme";

export default function DesktopPage(props: any) {
  return (
    <ThemeProvider theme={Theme}>
        <Box
          className={homeStyle.mainpagedivision}
          sx={{ bgcolor: "Background.paper" }}
        >
          <Box
            className={homeStyle.mainpageleft}
            sx={{ bgcolor: "Background.paper" }}
          >
            <Head>
              <title>Shadowtalk</title>
            </Head>
            <Box>
              <Typography
                variant="h4"
                sx={{
                  textAlign: "center",
                  fontFamily: "typography.fontFamily",
                }}
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
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      bgcolor: "primary.main",
                      "&:hover": { bgcolor: "primary.dark" },
                    }}
                  >
                    Text Chat
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      bgcolor: "secondary.main",
                      "&:hover": { bgcolor: "secondary.dark" },
                    }}
                  >
                    Voice Chat
                  </Button>
                </Box>
              </form>
              <Typography variant="h6" className={homeStyle.curOnline}>
                <b>Currently online:</b>
              </Typography>
              <Participants channelName="| " />
            </Box>
          </Box>
          <Box
            className={homeStyle.mainpageright}
            sx={{ bgcolor: "background.default" }}
          >
            <Box className={homeStyle.topBar}>
              <ExitButton kms={props.kms} />
              <Typography variant="h6" className={homeStyle.chatname}>
                You are chatting with {props.kms}
              </Typography>
              <NextButton kms={props.kms} />
            </Box>
            <Articles channelName={props.kms} />
          </Box>
        </Box>
    </ThemeProvider>
  );
}
