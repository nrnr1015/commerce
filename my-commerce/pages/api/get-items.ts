import type { NextApiRequest, NextApiResponse } from 'next'
import {Client} from '@notionhq/client';

const notion = new Client({
  auth : 'secret_9H7Y4VgqbtVUrTKdxUWeK5PiVxAsaVkleTk2Hiirz0j',
  
})
const databaseId = 'b0c2fe3dd20840e5a3485f32c0ea3cea';

async function getItems() {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts : [
        {
          property: 'price',
          direction: 'ascending'
          
        },
      ],
    })
    console.log(response);
    return response
  } catch (error) {
    console.error(JSON.stringify(error));
  }
}

type Data = {
  item?: any,
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  try {
    const response =  await getItems()
    res.status(200).json({ item : response?.results, message: `success ` })

  } catch (error) {
    res.status(400).json({ message: `fail  ` })
    
  }
}