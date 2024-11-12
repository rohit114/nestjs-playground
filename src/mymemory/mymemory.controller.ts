import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, Req, Res } from '@nestjs/common';
import { MymemoryService } from './services/mymemory.service';
import { Request, Response } from 'express';


@Controller('mymemory')
export class MymemoryController {
  constructor(private readonly memoservice: MymemoryService) {

  }

  @Get("foo")
  getHello(): string {
    return this.memoservice.getHello();
  }

  @Post("put")
  async put(
    @Req() req: Request,
    @Body() payload: Object,
    @Res() res: Response,
  ):Promise<any> {
    try {

      console.log("hellooooooooo")
      const key1 = "user_114"
      const key2 = "user_115"
      const key3 = "user_116"
      const value1: [string, any][] =  [ ["name", "Rohit"], ["eamil", "rohit@gmail.com"], ["age", 21]]
      const value2: [string, any][] =  [ ["name", "Rohit2"], ["eamil", "rohit2@gmail.com"], ["age", 22]]
      const value3: [string, any][] =  [ ["name", "Rohit3"], ["eamil", "rohit3@gmail.com"], ["age", 33]]
      await this.memoservice.put(key1, value1)
      await this.memoservice.put(key2, value2)
      await this.memoservice.put(key3, value3)
      return res.status(HttpStatus.OK).send({ data: [key1, key1, key3], message: "set success"})

    } catch (err) {
      throw new Error(err?.message);
    }
  }

  @Get('get')
  async get(
  @Query('key') key: string,
  @Req() req: Request,
  @Res() res: Response):Promise<any> {
    const data = await this.memoservice.get(key)
    return res.status(HttpStatus.OK).send({ data: data, message: "get success"})
    return { data: res};
  }

  @Get('search')
  async search(@Query('key') key: string,
  @Req() req: Request,
  @Res() res: Response
):Promise<any> {
    const data = await this.memoservice.search(key)
    return res.status(HttpStatus.OK).send({ data: data, message: "search success"})

  }




}
