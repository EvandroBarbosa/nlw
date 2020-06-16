import { Request, Response } from "express";
import knex from '../database/connection'

class PointsController {
  async index(req: Request, resp: Response){
    const {city, uf, items} = req.query;

    const parsedItem = String(items).split(',')
      .map(item => Number(item.trim()));

    const points = await knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', parsedItem)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*');

    const serializedPoints = points.map(point => {
      return {
        ...point,
        image: `http://192.168.0.103:3333/uploads/img/${point.image}`,
      }
    })


    return resp.json(serializedPoints)
  }

  async show(req: Request, resp: Response) {
    const { id } = req.params;

    const point = await knex('points').where('id', id).first();

    if(!point) {
      return resp.status(403).json({ message: 'Point not found'})
    }

    const serializedPoint = {
        ...point,
        image: `http://192.168.0.103:3333/uploads/img/${point.image}`,
    }

   const item = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title');

    return resp.json({point: serializedPoint, item })
  }

  async store(req: Request, resp: Response) {
    const { image, name, email, whatsapp, latitude, longitude, city, uf, items } = req.body;
  
    const trx = await knex.transaction();
    
    const point = {
      image: req.file.filename,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf
    }

    const pointIds = await trx('points').insert(point);
  
    const point_id = pointIds[0]
    const pointItems = items
      .split(',')
      .map((item: string) => Number(item.trim()))
      .map((item_id: Number) => {
        return {
          item_id,
          point_id,
        }
    })
  
    await trx('point_items').insert(pointItems)

    await trx.commit();
  
    return resp.json({
      id: point_id,
      ...point
    })
  }
}

export default new PointsController();