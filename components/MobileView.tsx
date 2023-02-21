import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Container, FormGroup, Typography } from "@mui/material";
import { useState } from "react";
import mobile from "../styles/mobile.module.css";
import Articles from "./Articles";

export default function MobileView(props: any) {
    
    return(
        <Container>
            <Box className={mobile.mainpage}>
                <Accordion 
                className={mobile.accordion}
                >
                    <AccordionSummary className={mobile.accordionSummary}>
                    <Typography variant='h4' sx={{ textAlign: 'center', fontFamily: 'Nunito Sans'}}>
                        <b>Find a friend for life!</b>
                    </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <form onSubmit={props.sendToMatching}>
                            <Box className={mobile.descriptionspecific} >
                                <Button 
                                variant="contained" 
                                type="submit"
                                >Text Chat</Button>
                                <Button 
                                variant="contained" 
                                type="submit" 
                                sx={{bgcolor: '#00cc00'}} 
                                >Voice Chat</Button>
                            </Box>
                            <FormGroup>
                                <Box className={mobile.descriptionspecific}>
                                {props.populateInterests}
                                </Box>
                            </FormGroup>
                        </form>      
                    </AccordionDetails>    
                </Accordion>
                <Box>
            <Typography variant='h5'>
              You are chatting with {props.kms}
            </Typography>
            <Articles channelName={props.kms} />
          </Box>
            </Box>
        </Container>
    )
}