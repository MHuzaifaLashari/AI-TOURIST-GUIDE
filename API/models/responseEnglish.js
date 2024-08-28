import mongoose from "mongoose"


const responseEnglishSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
});
const ResponseEnglish = mongoose.model('responsesEnglish',responseEnglishSchema);

 export default ResponseEnglish;