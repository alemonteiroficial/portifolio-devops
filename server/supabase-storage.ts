import { supabase } from "./db";
import { type User, type InsertUser, type Contact, type InsertContact, type ChatMessage, type InsertChatMessage, type WhatsappLead, type InsertWhatsappLead } from "@shared/schema";

export interface ISupabaseStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  updateContactStatus(id: number, status: string): Promise<void>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getChatMessages(sessionId: string): Promise<ChatMessage[]>;
  createWhatsappLead(lead: InsertWhatsappLead): Promise<WhatsappLead>;
  getWhatsappLeads(): Promise<WhatsappLead[]>;
}

export class SupabaseStorage implements ISupabaseStorage {
  async getUser(id: number): Promise<User | undefined> {
    const result = await supabase.from('users').select('*');
    const user = result.find((u: any) => u.id === id);
    return user ? {
      ...user,
      createdAt: new Date(user.created_at),
    } : undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await supabase.from('users').select('*');
    const user = result.find((u: any) => u.username === username);
    return user ? {
      ...user,
      createdAt: new Date(user.created_at),
    } : undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const userToInsert = {
      ...insertUser,
      created_at: new Date().toISOString(),
    };
    
    const result = await supabase.from('users').insert([userToInsert]);
    return {
      ...result[0],
      createdAt: new Date(result[0].created_at),
    };
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const contactToInsert = {
      ...insertContact,
      created_at: new Date().toISOString(),
    };
    
    const result = await supabase.from('contacts').insert([contactToInsert]);
    return {
      ...result[0],
      createdAt: new Date(result[0].created_at),
    };
  }

  async getContacts(): Promise<Contact[]> {
    const result = await supabase.from('contacts').select('*');
    return result.map((contact: any) => ({
      ...contact,
      createdAt: new Date(contact.created_at),
    })).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async updateContactStatus(id: number, status: string): Promise<void> {
    await supabase.from('contacts').update({ status }, `id=eq.${id}`);
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const messageToInsert = {
      session_id: insertMessage.sessionId,
      message: insertMessage.message,
      is_user: insertMessage.isUser,
      created_at: new Date().toISOString(),
    };
    
    const result = await supabase.from('chat_messages').insert([messageToInsert]);
    return {
      ...result[0],
      sessionId: result[0].session_id,
      isUser: result[0].is_user,
      createdAt: new Date(result[0].created_at),
    };
  }

  async getChatMessages(sessionId: string): Promise<ChatMessage[]> {
    const result = await supabase.from('chat_messages').select('*');
    return result
      .filter((msg: any) => msg.session_id === sessionId)
      .map((msg: any) => ({
        ...msg,
        sessionId: msg.session_id,
        isUser: msg.is_user,
        createdAt: new Date(msg.created_at),
      }))
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  async createWhatsappLead(insertLead: InsertWhatsappLead): Promise<WhatsappLead> {
    const leadToInsert = {
      ...insertLead,
      created_at: new Date().toISOString(),
    };
    
    const result = await supabase.from('whatsapp_leads').insert([leadToInsert]);
    return {
      ...result[0],
      createdAt: new Date(result[0].created_at),
    };
  }

  async getWhatsappLeads(): Promise<WhatsappLead[]> {
    const result = await supabase.from('whatsapp_leads').select('*');
    return result.map((lead: any) => ({
      ...lead,
      createdAt: new Date(lead.created_at),
    })).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
}