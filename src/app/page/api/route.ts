// pages/api/route.ts

import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

  export async function postHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end(); 
  }

  const { productName, productDescription } = req.body;

  try {
    const response = await openai.completions.create({
      model: 'text-davinci-003',
      prompt: `Generate compelling ad copy for a product: ${productName} with this description ${productDescription}`,
      max_tokens: 150,
    });

     console.log(response.choices[0].text)
    const adCopy = response.choices[0].text;

    res.status(200).json({ adCopy });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export { postHandler as default };
