import React, { useState, useEffect } from "react";
import { FaRobot, FaPaperPlane, FaMicrophone, FaTimes, FaVolumeUp } from "react-icons/fa";

const ChatBot = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [showVoices, setShowVoices] = useState(false);

  const apiKey = import.meta.env.VITE_GEMENI_API_KEY;

  const toggleChat = () => setIsOpen(!isOpen);

  const fetchChatbotResponse = async (userMessage) => {
    if (!userMessage.trim()) return;
    setIsLoading(true);
    const updatedMessages = [...messages, { user: userMessage, bot: "" }];
    setMessages(updatedMessages);
    setQuestion("");

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You're my coding helper. Keep answers short. User: "${userMessage}"`,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.5,
              maxOutputTokens: 512,
            },
          }),
        }
      );

      const data = await response.json();
      const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't answer that.";
      const finalMessages = [...updatedMessages.slice(0, -1), { user: userMessage, bot: answer }];
      setMessages(finalMessages);
      speakText(answer);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser doesn't support voice input.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setQuestion(transcript);
      fetchChatbotResponse(transcript);
    };
    recognition.onerror = (e) => console.error(e);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  // Get all available voices and filter for female voices
  useEffect(() => {
    const getVoices = () => {
      const voiceList = speechSynthesis.getVoices();
      // Prioritize female voices, which often have 'female' or female names in their names
      const femaleVoices = voiceList.filter(voice => 
        voice.name.toLowerCase().includes('female') || 
        ['lisa', 'samantha', 'victoria', 'karen', 'tessa', 'monica', 'joana', 'alice'].some(name => 
          voice.name.toLowerCase().includes(name)
        )
      );
      const otherVoices = voiceList.filter(voice => 
        !femaleVoices.includes(voice)
      );
      
      const sortedVoices = [...femaleVoices, ...otherVoices];
      setVoices(sortedVoices);
      // Set default to first female voice or first available voice
      setSelectedVoice(femaleVoices[0] || sortedVoices[0]);
    };

    // Voice list might not be available immediately
    getVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = getVoices;
    }
  }, []);

  // Update speakText function to use selected voice
  const speakText = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      
      speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    speechSynthesis.getVoices();
  }, []);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-4 right-4 bg-purple-600 text-white p-2 rounded-full shadow-lg z-50 ${isOpen ? "hidden" : ""}`}
      >
        <FaRobot size={20} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 w-full max-w-sm bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-xl p-3 z-50 animate-fadeIn transform transition-all duration-300">
          <div className="flex justify-between items-center mb-3 border-b dark:border-gray-700 pb-2">
            <div className="text-purple-700 dark:text-purple-400 font-bold flex items-center gap-2 text-lg">
              <div className="relative">
                <FaRobot className="animate-pulse" />
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-green-500 rounded-full"></span>
              </div>
              <span className="bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">Assistant</span>
            </div>
            <button 
              onClick={toggleChat} 
              className="text-gray-500 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FaTimes />
            </button>
          </div>

          <div className="h-48 overflow-y-auto mb-3 text-sm scrollbar-hide pr-1">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 dark:text-gray-500 text-center">
                <FaRobot className="text-3xl mb-2 opacity-50" />
                <p>Ask me anything about coding!</p>
                <p className="text-xs mt-2">I'm here to help with your development questions</p>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div key={idx} className="mb-3 transition-all duration-300 ease-in-out">
                  <div className="text-right mb-1">
                    <span className="bg-purple-100 dark:bg-purple-900 px-3 py-2 rounded-t-lg rounded-bl-lg inline-block text-gray-800 dark:text-gray-200 max-w-[85%] shadow-sm">
                      {msg.user}
                    </span>
                  </div>
                  <div className="text-left">
                    <span className="bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-t-lg rounded-br-lg inline-block text-gray-800 dark:text-gray-200 max-w-[85%] shadow-sm">
                      {msg.bot}
                    </span>
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="text-left">
                <span className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-t-lg rounded-br-lg inline-block">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </span>
              </div>
            )}
          </div>

          {/* Voice selection dropdown */}
          {showVoices && (
            <div className="mb-2 bg-white dark:bg-gray-700 border dark:border-gray-600 rounded shadow-md absolute bottom-14 right-2 z-10 max-h-48 overflow-y-auto w-48">
              {voices.map((voice, index) => (
                <button
                  key={index}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 ${
                    selectedVoice?.name === voice.name ? 'bg-purple-100 dark:bg-purple-900' : ''
                  }`}
                  onClick={() => {
                    setSelectedVoice(voice);
                    setShowVoices(false);
                  }}
                >
                  {voice.name} {voice.name.toLowerCase().includes('female') ? '(F)' : ''}
                </button>
              ))}
            </div>
          )}

          <div className="flex gap-2 relative">
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") fetchChatbotResponse(question);
              }}
              placeholder="Ask for help..."
              className="flex-1 border dark:border-gray-600 rounded-full px-4 py-2 text-sm dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 shadow-sm"
            />
            <button
              onClick={() => fetchChatbotResponse(question)}
              disabled={isLoading}
              className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded disabled:bg-purple-400 dark:disabled:bg-purple-800"
            >
              {isLoading ? "..." : <FaPaperPlane />}
            </button>
            <button
              onClick={startListening}
              className={`p-2 rounded ${isListening ? "bg-red-500 dark:bg-red-600" : "bg-blue-500 dark:bg-blue-600"} text-white`}
            >
              <FaMicrophone />
            </button>
            <button
              onClick={() => setShowVoices(!showVoices)}
              className="p-2 rounded bg-green-500 dark:bg-green-600 text-white"
              title={selectedVoice ? `Current: ${selectedVoice.name}` : "Select voice"}
            >
              <FaVolumeUp />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
