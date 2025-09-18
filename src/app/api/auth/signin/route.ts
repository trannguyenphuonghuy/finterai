// app/api/login/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// const JWT_SECRET = "phuonghuy@tomdev2k9"
export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Thiếu username hoặc password" },
        { status: 400 }
      );
    }

    const user = await db.user.findUnique({
      where: { username },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User không tồn tại" },
        { status: 404 }
      );
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: "Sai password" }, { status: 401 });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    const res = NextResponse.json({ success: true });
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60, // 1 giờ
      path: "/",
    });

    return res;

    // Trả kết quả, có thể thêm token JWT ở đây nếu muốn
    // return NextResponse.json({ token });

  } catch (err: any) {
    console.error("❌ Lỗi login:", err);
    return NextResponse.json(
      { error: "Lỗi server", detail: err.message },
      { status: 500 }
    );
  }
}
