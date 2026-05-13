import { type IBooksRepo } from "../repos/IBooksRepo.js";

export class LoanBook{
    constructor(private readonly repository:IBooksRepo){}

    async execute(id:number): Promise<void>{
        const book = await this.repository.findById(id)

        if (!book) {
            throw new Error("Livro não encontrado")
        }

        if (book.loan) {
            throw new Error("Livro já esta emprestado")
        }

        book.loan = true
        await this.repository.update(book)
    }
}