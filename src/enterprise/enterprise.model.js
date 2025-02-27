import {Schema, model} from 'mongoose';

const enterpriseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    years: {
        type: Number,
        required: true
    },
    status:{
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timeStamps: true
});

enterpriseSchema.methods.toJSON = function(){
    const {_id, ...enterprise} = this.toObject()
    enterprise.eid = _id
    return enterprise
}

export default model('Enterprise', enterpriseSchema);