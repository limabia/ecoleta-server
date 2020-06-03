import { Request, Response } from "express";
import knex from "../database/connection";

class PointsController {
  async index(request: Request, response: Response) {
    //CIDADE, UF, ITEMS -> query
    const { city, uf, items } = request.query;
    const parsedItems = String(items)
      .split(",")
      .map((item) => Number(item.trim()));
    const points = await knex("points")
      .join("point_items", "point_id", "=", "point_items.point_id")
      .whereIn("point_items.item_id", parsedItems)
      .where("city", String(city))
      .where("uf", String(uf))
      .distinct()
      .select("points.*");

    const serializedPoints = points.map((point) => {
      return {
        ...point,
        image_url: `http://186.220.199.147:3333/uploads/${point.image}`,
      };
    });

    return response.json(serializedPoints);
  }

  async create(request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = request.body;

    const trx = await knex.transaction();

    const point = {
      image: request.file.filename,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };

    const insertedIds = await trx("points").insert(point);

    const point_id = insertedIds[0];

    const pointItems = items
      .split(",")
      .map((item: string) => Number(item.trim()))
      .map((item_id: number) => {
        return {
          item_id,
          point_id,
        };
      });

    await trx("point_items").insert(pointItems);

    await trx.commit();

    return response.json({ id: point_id, ...point });
  }

  async show(request: Request, response: Response) {
    const id = request.params.id;
    const point = await await knex("points").where("id", id).first();
    if (!point) {
      return response.status(400).json({ message: "Point not found." });
    }

    const serializedPoints = {
      ...point,
      image_url: `http://186.220.199.147:3333/uploads/${point.image}`,
    };

    /**
     * SELECT * FROM items
     *      JOIN point_items ON item.id = point_items.item_id
     *    WHERE point_items.point_id = (id)
     */

    const items = await knex("items")
      .join("point_items", "items.id", "=", "point_items.item_id")
      .where("point_items.point_id", id)
      .select("items.title")
      .orderBy("items.title", "asc");
    return response.json({ items, point: serializedPoints });
  }
}

export default PointsController;
