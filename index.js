const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productRouter = require("./routes/Product");
const categoryRouter = require("./routes/Category");
const brandRouter = require("./routes/Brand");
const userRouter = require("./routes/User");
const authRouter = require("./routes/Auth");
const cartRouter = require("./routes/Cart");
const orderRouter = require("./routes/Order");
const cors = require("cors");

app.use(express.json());
app.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);

async function main() {
  await mongoose.connect(
    "mongodb+srv://chhavigupta1705:Lqw16Ah9vxTMJmLY@zaroorthai.kmn803r.mongodb.net/?retryWrites=true&w=majority&appName=ZaroortHai"
  );
  console.log("db connected");
}

main().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.json({ status: "success" });
});

app.use("/products", productRouter.router);
app.use("/categories", categoryRouter.router);
app.use("/brands", brandRouter.router);
app.use("/users", userRouter.router);
app.use("/auth", authRouter.router);
app.use("/cart", cartRouter.router);
app.use("/orders", orderRouter.router)

app.listen(8080, () => {
  console.log("Server started at 8080");
});
