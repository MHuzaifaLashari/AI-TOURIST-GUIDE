import mongoose from "mongoose"


const responseSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
});
const Response = mongoose.model('responses',responseSchema);

 export default Response;