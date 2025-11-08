const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Cart = require("../models/cart");
const Product = require("../models/product");

const USER_ID = "testuser01"; // mock user

// GET /api/cart - fetch cart with populated product info
router.get("/", async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: USER_ID }).populate("items.productId");

    if (!cart) {
      return res.json({ items: [], total: 0 });
    }

    let total = 0;
    cart.items.forEach(i => {
      if (i.productId) total += i.productId.price * i.qty;
    });

    res.json({ items: cart.items, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error fetching cart" });
  }
});

// POST /api/cart - add item to cart
router.post("/", async (req, res) => {
  try {
    const { productId, qty } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    let cart = await Cart.findOne({ userId: USER_ID });

    if (!cart) {
      // create new cart if not exists
      cart = await Cart.create({
        userId: USER_ID,
        items: [{ productId: new mongoose.Types.ObjectId(productId), qty }],
      });
    } else {
      // check if item already exists in cart
      const existing = cart.items.find(
        i => i.productId.toString() === productId
      );
      if (existing) {
        existing.qty += qty;
      } else {
        cart.items.push({
          productId: new mongoose.Types.ObjectId(productId),
          qty,
        });
      }
      await cart.save();
    }

    res.json({ success: true, cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error adding to cart" });
  }
});

// DELETE /api/cart/:id - remove item from cart
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const cart = await Cart.findOne({ userId: USER_ID });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    cart.items = cart.items.filter(i => i.productId.toString() !== id);
    await cart.save();

    res.json({ success: true, cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error removing from cart" });
  }
});

module.exports = router;



