import List from "@mui/material/List"
import styles from "../styles/Home.module.css"
import MessageItem from "./MessageItem"

export default function Chatbox() {
    return(
        <div className={styles.container}>
            <div className={styles.textInput}>
                <input type="text" name="Message" id="textInput" />
                <input type="submit" value="Send" />
            </div>
        </div>
    )
}