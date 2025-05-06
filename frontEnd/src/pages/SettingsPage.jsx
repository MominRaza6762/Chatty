import styles from "../styles/Settings.module.css";
import { themes } from "../constants/index";
import { useThemeStore } from "../store/useThemeStore";

function SettingsPage() {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className={styles.settingcontainer} style={{backgroundColor: theme.background}}>
      <div className={styles.settingtitle}>
        <h3 style={{ color: theme.heading }}>Theme</h3>
        <p style={{ color: theme.desc }}>
          Choose a theme for your Chat Interface
        </p>
      </div>
      <div className={styles.themeContainer}>
        {themes.map((themeObj, index) => {
          const themeName = Object.keys(themeObj)[0];
          const themeColors = themeObj[themeName];

          return (
            <div
              key={index}
              className={styles.themeBox}
              style={{
                backgroundColor: theme.separator,
                boxShadow: `0 4px 8px ${theme.background}`,
              }}
            >
              <div className={styles.colorRow}>
                {Object.keys(themeColors).map((colorKey) => {
                  return (
                    <div
                      key={colorKey}
                      className={styles.colorCircle}
                      style={{
                        backgroundColor: themeColors[colorKey],
                      }}
                    />
                  );
                })}
              </div>
              <div
                className={styles.colorBlock}
                style={{ backgroundColor: themeColors.text }}
                onClick={() => setTheme(themeName)}
              >
                <p
                  style={{ color: theme.heading }}
                  className={styles.themeName}
                >
                  {themeName}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SettingsPage;
