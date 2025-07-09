import { useState, useEffect, useCallback } from 'react';
import { getChatState, saveChatState } from '@/lib/utils';
import { apiRequest } from '@/lib/queryClient';

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatState {
  isOpen: boolean;
  hasInteracted: boolean;
  messages: ChatMessage[];
}

const INITIAL_MESSAGE: ChatMessage = {
  id: '1',
  text: 'Olá! 👋 Sou a SecodIA Assistente. Em que posso ajudar você hoje? Posso falar sobre nossos produtos, agendamentos, ou o que precisar sobre a Secode!',
  isUser: false,
  timestamp: new Date()
};

export function useChat() {
  const [chatState, setChatState] = useState<ChatState>(() => {
    const saved = getChatState();
    return saved || {
      isOpen: false,
      hasInteracted: false,
      messages: [INITIAL_MESSAGE]
    };
  });

  const [isTyping, setIsTyping] = useState(false);

  // Save state to session storage whenever it changes
  useEffect(() => {
    saveChatState(chatState);
  }, [chatState]);

  // Show notification after delay if not interacted
  useEffect(() => {
    if (!chatState.hasInteracted) {
      const timer = setTimeout(() => {
        if (!chatState.hasInteracted) {
          // Could trigger a notification or pulse animation here
        }
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [chatState.hasInteracted]);

  const toggleChat = useCallback(() => {
    setChatState(prev => ({
      ...prev,
      isOpen: !prev.isOpen,
      hasInteracted: true
    }));
  }, []);

  const closeChat = useCallback(() => {
    setChatState(prev => ({
      ...prev,
      isOpen: false
    }));
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date()
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage]
    }));

    // Generate AI response using OpenAI
    setIsTyping(true);
    try {
      // Use environment variable for API endpoint or fallback to local
      const endpoint = import.meta.env.VITE_CHAT_API_URL || '/api/chat/generate';
      const response = await apiRequest('POST', endpoint, { message: text });
      const data = await response.json();
      
      console.log('API Response:', data); // Debug log
      
      // Check if the response is an error from Lambda
      if (data.statusCode && data.statusCode !== 200) {
        throw new Error(data.body ? JSON.parse(data.body).error : 'Erro na API');
      }
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: data.response || 'Erro: resposta vazia',
        isUser: false,
        timestamp: new Date()
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, aiMessage]
      }));
    } catch (error) {
      console.error('Error generating AI response:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: 'Desculpe, estou com dificuldades técnicas no momento. Tente novamente em alguns instantes ou entre em contato diretamente conosco!',
        isUser: false,
        timestamp: new Date()
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, errorMessage]
      }));
    } finally {
      setIsTyping(false);
    }
  }, []);

  return {
    ...chatState,
    isTyping,
    toggleChat,
    closeChat,
    sendMessage
  };
}
