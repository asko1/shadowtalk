import React from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";

export default function ArticlePreview({ index, headline }: any) {
  return (
    <article key={index} className={styles.card}>

      <div className={styles.info}>
        <h1 className={styles.title}>
          <p className={styles.link}>
            {headline.data.text}
          </p>
        </h1>
        <div className={styles.details}>
          {headline.data.site} - shared {headline.data.timestamp} by{" "}
          {headline.data.author}
        </div>
        <p>{headline.data.desc}</p>
      </div>
    </article>
  );
}
