import mongoose from 'mongoose';

// create the schema required for building
const urlSchema = new mongoose.Schema({
    alias:{
        type: String,
        required: false
    },
    url: {
        type: String,
        required: true
    },
    key :{
        type: String,
        required: false
    },
    shortUrl: {
        type : String,
        required: true
    }
})
// create a model for the above schema
const Saveurl = mongoose.model('Saveurl',urlSchema);
// export the model
export default Saveurl