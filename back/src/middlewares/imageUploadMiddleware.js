import { ERRORS } from "../constants/constants";

const multer = require("multer");
const path = require("path");
const pathSep = path.sep;

const uploadPath = path.join(
  __dirname,
  pathSep,
  "..",
  pathSep,
  "images",
  pathSep,
  "profiles"
);

// 프로필 사진 업로드 미들웨어
const profilestorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${req.currentUserId}.${file.mimetype.split("/")[1]}`);
  },
});

const profileFilter = (req, file, callback) => {
  const fileType = file.mimetype.split("/")[1];

  if (fileType === "jpg" || fileType === "jpeg" || fileType === "png") {
    callback(null, true);
  } else {
    callback({ message: ERRORS.IMAGE_TYPE_ERROR.errorCode }, false);
  }
};

const profileUpload = multer({
  storage: profilestorage,
  fileFilter: profileFilter,
});

export { profileUpload };