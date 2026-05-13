import { type Request, type Response } from 'express';
import { MySQLBooksRepo } from '../repos/implementation/MySQLBooksRepo.js';
import { DonateBook } from '../useCases/DonateBook.js';
import { LoanBook } from '../useCases/Loan.Book.js';
import { ReturnBook } from '../useCases/ReturnBook.js';

// Instanciamos o repositório uma vez e o injetamos nos use cases.
const booksRepo = new MySQLBooksRepo();

export class BooksController {
    async donate(req: Request, res:Response): Promise<void>{

        try {
            const {name, author} = req.body as {name: string, author: string}
            const useCases = new DonateBook(booksRepo)
            const book = await useCases.execute(name, author)
            res.status(201).json(book)
        } catch (err) {
            res.status(400).json({error: (err as Error).message})
        }
    }

    async loan(req:Request, res:Response): Promise<void>{

        try {
            const {id} = req.body as {id:number}
            const useCases = new LoanBook(booksRepo)
            await useCases.execute(id)
            res.status(201).json({mensage: "Livro já foi emprestado"})
        } catch (err) {
            res.status(400).json({error: (err as Error).message})
        }
    }


    async returnBook(req:Request, res:Response ): Promise<void>{

        try {
            const { id } = req.body as { id:number }
            const useCases = new ReturnBook(booksRepo)
            await useCases.execute(id)
            res.status(201).json({mensage: "Livro devolvido com sucesso"})
        } catch (err) {
            res.status(400).json({error: (err as Error).message})
        }


    }



}