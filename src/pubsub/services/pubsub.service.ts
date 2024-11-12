// import { Injectable } from '@nestjs/common';
// import { MyMemory } from '../core/mymemory';
// import { IOrder, State } from '../core/interfaces/interfaces';

// @Injectable()
// export class ShipmentService {

//     constructor(private readonly memory: MyMemory){

//     }

//     async set(){
//         const order: IOrder = {
//             id: Math.random().toString(),
//             items: [{ id: Math.random().toString(), name: "Mototola", price: 250000 }],
//             total_amount: 0,
//             state: State.ORDER_PLACED
//         }
//         await this.memory.put("foo", order)

//         let data = this.memory.get("foo")
//         return data
//     }

//     async getOrderByOrderId(order_id:string){
//         const order: IOrder = {
//             id: Math.random().toString(),
//             items: [{ id: Math.random().toString(), name: "Mototola", price: 250000 }],
//             total_amount: 0,
//             state: State.ORDER_PLACED
//         }

//         let data = this.memory.get(order_id)
//         return data;
//     }
// }
