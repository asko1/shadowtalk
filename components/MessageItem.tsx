import { ListItem, Typography } from "@mui/material";
import ListItemText from '@mui/material/ListItemText';


export default function MessageItem({index, headline}: any) {
    return(
        <ListItem>
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
    )
}