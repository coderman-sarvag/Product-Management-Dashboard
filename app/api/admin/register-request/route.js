import { connectDB } from "@/lib/mongoose";
import Admin from "@/models/Admin";
import AdminRequest from "@/models/AdminRequest";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await connectDB();
  const { email, password } = await req.json();

  
  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    return Response.json(
      { message: "Admin already exists" },
      { status: 400 }
    );
  }

  const existingRequest = await AdminRequest.findOne({
    email,
    status: "PENDING",
  });

  if (existingRequest) {
    return Response.json(
      { message: "Request already sent" },
      { status: 400 }
    );
  }

  
  const hashedPassword = await bcrypt.hash(password, 10);

 
  const request = await AdminRequest.create({
    email,
    password: hashedPassword,
  });

  return Response.json({
    message: "Admin request submitted",
    id: request._id,
  });
}
