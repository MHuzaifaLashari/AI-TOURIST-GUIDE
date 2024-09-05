import { TextInput, Button, Label, Radio } from "flowbite-react";
import p2 from "../assets/p2.jpg";
import { useState, useEffect, useRef } from "react";
import SpeechToTextPopup from "../components/SpeechToTextPopup";

const Home = () => {
  const [messages, setMessages] = useState([]); // State to store messages
  const [inputValue, setInputValue] = useState(""); // State to store the input value
  const [language, setLanguage] = useState("en"); // Default language is English
  const [urduResponses, setUrduResponses] = useState([]); // State for Urdu responses
  const [englishResponses, setEnglishResponses] = useState([]); // State for English responses
  const [loaded, setLoaded] = useState(false);
  const [isListening, setIsListening] = useState(false); // State for mic input

  const messagesEndRef = useRef(null); // Reference to the end of the messages

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom(); // Scroll down whenever messages change
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim()) {
      // Add user message
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", text: inputValue },
      ]);

      setInputValue(""); // Clear the input field

      // Add a placeholder for the bot response with a pulsating effect
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Generating response...", isLoading: true },
      ]);

      // Simulate delay for bot response
      setTimeout(() => {
        const response = handleSearch(inputValue);

        // Speak the entire response
        speakResponse(response, language);

        // Word by word rendering of bot's response
        const words = response.split(" ");
        let wordIndex = 0;
        const interval = setInterval(() => {
          if (wordIndex < words.length) {
            const currentWord = words.slice(0, wordIndex + 1).join(" ");
            setMessages((prevMessages) =>
              prevMessages.map((msg, index) =>
                index === prevMessages.length - 1
                  ? {
                      ...msg,
                      text: msg.isLoading ? currentWord : msg.text,
                    }
                  : msg
              )
            );

            wordIndex++;
          } else {
            // Once all words are displayed, remove the loading effect
            setMessages((prevMessages) =>
              prevMessages.map((msg, index) =>
                index === prevMessages.length - 1
                  ? { ...msg, isLoading: false }
                  : msg
              )
            );
            clearInterval(interval);
          }
        }, 150); // Adjust this delay for rendering speed
      }, 1500); // Initial delay before bot starts "typing"
    }
  };
  const handleSpeechInput = (text) => {
    setInputValue(text); // Update the input value state
    handleSend();
  };
  const handleSearch = (input) => {
    const responses = language === "en" ? englishResponses : urduResponses;

    if (responses && Array.isArray(responses)) {
      const found = responses.find((item) => item.key === input);

      if (found) {
        return found.value;
      } else {
        return language === "en"
          ? "Not Found. Try Something Else."
          : "نہیں ملا. کچھ اور آزمائیں.";
      }
    } else {
      return language === "en"
        ? "Data array is undefined"
        : "ڈیٹا دستیاب نہیں ہے";
    }
  };

  const speakResponse = (text, lang) => {
    const utterance = new SpeechSynthesisUtterance(text);

    // Check for available voices and set the language based on availability
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(
      (v) => v.lang === (lang === "en" ? "en-US" : "ur-PK")
    );

    if (voice) {
      utterance.voice = voice;
    } else {
      console.warn(`No voice found for ${lang}. Using default voice.`);
    }

    utterance.lang = lang === "en" ? "en-US" : "ur-PK";
    utterance.rate = 1; // Adjust this value to speed up or slow down the speech

    // Speak the utterance
    window.speechSynthesis.speak(utterance);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const loadAllData = async () => {
    try {
      await loadUrduData();
      await loadEnglishData();

      if (urduResponses && englishResponses) {
        setLoaded(true);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const loadUrduData = async () => {
    try {
      const response = await fetch("/Api/Response/getallresponses", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      setUrduResponses(data);
    } catch (e) {
      console.error("Error fetching urdu responses:", e);
    }
  };

  const loadEnglishData = async () => {
    try {
      const response = await fetch("/Api/Response/getallEnglishresponses", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      setEnglishResponses(data);
    } catch (e) {
      console.error("Error fetching english responses:", e);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${p2})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Title */}
      <div className="relative z-10 p-6 text-center">
        <h1 className="text-white text-5xl font-bold drop-shadow-lg">
          SINDH MUSEUM HYDERABAD
        </h1>
        <h2 className="text-gray-300 text-5xl font-semibold drop-shadow-lg">
          AI Tour Assistant
        </h2>
        <div>
          <div className="flex flex-row justify-center items-center  mt-3 rounded-lg  ">
            <div className="p-3 bg-white shadow-lg rounded-lg max-w-md ">
              <h2 className="text-lg font-semibold text-gray-600 mb-4">
                {language === "en" ? "Select Language" : "زبان منتخب کریں"}
              </h2>

              <div className="">
                <fieldset>
                  <div className="flex items  px-3 ">
                    <div className="pr-3">
                      <Radio
                        id="english"
                        name="language"
                        value="en"
                        checked={language === "en"}
                        onChange={handleLanguageChange}
                      />
                      <Label
                        htmlFor="english"
                        className={`ml-2 ${
                          language === "en" ? "text-blue-600" : "text-gray-500"
                        }`}
                      >
                        English
                      </Label>
                    </div>
                    <Radio
                      id="urdu"
                      name="language"
                      value="ur"
                      checked={language === "ur"}
                      onChange={handleLanguageChange}
                    />
                    <Label
                      htmlFor="urdu"
                      className={`ml-2 ${
                        language === "ur" ? "text-blue-600" : "text-gray-500"
                      }`}
                    >
                      اردو
                    </Label>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area (Overlay) */}
      {loaded && (
        <div className="absolute bottom-0 left-0 right-0 z-20 p-6 ">
          {/* Messages Section */}
          <div className="flex flex-col space-y-4 mb-4 max-w-4xl mx-auto h-96 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-4 m-3 rounded-full shadow-lg w-auto max-w-xs ${
                  msg.sender === "user"
                    ? "bg-blue-300 text-white self-end"
                    : "bg-gray-300 text-gray-900 self-start"
                } ${msg.isLoading ? "animate-pulse" : ""}`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />{" "}
            {/* Reference to keep track of the last message */}
          </div>

          {/* Input Box */}
          <div className="flex items-center bg-white bg-opacity-80   rounded-full p-2 shadow-lg max-w-4xl mx-auto">
            <TextInput
              type="text"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()} // Allow sending with Enter key
              className="flex-grow p-3 text-lg border-none bg-transparent focus:ring-0 focus:outline-none placeholder-gray-500"
            />
            <SpeechToTextPopup onTextReceived={handleSpeechInput} />
            <Button
              gradientDuoTone="purpleToBlue"
              className="m-2 px-3 py-1 rounded-full text-blue-500 hover:text-blue-700 border border-blue-500"
              onClick={handleSend}
            >
              Send
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
