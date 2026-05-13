import mysql from "mysql2/promise"

// Pool de conexões: reutiliza conexões abertas ao invés de abrir uma nova a cada query.
// É muito mais eficiente para aplicações com múltiplas requisições simultâneas.
export const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database:"library_db"
})

