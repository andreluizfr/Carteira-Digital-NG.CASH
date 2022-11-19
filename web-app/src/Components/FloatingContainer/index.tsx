import './styles.css';

import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {

}

const FloatingContainer = (props:Props) : JSX.Element => {

    return (
        <div className={"Floating-container "+props.className}>
            <div className='Background'></div>
            <div className='CenterDiv'>{props.children}</div>
        </div>
    );

}

export default FloatingContainer;