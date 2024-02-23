import { globalError } from "./middleware/globalError.js";
import { addressRouter } from "./modules/address/addressRoutes.js";
import { authRouter } from "./modules/auth/authRoutes.js";
import { brandRouter } from "./modules/brand/brandRoutes.js";
import { cartRouter } from "./modules/cart/cartRoutes.js";
import { categoryRouter } from "./modules/category/categoryRoutes.js";
import { couponRouter } from "./modules/coupon/couponRoutes.js";
import { orderRouter } from "./modules/order/orderRoutes.js";
import { productRouter } from "./modules/product/productRouters.js";
import { reviewRouter } from "./modules/review/reviewRoutes.js";
import { subcategoryRouter } from "./modules/subcategory/subcategoryRoutes.js";
import { userRouter } from "./modules/user/userRoutes.js";
import { wishListRouter } from "./modules/wishlist/wishlistRoutes.js";
import { createOnlineOrder } from "./src/modules/order/orderController.js";
import { apiError } from "./utils/apiError.js";
import cors from "cors";

export const bootstrap = (app) => {

  app.use(cors());
  app.use('/webhook', express.raw({type: 'application/json'}),createOnlineOrder);
  app.use(express.json());
  app.use("/", express.static("uploads"));
  app.use("/api/v1/categories", categoryRouter);
  app.use("/api/v1/subcategories", subcategoryRouter);
  app.use("/api/v1/brands", brandRouter);
  app.use("/api/v1/products", productRouter);
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/reviews", reviewRouter);
  app.use("/api/v1/wishList", wishListRouter);
  app.use("/api/v1/address", addressRouter);
  app.use("/api/v1/coupons", couponRouter);
  app.use("/api/v1/cart", cartRouter);
  app.use("/api/v1/order", orderRouter);

//   app.use("/", (req, res, next) => {
//   res.json({ msg: "hello world" });
// });

  app.use("*", (req, res, next) => {
    next(new apiError(`not found endPoint : ${req.originalUrl}`, 404));
  });

  app.use(globalError);
};
