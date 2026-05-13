// Book é a representação de um livro no nosso domínio (regras de negócio).
// Ela não sabe nada sobre banco de dados — é uma entidade pura.
export interface BookProps{
    id?: number | undefined
    name:string;
    author:string;
    loan:boolean;
}

export class Book{
    id?: number | undefined
    name:string;
    author:string;
    loan:boolean;
    constructor(props: BookProps){
        this.id = props.id
        this.name = props.name
        this.author = props.author
        this.loan = props.loan
    }
}