import { connectDB } from "@/lib/mongoose";
import Product from "@/models/Product";
import mongoose from "mongoose";
import { productSchema } from "@/lib/validators/product";
import cloudinary from "@/lib/cloudinary";
export async function GET(req, { params }) {
  await connectDB();

  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return Response.json(
      { message: "Invalid product ID" },
      { status: 400 }
    );
  }

  const product = await Product.findById(id);

  if (!product) {
    return Response.json(
      { message: "Product not found" },
      { status: 404 }
    );
  }

  return Response.json(product);
}
export async function PATCH(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const product = await Product.findById(id);
    if (!product) return Response.json({ message: "Product not found" }, { status: 404 });

    const formData = await req.formData();

    
    const rawData = {
      name: formData.get("name") ?? product.name,
      price: formData.get("price") !== null ? Number(formData.get("price")) : product.price,
      stock: formData.get("stock") !== null ? Number(formData.get("stock")) : product.stock,
      status: formData.get("status") ?? product.status,
      description: formData.get("description") ?? product.description,
    };

    const parsed = productSchema.partial().safeParse(rawData);
    if (!parsed.success) return Response.json({ message: "Invalid data", errors: parsed.error.flatten() }, { status: 400 });

  
    const imageFile = formData.get("image");
    if (imageFile instanceof File && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: "products" }, (err, result) => {
          if (err) reject(err); else resolve(result);
        }).end(buffer);
      });
      parsed.data.imageUrl = uploadResult.secure_url;
    }


    const diffs = {};
    const fieldsToTrack = ['name', 'price', 'stock', 'status', 'description'];

    fieldsToTrack.forEach(field => {
      const newValue = parsed.data[field];
      const oldValue = product[field];

     
      if (newValue !== undefined && String(newValue) !== String(oldValue)) {
        diffs[field] = {
          old: oldValue,
          new: newValue
        };
      }
    });

  
    if (Object.keys(diffs).length > 0) {
      product.logs.push({
        action: "UPDATED",
        message: `Updated: ${Object.keys(diffs).join(', ')}`,
        details: diffs, 
        at: new Date()
      });
    }

    Object.assign(product, parsed.data);
    product.editedBy = "admin@system";
    await product.save();

    return Response.json(product, { status: 200 });
  } catch (err) {
    console.error("PATCH ERROR:", err);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
 
export async function DELETE(req, { params }) {
  await connectDB();

  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return Response.json(
      { message: "Invalid product ID" },
      { status: 400 }
    );
  }

  const product = await Product.findById(id);

  if (!product) {
    return Response.json(
      { message: "Product not found" },
      { status: 404 }
    );
  }

  await product.deleteOne();

  return Response.json({
    message: "Product deleted successfully",
    id,
  });
}

