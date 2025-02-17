import { useEffect, useState } from "react";
import Style from './TemplateName.module.css';


export default function TemplateName() {
    const [testString, settestString] = useState('Hello')
    useEffect (()=> {}, []);

    return (
        <div>
            <h2 className={`${Style['bg-tomato']}`}>TemplateName component</h2>
            <p> { testString } Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, aliquam.</p>
        </div>
    )
}
