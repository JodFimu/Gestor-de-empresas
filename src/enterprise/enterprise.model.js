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
    fundationYear: {
        type: Number,
        required: true  
    },
    years: {
        type: Number,
        default: 0
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

enterpriseSchema.pre("save", function (next) {
    const añoActual = new Date().getFullYear();
    this.years = añoActual - this.fundationYear;
    next();
});

enterpriseSchema.pre('findByIdAndUpdate', function (next) {
    const update = this.getUpdate();

    if(update.fundationYear){
        const añoActual = new Date().getFullYear();
        update.years = añoActual - update.fundationYear;
    }
    next();
});

export default model('Enterprise', enterpriseSchema);