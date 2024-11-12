import { Injectable } from '@nestjs/common';
import { MyMemory } from '../core/mymemory';
import { Event, IOrder, IProduct, State } from '../core/interfaces/interfaces';
import { IShipment } from '../core/interfaces/shipment';
import { isInstance } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { Order } from '../core/order';

@Injectable()
export class ShipmentService implements IShipment {

    constructor(private readonly memory: MyMemory) {

    }
    async createOrder(order: IOrder) {

        await this.memory.put(order.id, order)
        let data = this.memory.get(order.id)
        return data
    }
    async updateOrder(order_id: string, event: Event) {
        let order: IOrder | IProduct = await this.memory.get(order_id)
        if (!order) {
            throw new Error(`OrderId ${order_id} not found `);
        }
        let orderInstance = plainToInstance(Order, order, { enableImplicitConversion: true })
        if ( orderInstance instanceof Order && orderInstance !== undefined  ) {

            switch (event) {
                case Event.PACKED:
                    orderInstance.state = State.ORDER_PACKED
                    this.memory.put(order_id, orderInstance)
                    break;
                case Event.PICKED_UP:
                    orderInstance.state = State.ORDER_PICKED_UP
                    this.memory.put(order_id, orderInstance)
                    break;
                case Event.SHIPPED:
                    orderInstance.state = State.ORDER_SHIPPED
                    this.memory.put(order_id, orderInstance)
                    break;
                case Event.IN_TRANSIT:
                    orderInstance.state = State.ORDER_IN_TRANSIT
                    this.memory.put(order_id, orderInstance)
                    break;
                case Event.DELIVERED:
                    orderInstance.state = State.ORDER_DELIVERED
                    this.memory.put(order_id, orderInstance)
                    break;
                default:
                    Error(`Invalid event ${event}`)
                    


            }
        }

    }


    async getOrderById(order_id: string) {
        let data = this.memory.get(order_id)
        return data;
    }

    async set() {
        // const order: IOrder = {
        //     id: Math.random().toString(),
        //     items: [{ id: Math.random().toString(), name: "Mototola", price: 250000 }],
        //     total_amount: 0,
        //     state: State.ORDER_PLACED
        // }
        // await this.memory.put("foo", order)

        // let data = this.memory.get("foo")
        // return data
    }


}
