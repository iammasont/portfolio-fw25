// api/cloudinary/[...media].ts
// Vercel serverless function to handle Cloudinary media uploads for Tina CMS

import { createMediaHandler } from "next-tinacms-cloudinary/dist/handlers";
import { isAuthorized } from "@tinacms/auth";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default createMediaHandler({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "",
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || "",
  api_secret: process.env.CLOUDINARY_API_SECRET || "",
  authorized: async (req, _res) => {
    // In local development, allow all uploads
    if (process.env.NODE_ENV === "development") {
      return true;
    }
    
    // In production, check Tina Cloud authentication
    try {
      const user = await isAuthorized(req);
      return user ? user.verified : false;
    } catch (e) {
      console.error("Authorization error:", e);
      return false;
    }
  },
});