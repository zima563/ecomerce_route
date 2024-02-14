import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { apiError } from "../../utils/apiError.js";

const fileUpload = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, uuidv4() + "-" + file.originalname);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new apiError("only image allowed", 401));
    }
  };

  const upload = multer({ storage });

  return upload;
};

export const uploadSingleFile = (fieldname) => fileUpload().single(fieldname);
export const uploadArrayOfFiles = (fieldname) =>
  fileUpload().array(fieldname, 10);
export const uploadFieldsOfFiles = (fields) => fileUpload().fields(fields);
