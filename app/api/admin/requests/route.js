import { connectDB } from "@/lib/mongoose";
import AdminRequest from "@/models/AdminRequest";

export async function GET() {
  await connectDB();

  const requests = await AdminRequest.find({
    status: "PENDING",
  }).select("-password");

  return Response.json(requests);
}
