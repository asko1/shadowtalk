
import React, { useEffect, useState } from "react";
import { usePresence, assertConfiguration } from "@ably-labs/react-hooks";
import styles from "../styles/Home.module.css";
import { Typography } from "@mui/material";
import homeStyle from "../styles/Home.module.css";

export default function Participants(props: any) {
  const ably = assertConfiguration();
  let [presenceData] = usePresence(props.channelName);
  const setShowResults = React.useState(false)
  var howMany = 0;
  const presenceList = presenceData.map((member: any, index: any) => {
    const isItMe = member.clientId === ably.auth.clientId ? " (me)" : "";
    
    if (index >= 7) {
      howMany++
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
      <Typography className={homeStyle.curOnline}>
        <h3> and +{ howMany } more</h3>
      </Typography>
    </div>
  );
}

