import { useEffect, useState } from 'react';
import "../styles/themetoggler.css";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <label htmlFor="theme" className="theme">
      <span className="theme__toggle-wrap">
        <input
          id="theme"
          className="theme__toggle"
          type="checkbox"
          role="switch"
          name="theme"
          value="dark"
          checked={theme === 'dark'}
          onChange={toggleTheme}
        />
        <span className="theme__fill"></span>
        <span className="theme__icon">
          <span className="theme__icon-part"></span>
          <span className="theme__icon-part"></span>
          <span className="theme__icon-part"></span>
          <span className="theme__icon-part"></span>
          <span className="theme__icon-part"></span>
          <span className="theme__icon-part"></span>
          <span className="theme__icon-part"></span>
          <span className="theme__icon-part"></span>
          <span className="theme__icon-part"></span>
        </span>
      </span>
    </label>
  );
};

export default ThemeToggle;
