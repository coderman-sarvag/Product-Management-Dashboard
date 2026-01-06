import { connectDB } from "@/lib/mongoose";
import AdminRequest from "@/models/AdminRequest";
import Admin from "@/models/Admin";

export async function PATCH(req, context) {
  await connectDB();

  const { id } = await context.params;
  const { action } = await req.json();

  const request = await AdminRequest.findById(id);
  if (!request) {
    return Response.json(
      { message: "Request not found" },
      { status: 404 }
    );
  }

  if (action === "approve") {
   
    await Admin.create({
      email: request.email,
      password: request.password, 
      role: "ADMIN",
    });


    await AdminRequest.findByIdAndDelete(id);

    return Response.json({ message: "Admin approved" });
  }

  if (action === "reject") {
    await AdminRequest.findByIdAndDelete(id);
    return Response.json({ message: "Admin rejected" });
  }

  return Response.json(
    { message: "Invalid action" },
    { status: 400 }
  );
}
