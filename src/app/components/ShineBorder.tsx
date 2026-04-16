import { ReactNode } from "react";

type ShineBorderProps = {
  children: ReactNode;
  className?: string;
  borderWidth?: number;
  duration?: number;
};

function ShineBorder({
  children,
  className = "",
  borderWidth = 1,
  duration = 5,
}: ShineBorderProps) {
  return (
    <div className={`relative ${className}`} style={{ padding: borderWidth }}>
      <div className="absolute inset-0 rounded-[inherit] overflow-hidden">
        <div
          className="absolute animate-spin blur-sm"
          style={{
            left: "50%",
            top: "50%",
            translate: "-50% -50%",
            width: "300%",
            aspectRatio: "1",
            background:
              "conic-gradient(from 0deg, #ef4444, #f97316, #eab308, #22c55e, #3b82f6, #8b5cf6, #ec4899, #ef4444)",
            animationDuration: `${duration}s`,
          }}
        />
      </div>
      <div className="relative rounded-[inherit] bg-[color:var(--surface)] h-full">
        {children}
      </div>
    </div>
  );
}

export { ShineBorder };
