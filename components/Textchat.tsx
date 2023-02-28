import { Box, Typography } from "@mui/material";
import Articles from "./Articles";
import Participants from "./Participants";
import styles from "../styles/Home.module.css";

export default function Textchat() {
    return (
        <Box>
            <Typography variant='h3' sx={{ textAlign: 'center' }}>
                Text chat
            </Typography>
            <Box className={styles.container}>
                <h3>Participants</h3>
                {/*<Participants />
                //<Articles/>*/}
            </Box>
        </Box>
    )
}