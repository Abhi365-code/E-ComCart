const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");

const USER_ID = "testuser01";

router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;

    const cart = await Cart.findOne({ userId: USER_ID }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(404).json({ message: "Cart empty" });
    }

    const purchasedItems = cart.items.map((i) => ({
      name: i.productId.name,
      qty: i.qty,
      total: i.productId.price * i.qty,
    }));

    const total = purchasedItems.reduce((sum, i) => sum + i.total, 0);

    // clear cart
    cart.items = [];
    await cart.save();

    // return receipt
    res.json({
      success: true,
      total,
      time: new Date(),
      name,
      email,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;



