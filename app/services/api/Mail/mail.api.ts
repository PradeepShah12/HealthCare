import { ApiResponse } from "../../..";
import api from "../api";

interface Conversation {
  id: number;
  title: string;
  message: string;
  recipient: string[];
  updated_by:string;
  created_by:string
}

export interface Entry {
  id: number;
  message: string;
  content?: string;
}

interface Recipient {
  id: number;
  display_name:string;
  image:string
  // Add other recipient properties as needed
}

interface Tag {
  id: number;
  // Add other tag properties as needed
}

class Mail {
  async listConversations() {
    const response = await api.get<ApiResponse<Conversation[]>>("/mail");
    return response.data.results;
  }

  async getConversationById(id: number) {
    const response = await api.get<ApiResponse<Conversation>>(`/mail/${id}`);
    return response.data;
  }

  async createConversation(data: { title: string; message: string; recipient: string[] }) {
    const response = await api.post<ApiResponse<Conversation>>("/mail", data);
    return response.data;
  }

  async listEntriesByConversationId(conversationId: string) {
    const response = await api.get<ApiResponse<Entry[]>>(`/mail/${conversationId}/entries`);
    // console.log(response,'entries from api ')

    return response.data.results;
  }

  async getEntryById(conversationId: number, entryId: number) {
    const response = await api.get<ApiResponse<Entry>>(`/mail/${conversationId}/entry/${entryId}`);
    return response.data;
  }

  async createEntry(conversationId: string, data: { message: string }) {
    const response = await api.post<ApiResponse<Entry>>(`/mail/${conversationId}/entry`, data);
    return response.data;
  }

  async updateEntryById(conversationId: number, entryId: number, data: { content: string }) {
    const response = await api.put<ApiResponse<Entry>>(`/mail/${conversationId}/entry/${entryId}`, data);
    return response.data;
  }

  async deleteEntryById(conversationId: number, entryId: number) {
    await api.delete(`/mail/${conversationId}/entry/${entryId}`);
  }

  async listRecipientsOfConversation(conversationId: number) {
    const response = await api.get<ApiResponse<Recipient[]>>(`/mail/${conversationId}/users`);
    console.log(response,'receipient from api ')

    return response.data;
  }

  async addRecipientToConversation(conversationId: number, userId: number) {
    await api.post(`/mail/${conversationId}/user/${userId}`);
  }

  async removeRecipientFromConversation(conversationId: number, userId: number) {
    await api.delete(`/mail/${conversationId}/user/${userId}`);
  }

  async listTagsOfConversation(conversationId: number) {
    const response = await api.get<ApiResponse<Tag[]>>(`/mail/${conversationId}/tags`);
    return response.data;
  }

  async updateTagsOfConversation(conversationId: number, data: { tags: string[] }) {
    await api.put(`/mail/${conversationId}/tags`, data);
  }
}

export const MailService = new Mail();
