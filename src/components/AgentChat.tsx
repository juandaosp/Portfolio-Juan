"use client";
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Terminal, Loader2 } from 'lucide-react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

const SUGGESTED_QUESTIONS = [
    "Have you worked with Vue 3?",
    "Tell me about the RAG pipeline",
    "What's your experience with AWS?",
    "Tell me about Morningstar",
];

export default function AgentChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [streamingContent, setStreamingContent] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, streamingContent]);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    const sendMessage = async (content: string) => {
        if (!content.trim() || isLoading) return;

        const userMessage: Message = { role: 'user', content };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);
        setStreamingContent('');

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: newMessages }),
            });

            if (!response.ok) throw new Error('Failed');

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let fullContent = '';

            if (reader) {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    const chunk = decoder.decode(value);
                    fullContent += chunk;
                    setStreamingContent(fullContent);
                }
                reader.releaseLock();
            }

            setMessages(prev => [...prev, { role: 'assistant', content: fullContent }]);
            setStreamingContent('');
        } catch {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Connection error. Please try again.'
            }]);
            setStreamingContent('');
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(input);
        }
    };

    return (
        <>
            {/* Floating button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9998] flex items-center gap-2 bg-[#0a0a0a] border border-blue-500/40 text-blue-400 px-3 py-2 sm:px-4 sm:py-3 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest hover:border-blue-500 hover:bg-blue-500/5 transition-all shadow-2xl shadow-blue-500/10"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400" />
                        </span>
                        <Terminal size={12} />
                        Ask about my work
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9998] w-[calc(100vw-2rem)] sm:w-[380px] max-w-[380px] h-[480px] sm:h-[520px] bg-[#0a0a0a] border border-slate-800 shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-[#0d0d0d] shrink-0">
                            <div className="flex items-center gap-2">
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 rounded-full bg-red-500/40" />
                                    <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
                                    <div className="w-2 h-2 rounded-full bg-emerald-500/40" />
                                </div>
                                <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest ml-1">
                                    00_juan_agent.exe
                                </span>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-slate-600 hover:text-slate-300 transition-colors"
                            >
                                <X size={14} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                            {messages.length === 0 && (
                                <div className="space-y-4">
                                    <div className="bg-blue-500/5 border border-blue-500/20 p-4 space-y-2">
                                        <p className="font-mono text-[10px] text-blue-400 uppercase tracking-widest">
                                            system.init
                                        </p>
                                        <p className="text-slate-300 text-sm leading-relaxed">
                                            Ask me anything about Juan David's experience, projects, or skills.
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="font-mono text-[9px] text-slate-600 uppercase tracking-widest">
                                            suggested queries
                                        </p>
                                        {SUGGESTED_QUESTIONS.map((q) => (
                                            <button
                                                key={q}
                                                onClick={() => sendMessage(q)}
                                                className="w-full text-left text-xs text-slate-400 border border-slate-800 px-3 py-2 hover:border-blue-500/30 hover:text-blue-400 hover:bg-blue-500/5 transition-all font-mono"
                                            >
                                                {'>'} {q}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] text-sm leading-relaxed ${msg.role === 'user'
                                            ? 'bg-blue-500/10 border border-blue-500/20 text-blue-100 px-3 py-2 font-mono text-[11px]'
                                            : 'text-slate-300'
                                        }`}>
                                        {msg.role === 'assistant' && (
                                            <span className="font-mono text-[9px] text-slate-600 uppercase tracking-widest block mb-1">
                                                juan_agent →
                                            </span>
                                        )}
                                        {msg.content}
                                    </div>
                                </div>
                            ))}

                            {/* Streaming */}
                            {streamingContent && (
                                <div className="flex justify-start">
                                    <div className="max-w-[85%] text-sm leading-relaxed text-slate-300">
                                        <span className="font-mono text-[9px] text-slate-600 uppercase tracking-widest block mb-1">
                                            juan_agent →
                                        </span>
                                        {streamingContent}
                                        <span className="inline-block w-1.5 h-3 bg-blue-400 ml-0.5 animate-pulse" />
                                    </div>
                                </div>
                            )}

                            {isLoading && !streamingContent && (
                                <div className="flex justify-start">
                                    <div className="text-slate-600 flex items-center gap-2 text-xs font-mono">
                                        <Loader2 size={12} className="animate-spin" />
                                        processing...
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="border-t border-slate-800 p-3 bg-[#0d0d0d] shrink-0">
                            <div className="flex items-center gap-2 bg-[#050505] border border-slate-800 px-3 py-2 focus-within:border-blue-500/40 transition-colors">
                                <span className="text-blue-500 font-mono text-xs shrink-0">{'>'}</span>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Ask about skills, projects, experience..."
                                    className="flex-1 bg-transparent text-slate-300 text-xs font-mono outline-none placeholder:text-slate-700"
                                    disabled={isLoading}
                                />
                                <button
                                    onClick={() => sendMessage(input)}
                                    disabled={!input.trim() || isLoading}
                                    className="text-slate-600 hover:text-blue-400 disabled:opacity-30 transition-colors shrink-0"
                                >
                                    <Send size={12} />
                                </button>
                            </div>
                            <p className="text-[9px] text-slate-700 font-mono mt-1.5 text-center uppercase tracking-widest">
                                powered by groq · llama 3.1
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}