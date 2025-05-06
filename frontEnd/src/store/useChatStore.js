import { create } from "zustand";
import { axiosInstace } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set,get) => ({
  messages: [],
  users: [],
  SelectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  getUsers: async () => {
    try {
      set({ isUsersLoading: true });
      const resp = await axiosInstace.get("/message/users");
      set({ users: resp.data });
    } catch (error) {
      toast.error(error.response.messages.data);
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMessages: async (userId) => {
    try {
      set({ isMessagesLoading: true });
      const resp = await axiosInstace.get(`/message/${userId}`);
      set({ messages: resp.data });
    } catch (error) {
      toast.error(error.response.messages.data);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  setSelectedUser: (SelectedUser) => {
    set({ SelectedUser });
  },
  
  sendMessage : async (messageData) =>{
    const { SelectedUser, messages } = get();
    try {
      const res = await axiosInstace.post(`/message/send/${SelectedUser._id}`,messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.messages.data);
    }
  },

  subscribeToMessages: () => {
    const { SelectedUser } = get();
    if (!SelectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser = newMessage.senderId === SelectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },
  
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

}));
