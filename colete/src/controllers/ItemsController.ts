import { Request, Response } from "express";
import knex from '../database/connection'
class ItemsController {
  async index(req: Request, resp: Response){
    const items = await knex('items').select('*')
  
    const serializedItem = items.map(item => {
      return {
        id: item.id,
        title: item.title,
        image_url: `http://192.168.0.103:3333/uploads/${item.image}`,
      }
    })
  
    return resp.json(serializedItem)
  }
}

export default new ItemsController();