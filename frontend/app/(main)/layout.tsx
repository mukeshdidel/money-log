"use client"

import Bottombar from "@/components/bottombar/Bottombar"
import Sidebar from "@/components/Sidebar/Sidebar"
import Topbar from "@/components/Topbar/Topbar"
import { BE_URL } from "@/config/appConfig"
import { setCategories, setCategoriesError, setCategoriesLoading } from "@/lib/features/categories/categoriesSlice"
import { setUser, setUserLoading } from "@/lib/features/user/userSlice"
import { setWallets, setWalletsError, setWalletsLoading } from "@/lib/features/wallets/walletSlice"
import { useAppDispatch } from "@/lib/hooks"
import axios from "axios"
import { useRouter } from "next/navigation"
import { ReactNode, useEffect } from "react"
import { SkeletonTheme } from "react-loading-skeleton"

const layout = ({children}: {children: ReactNode}) => {
    const router = useRouter()
    const dispatch = useAppDispatch();


    const getProfile = async () => {
        dispatch(setUserLoading(true));
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
        finally {
            dispatch(setUserLoading(false));
        }
    }

    const getCategories = async () => {
        dispatch(setCategoriesLoading(true));
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
            dispatch(setCategoriesError("Failed to load categories"));
        }
        finally {
            dispatch(setCategoriesLoading(false));
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
        dispatch(setWalletsLoading(true));
        try {
            const res = await axios.get(`${BE_URL}/wallet`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(setWallets(res.data));
        } catch (error) {
            console.error('Error fetching wallets:', error);
            dispatch(setWalletsError('Failed to fetch wallets'));
        }
        finally{
            dispatch(setWalletsLoading(false));
        }
    }

    useEffect(() => {
        fetchWallets();
    }, [dispatch])


    return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
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
    </SkeletonTheme>
    )
}

export default layout