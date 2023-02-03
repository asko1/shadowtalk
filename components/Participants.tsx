import React, { useEffect } from "react";
import { usePresence, assertConfiguration } from "@ably-labs/react-hooks";
import styles from "../styles/Home.module.css";

export default function Participants(props: any) {
  const ably = assertConfiguration();
  let [presenceData] = usePresence(props.channelName);
  const presenceList = presenceData.map((member: any, index: any) => {
    const isItMe = member.clientId === ably.auth.clientId ? " (me)" : "";

   
    return (
      
      <li key={index} className={styles.participant}>
        <span className={styles.name}>{props.channelName}</span>
        <span className={styles.name}>{member.clientId}</span>
        <span className={styles.me}>{isItMe}</span>
      </li>
    );
  });

  return <ul>{presenceList}</ul>;
}
