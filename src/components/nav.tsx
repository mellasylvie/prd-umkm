"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  LayoutTemplate,
  Book,
  Megaphone,
  BarChart,
  Settings,
} from "lucide-react";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuBadge } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/minisite", label: "Minisite", icon: LayoutTemplate },
  { href: "/catalog", label: "Katalog", icon: Book },
  { href: "/promo", label: "Promosi", icon: Megaphone },
  { href: "/analytics", label: "Insight", icon: BarChart },
  { href: "/settings", label: "Pengaturan", icon: Settings },
];

export function Nav({ isMobile = false }: { isMobile?: boolean }) {
  const pathname = usePathname();

  const menuClass = isMobile
    ? "flex flex-col gap-2 px-4 pt-4"
    : "";

  const linkClass = isMobile
    ? "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
    : "";


  if (isMobile) {
    return (
        <nav className="grid items-start text-sm font-medium">
            {navItems.map(({ href, label, icon: Icon }) => (
            <Link
                key={label}
                href={href}
                className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                pathname === href && "bg-muted text-primary"
                )}
            >
                <Icon className="h-4 w-4" />
                {label}
            </Link>
            ))}
      </nav>
    );
  }

  return (
    <SidebarMenu>
      {navItems.map(({ href, label, icon: Icon }) => (
        <SidebarMenuItem key={label}>
          <SidebarMenuButton
            asChild
            isActive={pathname === href}
            tooltip={{ children: label }}
          >
            <Link href={href}>
              <Icon />
              <span>{label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
