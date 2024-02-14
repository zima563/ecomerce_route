import { userModel } from "../../../databases/models/userModel.js";
import { catchError } from "../../middleware/catchError.js";
import { apiError } from "../../utils/apiError.js";

const addToAddress = catchError(async (req, res, next) => {
  let address = await userModel.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { addresses: req.body } },
    { new: true }
  );
  !address && next(new apiError({ msq: "not address found" }, 404));
  address && res.json({ msg: "success", address: address.addresses });
});

const removeFromaddress = catchError(async (req, res, next) => {
  let address = await userModel.findByIdAndUpdate(
    req.user._id,
    { $pull: { addresses: { _id: req.params.id } } },
    { new: true }
  );
  !address && next(new apiError({ msq: "not address found" }, 404));
  address && res.json({ msg: "success", address: address.addresses });
});

const getLoggedUserAddresses = catchError(async (req, res, next) => {
  let { addresses } = await userModel.findById(req.user._id);
  addresses && res.json({ msg: "success", addresses });
});
export { addToAddress, removeFromaddress, getLoggedUserAddresses };
