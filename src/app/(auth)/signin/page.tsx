'use client'

import { useState } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function PageSignin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const LoginU = async () => {
        if (!username || !password) return alert("Nhập name và age");

        const res = await fetch("/api/auth/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        const data = await res.json();
        if (data.success) {
            redirect('/dashboard')
        } else {
            console.error("❌ Đăng ký thất bại:", data.error);
        }

        setUsername('')
        setPassword('')
    }

    return (
        <div className="w-full h-screen inset-0 flex justify-center items-center">
            <div className="w-[93%] md:w-full ">
                <div>
                    <h1 className="font-bold text-xl">Đăng nhập</h1>
                    <p className="text-sm/6 mt-2 opacity-80 tracking-wider">Vui lòng đăng nhập để tiếp tục!</p>
                </div>
                <div className="mt-6 flex flex-col gap-4 mb-5">
                    <input className="border py-3 px-3 rounded-lg" type="text" placeholder="Tên đăng nhập" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input className="border py-3 px-3 rounded-lg" type="text" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className="bg-white py-2.5 w-full rounded-lg text-black" onClick={LoginU}>Đăng nhập</button>
                <div className="mt-5">
                    <Link href={'/signup'}>Tạo tài khoản</Link>
                </div>
            </div>
        </div>
    );
}