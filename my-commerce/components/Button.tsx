import {useEffect, useState , useRef} from 'react';


export default function Button(params:type) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {

        if(inputRef.current == null || inputRef.current.value === ''){
            alert('인풋을 입력해주세요')
            return
        }
        fetch(`/api/add-item?name=${inputRef.current?.value}`)
        .then( (res) => res.json())
        .then( (data) => data.message)
    }
    return (
        <div>
            <input ref={inputRef} type="text" placeholder="name"/>

            <button onClick={handleClick}>handleClick</button>
        </div>
    )
}