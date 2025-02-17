import { useEffect, useState } from "react";
import Style from './Notfound.module.css';


export default function Notfound() {
    const [testString, settestString] = useState('Hello')
    useEffect (()=> {}, []);

    return (
        <div>
            <h2 className={`${Style['bg-tomato']}`}>Notfound component</h2>
            <p> { testString } Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, aliquam.</p>
        </div>
    )
}
