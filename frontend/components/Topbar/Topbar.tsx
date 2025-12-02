"use client";

import { selectUser } from "@/lib/features/user/userSlice";
import { useAppSelector } from "@/lib/hooks";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

const Topbar = () => {
  const [profileDropdown, setProfileDropdown] = useState(false);
  const user = useAppSelector(selectUser);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router =  useRouter();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="flex justify-between items-center bg-slate-800 px-4 border-b border-slate-600 sticky top-0 left-0 h-16 lg:h-20 z-50">
      
      <div className="flex items-center">
        <img src="/logo.png" alt="Money Log" className="h-12 w-28 lg:h-16 lg:w-36 object-contain" />
      </div>

      <div className="relative flex items-center pr-4">
        <button
          className="rounded-full bg-slate-700 p-2 text-white cursor-pointer hover:bg-slate-600 transition"
          onClick={() => setProfileDropdown(!profileDropdown)}
        >
          <User  />
        </button>

        <div
          ref={dropdownRef}
          className={`absolute top-14 right-0 bg-slate-800 border border-slate-700 rounded-xl shadow-xl w-64 transform transition-all duration-200 origin-top-right
            ${profileDropdown ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}`}
        >
          <div className="p-4 border-b border-slate-700">       
            <p className="text-lg font-semibold text-white">{user.loading ? <Skeleton /> : user.fullName}</p>
            <p className="text-sm text-slate-400">{ user.loading ? <Skeleton  /> : user.username}</p>
            <p className="text-sm text-slate-400 mt-1">{user.loading ? <Skeleton /> : user.email}</p>
          </div>

          <div className="flex flex-col p-2">
            {
              user.loading ? <Skeleton height={30} width={"100%"} count={1} /> :  <button 
                className="w-full text-left px-4 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500 hover:text-white transition" 
                onClick={() => {
                  localStorage.removeItem("token");
                  router.push("/login");
                }}
              >
                Logout
              </button>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
