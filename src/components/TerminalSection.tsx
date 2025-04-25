
import React, { useState, useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';

interface Message {
  type: 'command' | 'response';
  text: string;
}

const TerminalSection: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { type: 'response', text: 'Welcome to Oussama\'s Terminal! Type "help" to see available commands.' }
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages: Message[] = [
      ...messages,
      { type: 'command', text: input }
    ];
    
    const response = processCommand(input.trim().toLowerCase());
    newMessages.push({ type: 'response', text: response });
    
    setMessages(newMessages);
    setInput('');
  };

  const processCommand = (cmd: string): string => {
    switch (cmd) {
      case 'help':
        return `Available commands:
- about: Show information about me
- skills: List my technical skills
- contact: How to get in touch with me
- projects: View my featured projects
- experience: Show my work experience
- clear: Clear the terminal
- exit: Close the terminal`;
      case 'about':
        return `I'm Oussama Zbair, a Senior Full Stack Java Developer with 5+ years of experience.
I specialize in building enterprise applications using Spring Boot, Java, and modern web technologies.
Currently focusing on microservices architecture and cloud-native applications.`;
      case 'skills':
        return `Technical Skills:
Backend: Java, Spring Boot, Microservices, JPA/Hibernate
Frontend: React, TypeScript, JavaScript, HTML/CSS
Database: Oracle, PostgreSQL, MongoDB
DevOps: Docker, Jenkins, Git, AWS`;
      case 'clear':
        setTimeout(() => {
          setMessages([{ type: 'response', text: 'Terminal cleared. Type "help" to see available commands.' }]);
        }, 0);
        return '';
      case 'exit':
        setTimeout(() => {
          setIsOpen(false);
        }, 500);
        return 'Closing terminal...';
      default:
        return `Command not recognized: "${cmd}". Type "help" to see available commands.`;
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="fixed bottom-6 right-6 z-50 bg-dark-200 p-3 rounded-full shadow-lg hover:bg-dark-100 transition-colors border border-neon animate-pulse-neon"
        aria-label="Toggle Terminal"
      >
        <Terminal size={24} className="text-neon" />
      </button>
      
      {isOpen && (
        <div className="fixed bottom-0 right-0 left-0 md:left-auto md:right-6 md:bottom-20 md:w-[500px] bg-dark-300 border border-neon z-40 rounded-t-lg md:rounded-lg shadow-2xl">
          <div className="p-2 bg-dark-200 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center">
              <Terminal size={16} className="text-neon mr-2" />
              <span className="text-white text-sm font-mono">oussama_zbair@portfolio:~</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white"
              aria-label="Close Terminal"
            >
              ×
            </button>
          </div>
          
          <div ref={terminalRef} className="p-4 h-[300px] overflow-y-auto font-mono text-sm">
            {messages.map((msg, index) => (
              <div key={index} className="mb-2">
                {msg.type === 'command' ? (
                  <div>
                    <span className="text-neon">$</span> <span className="text-white">{msg.text}</span>
                  </div>
                ) : (
                  <div className="whitespace-pre-wrap text-gray-300">{msg.text}</div>
                )}
              </div>
            ))}
            
            <form onSubmit={handleSubmit} className="flex mt-2 items-center">
              <span className="text-neon mr-1">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-white font-mono"
                aria-label="Terminal input"
                autoFocus
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TerminalSection;
