import VoiceChatIcon from "@mui/icons-material/VoiceChat";
import { ToggleButton } from "@mui/material";
import style from "../../styles/Home.module.css";
import { useState } from "react";

export default function Voicechat() {
  const [selected, setSelected] = useState<boolean>(false);

  return (
    <div className={style.voiceChat}>
      <ToggleButton
        value={true}
        selected={selected}
        onChange={() => {
          setSelected(!selected);
        }}
      >
        <VoiceChatIcon />
      </ToggleButton>
    </div>
  );
}
