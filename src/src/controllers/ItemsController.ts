import { Response, Request } from "express";
import knex from "../database/connection";

class ItemsController {
  async index(request: Request, response: Response) {
    const items = await knex("items").select("*");
    const serializedItems = items.map((item) => {
      return {
        id: item.id,
        title: item.title,
        image_url: `http://186.220.199.147:3333/uploads/${item.image}`,
      };
    }); 
    return response.json(serializedItems);
  }
}

export default ItemsController;
