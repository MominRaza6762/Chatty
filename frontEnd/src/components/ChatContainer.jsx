import styles from "../styles/ChatContainer.module.css";
import { useThemeStore } from "../store/useThemeStore";
import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import MessagesSkeleton from "./skeleton/MessagesSkeleton";
import ChatHeader from "./chat/ChatHeader";
import ChatInput from "./chat/ChatInput";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

function ChatContainer() {
  const { theme } = useThemeStore();
  const {
    messages,
    isMessagesLoading,
    SelectedUser,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  // use effect to get the all the messages when component mounts
  useEffect(() => {
    getMessages(SelectedUser?._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [
    SelectedUser?._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // return message skelton while loading
  if (isMessagesLoading) {
    return (
      <div className={styles.header} style={{ backgroundColor: theme.heading }}>
        <ChatHeader />
        <div className={styles.nochatcontainer} style={{ padding: "20px" }}>
          <MessagesSkeleton />
        </div>
        <ChatInput />
      </div>
    );
  }

  return (
    <div className={styles.header} style={{ backgroundColor: theme.heading }}>
      <ChatHeader />
      <div className={styles.nochatcontainer}>
        {/* chat goes here */}
        {messages.map((message) => (
          <div
            key={message._id}
            className={
              message.senderId === authUser._id
                ? styles.senderContainer
                : styles.receiverContainer
            }
          >
            <div
              className={
                message.senderId === authUser._id
                  ? styles.sender // Sender's message bubble
                  : styles.receiver // Receiver's message bubble
              }
              style={
                message.senderId === authUser._id
                  ? { backgroundColor: theme.button }
                  : { backgroundColor: theme.separator }
              }
            >
              <p className={styles.messageText}>{message.text}</p>
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className={styles.messageImage}
                />
              )}
              <span className={styles.messageTime}>
                {formatMessageTime(message.createdAt)}
              </span>
            </div>
          </div>
        ))}
        <div ref={messageEndRef}></div>
      </div>
      <ChatInput />
    </div>
  );
}

export default ChatContainer;
