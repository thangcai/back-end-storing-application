// @ts-ignore
import Client from "../database";

export type Order = {
  id: number;
  user_id: string;
  orderstatus: string;
  orderItems: Array<OrderItem>;
};

export type OrderItem = {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
};

export type OrderBody = {
  user_id: string;
  product_id: number;
  quantity: number;
  orderstatus: string;
};

export class OrderStore {
  async completedOrderByUser(userId: string): Promise<Order[]> {
    try {
      const sql =
        "SELECT * FROM orders WHERE user_id=($1) and orderstatus='complete'";
      const sqlItem =
        "SELECT * FROM orderitems oi LEFT JOIN products p ON oi.product_id = p.id WHERE oi.order_id=($1)";
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [userId]);
      conn.release();

      const orders = result.rows;

      const ordersRes = await Promise.all(
        orders.map(async (order: Order) => {
          const resultItem = await conn.query(sqlItem, [order.id]);
          const items = resultItem.rows;
          order.orderItems = items;
          return order;
        })
      );
      return ordersRes;
    } catch (err) {
      throw new Error(`Could not find completed order ${userId}. Error: ${err}`);
    }
  }

  async currentOrderByUser(userId: string): Promise<Order[]> {
    try {
      const sql = "SELECT * FROM orders WHERE user_id=($1)";
      const sqlItem =
        "SELECT * FROM orderitems oi LEFT JOIN products p ON oi.product_id = p.id WHERE oi.order_id=($1)";
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [userId]);
      conn.release();

      const orders = result.rows;

      const ordersRes = await Promise.all(
        orders.map(async (order: Order) => {
          const resultItem = await conn.query(sqlItem, [order.id]);
          const items = resultItem.rows;
          order.orderItems = items;
          return order;
        })
      );
      return ordersRes;
    } catch (err) {
      throw new Error(`Could not find order ${userId}. Error: ${err}`);
    }
  }

  async create(b: OrderBody): Promise<Order> {
    try {
      const sql =
        "INSERT INTO orders (user_id, orderstatus) VALUES($1, $2) RETURNING *";
      const sqlItem =
        "INSERT INTO orderitems (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *";
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [b.user_id, b.orderstatus]);
      const order = result.rows[0];

      const resultItem = await conn.query(sqlItem, [
        order.id,
        b.product_id,
        b.quantity,
      ]);
      const orderItem = resultItem.rows[0];
      order.orderItems = orderItem;

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not add new order. Error: ${err}`);
    }
  }
}
