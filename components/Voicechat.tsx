import { Button, ToggleButtonGroup } from "@mui/material";
import VoiceChatIcon from '@mui/icons-material/VoiceChat';
import {ToggleButton} from "@mui/material";

export default function Voicechat() {
    return(
        <ToggleButtonGroup>
            <ToggleButton value={true}>
                <VoiceChatIcon/>
            </ToggleButton>
        </ToggleButtonGroup>
    )
}