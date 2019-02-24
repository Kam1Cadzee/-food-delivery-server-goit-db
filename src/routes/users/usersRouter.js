const fs = require("fs");
const v4 = require("uuid");

const usersRouter = express => {
  const usersRouter = express.Router();
  const jsonParser = express.json();

  usersRouter.post("/", jsonParser, function(request, response) {
    let user = { ...request.body, id: v4() };
    const path = "./src/db/users/all-users.json";
    fs.readFile(path, "utf-8", (err, data) => {
      let users = data.length === 0 ? [] : JSON.parse(data);
      users.push(user);
      fs.writeFile(path, JSON.stringify(users), err => {
        let resp = { status: "success", user: user };
        response.json(JSON.stringify(resp));
      });
    });
  });
  usersRouter.get("/:id", jsonParser, (request, response) => {
    const id = request.params["id"];
    const path = "./src/db/users/all-users.json";
    fs.readFile(path, "utf-8", (err, data) => {
      let users = data.length === 0 ? [] : JSON.parse(data);
      const user = users.find(u => u.id === id);
      if (user) {
        response.send(JSON.stringify(user));
      } else {
        response.send('{"status": "not found"}');
      }
    });
  });
  usersRouter.get("/", jsonParser, (request, response) => {
    const path = "./src/db/users/all-users.json";
    fs.readFile(path, "utf-8", (err, data) => {
          response.send(data);
    });
  });
  return usersRouter;
};

module.exports = usersRouter;
