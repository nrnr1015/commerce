import type { NextApiRequest, NextApiResponse } from 'next'
import {Client} from '@notionhq/client';

const notion = new Client({
  auth : 'secret_9H7Y4VgqbtVUrTKdxUWeK5PiVxAsaVkleTk2Hiirz0j',
  
})
const databaseId = 'b0c2fe3dd20840e5a3485f32c0ea3cea';

async function addItem(name:string) {
  try {
    const response = await notion.pages.create({
      parent: {database_id: databaseId},
      properties : {
        title: [
          {
            text: {
              content: name
            }
          }
        ],
      }
    })
    console.log(response);
  } catch (error) {
    console.error(JSON.stringify(error));
  }
}

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const {name} = req.query;
  

  if(name == null ){
    return res.status(400).json({message : 'no name'})
  }

  try {
    await addItem(String(name))
    res.status(200).json({ message: `success ${name}}` })

  } catch (error) {
    res.status(400).json({ message: `fail  add ${name}}` })
    
  }
}