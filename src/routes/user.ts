import { userCreateType } from './../types';
import { generateAuth, hashPassword } from "./../utils/functions";
import { Router } from "express";
import { loginValidation, userValidation } from "../utils/validations";
import { User } from "../entities/user";
import {userAuth} from '../middleware/userAuth'

const router = Router();

router.post("/", async (req, res) => {
  try {
    const errors = await userValidation(req.body);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    const { firstName, lastName, email, password }:userCreateType = req.body;
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
    console.log(e);
    res.status(500).json({ error: "Server is down!" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const errors = await loginValidation(req.body);
    if (errors.length >= 0) {
      return res.status(400).json(errors);
    }
    const token = await generateAuth(req.body.email);
    res.status(200).json({ token });
  } catch (e) {
    res.status(500).json({ error: "Server is down!" });
  }
});

router.post('/addMovieToList/movieId',userAuth,async(req,res)=>{
    try{

    }catch(e){
        res.status(500).json({ error: "Server is down!" });

    }

})

export default router;
