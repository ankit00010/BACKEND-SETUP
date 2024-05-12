import { NextFunction, Request, Response } from "express";
import multer, { MulterError } from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadAssessment = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  upload.array("excelFile")(req, res, (err: any) => {
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

export default uploadAssessment;
