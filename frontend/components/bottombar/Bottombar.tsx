"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeftRight, House, Wallet } from "lucide-react";

const Bottombar = () => {

  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/dashboard", icon: <House />  },
    { name: "wallets", href: "/wallets", icon: <Wallet /> },
    { name: "Transactions", href: "/transactions", icon: <ArrowLeftRight /> },
    // { name: "categories", href: "/categories", icon: <SquarePlusIcon /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full h-16 bg-gray-900 border-t border-gray-700 flex justify-between items-center px-6 md:hidden z-50">
      {links.map((link, index) => {
        const isActive = pathname === link.href;

        return (
          <Link key={index} href={link.href}>
            <div
              className={`flex flex-col items-center gap-1 text-xs transition-colors ${
                isActive ? "text-white font-semibold" : "text-gray-400"
              }`}
            >
              <div className="size-6 flex items-center justify-center">
                {link.icon}
              </div>
              <span className="capitalize">{link.name}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Bottombar;
