import { useState } from "react";
import styles from "../styles/SignUpPage.module.css";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeStore } from "../store/useThemeStore";
import { Link } from "react-router-dom";
import { Loader } from "lucide-react";
import {
  UserOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  MailOutlined,
  LockOutlined,
} from "@ant-design/icons";

import "../index.css";
import AuthImagePattern from "../components/AuthImagePattern";
function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { isSigningIn, SignUp } = useAuthStore();
  const { theme } = useThemeStore();

  const validateForm = () => {
    console.log("inside form validation");
    if (!formData.fullName.trim()) return toast.error("Fullname is required");
    if (!formData.email.trim()) return toast.error("email is required");
    if (!formData.password.trim()) return toast.error("password is required");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email))
      return toast.error("Invalid Email Address");
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("inside form submit");
    const success = validateForm();
    if (success == true) SignUp(formData);
  };
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  return (
    <section className={styles.container}>
      {/* left side */}
      <section className={styles.sectionLeft}>
        {/* header */}
        <div className={styles.logo}>
          <h2 style={{ color: theme.heading }}>Create Account</h2>
          <h3 style={{ color: theme.desc }}>
            Get started with your free account
          </h3>
        </div>
        {/* form inputs */}
        <form onSubmit={handleSubmit}>
          {/* full name input container*/}
          <div className={styles.inputContaier}>
            <label htmlFor="Full Name" style={{ color: theme.heading }}>
              Full Name
            </label>
            <div style={{ border: `1px solid ${theme.desc}` }}>
              <UserOutlined
                style={{ fontSize: "18px", color: theme.heading }}
              />
              <input
                type="text"
                placeholder="Andrew Joe"
                style={{ color: theme.heading }}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
            </div>
          </div>
          {/* email input container*/}
          <div className={styles.inputContaier}>
            <label htmlFor="Email" style={{ color: theme.heading }}>
              Email
            </label>
            <div style={{ border: `1px solid ${theme.desc}` }}>
              <MailOutlined
                style={{ fontSize: "18px", color: theme.heading }}
              />
              <input
                type="email"
                placeholder="example@xyz.com"
                style={{ color: theme.heading }}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>
          {/* password input container*/}
          <div className={styles.inputContaier}>
            <label htmlFor="Email" style={{ color: theme.heading }}>
              Password
            </label>
            <div style={{ border: `1px solid ${theme.desc}` }}>
              <LockOutlined
                style={{ fontSize: "18px", color: theme.heading }}
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                style={{ color: theme.heading }}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              {formData.password.length > 0 ? (
                showPassword ? (
                  <EyeInvisibleOutlined
                    style={{
                      fontSize: "18px",
                      color: theme.heading,
                      cursor: "pointer",
                    }}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <EyeOutlined
                    style={{
                      fontSize: "18px",
                      color: theme.heading,
                      cursor: "pointer",
                    }}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )
              ) : null}
            </div>
          </div>
          {/* submit btn */}
          <button
            type="submit"
            disabled={isSigningIn}
            style={{
              color: theme.desc,
              backgroundColor: theme.button,
              width: "60%",
              margin: "0 auto",
              outline: "none",
              border: "none",
              padding: "10px 0",
              marginTop: "20px",
              letterSpacing: "1px",
              fontWeight: "700",
              cursor: "pointer",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="signUpBtn"
          >
            {isSigningIn ? (
              <Loader
                style={{
                  animation: "spin 1s linear infinite",
                  color: theme.heading,
                  width: "50px",
                  height: "50px",
                }}
              />
            ) : (
              "Create Account"
            )}
          </button>
        </form>
        {/* already have an account */}
        <p
          style={{
            fontSize: "14px",
            marginTop: "15px",
            color: theme.heading,
            textAlign: "center",
            letterSpacing: "1px",
          }}
        >
          Already have an account?
          <Link
            to={"/login"}
            style={{
              textDecoration: "underline",
              fontSize: "14px",
              padding: "0 6px",
              fontWeight: "600",
              color: theme.button,
            }}
          >
            Sign In
          </Link>
        </p>
      </section>
      {/* right side */}
      <section
        className={styles.sectionRight}
        style={{
          backgroundColor: theme.separator,
          borderTopLeftRadius: "20px",
        }}
      >
        <AuthImagePattern
          title="Join our community"
          subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
        />
      </section>
    </section>
  );
}

export default SignUpPage;
