import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Loader2, Volume2, VolumeX, Play, Square, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const OPENROUTER_API_KEY = "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";

type Message = {
    id: string;
    text: string;
    sender: "user" | "ai";
};

// Types for Web Speech API
interface SpeechRecognitionEvent extends Event {
    results: {
        [key: number]: {
            [key: number]: {
                transcript: string;
            };
            isFinal: boolean;
        };
    };
}

interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start: () => void;
    stop: () => void;
    onresult: (event: SpeechRecognitionEvent) => void;
    onerror: (event: any) => void;
    onend: () => void;
}

export default function Chatbot() {
    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: "1", text: "Hi there! 👋 I'm the AIM Bot! Ask me anything about our school, classes, or even for a fun fact!", sender: "ai" }
    ]);
    const [inputText, setInputText] = useState("");
    const [isThinking, setIsThinking] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Draggable state
    const [position, setPosition] = useState({ x: 24, y: 24 }); // bottom-left default (from bottom and left)
    const [isDragging, setIsDragging] = useState(false);
    const dragStartRef = useRef({ x: 0, y: 0, posX: 0, posY: 0 });
    const hasDraggedRef = useRef(false);

    // Monitor scroll for visibility
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 400) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
                setIsOpen(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Draggable handlers
    const handleDragStart = useCallback((clientX: number, clientY: number) => {
        setIsDragging(true);
        hasDraggedRef.current = false;
        dragStartRef.current = {
            x: clientX,
            y: clientY,
            posX: position.x,
            posY: position.y
        };
    }, [position]);

    const handleDragMove = useCallback((clientX: number, clientY: number) => {
        if (!isDragging) return;

        const deltaX = dragStartRef.current.x - clientX;
        const deltaY = dragStartRef.current.y - clientY;

        // Check if we've moved enough to consider it a drag
        if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
            hasDraggedRef.current = true;
        }

        const newX = dragStartRef.current.posX + deltaX;
        const newY = dragStartRef.current.posY + deltaY;

        // Constrain to viewport
        const maxX = window.innerWidth - 80;
        const maxY = window.innerHeight - 80;

        setPosition({
            x: Math.max(8, Math.min(maxX, newX)),
            y: Math.max(8, Math.min(maxY, newY))
        });
    }, [isDragging]);

    const handleDragEnd = useCallback(() => {
        setIsDragging(false);
    }, []);

    // Mouse events
    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        handleDragStart(e.clientX, e.clientY);
    }, [handleDragStart]);

    // Touch events
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        const touch = e.touches[0];
        handleDragStart(touch.clientX, touch.clientY);
    }, [handleDragStart]);

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        const touch = e.touches[0];
        handleDragMove(touch.clientX, touch.clientY);
    }, [handleDragMove]);

    // Global mouse/touch move and end handlers
    useEffect(() => {
        const handleGlobalMouseMove = (e: MouseEvent) => {
            handleDragMove(e.clientX, e.clientY);
        };

        const handleGlobalMouseUp = () => {
            handleDragEnd();
        };

        const handleGlobalTouchMove = (e: TouchEvent) => {
            if (isDragging) {
                e.preventDefault(); // Prevent scrolling while dragging
                const touch = e.touches[0];
                handleDragMove(touch.clientX, touch.clientY);
            }
        };

        const handleGlobalTouchEnd = () => {
            handleDragEnd();
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleGlobalMouseMove);
            window.addEventListener('mouseup', handleGlobalMouseUp);
            window.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
            window.addEventListener('touchend', handleGlobalTouchEnd);
        }

        return () => {
            window.removeEventListener('mousemove', handleGlobalMouseMove);
            window.removeEventListener('mouseup', handleGlobalMouseUp);
            window.removeEventListener('touchmove', handleGlobalTouchMove);
            window.removeEventListener('touchend', handleGlobalTouchEnd);
        };
    }, [isDragging, handleDragMove, handleDragEnd]);

    // Handle button click (only if not dragged)
    const handleButtonClick = useCallback(() => {
        if (!hasDraggedRef.current) {
            setIsOpen(!isOpen);
        }
    }, [isOpen]);

    // --- STT Logic ---
    useEffect(() => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = true;
            recognition.lang = 'en-US';

            recognition.onresult = (event: any) => {
                let transcript = "";
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    transcript += event.results[i][0].transcript;
                }
                setInputText(transcript);
            };

            recognition.onerror = (event: any) => {
                console.error("Speech recognition error:", event.error);
                setIsListening(false);
            };

            recognition.onend = () => {
                setIsListening(false);
            };

            recognitionRef.current = recognition;
        }
    }, []);

    const toggleListening = () => {
        if (!recognitionRef.current) {
            alert("Speech recognition is not supported in your browser. Please try Chrome.");
            return;
        }

        if (isListening) {
            recognitionRef.current.stop();
        } else {
            setInputText("");
            try {
                recognitionRef.current.start();
                setIsListening(true);
            } catch (e) {
                console.error("Failed to start recognition:", e);
                setIsListening(false);
            }
        }
    };

    // --- TTS State & Logic ---
    const [isAutoTTS, setIsAutoTTS] = useState(false);
    const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
    const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

    const stopSpeaking = () => {
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }
        setSpeakingMsgId(null);
    };

    const speak = (text: string, msgId: string | null = null) => {
        stopSpeaking();

        if (!text) return;

        const cleanText = text
            .replace(/\n\n\*\(Generated via Unlimited Backup AI\)\*/g, "")
            .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "")
            .replace(/[\u2600-\u27BF]/g, "")
            .trim();

        if (!cleanText) return;

        const utterance = new SpeechSynthesisUtterance(cleanText);
        const voices = (typeof window !== 'undefined' && window.speechSynthesis) ? window.speechSynthesis.getVoices() : [];
        const preferredVoice = voices.find(v => v.name.includes("Google US English") || v.name.includes("Samantha")) || voices[0];
        if (preferredVoice) utterance.voice = preferredVoice;

        utterance.rate = 1.0;
        utterance.pitch = 1.0;

        utterance.onend = () => setSpeakingMsgId(null);
        utterance.onerror = () => setSpeakingMsgId(null);

        if (msgId) setSpeakingMsgId(msgId);

        speechRef.current = utterance;
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            window.speechSynthesis.speak(utterance);
        }
    };

    useEffect(() => {
        return () => {
            if (typeof window !== 'undefined' && window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            window.speechSynthesis.getVoices();
        }
    }, []);

    useEffect(() => {
        if (isOpen) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isOpen]);

    const getAIResponse = async (userText: string) => {
        setIsThinking(true);
        const models = [
            "xiaomi/mimo-v2-flash:free",
            "google/gemini-2.0-flash-exp:free",
            "meta-llama/llama-3-8b-instruct:free",
            "mistralai/mistral-7b-instruct:free",
            "huggingfaceh4/zephyr-7b-beta:free",
            "openchat/openchat-7b:free",
            "gryphe/mythomax-l2-13b:free"
        ];

        for (const model of models) {
            try {
                const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                        "Content-Type": "application/json",
                        "HTTP-Referer": window.location.href,
                        "X-Title": "AIM Centre Client",
                    },
                    body: JSON.stringify({
                        "model": model,
                        "messages": [
                            {
                                "role": "system",
                                "content": `You are "AIM Bot", a smart, funny, and safe AI assistant for AIM Centre 360 (School). 
                                MISSION: Answer ANY question (Math, Science, History, etc) clearly & concisely.
                                TONE: Friendly, Humorous, Creative 🎨. Use emojis.
                                SAFETY: NO explicit/adult/illegal topics.
                                FORMAT: Plain text only (NO LaTeX). Use "x^2" for math. Bold key terms.`
                            },
                            { "role": "user", "content": userText }
                        ]
                    })
                });

                if (!response.ok) continue;

                const data = await response.json();
                const content = data.choices?.[0]?.message?.content;
                if (!content) throw new Error("Empty content received");

                setIsThinking(false);
                return content;

            } catch (error: any) {
                console.error("OpenRouter Fetch error:", error);
            }
        }

        // Fallback to Pollinations.ai
        try {
            const systemPrompt = "You are AIM Bot, a friendly, smart AI for AIM Centre 360 school. Answer questions clearly, safely, and creatively. No explicit content.";
            const response = await fetch("https://text.pollinations.ai/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [
                        { role: "system", content: systemPrompt },
                        { role: "user", content: userText }
                    ],
                    model: "openai",
                    seed: Date.now()
                })
            });

            if (response.ok) {
                const text = await response.text();
                setIsThinking(false);
                return text + "\n\n*(Generated via Unlimited Backup AI)*";
            }
        } catch (error) {
            console.error("Pollinations fallback failed:", error);
        }

        setIsThinking(false);
        return "I'm having trouble connecting right now. Please try again in a moment! 🔄";
    };

    const formatMessage = (text: string) => {
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, i) => {
            if (part.startsWith("**") && part.endsWith("**")) {
                return <strong key={i}>{part.slice(2, -2)}</strong>;
            }
            return part;
        });
    };

    const handleSend = async () => {
        if (!inputText.trim() || isThinking) return;

        const userMsg: Message = { id: Date.now().toString(), text: inputText, sender: "user" };
        setMessages(prev => [...prev, userMsg]);
        setInputText("");

        const aiResponse = await getAIResponse(inputText);
        const aiMsg: Message = { id: (Date.now() + 1).toString(), text: aiResponse, sender: "ai" };
        setMessages(prev => [...prev, aiMsg]);

        if (isAutoTTS) {
            speak(aiResponse, aiMsg.id);
        }
    };

    const [showTooltip, setShowTooltip] = useState(true);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    ref={containerRef}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="fixed z-50 flex flex-col items-start gap-4"
                    style={{
                        right: position.x,
                        bottom: position.y,
                        cursor: isDragging ? 'grabbing' : 'grab',
                        touchAction: 'none',
                    }}
                >
                    {/* Chat Window */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                transition={{ duration: 0.2 }}
                                className="w-[320px] sm:w-[350px] h-[450px] sm:h-[550px] flex flex-col overflow-hidden rounded-xl border-2 border-primary/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-card text-card-foreground"
                            >
                                {/* Header */}
                                <div className="bg-primary px-4 sm:px-5 py-3 sm:py-4 flex justify-between items-center shadow-md relative overflow-hidden">
                                    <div className="absolute inset-0 bg-white/5 opacity-20 pointer-events-none"></div>

                                    <div className="flex items-center gap-2 sm:gap-3 relative z-10">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20 backdrop-blur-md shadow-inner">
                                            <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                                        </div>
                                        <div className="flex flex-col">
                                            <h3 className="font-cormorant font-bold text-lg sm:text-xl text-white leading-none tracking-wide">AIM Assistant</h3>
                                            <div className="flex items-center gap-1.5 mt-1">
                                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                                <span className="text-[10px] text-white/90 uppercase tracking-widest font-medium">Online</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1 relative z-10">
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className={`h-8 w-8 rounded-full transition-colors ${isAutoTTS ? "text-white bg-white/20" : "text-white/60 hover:text-white hover:bg-white/10"}`}
                                            onClick={() => {
                                                const newState = !isAutoTTS;
                                                setIsAutoTTS(newState);
                                                if (!newState) stopSpeaking();
                                            }}
                                            title={isAutoTTS ? "Turn off Auto-Read" : "Turn on Auto-Read"}
                                        >
                                            {isAutoTTS ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                                        </Button>

                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10 rounded-full z-10"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <X className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Messages Area */}
                                <div className="flex-1 p-3 sm:p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent hover:scrollbar-thumb-primary/40 transition-colors">
                                    <div className="space-y-3 sm:space-y-4">
                                        {messages.map((msg) => (
                                            <div key={msg.id} className={`flex gap-2 sm:gap-3 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                                                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 border shadow-sm ${msg.sender === "user"
                                                    ? "bg-primary text-primary-foreground border-primary"
                                                    : "bg-background text-foreground border-border"
                                                    }`}>
                                                    {msg.sender === "user" ? <User className="h-3 w-3 sm:h-4 sm:w-4" /> : <Bot className="h-3 w-3 sm:h-4 sm:w-4" />}
                                                </div>

                                                <div className={`relative max-w-[85%] sm:max-w-[80%] px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm shadow-md leading-relaxed group ${msg.sender === "user"
                                                    ? "bg-primary text-primary-foreground rounded-2xl rounded-tr-sm"
                                                    : "bg-white dark:bg-slate-800 border border-border text-foreground rounded-2xl rounded-tl-sm"
                                                    }`}>
                                                    {msg.sender === "user" ? msg.text : formatMessage(msg.text)}

                                                    {msg.sender === "ai" && (
                                                        <button
                                                            onClick={() => speakingMsgId === msg.id ? stopSpeaking() : speak(msg.text, msg.id)}
                                                            className={`absolute -right-7 sm:-right-8 top-1/2 -translate-y-1/2 p-1 sm:p-1.5 rounded-full bg-background border border-border/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 ${speakingMsgId === msg.id ? "opacity-100 text-primary animate-pulse" : ""
                                                                }`}
                                                            title={speakingMsgId === msg.id ? "Stop reading" : "Read aloud"}
                                                        >
                                                            {speakingMsgId === msg.id ? <Square className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-current" /> : <Play className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-current" />}
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}

                                        {isThinking && (
                                            <div className="flex gap-2 sm:gap-3">
                                                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-background text-foreground border border-border flex items-center justify-center flex-shrink-0 shadow-sm">
                                                    <Bot className="h-3 w-3 sm:h-4 sm:w-4" />
                                                </div>
                                                <div className="px-3 sm:px-4 py-2 sm:py-3 bg-white dark:bg-slate-800 border border-border rounded-2xl rounded-tl-sm flex items-center gap-1.5 shadow-sm">
                                                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                                                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                                                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                                                </div>
                                            </div>
                                        )}
                                        <div ref={messagesEndRef} />
                                    </div>
                                </div>

                                {/* Input Area */}
                                <div className="p-3 sm:p-4 bg-background border-t-2 border-border/50">
                                    <div className="relative flex items-center gap-2">
                                        <div className="flex-1 relative">
                                            <Input
                                                value={inputText}
                                                onChange={(e) => setInputText(e.target.value)}
                                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                                placeholder={isListening ? "Listening..." : "Ask for help..."}
                                                className={`w-full bg-muted/50 border-input focus-visible:ring-primary/20 h-10 sm:h-11 pl-3 sm:pl-4 pr-9 sm:pr-10 rounded-full shadow-inner transition-all text-sm ${isListening ? "ring-2 ring-primary/50 bg-primary/5" : ""
                                                    }`}
                                                disabled={isThinking}
                                            />
                                            <button
                                                onClick={toggleListening}
                                                className={`absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-1 rounded-full transition-all ${isListening ? "text-primary animate-pulse scale-110" : "text-muted-foreground hover:text-primary"
                                                    }`}
                                                title={isListening ? "Stop listening" : "Speak to AIM Bot"}
                                            >
                                                <Mic className="h-4 w-4 sm:h-5 sm:w-5" />
                                            </button>
                                        </div>
                                        <Button
                                            size="icon"
                                            onClick={handleSend}
                                            disabled={isThinking || !inputText.trim()}
                                            className="h-10 w-10 sm:h-11 sm:w-11 rounded-full shadow-md transition-all hover:scale-110 hover:shadow-lg active:scale-95 bg-primary text-white"
                                        >
                                            {isThinking ? <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" /> : <Send className="h-4 w-4 sm:h-5 sm:w-5 ml-0.5" />}
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Floating Trigger Button Container */}
                    <div className="relative group">
                        {/* Pulse Ring */}
                        {!isOpen && (
                            <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-20 animate-ping duration-[3s]"></span>
                        )}

                        {/* Tooltip Label */}
                        <AnimatePresence>
                            {showTooltip && !isOpen && !isDragging && (
                                <motion.div
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{
                                        opacity: 1,
                                        x: 0,
                                        y: [0, -8, 0]
                                    }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{
                                        y: {
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }
                                    }}
                                    className="absolute right-full mr-3 sm:mr-4 top-1/2 -mt-6 bg-card text-card-foreground text-xs sm:text-sm font-semibold pl-3 sm:pl-4 pr-8 sm:pr-9 py-2 rounded-xl shadow-xl border border-primary/20 whitespace-nowrap z-[60] pointer-events-auto"
                                >
                                    <span className="relative z-10">Chat with AIMbot! 👋</span>

                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setShowTooltip(false);
                                        }}
                                        className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 hover:bg-destructive/10 hover:text-destructive rounded-full transition-colors cursor-pointer z-50"
                                        aria-label="Close tooltip"
                                    >
                                        <X className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                                    </button>

                                    <div className="absolute right-0 top-1/2 translate-x-[5px] -translate-y-1/2 w-2.5 h-2.5 bg-card border-r border-t border-primary/20 rotate-45"></div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Main Draggable Button */}
                        <motion.button
                            animate={isOpen ? {} : {
                                scale: [1, 1.05, 1],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                repeatType: "loop",
                                ease: "easeInOut"
                            }}
                            whileHover={{ scale: isDragging ? 1 : 1.1, rotate: 0 }}
                            whileTap={{ scale: 0.95 }}
                            onMouseDown={handleMouseDown}
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleDragEnd}
                            onClick={handleButtonClick}
                            className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex items-center justify-center transition-all duration-300 border-[3px] border-white/20 backdrop-blur-sm select-none ${isOpen
                                ? "bg-slate-800 rotate-90"
                                : "bg-gradient-to-br from-primary to-primary/80 hover:brightness-110"
                                } ${isDragging ? "cursor-grabbing scale-110" : "cursor-grab"}`}
                            style={{ touchAction: 'none' }}
                        >
                            {isOpen ? <X className="h-6 w-6 sm:h-7 sm:w-7 text-white" /> : <MessageCircle className="h-7 w-7 sm:h-8 sm:w-8 text-white fill-white/20" />}
                        </motion.button>

                        {/* Drag hint indicator */}
                        {!isOpen && !isDragging && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-white/80 rounded-full flex items-center justify-center shadow-sm border border-primary/20">
                                <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                    <path d="M5 9l4-4 4 4M5 15l4 4 4-4" />
                                </svg>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
