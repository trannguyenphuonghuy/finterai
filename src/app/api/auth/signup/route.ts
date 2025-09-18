import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Thiếu username hoặc password" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await db.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ success: true, message: "Tạo tài khoản thành công" });
  } catch (err: any) {
    return NextResponse.json({ error: "Lỗi server", detail: err.message }, { status: 500 });
  }
}
