import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DATABASE,
  POSTGRES_TEST_DATABASE,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  ENV,
} = process.env;

let client;

client = new Pool({
  host: POSTGRES_HOST,
  database: ENV == "dev" ? POSTGRES_DATABASE : POSTGRES_TEST_DATABASE,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});

export default client;
