import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongoose";
import Admin from "@/models/Admin";
import { adminLoginSchema } from "@/lib/validators/admin";

export async function POST(req) {
  await connectDB();

  const body = await req.json();
  const parsed = adminLoginSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json(
      { message: "Invalid credentials" },
      { status: 400 }
    );
  }

  const { email, password } = parsed.data;

  const admin = await Admin.findOne({ email });
  if (!admin) {
    return Response.json(
      { message: "Invalid email or password" },
      { status: 401 }
    );
  }

  const isValid = await bcrypt.compare(password, admin.password);
  if (!isValid) {
    return Response.json(
      { message: "Invalid email or password" },
      { status: 401 }
    );
  }

  return Response.json({
    id: admin._id,
    email: admin.email,
    role: admin.role,
  });
}
