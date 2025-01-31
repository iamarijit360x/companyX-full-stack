const { default: mongoose } = require("mongoose");

const enquirySchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },
      subject: {
        type: String,
        required: true,
        trim: true,
      },
      message: {
        type: String,
        required: true,
        trim: true,
      },
      status: {
        type: String,
        enum: ["Pending", "Resolved"],
        default: "Pending",
      },
    },
    { timestamps: true }
  );
  
  const Enquiry = mongoose.model("Enquiry", enquirySchema);
  
  module.exports = Enquiry;