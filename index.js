import express from "express";
import { connection } from "./Database/dbconnect.js";


const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
