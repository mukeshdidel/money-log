"use client"

import Bottombar from "@/components/bottombar/Bottombar"
import Sidebar from "@/components/Sidebar/Sidebar"
import Topbar from "@/components/Topbar/Topbar"
import { BE_URL } from "@/config/appConfig"
import { setUser } from "@/lib/features/user/UserSlice"
import { useAppDispatch } from "@/lib/hooks"
import axios from "axios"
import { useRouter } from "next/navigation"
import { ReactNode, useEffect } from "react"

const layout = ({children}: {children: ReactNode}) => {
    const router = useRouter()
    const dispatch = useAppDispatch();


    const getProfile = async () => {
        try {
            const res =  await axios.get(`${BE_URL}/profile`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            const data = res.data;
            dispatch(setUser(data));

        }
        catch(err){
            router.push("/login");
        }
    }

    useEffect(()=> {
        if(!localStorage.getItem("token")){
            router.push("/login");
        }
        getProfile();
    },[dispatch])

    return (
        <div className="h-screen bg-slate-900 lg:bg-slate-950 text-white">
            <Topbar />
            <div className="flex">
                <div className="max-[1024px]:hidden">
                    <Sidebar />
                </div>
                <div className="grow m-3 rounded-lg p-5 lg:bg-slate-900 ">{children}</div>
            </div>
            <Bottombar />
        </div>
    )
}

export default layout