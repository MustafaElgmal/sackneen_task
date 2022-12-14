import { addMyFavoriteMovie } from "./../utils/validations";
import { getMovieById } from "./../utils/apis";
import { RequestAuthType, userCreateType } from "./../types";
import {
  generateAuth,
  getFavoriteMovieById,
  hashPassword,
} from "./../utils/functions";
import { Router } from "express";
import { loginValidation, userValidation } from "../utils/validations";
import { User } from "../entities/user";
import { userAuth } from "../middleware/userAuth";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const errors = await userValidation(req.body);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    const { firstName, lastName, email, password }: userCreateType = req.body;

    const passwordHash = await hashPassword(password);
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    await user.save();
    const token = await generateAuth(email);
    res.status(201).json({ token });
  } catch (e) {
    res.status(500).json({ error: "Server is down!" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const errors = await loginValidation(req.body);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    const token = await generateAuth(req.body.email);
    res.status(200).json({ token });
  } catch (e) {
    res.status(500).json({ error: "Server is down!" });
  }
});

router.post(
  "/addmovietolist/:movieId",
  userAuth,
  async (req: RequestAuthType, res) => {
    const { movieId } = req.params;
    try {
      const data = await getMovieById(+movieId!);
      const user = req.user!;
      const userFind = await User.findOne({ email: user.email });
      const errors = await addMyFavoriteMovie(+movieId, user.email);
      if (errors.length > 0) {
        return res.status(400).json(errors);
      }
      userFind?.favoriteMovies.push(data);
      userFind?.save();
      res.status(201).json({ data });
    } catch (e: any) {
      if (e.response.status === 404) {
        return res.status(404).json({ message: "Movie is not found!" });
      }
      res.status(500).json({ error: "Server is down!" });
    }
  }
);

router.get("/favoritemovies", userAuth, async (req: RequestAuthType, res) => {
  const user = req.user!;
  res.status(200).json({ favoriteMovies: user.favoriteMovies });
});
router.patch(
  "/arrangmovie/:movieId",
  userAuth,
  async (req: RequestAuthType, res) => {
    const { movieId } = req.params;
    const { moveto } = req.query;
    if (!moveto) {
      return res
        .status(400)
        .json({ message: "Please enter your moveto number that movie move to" });
    }
    try {
      const user = req.user!;
      const userFind = await User.findOne({ email: user.email });
      const errors = getFavoriteMovieById(+movieId!, user);
      if (errors.length > 0) {
        return res.status(400).json(errors);
      }
      userFind?.favoriteMovies.forEach((movie, index, arr) => {
        if (movie.id === +movieId!) {
          arr.splice(index, 1);
          arr.splice(+moveto - 1, 0, movie);
        }
      });
      userFind?.save();
      res.status(200).json({data:userFind?.favoriteMovies});
    } catch (e) {
      res.status(500).json({ error: "Server is down!" });
    }
  }
);

router.delete(
  "/deletemovietolist/:movieId",
  userAuth,
  async (req: RequestAuthType, res) => {
    const { movieId } = req.params;
    try {
      const user = req.user!;
      const userFind = await User.findOne({ email: user.email });
      const errors = getFavoriteMovieById(+movieId!, user);
      if (errors.length > 0) {
        return res.status(400).json(errors);
      }
      userFind?.favoriteMovies.forEach((movie, index, arr) => {
        if (movie.id === +movieId!) {
          return arr.splice(index, 1);
        }
      });
      userFind?.save();
      res.status(200).json({ message:'Movie deleted from favorit list!' });
    } catch (e) {
      res.status(500).json({ error: "Server is down!" });
    }
  }
);

export default router;
