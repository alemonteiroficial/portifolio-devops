import { users, contacts, chatMessages, whatsappLeads, type User, type InsertUser, type Contact, type InsertContact, type ChatMessage, type InsertChatMessage, type WhatsappLead, type InsertWhatsappLead } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
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

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db
      .insert(contacts)
      .values(insertContact)
      .returning();
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return await db.select().from(contacts).orderBy(desc(contacts.createdAt));
  }

  async updateContactStatus(id: number, status: string): Promise<void> {
    await db
      .update(contacts)
      .set({ status })
      .where(eq(contacts.id, id));
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const [message] = await db
      .insert(chatMessages)
      .values(insertMessage)
      .returning();
    return message;
  }

  async getChatMessages(sessionId: string): Promise<ChatMessage[]> {
    return await db
      .select()
      .from(chatMessages)
      .where(eq(chatMessages.sessionId, sessionId))
      .orderBy(chatMessages.createdAt);
  }

  async createWhatsappLead(insertLead: InsertWhatsappLead): Promise<WhatsappLead> {
    const [lead] = await db
      .insert(whatsappLeads)
      .values(insertLead)
      .returning();
    return lead;
  }

  async getWhatsappLeads(): Promise<WhatsappLead[]> {
    const leads = await db.select().from(whatsappLeads).orderBy(desc(whatsappLeads.createdAt));
    return leads;
  }
}

import { SupabaseStorage } from "./supabase-storage";

// Use Supabase as primary database
export const storage = new SupabaseStorage();
