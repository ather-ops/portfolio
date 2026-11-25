import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StarMark({ size = 18, className = "" }: { size?: number; className?: string }) {
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
        d="M12 1.5c.86 5.36 4.14 8.64 9.5 9.5-5.36.86-8.64 4.14-9.5 9.5-.86-5.36-4.14-8.64-9.5-9.5 5.36-.86 8.64-4.14 9.5-9.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function CircleArrow({
  tone = "dark",
  size = 24,
}: {
  tone?: "dark" | "light" | "purple";
  size?: number;
}) {
  return (
    <span
      className={`aw-circle-arrow aw-circle-arrow--${tone}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <ArrowUpRight size={Math.round(size * 0.46)} strokeWidth={1.8} />
    </span>
  );
}

type ButtonVariant = "dark" | "light" | "purple" | "ghostlight" | "white";

export function AwButton({
  children,
  href,
  onClick,
  variant = "dark",
  className = "",
  external = false,
  arrow = true,
  ariaLabel,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  className?: string;
  external?: boolean;
  arrow?: boolean;
  ariaLabel?: string;
}) {
  const cls = `aw-btn aw-btn--${variant} ${className}`;
  const arrowTone = variant === "dark" || variant === "purple" ? "light" : "dark";
  const content = (
    <>
      <span>{children}</span>
      {arrow && <CircleArrow tone={arrowTone} size={22} />}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        onClick={onClick}
        className={cls}
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} aria-label={ariaLabel} className={cls}>
      {content}
    </button>
  );
}

export function Kicker({
  children,
  light = false,
  className = "",
}: {
  children: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <p className={`aw-kicker ${light ? "aw-kicker--light" : ""} ${className}`}>{children}</p>
  );
}
