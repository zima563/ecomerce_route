import { cartModel } from "../../../databases/models/cartModel.js";
import { orderModel } from "../../../databases/models/orderModel.js";
import { productModel } from "../../../databases/models/productModel.js";
import { catchError } from "../../middleware/catchError.js";
import { apiError } from "../../utils/apiError.js";
import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51OjO5wDJVgPX3w4UtWtwnxGjrFw2XBAByqmMldewZSiYUjLqp5IvjeD06mbPGUA2Ou9xlx0JqdRfzH8qtVrDzuJb00Zazas9tJ"
);

const createCashOrderCart = catchError(async (req, res, next) => {
  let cart = await cartModel.findById(req.params.id);
  if (!cart) return next(new apiError("not cart found", 404));

  let totalOrderPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalPrice;

  let order = new orderModel({
    user: req.user._id,
    orderItems: cart.cartItems,
    totalOrderPrice,
    shippingAddress: req.body.shippingAddress,
  });
  await order.save();

  let options = cart.cartItems.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod.product },
        update: { $inc: { sold: prod.quantity, quantity: -prod.quantity } },
      },
    };
  });

  await productModel.bulkWrite(options);

  await cartModel.findByIdAndDelete(req.params.id);

  res.json({ msg: "success", order });
});

const getSpecificOrder = catchError(async (req, res, next) => {
  let order = await orderModel
    .findOne({ user: req.user._id })
    .populate("orderItems.product");
  !order && next(new apiError("not order found", 404));
  order && res.json({ msg: "success", order });
});

const getAllOrders = catchError(async (req, res, next) => {
  let orders = await orderModel.find({}).populate("orderItems.product");
  res.json({ msg: "success", orders });
});

const createCheckOutSessions = catchError(async (req, res, next) => {
  let cart = await cartModel.findById(req.params.id);
  if (!cart) return next(new apiError("not cart found", 404));

  let totalOrderPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalPrice;
  let session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "egp",
          unit_amount: totalOrderPrice * 100,
          product_data: {
            name: req.user.name,
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    cancel_url: "http://localhost:3000/api/v1/order",
    success_url: "http://localhost:3000/api/v1/order",
    customer_email: req.user.email,
    client_reference_id: req.params.id,
    metadata: req.body.shippingAddress,
  });
  res.json({ msg: "success", session });
});
export {
  createCashOrderCart,
  getSpecificOrder,
  getAllOrders,
  createCheckOutSessions,
};
