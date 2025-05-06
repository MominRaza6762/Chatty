import styles from "../styles/HomePage.module.css";
// import { useThemeStore } from "../store/useThemeStore";
// import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSlected from "../components/NoChatSlected";
import ChatContainer from "../components/ChatContainer";
function HomePage() {
  const { SelectedUser } = useChatStore();
  return (
    <div className={styles.homecontainer}>
      <div className={styles.homecontents}>
        <Sidebar />
        {!SelectedUser ? <NoChatSlected /> : <ChatContainer />}
      </div>
    </div>
  );
}

export default HomePage;
