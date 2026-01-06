import { connectDB } from "@/lib/mongoose";
import Product from "@/models/Product";
import { productSchema } from "@/lib/validators/product";
import cloudinary from "@/lib/cloudinary";
export async function GET() {
  try {
    await connectDB();
    const products = await Product.find().sort({ createdAt: -1 });
    return Response.json(products);
  } catch (error) {
    console.error("GET /api/products error:", error);
    return new Response(
      JSON.stringify({ message: "Failed to fetch products" }),
      { status: 500 }
    );
  }
}
export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();

    
    const rawData = {
      name: formData.get("name") ?? "",
      price: formData.get("price") !== null
        ? Number(formData.get("price"))
        : undefined,
      stock: formData.get("stock") !== null
        ? Number(formData.get("stock"))
        : undefined,
      status: formData.get("status") ?? "Draft",
      description: formData.get("description") || undefined,
    };



  
    const parsed = productSchema.safeParse(rawData);
    if (!parsed.success) {
      return Response.json(
        { message: "Invalid product data", errors: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    
    const existing = await Product.findOne({
      name: { $regex: `^${data.name}$`, $options: "i" },
    });

    if (existing) {
      return Response.json(
        { message: "Product already exists" },
        { status: 409 }
      );
    }

 
    let imageUrl = "";
    const imageFile = formData.get("image");

    if (imageFile && typeof imageFile !== "string") {
      const buffer = Buffer.from(await imageFile.arrayBuffer());

      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "products" }, (err, result) => {
            if (err) reject(err);
            else resolve(result);
          })
          .end(buffer);
      });

      imageUrl = uploadResult.secure_url;
    }

 
    const product = await Product.create({
      ...data,
      imageUrl,
      editedBy: "admin@system",
      logs: [
        {
          action: "CREATED",
          message: `Product: ${data.name} created`,
          at: new Date(),
        },
      ],
    });

    return Response.json(product, { status: 201 });
  } catch (err) {
    console.error("POST /api/products error:", err);
    return Response.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}


