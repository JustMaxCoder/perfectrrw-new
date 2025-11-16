import multer from "multer";
import path from "path";
import fs from "fs";
import { nanoid } from "nanoid";
import { fileTypeFromBuffer } from "file-type";

// Configure upload directory
const uploadDir = path.join(process.cwd(), "apps", "backend", "uploads");
fs.mkdirSync(uploadDir, { recursive: true });

// Multer storage configuration
const storage_multer = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${nanoid(6)}${ext}`;
    cb(null, filename);
  },
});

// Multer upload middleware
export const upload = multer({ 
  storage: storage_multer,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

// Helper function to delete a file from the filesystem
export const deleteFile = (filePath: string): void => {
  try {
    const fullPath = path.join(uploadDir, path.basename(filePath));
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      console.log(`Deleted file: ${fullPath}`);
    }
  } catch (error) {
    console.error(`Failed to delete file ${filePath}:`, error);
  }
};

// Helper function to validate image file type using file-type library
export const validateImageFile = async (buffer: Buffer): Promise<boolean> => {
  try {
    const fileType = await fileTypeFromBuffer(buffer);
    if (!fileType) return false;
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    return allowedMimeTypes.includes(fileType.mime);
  } catch {
    return false;
  }
};

export { uploadDir };
