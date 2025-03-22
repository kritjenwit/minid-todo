import { eq } from "drizzle-orm";
import db from "../../databases";
import { users, userOrgTeamRoleMapping } from "../../databases/schemas/users";

export async function getAllUsers() {
  const users = await db.query.users.findMany({
    columns: {
      uuid: true,
      email: true,
      fullName: true,
    },
  });
  return users;
}

export async function getUserById(uuid: string) {
  const user = await db.query.users.findFirst({
    columns: {
      uuid: true,
      email: true,
      fullName: true,
    },
    where: eq(users.uuid, uuid),
  });
  return user;
}

export async function createUser(
  email: string,
  passwordHash: string,
  fullName: string
) {
  const newUser = await db.transaction(async (trx) => {
    const user = await trx
      .insert(users)
      .values({ email, passwordHash, fullName })
      .returning({ id: users.id, uuid: users.uuid });
    const userRoleMapping = await trx
      .insert(userOrgTeamRoleMapping)
      .values({
        usersId: user[0].id,
        organizationsId: 1,
        teamsId: 1,
        rolesId: 3,
      });
    return { uuid: user[0].uuid };
  });

  return newUser;
}
