const mongoose = require("mongoose");
const appointMentSchema = mongoose.Schema(
  {
    useId: { required: true, type: String },
    doctorId: { required: true, type: String },
    name: { required: true, type: String },
    doctorName:{required: true, type: String},
    age: { required: true, type: Number },
    gender: { required: true, type: String },
    reason: { required: true, type: String },
    checkupType: { required: true, type: String },
    mobile: { required: true, type: String },
    doctorName: { required: true, type: String },
    status: { required: true, type: String },
  },
  {
    versionKey: false,
  }
);

const appointMentModel = mongoose.model("appointment", appointMentSchema);

module.exports = {
  appointMentModel,
};
