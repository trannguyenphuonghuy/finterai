"use client";

import Link from "next/link";
import { useState } from "react";

export default function PageSignup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const SignupU = async () => {
    if (!username || !password) return alert("Nhập username và password");

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (data.success) {
      console.log("✅ Đăng ký thành công:", data.user);
    } else {
      console.error("❌ Đăng ký thất bại:", data.error);
    }

    setUsername("");
    setPassword("");
  };

  return (
    <div className="w-full h-screen inset-0 flex justify-center items-center">
      <div className="w-[93%] md:w-full ">
        <div>
          <h1 className="font-bold text-xl">Tạo tài khoản</h1>
          <p className="text-sm/6 mt-2 opacity-80 tracking-wider">Vui lòng đăng kí để được sử dụng!</p>
        </div>
        <div className="mt-6 flex flex-col gap-4 mb-5">
          <input className="border py-3 px-3 rounded-lg" type="text" placeholder="Tên đăng nhập" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input className="border py-3 px-3 rounded-lg" type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className="bg-white py-2.5 w-full rounded-lg text-black" onClick={SignupU}>Tạo tài khoản</button>
        <div className="mt-5">
          <Link href={'/signin'}>Đăng nhập</Link>
        </div>
      </div>
    </div>
  );
}