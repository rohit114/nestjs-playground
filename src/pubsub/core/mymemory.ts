import { Injectable } from "@nestjs/common"
import { IOrder, IProduct } from "./interfaces/interfaces"

@Injectable()
export class MyMemory {
    private storage = new Map<string, IOrder|IProduct>()


    async get(key: string): Promise<IOrder|IProduct> {
        return this.storage.get(key)
    }

    async put(key: string, value: IOrder): Promise<any> {
        this.storage.set(key, value)
        return true
    }

    async delete(key: string): Promise<any> {
        this.storage.delete(key)
        return true
    }

    async getAll(key: string, value: IOrder): Promise<[string, IOrder|IProduct][]> {
        let data : [string, IOrder|IProduct][]
        this.storage.forEach((value, key)=>{
            data[key] = value
        })
        return data
    }

}