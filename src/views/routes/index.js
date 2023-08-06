import { Router } from "express";
import { Post } from "../models/post.js";

const router =  Router()

router.get('/', (req, res) => {
  res.render('index', {
    title: "Home Page"
  });
});

export default router;
