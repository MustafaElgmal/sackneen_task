import { Request } from "express";
import { ObjectId } from "mongoose";


export interface userCreateType {
    firstName:string,
    lastName:string,
    email:string,
    password:string
}

export interface userType extends userCreateType{
    favoriteMovies: {
        name?: string | undefined;
        description?: string | undefined;
        profilePath?: string | undefined;
        coverPath?: string | undefined;
    }[]
}
export interface RequestAuthType extends Request{
    user?:userType
}

export interface movieType{
    name:string
    description:string
    profilePath:string
    coverPath:string
}