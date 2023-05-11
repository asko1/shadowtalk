import React, { useEffect } from "react";
import { usePresence, assertConfiguration } from "@ably-labs/react-hooks";
import styles from "../styles/Home.module.css";

export default function Participants(props: any) {
  const ably = assertConfiguration();
  var i = 0
  let [presenceData] = usePresence(props.channelName);
  const presenceList = presenceData.map((member: any, index: any) => {
    const isItMe = member.clientId === ably.auth.clientId ? " (me)" : "";
    if (index >= 7) {
      i++
      return (
        // eslint-disable-next-line react/jsx-key
        <h3 className="killme"> and {i} more </h3>
      )
    }
   
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
