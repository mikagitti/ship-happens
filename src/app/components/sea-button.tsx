'use client';

import { useState } from "react";

type buttonProps = {
    squereSize: number;
    name: string;
    didItHit: (coord: string) => boolean;
}

export default function SeaButton({ squereSize, name, didItHit }: buttonProps) {

    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(true);
        var isItHit = false;
        isItHit = didItHit(name);
        console.log(isItHit ? `${name}: Hit` : `${name}: Miss`);

    }

    return (
        <button style={{
            width: `${squereSize}px`,
            height: `${squereSize}px`,
        }}
            onClick={() => handleClick()}
            disabled={isClicked}>
            {name}
        </button>
    );
}
