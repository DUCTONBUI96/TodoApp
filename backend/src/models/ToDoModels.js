import pool from "../config/db.js";

export const getAllToDos = async()=>{
    const result = await pool.query("SELECT * FROM tasks");
    return result.rows;
};

export const createToDos = async(title)=>{
    const result = await pool.query("INSERT INTO tasks(title) VALUES ($1) ",[title]);
    return result;
};


// export const deleteToDos = async (id) => {
//     const result = await pool.query("DELETE FROM tasks WHERE id = $1 RETURNING *", [id]);
//     return result.rows[0];
// };

