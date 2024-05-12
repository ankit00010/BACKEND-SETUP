import multer, { MulterError } from "multer";
import { Request, Response, NextFunction } from "express";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  upload.array("files")(req, res, (err: any) => {
    if (err instanceof MulterError) {
      return res.status(400).json({
        status: "FAILED",
      });
    } else if (err) {
      return res.status(500).json({
        status: "FAILED",
        error: "Internal server error",
      });
    }
    return next();
  });
};

export default uploadMiddleware;
