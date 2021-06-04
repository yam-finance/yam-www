import React, { useEffect } from "react";

import { Emoji, Switch, SwitchButton, useTheme } from "react-neu";

import useLocalStorage from "hooks/useLocalStorage";

const DarkModeSwitch: React.FC = () => {
  const { darkMode, onToggleDarkMode } = useTheme();
  const [_, setDarkModeSetting] = useLocalStorage("darkMode", darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.style.setProperty("--gridline-drop-shadow", "drop-shadow( 0px 1px 0px rgba(240, 240, 240, 0.13))");
      document.documentElement.style.setProperty("--pagination-text-color", "white");
      document.documentElement.style.setProperty("--pagination-background-color", "rgba(45, 32, 36, 0.35)");
    } else {
      document.documentElement.style.setProperty("--gridline-drop-shadow", "drop-shadow(0 -1px 0px hsl(338deg 20% 90% / 100%))");
      document.documentElement.style.setProperty("--pagination-text-color", "black");
      document.documentElement.style.setProperty("--pagination-background-color", "rgba(0, 0, 0, 0.05)");
    }
    setDarkModeSetting(darkMode);
  }, [darkMode, setDarkModeSetting]);

  return (
    <Switch>
      <SwitchButton active={!darkMode} onClick={onToggleDarkMode} round>
        <Emoji emoji="🌞" />
      </SwitchButton>
      <SwitchButton active={darkMode} onClick={onToggleDarkMode} round>
        <Emoji emoji="🌚" />
      </SwitchButton>
    </Switch>
  );
};

export default DarkModeSwitch;
