import { Expose } from "class-transformer";
import { Event } from "../core/interfaces/interfaces";
import { IsEnum, IsString } from "class-validator";


export class EventDTO{
    @Expose({name: "order_id"})
    @IsString()
    id:string

    @Expose({name: "event"})
    @IsString()
    @IsEnum(Event, { message: `Status must be one of: ${Object.values(Event).join(', ')}` })
    event: Event

    
}