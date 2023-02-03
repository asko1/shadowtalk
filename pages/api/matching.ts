// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
let thePit: any = []
type Data = {
  channel: string
}

function matchInterests(host: string[], peer: string[]) {
  let matches = 0;
  for (let i = 0; i < host.length; i++) {
    if (host[i] === peer[i]) matches++
  }
  if (matches / host.length > 0.49) return true
}

export default async function matchingHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await req;
  console.log(req.body)
  console.log(thePit.length, 'length')
  if (thePit.length === 0) {
    thePit[thePit.length] = req.body
    console.log(thePit[0], 'thePit')
    res.status(201).json({ channel: Object.keys(thePit[0])[0] })
  } else {
    for (let i = 0; i < thePit.length; i++) {
      if (matchInterests(Object.values(thePit[0])[0] as string[], Object.values(req.body)[0] as string[])) {
        console.log('match found')
        res.status(200).json({ channel: Object.keys(thePit[0])[0] })
      }
    }
  }
  /*const userId = req.body.userId
  const interests = req.body.interests*/
  console.log(req.body.interests)
  return;
}
