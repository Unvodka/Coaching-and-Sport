"use client";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  index?: number;
}

export default function StaggerItem({ children, className, index = 0 }: Props) {
  return (
    <div
      className={`stagger-item ${className || ""}`}
      style={{ "--item-index": index } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
