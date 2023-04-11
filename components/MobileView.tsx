import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { isMobile } from "react-device-detect";
import mobileStyle from "../styles/mobile.module.css";
import Articles from "./Articles";
import NextButton from "./buttons/NextButton";

export default function MobileView(props: any) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div>
      <Box className={mobileStyle.mainpage}>
        <Accordion className={mobileStyle.accordion} expanded={expanded}>
          <AccordionSummary
            className={mobileStyle.accordionSummary}
            onClick={() => setExpanded(!expanded)}
          >
            <Typography
              variant="h4"
              sx={{ textAlign: "center", fontFamily: "Nunito Sans" }}
            >
              <b>Find a friend for life!</b>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <form onSubmit={props.sendToMatching}>
              <Box className={mobileStyle.descriptionspecific}>
                <Button
                  variant="contained"
                  type="submit"
                  onClick={() => setExpanded(!expanded)}
                >
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
              <FormGroup>
                <Box className={mobileStyle.descriptionspecific}>
                  {props.populateInterests}
                </Box>
              </FormGroup>
            </form>
          </AccordionDetails>
        </Accordion>
        <Box>
          <Box className={mobileStyle.topBar}>
            <Typography variant="h5" className={mobileStyle.chatname}>
              You are chatting with {props.kms}
            </Typography>
            <NextButton />
          </Box>
          <Articles channelName={props.kms} />
        </Box>
      </Box>
    </div>
  );
}
