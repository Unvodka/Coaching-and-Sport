"use client";

import Link from "next/link";

interface DashboardCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  href: string;
  icon: React.ReactNode;
  color: string;
}

export default function DashboardCard({
  title,
  value,
  subtitle,
  href,
  icon,
  color,
}: DashboardCardProps) {
  return (
    <Link
      href={href}
      className="block bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow no-underline"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-heading mt-1">{value}</p>
          <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
        </div>
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}
        >
          {icon}
        </div>
      </div>
    </Link>
  );
}
