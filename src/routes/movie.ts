import { getMovies } from "./../utils/apis";
import axios from "axios";
import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  let { page } = req.query;
  if (!page) {
    page = "1";
  }else{
    if(+page>500){
        return res.status(400).json({messaga:'page must be less than or equal to 500'})
    }
  }
  try {
    const data = await getMovies(+page);
    
    res.status(200).json({ data });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error:'Server is down!' });
  }
});

export default router;
