import { Book } from "../domain/Books.js";

// IBooksRepo é uma interface: um contrato que qualquer repositório de livros deve seguir.
// As classes que implementam essa interface DEVEM ter todos esses métodos.
// Isso garante que o restante da aplicação não dependa de uma implementação específica.

export interface IBooksRepo{
    findByName(name:string): Promise<Book | undefined>;
    findById(id:number): Promise<Book | undefined>
    save(book:Book): Promise<Book>
    update(book: Book): Promise<void>
}