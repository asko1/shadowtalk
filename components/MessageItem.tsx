import { ListItem, Typography } from "@mui/material";
import ListItemText from '@mui/material/ListItemText';
import styles from '../styles/Home.module.css';


export default function MessageItem({index, headline}: any) {
    return(
        <div>
            <ListItem className={styles.scroller}>
                <ListItemText
                primary={headline.data.author}
                secondary={
                    <Typography
                    component="span">
                        {headline.data.text}
                    </Typography>
                }>
                </ListItemText>
            </ListItem>
        </div>
    )
}