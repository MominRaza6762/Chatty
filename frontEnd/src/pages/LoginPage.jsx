import { useState } from "react";
import styles from "../styles/SignUpPage.module.css";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeStore } from "../store/useThemeStore";
import { Link } from "react-router-dom";
import { Loader } from "lucide-react";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  MailOutlined,
  LockOutlined,
} from "@ant-design/icons";

import "../index.css";
import AuthImagePattern from "../components/AuthImagePattern";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { isLoggingIn, LogIn } = useAuthStore();
  const { theme } = useThemeStore(); 
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    LogIn(formData);
  };
  return (
    <section className={styles.container}>
      {/* left side */}
      <section className={styles.sectionLeft}>
        {/* header */}
        <div className={styles.logo}>
          <h2 style={{ color: theme.heading }}>Welcome Back</h2>
          <h3 style={{ color: theme.desc }}>Sign in to your account</h3>
        </div>
        {/* form inputs */}
        <form onSubmit={handleSubmit}>
          {/* email input container*/}
          <div className={styles.inputContaier}>
            <label htmlFor="Email" style={{ color: theme.heading }}>
              Email
            </label>
            <div style={{border : `1px solid ${theme.desc}`}}>
              <MailOutlined
                style={{ fontSize: "18px", color: theme.heading }}
              />
              <input
                type="email"
                placeholder="example@xyz.com"
                style={{ color: theme.heading}}
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
            <div style={{border : `1px solid ${theme.desc}`}}>
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
            disabled={isLoggingIn}
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
            {isLoggingIn ? (
              <Loader
                style={{
                  animation: "spin 1s linear infinite",
                  color: theme.heading,
                  width: "50px",
                  height: "50px",
                }}
              />
            ) : (
              "Log In"
            )}
          </button>
        </form>
        {/* already have an account */}
        <p
          style={{
            fontSize: "14px",
            marginTop: "15px",
            color: theme.desc,
            textAlign: "center",
            letterSpacing: "1px",
          }}
        >
          Don&apos;t have an account?
          <Link
            to={"/signup"}
            style={{
              textDecoration: "underline",
              fontWeight: "600",
              fontSize: "14px",
              padding: "0 6px",
              color : theme.button
            }}
          >
            Sign Up
          </Link>
        </p>
      </section>
      {/* right side */}
      <section className={styles.sectionRight} style={{backgroundColor : theme.separator,borderTopLeftRadius : "20px"}}>
        <AuthImagePattern
          title="Join our community"
          subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
        />
      </section>
    </section>
  );
}

export default LoginPage;
