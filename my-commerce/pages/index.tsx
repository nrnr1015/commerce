import Button from "@/components/Button";
import Product from "@/components/Product";
import { Joan } from "next/font/google";
import {useEffect, useState , useRef} from 'react';
import { json } from "stream/consumers";
export default function Home() {

  const [products, setProducts] = useState<{id:string; name: string[]}[]>([]);
  // useEffect(()=> {
  //   fetch('/api/get-items')
  //   .then( (res) => res.json())
  //   .then( (data) => setProducts(data.item))
  // }, [])


   useEffect(()=> {
    fetch('/api/get-products')
    .then( (res) => res.json())
    .then( (data) => setProducts(data.item))
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <Button />
      <Product/>
      <div>
          <p>product list</p>
          {products && products.map((item) => {
            return <div key={item.id}>{item.name}</div>
          })}
          {/* {products && products.map(item => 
            <div key={item.id}>
              {JSON.stringify(item)}
              {item.properties && 
              Object.entries(item.properties).map(([key,value]) => (
                
                <button key={key} onClick={()=> {
                  fetch(`/api/get-detail?pageId=${item.id}&propertyId=${value.id}`)

                  .then( (res) => res.json())
                  .then( (data) => alert(JSON.stringify(data.detail)))
                }}>{key} </button>
              ))}
              <br />
              <br />
            </div>
            
          )} */}
      </div>
    </main>
  )
}
