import styles from "../styles/Sidebar.module.css";
import { useThemeStore } from "../store/useThemeStore";
import { useChatStore } from "../store/useChatStore";
import { useEffect, useState } from "react";
import SidebarSkeleton from "./skeleton/SidebarSkeleton";
import { User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

function Sidebar() {
  const { theme } = useThemeStore();
  const { onlineUsers } = useAuthStore();
  const { users, isUsersLoading, getUsers, setSelectedUser } =
    useChatStore();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 800);

  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  useEffect(() => {
    getUsers();

    // Update screen size on resize
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 800);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getUsers]);
  if (isUsersLoading) {
    return (
      <aside
        className={styles.sidebarcontainer}
        style={{ backgroundColor: theme.separator, overflow: "auto" }}
      >
        <SidebarSkeleton />
      </aside>
    );
  }

  return (
    <aside
      className={styles.sidebarcontainer}
      style={{ backgroundColor: theme.separator, overflow: "auto" }}
    >
      <div className={styles.toptitle}>
        <User className={styles.icon} color={theme.heading} size={18} />
        <h2 className={styles.heading} style={{ color: theme.heading }}>
          Contacts
        </h2>
      </div>
      {/* online filter toggle */}
      <div className={styles.toggleonline}>
        <input
          type="checkbox"
          name="online"
          style={{
            border: `0.3px solid ${theme.desc}`,
          }}
          checked={showOnlineOnly}
          onChange={(e) => setShowOnlineOnly(e.target.checked)}
        />
        {!isSmallScreen && (
          <p style={{ color: theme.desc }}>Show Online Only </p>
        )}

        <span
          style={{color: theme.desc}}
        >
          ({onlineUsers.length - 1} online)
        </span>
      </div>
      {/* users */}
      <div className={styles.userscontainer}>
        {filteredUsers?.map((user) => {
          return (
            <button
              key={user?._id}
              onClick={() => setSelectedUser(user)}
              style={{border :"none"}}
              className={styles.user}
            >
              <div className={styles.userimgandicon}>
                <img src={user?.profilePic || "/avatar.png"} alt={user?.fullName} />
                {onlineUsers.includes(user?._id) && (
                  <span className={styles.onlineicon} />
                )}
                {/* user info */}
                {!isSmallScreen && (
                  <div className={styles.userinfo}>
                    <h2 style={{ color: theme.heading }}>{user?.fullName}</h2>
                    <p style={{ color: theme.desc }}>
                      {onlineUsers.includes(user?._id) ? "Online" : "Offline"}
                    </p>
                  </div>
                )}
              </div>
            </button>
          );
        })}
        {filteredUsers.length === 0 && (
          <div
            style={{
              fontSize: "14px",
              textAlign: "center",
              color: theme.desc,
              margin: "50% 0",
            }}
          >
            No online users
          </div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
