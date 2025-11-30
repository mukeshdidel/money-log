import ArrowsIcon from "@/Icons/ArrowsIcon"
import HomeIcon from "@/Icons/HomeIcon"
import SquarePlusIcon from "@/Icons/SquarePlusIcon"
import WalletIcon from "@/Icons/WalletIcon"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Sidebar = () => {

  const links = [
    {name: "Dashboard", href: "/dashboard", icon: <HomeIcon />},
    {name: "wallets", href: "/wallets", icon: <WalletIcon />},
    {name: "Transactions", href: "/transactions", icon: <ArrowsIcon />},
    // {name: "categories", href: "/categories", icon: <SquarePlusIcon />},
  ]


  const pathname = usePathname();
  

  return (
    <div className="h-[calc(100vh-60px)] lg:h-[calc(100vh-88px)] w-64 sticky top-[60px] lg:top-[88px] p-5">
        <div className="flex flex-col gap-4 py-8">
            {
              links.map((link, index)=> {

                const isActive = pathname === link.href;

                return (
                  <Link href={link.href} key={index}>
                    <div className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer hover:bg-slate-700 transition-colors ${isActive ? "bg-slate-700" : ""}`}>
                      <div className="size-6">
                        {link.icon}
                      </div>
                      <span className="capitalize">{link.name}</span>
                    </div>
                  </Link>
                )
              })
            }
        </div>
    </div>
  )
}

export default Sidebar