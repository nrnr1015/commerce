import { products as ProductType } from "@prisma/client";
import { useEffect, useState } from "react";

const TAKE = 9;

export default function Products() {
  const [skip, setSkip] = useState(0);
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    fetch(`/api/get-products?skip=0&take=${TAKE}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.item));
  }, []);

  return (
    <div>
      666
      {products && products.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
