import { ListItem, Typography } from "@mui/material";
import ListItemText from '@mui/material/ListItemText';
import styles from "../styles/Home.module.css";


export default function MessageItem({index, headline}: any) {
    return(
        <div>
            <ListItem>
                <ListItemText
                primary={
                    <div>
                    <b>{headline.data.author}</b>   <text>{headline.data.timestamp}</text>
                    </div>
                }
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