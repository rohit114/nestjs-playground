


export enum Event {
    PACKED      = "PACKED",
	PICKED_UP   = "PICKED_UP",
	SHIPPED     = "SHIPPED",
	IN_TRANSIT  = "IN_TRANSIT",
	DELIVERED   = "DELIVERED"
    
}

export enum State {
    ORDER_PLACED      = "ORDER_PLACED",
	ORDER_PACKED      = "ORDER_PACKED",
	ORDER_PICKED_UP   = "ORDER_PICKED_UP",
	ORDER_SHIPPED     = "ORDER_SHIPPED",
	ORDER_IN_TRANSIT  = "ORDER_IN_TRANSIT",
	ORDER_DELIVERED   = "ORDER_DELIVERED"
}

export interface IProduct {
    id:string
    name:string
    price:number
}

export interface IOrder {
    id:string
    items: IProduct[]
    total_amount: number
    state: State
}