import mongoose from "mongoose";
const Schema=mongoose.Schema

const movieSchema=new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true
    },
    profilePath:{
        type:String,
        required:true,
        trim:true
    },
    coverPath:{
        type:String,
        required:true,
        trim:true
    }
})

export const Movie=mongoose.model('movie', movieSchema)