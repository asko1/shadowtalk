import React, { useState } from "react";
import { useChannel } from "@ably-labs/react-hooks";
import styles from "../styles/Home.module.css";
import MessageItem from "./MessageItem";
import { Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

/* 
clearHistoryState:
  - When true, historical messages are retrieved and rendered statically from the History API.
  - When false, historical messages are retrieved using channel rewind to prevent a race condition
    where new messages are arriving on the channel while history is still being retrieved.
*/
let clearHistoryState = true;

export default function Articles() {
  let inputBox: HTMLInputElement | null; 

  const [headlineText, setHeadlineText] = useState("");
  const [headlines, updateHeadlines] = useState([] as any);
  const [_, ably] = useChannel("headlines", (headline: any) => {
    if (clearHistoryState) {
      resetHeadlines();
      clearHistoryState = false;
    }

    updateHeadlines((prev: any) => [headline, ...prev]);
  });

  const resetHeadlines = () => {
    updateHeadlines([]);
  };
  const headlineTextIsEmpty = headlineText.trim().length === 0;

  const processedHeadlines = headlines.map((headline: any) =>
    processMessage(headline, ably.auth.clientId)
  );
  const articles = processedHeadlines.reverse().map((headline: any, index: React.Key | null | undefined) => (
    // <ArticlePreview key={index} headline={headline} index={undefined} />
    <MessageItem key={index} headline={headline} index={undefined}/>
  ));

  const handleFormSubmission = async (event: { charCode: number; preventDefault: () => void; }) => {
    const nonEnterKeyPress = event.charCode && event.charCode !== 13;
    if (nonEnterKeyPress || headlineTextIsEmpty) {
      return;
    }

    event.preventDefault();

    await fetch("/api/publish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: headlineText, author: ably.auth.clientId }),
    });

    setHeadlineText("");
    inputBox?.focus();
  };

  return (
    <div>
      <div className={styles.messagesbox}>
        <div  className={styles.scroller}>
          {articles}
          <div className={styles.anchor} />
        </div>
      </div>
      <div className={styles.chatbox}>
      {/* @ts-ignore */}
      <form onSubmit={handleFormSubmission}>
        <input
          type="textarea"
          ref={(element) => {
            inputBox = element;
          }}
          value={headlineText}
          placeholder="Type something here..."
          onChange={(event) => setHeadlineText(event.target.value)}
          onKeyPress={handleFormSubmission}
          className={styles.input}
        />
        
        <Button variant="contained" 
                type="submit"
                disabled={headlineTextIsEmpty}
                endIcon={<SendIcon />}>
          Send
        </Button>
      </form>
      </div>
    </div>
  );
}

function processMessage(headline: { data: { timestamp: string; text: any; }; timestamp: any; text: any; }, currentClientId: string) {
  /*headline.data.author =
    headline.data.author === currentClientId ? "me" : headline.data.author;*/
  headline.data.timestamp =
    "timestamp" in headline ? formatDate(headline.timestamp) : "earlier";
    headline.text = headline.data.text
  return headline;
}

function formatDate(date: string | number | Date) {
  const regex = /(?:[^T]+)T([0-9:]+)/gm;
  const dateToFormat = new Date(date).toISOString();
  const match = regex.exec(dateToFormat) as RegExpExecArray;
  return match[1];
}