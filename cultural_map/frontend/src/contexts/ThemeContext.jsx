import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    // const savedMode = localStorage.getItem("dark-mode");
    // return savedMode === "true" || false;
  });

  const [theme, setTheme] = useState("light");
  // const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  // useEffect(() => {
  // localStorage.setItem("dark-mode", darkMode);
  // document.body.className = darkMode ? "dark-mode" : "";
  // }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
