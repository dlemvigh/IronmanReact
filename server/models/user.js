import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    facebookId: {
        type: String
    },
    active: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model("User", userSchema);
