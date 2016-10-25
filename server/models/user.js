import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    facebookId: {
        type: String
    }
});

export default mongoose.model("User", userSchema);
