import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToKereru, ChatHistoryItem } from '../services/kereruService';
import { Send, Loader2, Sparkles, X } from 'lucide-react';
import { Logo } from './Logo';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  isError?: boolean;
}

interface KereruChatProps {
  isOpen: boolean;
  onClose: () => void;
}

// Simple markdown formatter for bold text
const formatMarkdown = (text: string) => {
  const parts = [];
  let lastIndex = 0;
  const regex = /\*\*(.*?)\*\*/g;
  let match;
  
  while ((match = regex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    // Add bold text
    parts.push(<strong key={match.index} className="font-bold text-white">{match[1]}</strong>);
    lastIndex = match.index + match[0].length;
  }
  
  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  
  return parts.length > 0 ? parts : text;
};

export const KereruChat: React.FC<KereruChatProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: 'Kia ora! I\'m Kereru AI, your sovereign New Zealand AI assistant. How can I help you today?' 
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [inputText]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: inputText };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Convert messages to history format
      const history: ChatHistoryItem[] = messages.map(m => ({
        role: m.role,
        content: m.content
      }));

      const responseText = await sendMessageToKereru(userMessage.content, history);
      setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm having trouble connecting right now. Please check your connection and try again.", 
        isError: true 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full h-full md:max-w-4xl md:max-h-[80vh] md:rounded-2xl overflow-hidden bg-kereru-dark flex flex-col shadow-2xl border border-white/10">
        {/* Header */}
        <div className="bg-gradient-to-r from-kereru-green to-kereru-teal border-b border-white/10 p-4 md:p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white/10 p-2 rounded-lg">
              <Logo className="w-8 h-8" variant="white" />
            </div>
            <div>
              <h1 className="font-bold text-xl text-white">
                KERERU<span className="text-kereru-neon">.AI</span> Chat
              </h1>
              <p className="text-xs text-white/70">Sovereign AI from Aotearoa</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-kereru-neon opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-kereru-neon"></span>
              </span>
              <span className="text-xs font-medium text-white">Online</span>
            </div>
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-kereru-dark">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-kereru-green/20 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-kereru-neon" />
                </div>
              )}
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-kereru-green text-white rounded-br-none shadow-md'
                    : 'bg-white/5 text-gray-200 border border-white/10 rounded-bl-none'
                } ${msg.isError ? 'bg-red-900/50 text-red-200 border-red-800' : ''}`}
              >
                <div className="whitespace-pre-wrap">{formatMarkdown(msg.content)}</div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="w-8 h-8 rounded-full bg-kereru-green/20 flex items-center justify-center mr-3 mt-1">
                <Sparkles className="w-4 h-4 text-kereru-neon" />
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-none px-4 py-3">
                <Loader2 className="w-5 h-5 animate-spin text-kereru-neon" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-white/10 p-4 md:p-6 bg-kereru-panel">
          <div className="flex gap-3">
            <textarea
              ref={textareaRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask Kereru AI anything about New Zealand, AI sovereignty, or our services..."
              className="flex-1 bg-kereru-dark border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-kereru-neon/50 focus:ring-1 focus:ring-kereru-neon/50 transition resize-none min-h-[50px] max-h-[150px]"
              rows={1}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !inputText.trim()}
              className="bg-kereru-green hover:bg-kereru-neon text-white rounded-xl px-6 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg shadow-kereru-green/20"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-3 text-center">
            Powered by Kereru AI - Sovereign intelligence from Aotearoa
          </p>
        </div>
      </div>
    </div>
  );
};
