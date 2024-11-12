import { IProduct } from "./interfaces/interfaces";


export class Product implements IProduct {
     id: string;
     name: string;
     price: number;
    constructor(id: string, name: string, price:number){
        this.id = id
        this.name = name
        this.price = price
    }
}