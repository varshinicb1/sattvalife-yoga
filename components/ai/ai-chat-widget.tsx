"use client";

import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  Loader2, 
  MessageCircle, 
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: "Hello! I'm Sattva, your AI assistant for Sattvalife Yoga. I can help you with class schedules, booking, pricing, instructor info, and more. How can I help you today?" 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    scrollAreaRef.current?.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);
    setError(null);

    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages, { role: 'user', content: userMessage }].map(m => ({
            role: m.role,
            content: m.content
          }))
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = '';

      if (reader) {
        setMessages(prev => [...prev, { role: 'assistant', content: '' }]);
        
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value);
          // Parse SSE format
          const lines = chunk.split('\n');
          for (const line of lines) {
            if (line.startsWith('0:')) {
              const content = line.slice(2);
              assistantMessage += content;
              setMessages(prev => 
                prev.slice(0, -1).concat([{ role: 'assistant', content: assistantMessage }])
              );
            }
          }
        }
      }
    } catch (err) {
      console.error('Chat error:', err);
      setError('Failed to get response. Please try again.');
      setMessages(prev => prev.slice(0, -1)); // Remove empty assistant message
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const closeChat = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  if (!isOpen && isMinimized) {
    return (
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-2xl bg-primary text-primary-foreground shadow-xl flex items-center justify-center hover:scale-105 transition-transform"
        aria-label="Open chat"
      >
        <MessageCircle className="h-7 w-7" />
        <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-[10px] font-medium flex items-center justify-center text-white">
          1
        </span>
      </button>
    );
  }

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm md:max-w-md lg:max-w-lg">
      <div className={cn(
        "bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col",
        isMinimized ? "h-14" : "h-[600px] max-h-[80vh]"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between h-14 px-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-sm text-foreground">Sattva Assistant</p>
              <p className="text-xs text-muted-foreground">Sattvalife Yoga</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-lg"
              onClick={toggleMinimize}
              aria-label={isMinimized ? 'Expand chat' : 'Minimize chat'}
            >
              {isMinimized ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-lg"
              onClick={closeChat}
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <ScrollArea className="flex-1 overflow-y-auto" ref={scrollAreaRef}>
              <div className="p-4 space-y-4">
                {messages.map((message, index) => {
                  return (
                    <div
                      key={index}
                      className={cn(
                        "flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300",
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      )}
                    >
                      {message.role === 'assistant' && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                          <Sparkles className="h-4 w-4 text-white" />
                        </div>
                      )}
                      <div
                        className={cn(
                          "max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed",
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground rounded-br-md'
                            : 'bg-muted dark:bg-muted/50 text-foreground rounded-bl-md'
                        )}
                      >
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      </div>
                      {message.role === 'user' && (
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-medium text-muted-foreground">You</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </ScrollArea>

            {/* Error Display */}
            {error && (
              <div className="mx-4 mb-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm flex items-center gap-2">
                <span className="flex-shrink-0">⚠️</span>
                <span className="text-sm">{error}</span>
                <button onClick={() => setError(null)} className="ml-auto text-lg leading-none hover:opacity-70">×</button>
              </div>
            )}

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <div className="flex items-end gap-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about classes, booking, pricing..."
                  rows={1}
                  className={cn(
                    "flex-1 px-4 py-3 bg-muted dark:bg-muted/50 border border-border rounded-xl text-sm resize-none",
                    "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "min-h-[44px] max-h-32"
                  )}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e as unknown as React.FormEvent);
                    }
                  }}
                  disabled={isLoading}
                  style={{ height: '44px' }}
                />
                <Button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  size="icon"
                  className={cn(
                    "h-10 w-10 rounded-xl transition-all",
                    isLoading ? "bg-muted" : "bg-primary hover:bg-primary/90"
                  )}
                  aria-label="Send message"
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-center text-muted-foreground mt-2">
                AI responses may not always be accurate. For booking changes, contact us directly.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default AIChatWidget;