import React, {useState} from 'react'
import style from './Counter.module.css'

const Counter = () => {
    const [n, setN] = useState(0);

    const handleOnClick = () => {
        setN(n + 1)
    }

    return (
        <div className={style.container}>
            <div className={style.number}>Number : {n}</div>
            <button className={style.button} onClick={handleOnClick}>Add</button>
        </div>
    )
}

export default Counter