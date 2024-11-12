import { IOrder, IProduct, State } from "./interfaces/interfaces";


export class Order implements IOrder {
    id: string;
    items: IProduct[];
    total_amount: number;
    state: State;
    
    constructor(id: string, items: IProduct[], amount: number){
        this.id = id
        this.items = items,
        this.total_amount = amount,
        this.state = State.ORDER_PLACED
    }
}