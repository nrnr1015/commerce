import type { NextApiRequest, NextApiResponse } from 'next'
import {Client} from '@notionhq/client';

const notion = new Client({
  auth : 'secret_9H7Y4VgqbtVUrTKdxUWeK5PiVxAsaVkleTk2Hiirz0j',
  
})
const databaseId = 'b0c2fe3dd20840e5a3485f32c0ea3cea';

async function getDetail(pageId: string, propertyId:string) {
  try {
    const response = await notion.pages.properties.retrieve({ page_id: pageId, property_id: propertyId });

    console.log(response);
    return response
  } catch (error) {
    console.error(JSON.stringify(error));
  }
}

type Data = {
  detail?: any,
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { pageId, propertyId } = req.query;
    const response = await getDetail(String(pageId), String(propertyId));
    res.status(200).json({ detail: response, message: `success` });
  } catch (error) {
    res.status(400).json({ message: `fail` });
  }
}