// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
let thePit: any = []
type Data = {
  channel: string
}

function matchInterests(a: string[], b: string[]) {
  let matches = 0;
  const longest = a.length > b.length ? a : b
  const shortest = a.length > b.length ? b : a
  
  for (let i = 0; i < shortest.length; i++) {
    if (longest === shortest) {
      matches++
    }
  }
  if (shortest.length / matches > 0.49) {
    return true
  }
}

export default async function matchingHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await req;
  console.log(thePit.length, 'length')
  if (thePit.length === 0) {
    thePit[thePit.length] = req.body.interests, req.body.userId
    res.status(201).json({ channel: req.body.userId })
  } else {
    thePit.array.forEach((element: any) => {
      console.log(element, 'foreach')
    });
    for (let i = 0; i < thePit.length; i++) {
      if (matchInterests(thePit[i], req.body.interests)) {
        console.log('match found')
        res.status(200).json({ channel: req.body.userId })
      }
    }
  }
  /*const userId = req.body.userId
  const interests = req.body.interests*/
  console.log(req.body.interests)
  return;
}
