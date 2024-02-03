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

        setPastRecordings([[{ text: "Hello my name ", rating: 0.93 }, { text: "is Alex", rating: 0.23 }], [{ text: "Hello my ", rating: 0.11 }, { text: "name is Tor ", rating: 0.48 }], [{ text: "Hello ", rating: 0.53 }, { text: "my name is Yuxiang", rating: 0.98 }]])
    }, []);


    return (
        <div className={showHideClassName}>
            <button onClick={onClose}>
                Close
            </button>
            <ul>
                {pastRecordings.map((pastRecording, index) => (
                    <li key={index}>
                        <TextBox textSegments={pastRecording} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PastRecordingsModal;
