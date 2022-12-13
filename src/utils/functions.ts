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

  export const generateAuth = async (userName: string) => {
    try {
      const token = jwt.sign({ userName }, process.env.SECRETKEY!, {
        expiresIn: "24h",
      });
      return token;
    } catch (e) {
      throw e;
    }
  };
  
  export const verifyToken = async (authorization: string) => {
    try {
      const { userName } = jwt.verify(authorization, process.env.SECRETKEY!) as {
        userName: string;
      };
      return userName;
    } catch (e) {
      throw e;
    }
  };

  