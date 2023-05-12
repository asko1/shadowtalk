
import React, { useEffect, useState } from "react";
import { usePresence, assertConfiguration } from "@ably-labs/react-hooks";
import styles from "../styles/Home.module.css";
import { Typography } from "@mui/material";

export default function Participants(props: any) {
  const ably = assertConfiguration();
  var i = 0
  let [presenceData] = usePresence(props.channelName);
  const [andMore, setAndMore] = useState(0);
  const [visible, setVisible] = useState("hidden");
  const presenceList = presenceData.map((member: any, index: any) => {
    const isItMe = member.clientId === ably.auth.clientId ? " (me)" : "";

    if (index >= 7) {
      setAndMore(andMore + 1);
      setVisible("visibile");
    } else {
      return (
        <li key={index} className={styles.participant}>
          <span className={styles.name}>{props.channelName}</span>
          <span className={styles.name}>{member.clientId}</span>
          <span className={styles.me}>{isItMe}</span>
        </li>
      );
    }
  });

  return (
    <div>
      <ul>{presenceList}</ul>
      <Typography variant="h5" sx={{ visibility: visible }}>
        And {andMore} more
      </Typography>
    </div>
  );
}

