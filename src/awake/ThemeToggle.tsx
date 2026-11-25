import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { toggleTheme, useTheme } from "../theme";

export default function ThemeToggle({
  className = "",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const theme = useTheme();
  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`aw-icon-btn aw-theme-btn ${className}`}
      aria-label={`Switch to ${next} theme`}
      aria-pressed={theme === "dark"}
      title={`Switch to ${next} theme`}
      data-theme-state={theme}
    >
      <motion.span
        key={theme}
        initial={{ opacity: 0, rotate: -50, scale: 0.7 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="aw-theme-icon"
      >
        {theme === "dark" ? <Sun size={compact ? 14 : 15} /> : <Moon size={compact ? 14 : 15} />}
      </motion.span>
    </button>
  );
}
