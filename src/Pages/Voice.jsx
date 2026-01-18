import { useRef, useState } from "react";

export default function Voice() {
  const [recording, setRecording] = useState(false);

  const recorderRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    recorderRef.current = new MediaRecorder(stream);

    recorderRef.current.ondataavailable = (e) => {
      chunksRef.current.push(e.data);
    };

    recorderRef.current.onstop = sendVoice;

    recorderRef.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    recorderRef.current.stop();
    setRecording(false);
  };

  const sendVoice = async () => {
    const audioBlob = new Blob(chunksRef.current, {
      type: "audio/webm",
    });

    chunksRef.current = [];

    const formData = new FormData();
    formData.append("voice", audioBlob);

    await fetch("https://your-backend-url/voice", {
      method: "POST",
      body: formData,
    });

    alert("Voice message sent!");
  };

  return (
    <div>
      {!recording ? (
        <button onClick={startRecording}>🎙 Start</button>
      ) : (
        <button onClick={stopRecording}>⏹ Stop</button>
      )}
    </div>
  );
}
