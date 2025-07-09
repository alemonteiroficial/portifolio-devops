import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Smooth scroll to element with offset for fixed header
export function scrollToElement(elementId: string) {
  const element = document.getElementById(elementId);
  if (element) {
    const offsetTop = element.offsetTop - 80; // Account for fixed header
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }
}

// Email validation
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Form validation helper
export function validateContactForm(data: Record<string, string>): string[] {
  const errors: string[] = [];
  
  if (!data.name || data.name.trim().length < 2) {
    errors.push('Nome deve ter pelo menos 2 caracteres');
  }
  
  if (!data.email || !isValidEmail(data.email)) {
    errors.push('E-mail inválido');
  }
  
  if (!data.business) {
    errors.push('Selecione o tipo de negócio');
  }
  
  return errors;
}

// Session storage helpers for chat
export function getChatState() {
  try {
    const saved = sessionStorage.getItem('chatState');
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

export function saveChatState(state: any) {
  try {
    sessionStorage.setItem('chatState', JSON.stringify(state));
  } catch {
    // Ignore storage errors
  }
}
