import express from 'express';
import cors from 'cors';
import dotnev from "dotenv";
import pool from "./config/db.js";
import routerTODO from './routes/RoutesTODO.js';
import errorHandling from './middlewares/errorHandler.js';

dotnev.config();

const app = express();
const port = process.env.port||3001;

//Middlewares

app.use(express.json());
app.use(cors());

//routes
app.use("/api",routerTODO)


//Error hadling middlewares
app.use(errorHandling)

//TESTING POSTGRES
app.get("/todos", async (req, res) => {
  try {
    const result = await pool.query("SELECT id, title, isdone FROM tasks");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

  


//server runing 
// đúng (nghe ở mọi IP trong LAN, bao gồm IPv4 của bạn)
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running at http://192.168.102.105:${port}`);
});

