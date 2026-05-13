import express  from "express";
import { BooksController } from "./controllers/BooksController.js";

const app = express()
const PORT = 8000


// express.json() processa o corpo das requisições JSON.
// Não precisamos mais do body-parser — o Express já inclui isso nativamente desde a versão 4.16.

app.use(express.json())

const booksController = new BooksController()

app.post('/donate', (req, res) => booksController.donate(req, res));
app.put('/loan', (req, res) => booksController.loan(req, res));
app.put('/return', (req, res) => booksController.returnBook(req, res));

app.listen(PORT, () => {
    console.log(`Servidor Rodando em http://localhost:${PORT}`)
})