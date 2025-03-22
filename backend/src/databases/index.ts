import { drizzle } from "drizzle-orm/postgres-js";
import { CONFIG } from "../configs";
import postgres from 'postgres';

import * as userSchema from "./schemas/users";

const queryClient = postgres(`postgres://${CONFIG.db.user}:${CONFIG.db.pass}@${CONFIG.db.host}:${CONFIG.db.port}/${CONFIG.db.dbname}`, {
  max: 10, // maximum number of connections the pool will keep open at any given time
})

// const db = drizzle(CONFIG.db.host, { schema: { ...userSchema } });
const db = drizzle(queryClient, {schema: {...userSchema }  });

export default db;
