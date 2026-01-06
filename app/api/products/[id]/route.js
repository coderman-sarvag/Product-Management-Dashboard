import { connectDB } from "@/lib/mongoose";
import Product from "@/models/Product";
import mongoose from "mongoose";
import { productSchema } from "@/lib/validators/product";
import cloudinary from "@/lib/cloudinary";
/**
 * GET /api/products/:id
 */
export async function GET(req, { params }) {
  await connectDB();

  const { id } = await params;

  // 🛑 Validate ObjectId
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

/**
 * PATCH /api/products/:id
 */


/* export async function PATCH(req, { params }) {
  try {
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


    const formData = await req.formData();

    const rawData = {
      name: formData.get("name") ?? product.name,
      price: formData.get("price") !== null ? Number(formData.get("price")) : product.price,
      stock: formData.get("stock") !== null ? Number(formData.get("stock")) : product.stock,
      status: formData.get("status") ?? product.status,
      description: formData.get("description") ?? product.description,
      imageUrl: product.imageUrl,
    };


    const parsed = productSchema.partial().safeParse(rawData);
    if (!parsed.success) {
      return Response.json(
        { message: "Invalid update data", errors: parsed.error.flatten() },
        { status: 400 }
      );
    }


    const imageFile = formData.get("image");

    if (
      imageFile instanceof File &&
      imageFile.size > 0
    ) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());

      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "products" }, (err, result) => {
            if (err) reject(err);
            else resolve(result);
          })
          .end(buffer);
      });

      parsed.data.imageUrl = uploadResult.secure_url;

      // Inside your PATCH/Update handler
      const existingProduct = await Product.findById(id);
      const updates = await request.json(); // or formData
      const diffs = {};

      // Fields you want to track
      const fieldsToTrack = ['name', 'price', 'stock', 'status', 'description'];

      fieldsToTrack.forEach(field => {
        if (updates[field] !== undefined && updates[field] !== existingProduct[field]) {
          diffs[field] = {
            old: existingProduct[field],
            new: updates[field]
          };
        }
      });

      // Create the log entry if something actually changed
      if (Object.keys(diffs).length > 0) {
        const logEntry = {
          action: "UPDATED",
          message: `Updated: ${Object.keys(diffs).join(', ')}`,
          details: diffs, // Save the differences here
          at: new Date()
        };

        existingProduct.logs.push(logEntry);
        // Apply updates to existingProduct and save
      }
    }



    Object.assign(product, parsed.data);
    product.editedBy = "admin@system";
    product.updatedAt = new Date();

    product.logs.push({
      message: "Product updated",
      at: new Date(),
    });

    await product.save();

    return Response.json(product, { status: 200 });

  } catch (err) {
    console.error("PATCH ERROR:", err);
    return Response.json(
      { message: "Server error during update" },
      { status: 500 }
    );
  }
} */
export async function PATCH(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const product = await Product.findById(id);
    if (!product) return Response.json({ message: "Product not found" }, { status: 404 });

    const formData = await req.formData();

    // 1. Prepare raw data for validation
    const rawData = {
      name: formData.get("name") ?? product.name,
      price: formData.get("price") !== null ? Number(formData.get("price")) : product.price,
      stock: formData.get("stock") !== null ? Number(formData.get("stock")) : product.stock,
      status: formData.get("status") ?? product.status,
      description: formData.get("description") ?? product.description,
    };

    const parsed = productSchema.partial().safeParse(rawData);
    if (!parsed.success) return Response.json({ message: "Invalid data", errors: parsed.error.flatten() }, { status: 400 });

    // 2. Handle Image Upload (Optional)
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

    // 3. DIFFING LOGIC - Compare parsed.data (new) with product (old)
    const diffs = {};
    const fieldsToTrack = ['name', 'price', 'stock', 'status', 'description'];

    fieldsToTrack.forEach(field => {
      const newValue = parsed.data[field];
      const oldValue = product[field];

      // Ensure we compare values correctly (especially numbers)
      if (newValue !== undefined && String(newValue) !== String(oldValue)) {
        diffs[field] = {
          old: oldValue,
          new: newValue
        };
      }
    });

    // 4. Update the document and push the detailed log
    if (Object.keys(diffs).length > 0) {
      product.logs.push({
        action: "UPDATED",
        message: `Updated: ${Object.keys(diffs).join(', ')}`,
        details: diffs, // This now actually contains the data
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

/**
 * DELETE /api/products/:id
 */
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

