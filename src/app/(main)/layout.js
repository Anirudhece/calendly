"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, BarChart, Users, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@clerk/nextjs";
import { Separator } from "@/components/ui/separator";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart },
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/meetings", label: "Meetings", icon: Users },
  { href: "/availability", label: "Availability", icon: Clock },
];

export default function AppLayout({ children }) {
  const pathname = usePathname();
  const { isLoaded } = useUser();

  return (
    <>
      {!isLoaded && <Skeleton width={"100%"} color="#36d7b7" />}
      <div className="flex flex-col md:flex-row">
        {/* Sidebar for medium screens and up */}
        <aside className="hidden h-full md:block w-64">
          <nav>
            <ul>
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-4 ${
                      pathname === item.href && "bg-blue-100 text-gray-700"
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </Link>
                  <Separator />
                </li>
              ))}
            </ul>
          </nav>
          <Separator orientation="vertical" />
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <header className="flex justify-between items-center mb-4">
            <h2 className="text-5xl md:text-6xl gradient-title pt-2 md:pt-0 text-center md:text-left w-full">
              {navItems.find((item) => item.href === pathname)?.label ||
                "Dashboard"}
            </h2>
          </header>
          {children}
        </main>

        {/* Bottom tabs for small screens */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0  shadow-md">
          <ul className="flex justify-around">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex flex-col items-center py-2 px-4 ${
                    pathname === item.href && "text-blue-600"
                  }`}
                >
                  <item.icon className="w-6 h-6" />
                  <span className="text-xs mt-1">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
