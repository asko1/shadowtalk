import React from "react";
import styles from "../styles/Home.module.css";

export default function ArticlePreview({ index, headline }: any) {
  return (
    <article key={index} className={styles.card}>
      <div className={styles.info}>
        <div className={styles.details}>
          {headline.data.site}
          <b>{headline.data.author}</b> at <b>{headline.data.timestamp}</b>
        </div>
        <div className={styles.text}>
          {headline.data.text}
        </div>
      </div>
    </article>
  );
}
