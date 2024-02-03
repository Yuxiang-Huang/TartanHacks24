import React from 'react';
import ScoredText from './ScoredText';
import { TextSegment } from '../App';

interface TextBoxProps {
    textSegments: TextSegment[];
}

const TextBox: React.FC<TextBoxProps> = ({ textSegments }) => {
    return (
        <div>
            {textSegments.map((textSegment, index) => {
                return <ScoredText key={index} textSegment={textSegment}/>
            })}
        </div>
    );
};

export default TextBox;