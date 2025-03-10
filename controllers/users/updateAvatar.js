const fs = require("fs").promises;
const path = require("path");
const Jimp = require("jimp");

const { HttpError } = require("../../helpers");
const { User } = require("../../models/user.js");

const avatarsDir = path.join(__dirname, "..", "..", "public", "avatars");
console.log(avatarsDir);

const updateAvatar = async (req, res) => {
  const { path: tempUploud, originalname } = req.file;
  const { _id } = req.user;
  console.log(_id, "<_________");
  const newFileName = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, newFileName);
  //   console.log(resultUpload);
  await fs.rename(tempUploud, resultUpload);
  const newImg = await Jimp.read(resultUpload);
  await newImg.cover(
    250,
    250,
    Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE
  );
  await newImg.resize(250, Jimp.AUTO);
  await newImg.write(resultUpload);
  // в новом пути указзываем внутреннюю папку в нашей static (public)
  const avatarURL = path.join("avatars", newFileName);
  try {
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({
      avatarURL: avatarURL,
    });
  } catch (error) {
    throw HttpError(401, error.message);
  }
};

module.exports = updateAvatar;
