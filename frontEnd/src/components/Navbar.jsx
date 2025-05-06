import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeStore } from "../store/useThemeStore";
import styles from "../styles/Navbar.module.css";
import {
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const { theme } = useThemeStore();

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link className={styles.logoname} to={"/"} style={{ color: theme.heading }}>
        <img src="/logo.png" style={{width:'40px',height:'40px',backgroundSize:'cover'}} />
        </Link>
        <ul className={styles.ul}>
          <li>
            <Link  className={styles.navlink} to={"/settings"} style={{backgroundColor : theme.separator}}>
              
              <span style={{ color: theme.heading }} className={styles.navlabel}>Settings</span> <SettingOutlined color= {theme.heading}/>
            </Link>
          </li>
          {authUser && (
            <>
              <li>
                <Link className={styles.navlink} to="/profile" style={{backgroundColor : theme.separator}}>
                  <span style={{ color: theme.heading }} className={styles.navlabel}>Profile</span> <UserOutlined color= {theme.heading} />
                </Link>
              </li>
              <li>
                <Link className={styles.navlink} to={"/login"} onClick={logout} style={{backgroundColor : theme.separator}}>
                  <span style={{ color: theme.heading }} className={styles.navlabel}>Logout</span> <LogoutOutlined color= {theme.heading}/>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;