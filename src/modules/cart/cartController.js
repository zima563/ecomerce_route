import { cartModel } from "../../../databases/models/cartModel.js";
import { couponModel } from "../../../databases/models/coponModel.js";
import { productModel } from "../../../databases/models/productModel.js";
import { catchError } from "../../middleware/catchError.js";
import { apiError } from "../../utils/apiError.js";

const calcTotalPrice = (cart) => {
  let totalPrice = 0;
  cart.cartItems.forEach((item) => {
    totalPrice += item.quantity * item.price;
  });

  cart.totalPrice = totalPrice;
  if (cart.discount) {
    let totalPriceAfterDiscount =
      cart.totalPrice - (cart.totalPrice * cart.discount) / 100;
    cart.totalPriceAfterDiscount = totalPriceAfterDiscount;
  }
};

const addToCart = catchError(async (req, res, next) => {
  let product = await productModel.findById(req.body.product);
  if (!product) return next(new apiError("product not found", 404));
  if (req.body.quantity > product.quantity)
    return next(new apiError("sold out", 404));
  req.body.price = product.price;
  let isCartExist = await cartModel.findOne({ user: req.user._id });
  if (!isCartExist) {
    let cart = new cartModel({
      user: req.user._id,
      cartItems: [req.body],
    });
    calcTotalPrice(cart);
    await cart.save();
    !cart && next(new apiError({ msq: "not cart found" }, 404));
    cart && res.json({ msg: "success", cart });
  } else {
    let item = isCartExist.cartItems.find(
      (item) => item.product == req.body.product
    );
    if (item) {
      if (item.quantity >= product.quantity)
        return next(new apiError("sold out", 404));
      item.quantity += req.body.quantity || 1;
    } else isCartExist.cartItems.push(req.body);
    calcTotalPrice(isCartExist);
    await isCartExist.save();
    res.json({ msg: "success", cart: isCartExist });
  }
});

const removeItemFromCart = catchError(async (req, res, next) => {
  let cart = await cartModel.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { cartItems: { _id: req.params.id } } },
    { new: true }
  );
  calcTotalPrice(cart);
  await cart.save();
  !cart && next(new apiError({ msq: "not cart found" }, 404));
  cart && res.json({ msg: "success", cart });
});

const updateQTY = catchError(async (req, res, next) => {
  let cart = await cartModel.findOne({ user: req.user._id });

  let item = cart.cartItems.find((item) => item._id == req.params.id);
  if (!item) return next(new apiError("item not found", 404));
  item.quantity = req.body.quantity;
  calcTotalPrice(cart);
  await cart.save();
  !cart && res.status(404).json({ msg: "cart not found" });
  cart && res.json({ msg: "success", cart });
});

const getLoggedUserCart = catchError(async (req, res, next) => {
  let cart = await cartModel
    .findOne({ user: req.user._id })
    .populate("cartItems.product");
  !cart && res.status(404).json({ msg: "cart not found" });
  cart && res.json({ msg: "success", cart });
});

const clearUserCart = catchError(async (req, res, next) => {
  let cart = await cartModel.findOneAndDelete({ user: req.user._id });
  !cart && res.status(404).json({ msg: "cart not found" });
  cart && res.json({ msg: "success", cart });
});

const applyCoupon = catchError(async (req, res, next) => {
  let coupon = await couponModel.findOne({
    code: req.body.code,
    expire: { $gte: Date.now() },
  });
  if (!coupon) return next(new apiError("invalid coupon", 404));

  let cart = await cartModel.findOne({ user: req.user._id });

  let totalPriceAfterDiscount =
    cart.totalPrice - (cart.totalPrice * coupon.discount) / 100;
  cart.totalPriceAfterDiscount = totalPriceAfterDiscount;
  cart.discount = coupon.discount;
  await cart.save();
  res.json({ msg: "success", cart });
});

export {
  addToCart,
  updateQTY,
  getLoggedUserCart,
  removeItemFromCart,
  clearUserCart,
  applyCoupon,
};
