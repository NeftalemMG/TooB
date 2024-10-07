// import React, { useState, useEffect, useRef } from 'react';
// import { motion } from 'framer-motion';
// import { X, Send } from 'lucide-react';
// import Button from './ui/Button';

// const Chatbot = ({ onClose }) => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }

//   useEffect(scrollToBottom, [messages]);

//   const handleSend = async () => {
//     if (input.trim() === '') return;

//     const newMessage = { text: input, sender: 'user' };
//     setMessages(prevMessages => [...prevMessages, newMessage]);
//     setInput('');
//     setIsTyping(true);

//     // try {
//     //   const response = await fetch('https://api.openai.com/v1/chat/completions', {
//     //     method: 'POST',
//     //     headers: {
//     //       'Content-Type': 'application/json',

//     //     },
//     //     body: JSON.stringify({
//     //       model: "gpt-3.5-turbo",
//     //       messages: [
//     //         { role: "system", content: "You are a helpful assistant for a fashion brand called Toob, which specializes in modern Habesha-inspired clothing." },
//     //         { role: "user", content: input }
//     //       ]
//     //     })
//     //   });

//       const data = await response.json();
//       const botReply = data.choices[0].message.content;

//       setMessages(prevMessages => [...prevMessages, { text: botReply, sender: 'bot' }]);
//     } catch (error) {
//       console.error('Error:', error);
//       setMessages(prevMessages => [...prevMessages, { text: "Sorry, I'm having trouble connecting right now. Please try again later.", sender: 'bot' }]);
//     }

//     setIsTyping(false);
//   };

//   return (
//     <motion.div className="flex flex-col h-[500px] max-h-[80vh]">
//       <div className="bg-blue-500 text-white p-4 flex justify-between items-center">
//         <h3 className="font-bold">Toob Assistant</h3>
//         <Button variant="ghost" size="icon" onClick={onClose}>
//           <X className="h-5 w-5" />
//         </Button>
//       </div>
//       <div className="flex-grow overflow-y-auto p-4 space-y-4">
//         {messages.map((message, index) => (
//           <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
//             <div className={`max-w-[70%] p-3 rounded-lg ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
//               {message.text}
//             </div>
//           </div>
//         ))}
//         {isTyping && (
//           <div className="flex justify-start">
//             <div className="bg-gray-200 text-gray-800 p-3 rounded-lg">
//               Typing...
//             </div>
//           </div>
//         )}
//         <div ref={messagesEndRef} />
//       </div>
//       <div className="p-4 border-t">
//         <div className="flex space-x-2">
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyPress={(e) => e.key === 'Enter' && handleSend()}
//             placeholder="Type your message..."
//             className="flex-grow px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <Button onClick={handleSend} className="bg-blue-500 text-white rounded-full p-2">
//             <Send className="h-5 w-5" />
//           </Button>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default Chatbot;