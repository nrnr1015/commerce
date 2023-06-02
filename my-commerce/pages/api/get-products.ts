import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getProducts(skip: number, take: number) {
  try {
    const response = await prisma.products.findMany({
      skip: skip,
      take: take,
    })
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch products');
  }
}

type Data = {
  item?: any;
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { skip, take } = req.query;
  if (!skip || !take) {
    res.status(400).json({ message: 'Missing skip or take parameter' });
    return;
  }
  
  try {
    const products = await getProducts(Number(skip), Number(take));
    res.status(200).json({ item: products, message: 'Success' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
}
