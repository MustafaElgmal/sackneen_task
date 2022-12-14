import { User } from "../entities/user";
import { movieType, userCreateType } from "./../types";
import validator from "validator";
import { comparePassword } from "./functions";
import { Movie } from "../entities/movie";

export const userValidation = async (user: userCreateType) => {
  const { firstName, lastName, email, password } = user;

  const errors: { message: string }[] = [];
  if (!firstName) {
    errors.push({ message: "firstName is required!" });
  }
  if (!lastName) {
    errors.push({ message: "lastName is required!" });
  }
  if (!email) {
    errors.push({ message: "email is required!" });
  } else {
    try {
      const userFind = await User.findOne({ email });
      console.log(userFind);
      if (userFind) {
        errors.push({ message: "User is elready exsiting!" });
      }
    } catch (e) {
      throw e;
    }
  }
  if (!password) {
    errors.push({ message: "Password is required!" });
  } else {
    const isStrong = validator.isStrongPassword(password);
    if (!isStrong) {
      errors.push({
        message:
          "Password must be { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}",
      });
    }
  }

  return errors;
};

export const loginValidation = async (user: {
  email: string;
  password: string;
}) => {
  const errors: { message: string }[] = [];
  const { email, password } = user;
  if (!email) {
    errors.push({ message: "email is required!" });
  } else {
    try {
      const userFind = await User.findOne({ email });
      if (!userFind) {
        errors.push({ message: "email is not vaild!" });
      } else {
        if (!password) {
          errors.push({ message: "Password is required!" });
        } else {
          const isVaild = await comparePassword(password, userFind.password);
          if (!isVaild) {
            errors.push({ message: "Password is not vaild!" });
          }
        }
      }
    } catch (e) {
      throw e;
    }
  }
  return errors;
};

export const addMyFavoriteMovie = async (movieId: number, email: string) => {
  const errors: { message: string }[] = [];
  try {
    const user = await User.findOne({ email });
    if (user?.favoriteMovies.length === 100) {
      errors.push({
        message: "favoriteMovies become 100 movies please delete one !",
      });
    } else {
      const favoriteMovie = user?.favoriteMovies.find(
        (movie) => movie?.id === movieId
      );
      if (favoriteMovie) {
        errors.push({ message: "Movie is already exixting!" });
      }
    }
  } catch (e) {
    throw e;
  }
  return errors;
};
