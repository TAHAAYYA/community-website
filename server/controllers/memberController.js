import User from "../models/User.js";


// GET ALL MEMBERS
export const getMembers = async (req, res) => {
  try {
    const members = await User.find({
      role: { $ne: "admin" }
    }).select("-password");

    res.json(members);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// APPROVE MEMBER
export const approveMember = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    user.approvalStatus = "approved";

    await user.save();

    res.json({
      message: "Member approved"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// REJECT MEMBER
export const rejectMember = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.json({
      message: "Member rejected and deleted"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// UPDATE MEMBER
export const updateMember = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// DELETE MEMBER
export const deleteMember = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.json({
      message: "Member deleted"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};