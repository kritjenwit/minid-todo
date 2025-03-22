import db from "../src/databases";
import { roles } from "../src/databases/schemas/users";

const main = async () => {
  await db.insert(roles).values([
    { id: 1, name: "Admin", activeStatus: true },
    { id: 2, name: "User", activeStatus: true },
    { id: 3, name: "Guest", activeStatus: true },
  ]);
};
main().catch(console.error);
