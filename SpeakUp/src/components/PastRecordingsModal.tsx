import React, { useEffect, useState } from "react";
import { TextSegment } from "../App";
import TextBox from "./TextBox";
import axios from "axios";

interface PastRecordingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PastRecordingsModal: React.FC<PastRecordingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const showHideClassName = isOpen ? "" : " hidden ";
  const [pastRecordings, setPastRecordings] = useState<string[]>([]);

  useEffect(() => {
    setPastRecordings([]);
    generate();
  }, [isOpen]);

  const generate = () => {
    // setPastRecordings([]);
    let tempArray: string[] = [];
    axios
      .get("http://localhost:8000/")
      .then((result) => {
        result.data.forEach(
          (element: { audio: { data: Iterable<number> } }) => {
            const uint8Array = new Uint8Array(element.audio.data);
            const blob: Blob = new Blob([uint8Array]);
            tempArray.push(URL.createObjectURL(blob));
            //   createAudioDisplay(blob);
          }
        );
        setPastRecordings(tempArray);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div
      className={
        showHideClassName +
        " z-10 fixed p-0 m-0 top-0  w-full h-full bg-black/50"
      }
    >
      <div className="rounded-xl py-5 px-10 bg-gradient-to-br from-red-400 to-red-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[40em] min-w-96 w-1/2 overflow-y-scroll">
        <button
          className="sticky top-0 float-end -me-5 rounded-xl py-1 px-3 bg-red-300"
          onClick={onClose}
        >
          X
        </button>
        <ul>
          {pastRecordings.map((pastRecording, index) => (
            <li
              key={index}
              className=" min-w-full bg-white rounded-md my-3 p-5 shadow-[inset_0_0_10px_2px_rgba(0,0,0,0.5)]"
            >
              <h2>Past Recording #{index}</h2>
              <audio
                className="mx-auto my-4"
                src={pastRecording}
                controls={true}
              ></audio>
              {/* <button>Rescore</button> */}
              {/* <TextBox textSegments={pastRecording} /> */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PastRecordingsModal;
