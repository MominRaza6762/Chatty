import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";
import { useState, useEffect } from "react";
import styles from "../styles/ProfilePage.module.css";
import moment from "moment";
import { useThemeStore } from "../store/useThemeStore";

function ProfilePage() {
  const { authUser, isUpdatingProfile, updateProfile, checkAuth } =
    useAuthStore();
  const { theme } = useThemeStore();
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    if (!authUser) {
      checkAuth();
    }
  }, [authUser, checkAuth]);

  if (!authUser) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          color: theme.heading,
        }}
      >
        Loading profile...
      </div>
    );
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className={styles.profilecontainer}>
      <section
        className={styles.profile}
        style={{ backgroundColor: theme.separator }}
      >
        {/* top section */}
        <div className={styles.topcontainer}>
          <h2 style={{ color: theme.heading }}>Profile</h2>
          <p style={{ color: theme.desc }}> Your Profile Information</p>
          <div className={styles.topcontainerimg}>
            <label htmlFor="avatar-upload">
              <img
                src={selectedImg || authUser?.profilePic || "/avatar.png"}
                alt="Profile"
                style={{
                  width: "8rem",
                  height: "8rem",
                  borderRadius: "50%",
                  backgroundSize: "cover",
                  border: `4px solid ${theme.desc}`,
                }}
              />
              <Camera
                style={{
                  width: "35px",
                  height: "35px",
                  marginTop: "-15px",
                  marginRight: "-50px",
                  backgroundColor: theme.background,
                  borderRadius: "12px",
                  padding: "2px",
                }}
              />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
                style={{ display: "none" }}
              />
            </label>
            <p style={{ color: theme.desc }}>
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>
        </div>
        {/* middle section */}
        <div className={styles.middlecontainer}>
          <div className={styles.fullname}>
            <label htmlFor="full-name">
              <User className={styles.icon} />
              <span style={{ color: theme.heading }}>Full Name</span>
            </label>
            <input
              type="text"
              readOnly
              value={authUser?.fullName || ""}
              className={styles.profilevalue}
              style={{ color: theme.desc, border: `1px solid ${theme.heading}` }}
            />
          </div>
          <div className={styles.fullname}>
            <label htmlFor="full-name">
              <Mail className={styles.icon} />
              <span style={{ color: theme.heading }}>Email</span>
            </label>
            <input
              type="text"
              readOnly
              value={authUser?.email || ""}
              className={styles.profilevalue}
              style={{ color: theme.desc, border: `1px solid ${theme.heading}` }}
            />
          </div>
        </div>
        {/* bottom section */}
        <div className={styles.bottomcontainer}>
          <h2 style={{ color: theme.heading }}>Account Information</h2>
          <div
            style={{
              borderBottom: `1px solid ${theme.desc}`,
              padding: "5px 0",
            }}
          >
            <span style={{ color: theme.heading }}>Member Since</span>
            <span style={{ color: theme.desc }}>
              {authUser?.createdAt
                ? moment(authUser.createdAt).format("YYYY-MM-DD")
                : ""}
            </span>
          </div>
          <div>
            <span style={{ color: theme.heading }}>Account Status</span>
            <span style={{ color: theme.desc }}>Active</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProfilePage;
