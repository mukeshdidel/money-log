"use client"
import { BE_URL } from "@/config/appConfig";
import { setwallets } from "@/lib/features/wallets/walletSlice";
import { useAppDispatch } from "@/lib/hooks";
import axios from "axios";
import { ReactNode, useEffect } from "react"

const layout = ({children}: {children: ReactNode}) => {
    const dispatch = useAppDispatch();
    
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
    <div>{children}</div>
  )
}

export default layout