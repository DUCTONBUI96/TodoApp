import pool from "../config/db.js";

const createToDoTable = async() =>{
    const queryText = `
    CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    isDone BOOLEAN DEFAULT false,
    create_at TIMESTAMP DEFAULT now() )
    `;

    try{
        pool.query(queryText);
        console.log("table create successfull");
    }
    catch(error){
        console.log("error :",error);
    }
};

export default createToDoTable;