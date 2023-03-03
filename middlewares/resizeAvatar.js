// const fs = require("fs").promises;
const path = require("path");
const Jimp = require("jimp");
console.log(process.cwd());
const { HttpError } = require("../helpers");
const currentAvatarsDir = path.join(process.cwd(), "temp");
// const currentDIRAvatarsDir = path.join(__dirname, "..", "temp");
console.log(currentAvatarsDir, "<---temp");
// console.log(currentDIRAvatarsDir, "<---DIR");
const resizeAvatar = async (req, res, next) => {
  const { path: tempUploud, originalname } = req.file;
  console.log(tempUploud, originalname, "<--req.file");
  const pathWithName = path.join(currentAvatarsDir, originalname);
  console.log(pathWithName, "<+++++pathWithName");
  try {
    const newImg = await Jimp.read(pathWithName);
    await newImg.resize(256, 256);
    // const currentDIRAvatarsDir = path.join(__dirname, "..", "temp");
    await newImg.write("temp/" + "rs_" + originalname);
    // Разобраться, почему операции с картинками выполняются параллельно,  хотя миддлвары идут последовательно
    next();
    //   return newImg;
    //   // .resize(256, 256)
    //   // .quality(60)
    //   // .greyscale()
    //   // .write("temp/" + originalname);
    // });
  } catch (error) {
    throw HttpError(401, error.message);
  }
};

module.exports = resizeAvatar;
