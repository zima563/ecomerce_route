import { cartModel } from "../../../databases/models/cartModel.js";
import { orderModel } from "../../../databases/models/orderModel.js";
import { productModel } from "../../../databases/models/productModel.js";
import { userModel } from "../../../databases/models/userModel.js";
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


  const createOnlineOrder = catchError((request, response) => {
    const sig = request.headers['stripe-signature'].toString();
  
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(request.body, sig, "whsec_1raOW2anm5YgBxb8mDPU2boxKtWH6fdG");
    } catch (err) {
      return response.status(400).send(`Webhook Error: ${err.message}`);
      
    }
  
    if(event.type=='checkout.session.completed'){
      
      card(event.data.object,response)
      console.log("create order here.........");
    }else{

      console.log(`Unhandled event type ${event.type}`);
    }
  }
);
export {
  createCashOrderCart,
  getSpecificOrder,
  getAllOrders,
  createCheckOutSessions,
  createOnlineOrder
};


async function card(e,res){
  let cart = await cartModel.findById(e.client_reference_id);
  if (!cart) return next(new apiError("not cart found", 404));
  let user = await userModel.findOne({email: e.customer_email})

  let order = new orderModel({
    user: user._id,
    orderItems: cart.cartItems,
    totalOrderPrice: e.amount_total/100 ,
    shippingAddress: e.metadata.shippingAddress,
    paymentType: "card",
    isPaid: true,
    paidAt: Date.now(),


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

  await cartModel.findOneAndDelete({user:user._id});

  res.json({ msg: "success", order });
}