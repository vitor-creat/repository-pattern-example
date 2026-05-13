import { Book } from '../domain/Books.js'
import { type IBooksRepo } from '../repos/IBooksRepo.js'

export class DonateBook{
// O use case depende da INTERFACE, não da implementação concreta.
  // Isso é Inversão de Dependência (letra D do SOLID).
    constructor(private readonly repository: IBooksRepo){}

    async execute(name:string, author:string): Promise<Book>{
        const existing = await this.repository.findByName(name)

        if (existing) {
            throw new Error("Livro já existe no acervo")
        }

        const book = new Book({name, author, loan:false})
        return this.repository.save(book)
    }

}