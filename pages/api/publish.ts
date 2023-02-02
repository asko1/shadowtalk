import Ably from "ably/promises";
import { NextApiRequest, NextApiResponse } from "next";

const ably = new Ably.Rest(process.env.ABLY_SERVER_API_KEY as string);
const channel = ably.channels.get("headlines");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({});
    return;
  }

  const { result } = await req.body.text

  channel.publish("new-headline", {
    author: req.body.author,
    text: req.body.text,
  });

  res.status(200).json({});
}
