import styles from "../styles/ChatContainer.module.css";
import { useThemeStore } from "../store/useThemeStore";
function NoChatSlected() {
  const { theme } = useThemeStore();
  return (
    <div className={styles.header} style={{ backgroundColor: theme.heading }}>
      <img
        src="/logo.png"
        style={{ width: "60px", height: "60px", backgroundSize: "cover" }}
      />
      <h2 className={styles.nochattitle} style={{ color: theme.separator }}>
        Welcome to Chatty!
      </h2>
      <p className={styles.nochatdesc} style={{ color: theme.desc }}>
        Select a conversation from the sidebar to start chatting
      </p>
    </div>
  );
}

export default NoChatSlected;
