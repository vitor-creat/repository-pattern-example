import { waitForDebugger } from 'node:inspector'
import { pool } from '../../database/connection.js'
import { Book } from '../../domain/Books.js'
import {type IBooksRepo}  from '../IBooksRepo.js'
import {type RowDataPacket, type ResultSetHeader } from 'mysql2'

// MySQLBooksRepo implementa IBooksRepo usando MySQL.
// É aqui que o SQL vive — isolado e longe das regras de negócio.

export class MySQLBooksRepo implements IBooksRepo{

    async findByName(name: 'string'): Promise<Book | undefined> {
        const [result] = await pool.execute<RowDataPacket[]>(
            'SELECT * FROM books WHERE name = ? LIMIT 1', [name]
        )
        if (result.length === 0) {
            return undefined
        }
        return new Book(result[0] as Book)
    }
    async findById(id: number): Promise<Book | undefined> {
        const [result] = await pool.execute<RowDataPacket[]>(
            'SELECT * FROM books WHERE name = ? LIMIT 1', [id]
        )
        if (result.length === 0) {
            return undefined
        }
        return new Book(result[0] as Book)
    }

    async save(book: Book): Promise<Book> {
        const [result] = await pool.execute<ResultSetHeader>(
            "INSERT INTO books (name, author, loan) VALUES (?,?,?)", [book.name, book.author, book.loan]
        )
        return new Book({...book, id: result.insertId})    
    }
    async update(book: Book): Promise<void> {
        if (book.id === undefined) {
            throw new Error("Book sem ID")
        }
        const [result] = await pool.execute<ResultSetHeader>(
            "UPDATE books SET loan = ? WHERE id =? ", [book.loan, book.id]
        )
    }
}