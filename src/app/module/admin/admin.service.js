const { default: status } = require("http-status");
const ApiError = require("../../../error/ApiError");
const Auth = require("../auth/auth.model");
const Admin = require("./admin.model");

const updateProfile = async (req) => {
  const { files, body: data } = req;
  const { userId, authId } = req.user;

  if (!Object.keys(data).length)
    throw new ApiError(
      status.BAD_REQUEST,
      "Data is missing in the request body!"
    );

  let profile_image = undefined;
  if (files && files.profile_image)
    profile_image = `/images/profile/${files.profile_image[0].filename}`;

  const updatedData = { ...data };
  const [auth, admin] = await Promise.all([
    Auth.findByIdAndUpdate(
      authId,
      { name: updatedData.name },
      {
        new: true,
      }
    ),
    Admin.findByIdAndUpdate(
      userId,
      { profile_image, ...updatedData },
      {
        new: true,
      }
    ).populate("authId"),
  ]);

  if (!auth || !admin) throw new ApiError(status.NOT_FOUND, "User not found!");

  return admin;
};

const getProfile = async (userData) => {
  const { userId, authId } = userData;

  const [auth, result] = await Promise.all([
    Auth.findById(authId),
    Admin.findById(userId).populate("authId"),
  ]);

  if (!result || !auth) throw new ApiError(status.NOT_FOUND, "Admin not found");
  if (auth.isBlocked)
    throw new ApiError(status.FORBIDDEN, "You are blocked. Contact support");

  return result;
};

const deleteMyAccount = async (payload) => {
  const { email, password } = payload;

  const isUserExist = await Auth.isAuthExist(email);
  if (!isUserExist) throw new ApiError(status.NOT_FOUND, "User does not exist");
  if (
    isUserExist.password &&
    !(await Auth.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(status.FORBIDDEN, "Password is incorrect");
  }

  const [, ,] = await Promise.all([
    Auth.deleteOne({ email }),
    Admin.deleteOne({ authId: isUserExist._id }),
  ]);
};

const AdminService = {
  updateProfile,
  getProfile,
  deleteMyAccount,
};

module.exports = { AdminService };
