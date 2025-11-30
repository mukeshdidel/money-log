"use client"
import Input from "@/components/ui/Input"
import { BE_URL } from "@/config/appConfig"
import axios from "axios"
import Link from "next/link"
import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"

const page = () => {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const handleSignup = async () => {
        if(loading) return;

        if(fullName.trim().length === 0){
            setError("please fill in your full name")
        }
        if(username.trim().length === 0){
            setError("please fill in your username")
        }
        if(email.trim().length === 0){
            setError("please fill in your email")
        }
        if(password.trim().length === 0){
            setError("please fill in your password")
        }

        try{
            setLoading(true);
            const res = await axios.post(`${BE_URL}/auth/signup`, {fullName, email, username, password});
            const data = res.data;
            toast.success("signup successfull")
        }
        catch(err :any) {    
            setError(err?.response?.data?.error || "Something went wrong");
        }finally{
            setLoading(false)
        }
    }


    return (
        <div className="bg-slate-800 p-6 lg:p-12 rounded-2xl flex flex-col text-white text-center max-w-3xl gap-4 shadow-2xl">
            <Toaster />
            <div className="py-4">
                <h1 className="mb-2 lg:pt-8 text-3xl font-semibold">Create An Account</h1>
                <p className="text-slate-400">Start tracking your spendings</p>
            </div> 

            <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-4 items-center justify-center">
                <Input label="Full Name" value={fullName} onChange={(e)=> setFullName(e.target.value)} placeHolder="Enter your full name" type="text" className="min-w-72 bg-slate-700"  />
                <Input label="Username" value={username} onChange={(e)=> setUsername(e.target.value)} placeHolder="Enter your username" type="text" className="min-w-72 bg-slate-700" />
            </div>
            <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-4 items-center justify-center">
                <Input label="Email" value={email} onChange={(e)=> setEmail(e.target.value)} placeHolder="Enter your email" type="text" className="min-w-72 bg-slate-700"  />
                <Input label="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeHolder="Enter password" type="password" className="min-w-72 bg-slate-700" />
            </div>
            {error && <div className="text-white bg-red-600/50 rounded w-full p-3"> {error}</div>}
            <div className="flex justify-center items-center mt-4"><button className={`p-2 my-2 ${ loading ? "bg-blue-300" : "bg-blue-700"} rounded-xl border border-blue-300 px-4`} onClick={handleSignup}>Signup</button></div>
            <p>Already have an account? <span className="cursor-pointer text-purple-700"><Link href={"/login"}>Login</Link></span></p>
        </div>
    )
}

export default page