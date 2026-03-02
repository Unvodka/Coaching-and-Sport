"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/useLanguage";
import type { Profile } from "@/lib/supabase/database.types";

interface UserWithStats extends Profile {
  weight_count: number;
  mood_count: number;
  assignment_count: number;
}

export default function CoachUsersPage() {
  const { t, locale } = useLanguage();
  const [users, setUsers] = useState<UserWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/portal/coach/users");
        if (res.ok) {
          const json = await res.json();
          setUsers(json.users || []);
        }
      } catch (err) {
        console.error("Coach users fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  const filtered = users.filter((u) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      u.full_name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q)
    );
  });

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="h-8 bg-gray-200 rounded w-64 animate-pulse" />
        <div className="h-10 bg-gray-200 rounded w-80 animate-pulse" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 animate-pulse">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full" />
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-40 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-56" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-heading font-heading mb-6">
        {t("portal.coach.users.title")}
      </h2>

      <div className="mb-6">
        <input
          type="text"
          placeholder={t("portal.coach.users.search")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all text-gray-800"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="bg-gray-50 rounded-xl p-8 text-center">
          <p className="text-gray-500">{t("portal.coach.users.noUsers")}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((user) => (
            <Link
              key={user.id}
              href={`/portal/coach/users/${user.id}`}
              className="flex items-center gap-4 bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow no-underline"
            >
              {user.avatar_url ? (
                <Image
                  src={user.avatar_url}
                  alt={user.full_name || ""}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center text-white text-sm font-bold">
                  {(user.full_name || user.email).charAt(0).toUpperCase()}
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-heading truncate">
                    {user.full_name || user.email}
                  </p>
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                    user.role === "coach"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    {user.role}
                  </span>
                </div>
                <p className="text-sm text-gray-500 truncate">{user.email}</p>
              </div>

              <div className="hidden sm:flex items-center gap-6 text-sm text-gray-400">
                <div className="text-center">
                  <p className="font-semibold text-gray-700">{user.assignment_count}</p>
                  <p className="text-xs">{locale === "fr" ? "prog." : "prog."}</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-gray-700">{user.weight_count}</p>
                  <p className="text-xs">{locale === "fr" ? "poids" : "weight"}</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-gray-700">{user.mood_count}</p>
                  <p className="text-xs">{locale === "fr" ? "journal" : "journal"}</p>
                </div>
              </div>

              <svg className="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
