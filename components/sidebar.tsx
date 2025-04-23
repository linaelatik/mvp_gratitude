"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, Calendar, Home, Settings, LogOut, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "My Entries",
    href: "/entries",
    icon: BookOpen,
  },
  {
    name: "Reflections",
    href: "/reflections",
    icon: Calendar,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        <span className="sr-only">Toggle menu</span>
      </Button>

      {/* Sidebar for mobile */}
      <div
        className={cn(
          "fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out md:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="relative flex h-full w-64 flex-col overflow-y-auto bg-white/90 backdrop-blur-sm p-4 shadow-lg">
          <div className="flex items-center justify-center h-16 border-b">
            <h2 className="text-xl font-semibold text-emerald-600">Gratitude</h2>
          </div>
          <nav className="mt-8 flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-emerald-100 text-emerald-700"
                    : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-700",
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="mt-auto">
            <Button variant="ghost" className="w-full justify-start text-gray-600 hover:bg-red-50 hover:text-red-700">
              <LogOut className="mr-3 h-5 w-5" />
              Log out
            </Button>
          </div>
        </div>
      </div>

      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-grow bg-white/90 backdrop-blur-sm overflow-y-auto shadow-md">
          <div className="flex items-center justify-center h-16 border-b">
            <h2 className="text-xl font-semibold text-emerald-600">Gratitude</h2>
          </div>
          <nav className="mt-8 flex-1 flex flex-col space-y-2 px-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-emerald-100 text-emerald-700"
                    : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-700",
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="p-4">
            <Button variant="ghost" className="w-full justify-start text-gray-600 hover:bg-red-50 hover:text-red-700">
              <LogOut className="mr-3 h-5 w-5" />
              Log out
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
