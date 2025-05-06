/* eslint-disable react/prop-types */
import { Skeleton } from "antd";
import "../styles/AuthImagePattern.css";
import {useThemeStore} from "../store/useThemeStore"

function AuthImagePattern(props) {
  const { theme } = useThemeStore(); 
  return (
    <div className="auth-container">
      <div className="auth-squares">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="auth-square">
            <Skeleton.Button active style={{ width: "70px", height: "70px" }} />
          </div>
        ))}
      </div>
      <div className="auth-text">
        <h2 style={{ color: theme.heading }}>{props?.title}</h2>
        <p style={{ color: theme.desc }}>{props?.subtitle}</p>
      </div>
    </div>
  );
}

export default AuthImagePattern;
