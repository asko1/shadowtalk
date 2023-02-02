import Head from "next/head";
import styles from "../styles/Home.module.css";
import Participants from "../components/Participants";
import { configureAbly } from "@ably-labs/react-hooks";
import Articles from "../components/Articles";
import { getHistoricalMessages } from "../lib/history";

configureAbly({
  authUrl: `/api/createTokenRequest`,
});

export default function Home(props: { history: any; }) {
  console.log(process.env.NEXT_PUBLIC_HOSTNAME, process.env.NEXT_PUBLIC_VERCEL_URL, process.env.VERCEL_URL)
  console.log(process.env)
  return (
    <div className={styles.container}>
      <Head>
        <title>Chat</title>
      </Head>

      <main className={styles.main}>
        <h1>Realtime Chat</h1>
        <h2>kodus</h2>
        <h3>Participants</h3>
        <Participants />
        <Articles history={props.history} />
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const historicalMessages = await getHistoricalMessages();

  return {
    props: {
      history: historicalMessages,
    },
    //enable ISR
    revalidate: 10,
  };
}
