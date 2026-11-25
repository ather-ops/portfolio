import type { ReactNode } from "react";
import { motion } from "framer-motion";

export const openUri = () => window.dispatchEvent(new CustomEvent("uri:open"));

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StarMark({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M12 1.6c.78 5.1 3.9 8.22 9 9-5.1.78-8.22 3.9-9 9-.78-5.1-3.9-8.22-9-9 5.1-.78 8.22-3.9 9-9Z"
        fill="currentColor"
      />
      <circle cx="19.1" cy="4.9" r="1.35" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

export function Label({
  children,
  light = false,
  className = "",
}: {
  children: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <p className={`tj-eyebrow ${light ? "tj-eyebrow--light" : ""} ${className}`}>{children}</p>
  );
}

type ButtonVariant = "navy" | "peach" | "ghost" | "light";

export function TjButton({
  children,
  href,
  onClick,
  variant = "navy",
  className = "",
  small = false,
  external = false,
  ariaLabel,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  className?: string;
  small?: boolean;
  external?: boolean;
  ariaLabel?: string;
}) {
  const cls = `tj-btn tj-btn--${variant} ${small ? "tj-btn--sm" : ""} ${className}`;
  if (href) {
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className={cls}
      >
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} aria-label={ariaLabel} className={cls}>
      {children}
    </button>
  );
}
