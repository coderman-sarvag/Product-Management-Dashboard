import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/mongoose";
import Admin from "@/models/Admin";

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await connectDB();

    const admin = await Admin.findById(decoded.id).select("-password");
    if (!admin) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    return Response.json(admin);
  } catch {
    return Response.json({ message: "Invalid token" }, { status: 401 });
  }
}

