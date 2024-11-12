import { Event, IOrder } from "./interfaces"



export interface IShipment {
    createOrder(order:IOrder):any
    updateOrder(order_id:string, event:Event):Promise<void>
    getOrderById(id:string):any
}