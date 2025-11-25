"use client"

import Topbar from "@/components/Topbar/Topbar"
import { useRouter } from "next/navigation"
import { ReactNode, useEffect } from "react"

const layout = ({children}: {children: ReactNode}) => {
    const router = useRouter()

    useEffect(()=> {
        if(!localStorage.getItem("token")){
            router.push("/login");
        }
    },[])

    return (
        <div className="h-screen bg-slate-950 text-white">
            <Topbar />
        </div>
    )
}

export default layout