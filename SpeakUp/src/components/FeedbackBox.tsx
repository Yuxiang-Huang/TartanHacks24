import React from 'react';
import { Feedback } from '../App';

interface AppProps {
    feedback: Feedback;
}

const App: React.FC<AppProps> = ({ feedback }) => {
    return (
        <div className="text-white py-5 rounded-xl w-10/12 min-w-96 max-w-4xl mx-auto bg-gradient-to-r from-red-600 via-pink-600 to-purple-600">
            <h2 className=" font-normal">Feedback</h2>
            <div className='my-6 px-12'>
                <div className="inline-block w-3/12 text-left align-top">Transcript: </div>
                <div className="inline-block w-9/12 text-right align-top">{feedback.transcript}</div>
            </div>
            <div className='my-6 px-12'>
                <div className="inline-block w-3/12 text-left align-top">Score: </div>
                <div className="inline-block w-9/12 text-right align-top">{feedback.score}</div>
            </div>
            <div className='my-6 px-12'>
                <div className="inline-block w-3/12 text-left align-top">Pace: </div>
                <div className="inline-block w-9/12 text-right align-top">{feedback.pace}</div>
            </div>
            <div className='my-6 px-12'>
                <div className="inline-block w-3/12 text-left align-top">Filler Words: </div>
                <div className="inline-block w-9/12 text-right align-top">{feedback.fillerWords.map((fillerWord, index) => {
                    return <div key={index}>{fillerWord}</div>
                })}</div>
            </div>
            <div className='my-6 px-12'>
                <div className="inline-block w-3/12 text-left align-top">Number of Filler Words: </div>
                <div className="inline-block w-9/12 text-right align-top">{feedback.numFillerWords}</div>
            </div>
            <div className='my-6 px-12'>
                <div className="inline-block w-3/12 text-left align-top">Feedback: </div>
                <div className="inline-block w-9/12 text-right align-top">{feedback.feedback}</div>
            </div>
        </div>
    );
};

export default App;
