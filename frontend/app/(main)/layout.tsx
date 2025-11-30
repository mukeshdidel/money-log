"use client"

import Bottombar from "@/components/bottombar/Bottombar"
import Sidebar from "@/components/Sidebar/Sidebar"
import Topbar from "@/components/Topbar/Topbar"
import { BE_URL } from "@/config/appConfig"
import { setCategories } from "@/lib/features/categories/categoriesSlice"
import { setUser } from "@/lib/features/user/userSlice"
import { setwallets } from "@/lib/features/wallets/walletSlice"
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

    const getCategories = async () => {
        try {
            const res =  await axios.get(`${BE_URL}/category`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            const data = res.data;            
            dispatch(setCategories(data));

        }
        catch(err){
            console.error("Error fetching categories:", err);
        }
    }

    useEffect(()=> {
        if(!localStorage.getItem("token")){
            router.push("/login");
        }
        getProfile();
        getCategories();
    },[dispatch])


    const fetchWallets = async () => {
        try {
            const res = await axios.get(`${BE_URL}/wallet`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(setwallets(res.data));
        } catch (error) {
            console.error('Error fetching wallets:', error);
        }
    }

    useEffect(() => {
        fetchWallets();
    }, [dispatch])


    return (
        <div className="min-h-screen bg-slate-900 lg:bg-slate-950 text-white">
            <Topbar />
            <div className="flex">
                <div className="max-[1024px]:hidden">
                    <Sidebar />
                </div>
                <div className="grow m-3 rounded-lg lg:p-5 p-1 lg:bg-slate-900 pb-16">{children}</div>
            </div>
            <Bottombar />
        </div>
    )
}

export default layout