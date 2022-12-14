import { userType } from './../types';
import bcrypt from 'bcryptjs'
import  jwt from 'jsonwebtoken';
export const hashPassword = async (password: string) => {
    try {
      const passwordHash = await bcrypt.hash(password, 10);
      return passwordHash;
    } catch (e) {
      throw e;
    }
  };
  export const comparePassword = async (
    password: string,
    passwordHash: string
  ) => {
    try {
      const isVaild = await bcrypt.compare(password, passwordHash);
      return isVaild;
    } catch (e) {
      throw e;
    }
  };

  export const generateAuth = async (email: string) => {
    try {
      const token = jwt.sign({ email }, process.env.SECRETKEY!);
      return token;
    } catch (e) {
      throw e;
    }
  };
  
  export const verifyToken = async (authorization: string) => {
    try {
      const { email} = jwt.verify(authorization, process.env.SECRETKEY!) as {
        email: string;
      };
      return email;
    } catch (e) {
      throw e;
    }
  };

  