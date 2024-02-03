import React, { useEffect, useState } from 'react';
import { TextSegment } from '../App';

interface AppProps {
    textSegment: TextSegment;
}

const App: React.FC<AppProps> = ({ textSegment }) => {
    const [color, setColor] = useState("");

    useEffect(() => {
        if (textSegment.rating < 0.33) setColor(" text-red-500 ");
        else if (textSegment.rating < 0.67) setColor(" text-orange-500 ");
        else setColor(" text-green-500 ");
    }, []);

    return (
        <span className={color}>
            {textSegment.text}
        </span>
    );
};

export default App;
