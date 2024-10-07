"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

type Message = {
  text: string;
  isUser: boolean;
  options?: string[];
};

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState("#000000");
  const [bubbleColor, setBubbleColor] = useState("#3B82F6"); // Default blue color
  const [showSettings, setShowSettings] = useState(false);

  const conversationStarters = [
    "Tell me more about your product",
    "How can I get started?",
    "What are your pricing options?",
  ];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          text: "Hey there! Thanks for contacting us. What can I do for you today?",
          isUser: false,
          options: conversationStarters,
        },
      ]);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
    }
  };

  const sendMessage = (text: string) => {
    // Remove the initial message with options
    setMessages((prev) => prev.filter((msg) => !msg.options));

    // Add the user's message
    setMessages((prev) => [...prev, { text, isUser: true }]);
    setInput("");

    // Simulate a chatbot response (replace this with actual chatbot logic later)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "Thanks for your message! I'm a placeholder response.",
          isUser: false,
        },
      ]);
    }, 1000);
  };

  const handleClose = () => {
    setIsOpen(false);
    setShowWelcome(true);
    setShowSettings(false);
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end">
      {!isOpen && showWelcome && (
        <div className="bg-white p-3 rounded-lg shadow-lg mb-2 animate-fade-in">
          <p className="text-sm text-gray-800">
            Hi there! Need any help? Click below to chat with us.
          </p>
          <div className="w-0 h-0 border-l-[10px] border-l-transparent border-t-[10px] border-t-white border-r-[10px] border-r-transparent absolute bottom-[-10px] right-4"></div>
        </div>
      )}
      {!isOpen ? (
        <button
          onClick={() => {
            setIsOpen(true);
            setShowWelcome(false);
          }}
          className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors animate-float w-16 h-16 flex items-center justify-center"
        >
          <div className="relative w-10 h-10">
            <Image
              src="/chat-bubble.png"
              alt="Chat"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </button>
      ) : (
        <div
          className="rounded-lg shadow-xl w-80 h-[32rem] flex flex-col relative overflow-hidden"
          style={{ backgroundColor }}
        >
          <div className="p-4 flex justify-between items-center text-white">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
                <Image src="/bot-avatar.png" alt="Bot" width={32} height={32} />
              </div>
              <span className="font-bold">Assistant</span>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="text-xl mr-2"
              >
                ⚙️
              </button>
              <button onClick={handleClose} className="text-xl">
                &times;
              </button>
            </div>
          </div>
          {!showSettings ? (
            <>
              <div className="flex-grow overflow-y-auto p-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`mb-4 flex ${
                      message.isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!message.isUser && (
                      <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
                        <Image
                          src="/bot-avatar.png"
                          alt="Bot"
                          width={32}
                          height={32}
                        />
                      </div>
                    )}
                    <div
                      className={`p-2 rounded-lg ${
                        message.isUser ? "bg-white text-black" : "text-white"
                      } max-w-[70%]`}
                      style={{
                        backgroundColor: message.isUser
                          ? "#FFFFFF"
                          : bubbleColor,
                      }}
                    >
                      <p>{message.text}</p>
                      {message.options && (
                        <div className="mt-2 space-y-2">
                          {message.options.map((option, optionIndex) => (
                            <button
                              key={optionIndex}
                              onClick={() => sendMessage(option)}
                              className="block w-full text-left text-sm bg-opacity-50 bg-gray-800 p-2 rounded hover:bg-opacity-75 transition-colors text-white"
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    {message.isUser && (
                      <div className="w-8 h-8 rounded-full overflow-hidden ml-2 flex-shrink-0">
                        <Image
                          src="/user-avatar.png"
                          alt="User"
                          width={32}
                          height={32}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <form
                onSubmit={handleSubmit}
                className="p-4 border-t border-gray-700"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full p-2 border rounded-lg bg-gray-800 text-white placeholder-gray-400"
                />
              </form>
            </>
          ) : (
            <div className="absolute inset-0 bg-gray-900 text-white p-4 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <button
                    onClick={() => setShowSettings(false)}
                    className="text-2xl mr-2"
                  >
                    ←
                  </button>
                  <h3 className="text-xl font-bold">Settings</h3>
                </div>
                <button onClick={handleClose} className="text-xl">
                  &times;
                </button>
              </div>
              <div className="flex items-center mb-4">
                <label htmlFor="bgColor" className="mr-2 w-1/2">
                  Background Color:
                </label>
                <input
                  type="color"
                  id="bgColor"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="w-8 h-8 rounded-full overflow-hidden cursor-pointer"
                />
              </div>
              <div className="flex items-center">
                <label htmlFor="bubbleColor" className="mr-2 w-1/2">
                  Bubble Color:
                </label>
                <input
                  type="color"
                  id="bubbleColor"
                  value={bubbleColor}
                  onChange={(e) => setBubbleColor(e.target.value)}
                  className="w-8 h-8 rounded-full overflow-hidden cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
