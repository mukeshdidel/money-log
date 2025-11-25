"use client"
import Input from "@/components/ui/Input"
import { BE_URL } from "@/config/appConfig";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast"

const page = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

        const handleLogin = async () => {
        if(loading) return;

        if(email.trim().length === 0){
            setError("please fill in your email")
        }
        if(password.trim().length === 0){
            setError("please fill in your password")
        }

        try{
            setLoading(true);
            const res = await axios.post(`${BE_URL}/auth/login`, { email, password});
            const data = res.data;
            localStorage.setItem("token", data.token);;            
        }
        catch(err) {    

        }finally{
            setLoading(false)
        }
    }
    
    return (
        <div className="bg-slate-800 p-4 lg:p-16 rounded-2xl flex flex-col text-white text-center max-w-3xl gap-4 shadow-2xl">
            <Toaster />
            <div className="flex justify-center items-center"><img src="/logo.png" alt="Money Log" className="h-30 lg:h-40"/></div>
            <h1 className="py-4 lg:pt-8 text-3xl font-semibold">Welcome Back</h1>
            <Input label="Email" value={email} onChange={(e)=> setEmail(e.target.value)} placeHolder="Enter your email" type="text" className="min-w-72 bg-slate-700"  />
            <Input label="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeHolder="Enter password" type="password" className="min-w-72 bg-slate-700" />
            {error && <div className="text-white bg-red-600/50 rounded w-full p-3"> {error}</div>}
            <div className="flex justify-center items-center"><button className={`p-2 my-2 ${ loading ? "bg-blue-300" : "bg-blue-700"} rounded-xl border border-blue-300 px-4`} onClick={handleLogin}>Signup</button></div>
            <p>Create  an account? <span className="cursor-pointer text-purple-700"><Link href={"/signup"}>Signup</Link></span></p>
        </div>
    )
}

export default page