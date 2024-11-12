import { Body, Controller, Get, HttpStatus, Post, Put, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Order } from '../core/order';
import { Product } from '../core/product';
import { ShipmentService } from '../services/shipment.service';
import { plainToInstance } from 'class-transformer';
import { EventDTO } from '../dto/EventDTO';
import { ValidationError, validateOrReject } from 'class-validator';


@Controller('shipment/order')
export class PubsubController {


    constructor(private readonly shipmentService: ShipmentService) {

    }

    @Get()
    async getOrderById(
        @Query("order_id") orderId: string,
        @Req() req: Request,
        @Res() res: Response

    ): Promise<any> {
        try {
            const data: any = await this.shipmentService.getOrderById(orderId)
            return res.status(HttpStatus.OK).send({ data: data, message: "success" })
        } catch (err) {

        }


    }

    @Post('create')
    async createOrder(
        @Body() body: Object,
        @Req() req: Request,
        @Res() res: Response

    ): Promise<any> {
        try {
            const p1 = new Product("product_" + Math.random().toString(), "Motorola", 45000) //todo create DTO
            const p2 = new Product("product_" + Math.random().toString(), "Samsung", 65000)
            let total_amount = [p1, p2].map(i => i.price).reduce((acc, price) => { return acc + price }, 0)
            let order = new Order("order_1", [p1, p2], total_amount)
            const data: any = await this.shipmentService.createOrder(order)

            return res.status(HttpStatus.OK).send({ data: data, message: "success" })
        } catch (err) {
            throw Error(`something went wrong ${err?.message}`)
        }


    }

    @Put('update')
    async updateOrder(
        @Body() body: Object,
        @Req() req: Request,
        @Res() res: Response

    ): Promise<any> {
        try {
            const dto = plainToInstance(EventDTO, body, { enableImplicitConversion: true })
            await validateOrReject(dto)
            const data: any = await this.shipmentService.updateOrder(dto.id, dto.event)

            return res.status(HttpStatus.OK).send({ data: data, message: "success" })
        } catch (err) {
            if (err instanceof Array && err.every(e => e instanceof ValidationError)) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    message: "Validation Failed",
                    errors: err.map(e => e.constraints),
                    data: null
                })
            }
            throw Error(`something went wrong ${err?.message}`)
        }


    }
}
