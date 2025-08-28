import express from 'express';
import cors from 'cors';
import dotnev from "dotenv";
import pool from "./config/db.js";
import routerTODO from './routes/RoutesTODO.js';
import errorHandling from './middlewares/errorHandler.js';
import createToDoTable from './data/createTodoTable.js';

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
app.get("/", async (req, res) => {
    try {
      const result = await pool.query("SELECT current_database()");
      res.json({
        status: "ok",
        database: result.rows[0].current_database,
        message: "API is working 🚀",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "Database connection failed",
      });
    }
  });
  


//server runing 
app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`);

});
