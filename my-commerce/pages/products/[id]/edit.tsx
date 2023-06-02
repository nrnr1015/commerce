import Carousel from "nuka-carousel"
import Image from 'next/image';
import { useEffect, useState } from "react";
import Head from "next/head";
import { Editor, EditorState } from "react-draft-wysiwyg";
import CustomEditor from "@/components/Editor";
import { useRouter } from "next/router";
const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
];

export default function Product () {
  const [index, setIndex] = useState(0);
  const router = useRouter()
  const {id , productId} = router.query
  const [editorState, setEditState] = useState<EditorState | undefined>(undefined);

  // useEffect( () => {
  //   if (typeof window !== 'undefined') {
  //     if(productId != null) {
  //       fetch(`/api/get-product?id=${productId}`)
  //       .then( (res) => res.json())
  //       .then( (data) => {
  //         if(data.item.contents){
  //           setEditState(
  //             EditorState.createWithContent(
  //               JSON.parse(data.item.contents)
  //               //converFromRaw(JSON.parse(data.item.contents))
  //             )
  //           )
  //         }else {
  //           setEditState(EditorState.createEmpty())
  //         }
  //       }
        
  //       )
  //     }
  //   }
  // },[productId])
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (productId != null) {
        fetch(`/api/get-product?id=${productId}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.item.contents) {
              setEditState(
                EditorState.createWithContent(
                  JSON.parse(data.item.contents)
                )
              );
            } else {
              setEditState(EditorState.createEmpty());
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }, [productId]);
  

  const handleSave = () => {
    alert('handleSave')
  }
    return (
      <>
        <Carousel 
          withoutControls={true}
          speed={10}
          autoplay
          wrapAround
          slideIndex={index}
        >
          {images.map((item) => 
          <Image 
            key={item.original} src={item.original} 
            alt="image"
            width={1000} 
            height={600}
            layout="responsive"
          />)}
        </Carousel>
        <div style={{display: 'flex', gap:'10px', justifyContent:'center', alignItems:'center'}}>
          {images.map((item, i) => 
            <div key={i} onClick={() => setIndex(i)}>
              <Image 
                key={item.original} src={item.original} 
                alt="image"
                width={100} 
                height={60}
              />
            </div>
          )}
        </div>
        {typeof window !== 'undefined' && editorState != null && (
          <CustomEditor 
            editorState={editorState}
            onEditorStateChange={setEditState}  
            onSave={handleSave}
          />
        )}
        </>
    )
}

// function converFromRaw(arg0: any): Draft.Model.ImmutableData.ContentState {
//   throw new Error("Function not implemented.");
// }
// function converFromRaw(arg0: any): Draft.Model.ImmutableData.ContentState {
//   throw new Error("Function not implemented.");
// }

