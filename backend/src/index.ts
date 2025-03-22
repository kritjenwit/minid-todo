import { Elysia, t } from "elysia";
import { randomUUIDv7 } from "bun";
import { CONFIG } from "./configs";
import { getAllUsers, getUserById } from "./modules/users";

const app = new Elysia()
  // multiple users
  .group("/users", (app) => {
    return app
      .get("/", () => getAllUsers())
      .get(
        "/:uuid",
        ({ params: { uuid } }) => {
          return getUserById(uuid);
        },
        { params: t.Object({ uuid: t.String() }) }
      )
      .post("/", () => "Create user")
      .put("/:uuid", ({ params: { uuid } }) => {}, {
        params: t.Object({ uuid: t.String() }),
      })
      .delete("/:uuid", ({ params: { uuid } }) => {}, {
        params: t.Object({ uuid: t.String() }),
      });
  })
  .listen(CONFIG.server.port);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
