import User from "../models/User.models.js";

const createBooking = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.params;

    if ([userId, productId, quantity].some((field) => field == "")) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    user.booking.push({ productId, quantity });

    await user.save();

    return res.status(200).json({ message: "Booking created successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export { createBooking };
