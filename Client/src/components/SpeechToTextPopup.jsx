import { useEffect, useState } from "react";
import { TextInput, Button } from "flowbite-react";

// Check for browser support of SpeechRecognition
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

const SpeechToTextPopup = ({ onTextReceived = () => {} }) => {
  const [inputMicValue, setinputMicValue] = useState(""); // Store input text
  const [isListening, setIsListening] = useState(false); // Handle listening state

  useEffect(() => {
    // Speech recognition configuration
    recognition.continuous = false; // Stop after speaking one sentence
    recognition.interimResults = false; // Return only final results
    recognition.lang = "en-US"; // Set default language to English

    recognition.onresult = (event) => {
      // Speech recognition result event
      let transcript = event.results[0][0].transcript;
      transcript = transcript.toLowerCase();
      transcript = transcript.replace(/\.$/, "").trim();
      setIsListening(false); // Stop listening once speech is recognized

      onTextReceived(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false); // Handle errors by stopping listening
    };

    recognition.onend = () => {
      setIsListening(false); // Stop listening once recognition ends
    };
  }, []);

  // Function to trigger listening
  const startListening = () => {
    setIsListening(true);
    recognition.start(); // Start the speech recognition process
    console.log("Listening...");
  };

  // Function to stop listening
  const stopListening = () => {
    setIsListening(false);
    recognition.stop(); // Manually stop speech recognition
    console.log("Stopped listening.");
  };

  return (
    <div className="relative   flex flex-col items-center justify-center">
      {/* Input Section */}
      <div className="flex items-center  rounded-full p-2 shadow-lg ">
        <button
          className=" text-blue-500 hover:text-blue-700"
          onClick={startListening}
        >
          <i className="fas fa-microphone text-2xl"></i>
        </button>
      </div>

      {/* Speech-to-Text Popup */}
      {isListening && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Listening...
            </h3>
            <p className="text-gray-600 mb-4">
              Speak now, we are converting your speech to text.
            </p>
            <Button
              gradientDuoTone="pinkToOrange"
              onClick={stopListening}
              className="w-full text-black border"
            >
              Stop Listening
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpeechToTextPopup;
