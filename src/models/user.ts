// @ts-ignore
import Client from "../database";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
};

export type UserBody = {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
};

export type UserAuthenticate = {
  userName: string;
  password: string;
};

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

export class UserStore {
  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT * FROM users";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = "SELECT * FROM users WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async create(u: UserBody): Promise<User> {
    try {
      const sql =
        "INSERT INTO users (firstName, lastName, userName, password) VALUES($1, $2, $3, $4) RETURNING *";
      // @ts-ignore
      const conn = await Client.connect();
      const hash = bcrypt.hashSync(
        u.password + BCRYPT_PASSWORD,
        // @ts-ignore
        parseInt(SALT_ROUNDS)
      );

      const result = await conn.query(sql, [
        u.firstName,
        u.lastName,
        u.userName,
        hash,
      ]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(
        `Could not add new user ${u.firstName + u.lastName}. Error: ${err}`
      );
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    const sql = "SELECT password FROM users WHERE username=($1)";
    // @ts-ignore
    const conn = await Client.connect();

    const result = await conn.query(sql, [username]);

    if (result.rows.length) {
      const user = result.rows[0];

      if (bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password)) {
        return user;
      }
    }

    return null;
  }

  async delete(id: string): Promise<User> {
    try {
      const sql = "DELETE FROM users WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }
}
