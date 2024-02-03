import React, { useEffect, useState } from 'react';
import { TextSegment } from '../App';
import TextBox from './TextBox';

interface PastRecordingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const PastRecordingsModal: React.FC<PastRecordingsModalProps> = ({ isOpen, onClose }) => {
    const showHideClassName = isOpen ? "" : " hidden ";
    const [pastRecordings, setPastRecordings] = useState<TextSegment[][]>([]);

    useEffect(() => {
        // call thing to get past data

        setPastRecordings([[{ text: "Hello my name ", rating: 0.93 }, { text: "is Alex", rating: 0.23 }], [{ text: "Hello my ", rating: 0.11 }, { text: "name is Tor ", rating: 0.48 }], [{ text: "Hello ", rating: 0.53 }, { text: "my name is Yuxiang", rating: 0.98 }],[{ text: "Hello my name ", rating: 0.93 }, { text: "is Alex", rating: 0.23 }], [{ text: "Hello my ", rating: 0.11 }, { text: "name is Tor ", rating: 0.48 }], [{ text: "Hello ", rating: 0.53 }, { text: "my name is Yuxiang", rating: 0.98 }]])
    }, []);


    return (
        <div className={showHideClassName + " z-10 fixed w-full h-full bg-black/50"}>
            <div className="rounded-xl py-5 px-10 bg-gradient-to-br from-red-400 to-red-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-96 min-w-96 w-1/2 overflow-y-scroll">
                <button className="sticky top-0 float-end -me-5 rounded-xl py-1 px-3 bg-red-300" onClick={onClose}>
                    X
                </button>
                <ul>
                    {pastRecordings.map((pastRecording, index) => (
                        <li key={index} className=" min-w-full bg-white rounded-md my-3 p-3 shadow-[inset_0_0_10px_2px_rgba(0,0,0,0.5)]">
                            <h2>Past Recording #{index}</h2>
                            <audio></audio>
                            <button>Rescore</button>
                            {/* <TextBox textSegments={pastRecording} /> */}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PastRecordingsModal;
