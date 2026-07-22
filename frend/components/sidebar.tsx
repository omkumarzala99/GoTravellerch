"use client";

import React, { useState } from "react";
import { Home, Compass, Bookmark, Navigation, User, Plane, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = (openState: boolean) => {
    setIsOpen(openState);
    setTimeout(() => {
      window.dispatchEvent(new Event("sidebarToggle"));
    }, 150);
  };

  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  const navItems = [
    { id: "home", label: "Home", icon: Home, href: "/" },
    { id: "plan", label: "Plan Trip", icon: Compass, href: "/plan" },
    { id: "saved", label: "Saved", icon: Bookmark, href: "/saved" },
    { id: "live", label: "Live Trip", icon: Navigation, href: "/live" },
    { id: "profile", label: "Profile", icon: User, href: "/profile" },
  ];

  const getActiveTab = () => {
    if (activeTab) return activeTab;
    if (pathname === "/") return "home";
    if (pathname === "/plan") return "plan";
    if (pathname === "/saved") return "saved";
    if (pathname === "/live") return "live";
    if (pathname === "/profile") return "profile";
    return "home";
  };

  const currentActive = getActiveTab();

  return (
    <>
      {/* Mobile/Tablet Hamburger Menu Trigger */}
      <button
        onClick={() => toggleSidebar(true)}
        className="lg:hidden fixed top-4 left-4 z-[9998] p-2 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-200 hover:text-white shadow-lg backdrop-blur-md transition-all active:scale-95 focus:outline-none"
        aria-label="Open Navigation"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Overlay Backdrop for Mobile/Tablet */}
      <div
        onClick={() => toggleSidebar(false)}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchMove={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className={`fixed inset-0 bg-slate-950/60 z-[9999] transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 h-full border-r border-slate-800 bg-[#070b16] flex flex-col z-[10000] transition-transform duration-300 transform 
          lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}
          w-64 lg:w-56 xl:w-64`}
      >
        {/* Top Logo */}
        <div className="p-5 xl:p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 xl:gap-3">
            <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-full bg-yellow-400 flex items-center justify-center shadow-lg shadow-yellow-400/20">
              <Plane className="w-4.5 h-4.5 xl:w-5 xl:h-5 text-slate-950 transform -rotate-45" />
            </div>
            <div>
              <span className="font-serif text-base xl:text-lg font-bold tracking-wide text-slate-100">
                Go<span className="text-yellow-400 font-sans font-extrabold">Traveller</span>
              </span>
              <span className="block text-[9px] xl:text-[10px] text-slate-400 tracking-widest uppercase font-semibold">
                AI Concierge
              </span>
            </div>
          </div>

          {/* Close button inside Drawer for Mobile/Tablet */}
          <button
            onClick={() => toggleSidebar(false)}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors focus:outline-none"
            aria-label="Close Navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 xl:px-4 py-6 xl:py-8 space-y-1.5 xl:space-y-2 overflow-y-auto scrollbar-thin">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentActive === item.id;

            const handleItemClick = (e: React.MouseEvent) => {
              toggleSidebar(false);
              if (setActiveTab) {
                e.preventDefault();
                setActiveTab(item.id);
              }
            };

            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={handleItemClick}
                className={`w-full flex items-center gap-3.5 xl:gap-4 px-3 xl:px-4 py-2.5 xl:py-3.5 rounded-lg text-sm font-medium transition-all duration-300 group relative ${
                  isActive
                    ? "text-yellow-400 bg-slate-900/50 border-l-4 border-yellow-400 pl-2 xl:pl-3"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/30 border-l-4 border-transparent pl-2 xl:pl-3"
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${
                    isActive ? "text-yellow-400" : "text-slate-400 group-hover:text-slate-200"
                  }`}
                />
                <span>{item.label}</span>
                
                {/* Subtle hover background highlight */}
                <span
                  className={`absolute inset-0 rounded-lg -z-10 bg-gradient-to-r from-yellow-400/5 to-transparent transition-opacity duration-300 ${
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Footer / Account status */}
        <div className="p-3 xl:p-4 border-t border-slate-800 bg-[#050810]/50">
          <div className="flex items-center gap-2.5 xl:gap-3">
            <div className="w-8 h-8 xl:w-9 xl:h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs xl:text-sm text-yellow-400 shrink-0">
              RS
            </div>
            <div className="truncate">
              <div className="text-xs font-semibold text-slate-200 truncate">Rudra Suthar</div>
              <div className="text-[9px] xl:text-[10px] text-yellow-400/90 font-medium truncate">Elite Voyager</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
