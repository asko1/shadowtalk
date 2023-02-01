import Ably from "ably/promises";
import { NextApiRequest, NextApiResponse } from "next";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = new Ably.Realtime(process.env.ABLY_CLIENT_API_KEY as string);

  const randomName = uniqueNamesGenerator({
    dictionaries: [adjectives, animals, colors],
    length: 2,
  });

  const tokenRequestData = await client.auth.createTokenRequest({
    clientId: randomName,
  });

  res.status(200).json(tokenRequestData);
}
