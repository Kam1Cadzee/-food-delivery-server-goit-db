
const User = require("./../../db/model/user");

const usersRouter = express => {
  const usersRouter = express.Router();
  const jsonParser = express.json();

  usersRouter.post("/", jsonParser, function(request, response) {
    let data = request.body;
    const user = new User(data);
    user.save(err => {
      if (err) throw err;
      response.send({ status: "success", user: { ...data, _id: user._id } });
    });
  });
  usersRouter.get("/:id", jsonParser, (request, response) => {
    const id = request.params["id"];

    User.findById(id, (err, user) => {
      if (err) throw err;
      console.log(user);
      response.send(user);
    });
  });
  usersRouter.put("/:id", jsonParser, (request, response) => {
    const id = request.params["id"];
    const data = request.body;
    User.findByIdAndUpdate(id, data, {new: true}, (err, user) => {
      if(err) response.send({status: "failed"});
      else {
        user.updatedAt = Date.now();
        user.save(err => {
          response.send({status: "success", user })
        });
        
      }
    })
  });
  usersRouter.get("/", jsonParser, (request, response) => {
    User.find({}).exec((err, users) => {
      if (err) throw err;
      response.send(users);
    })
  });
  return usersRouter;
};

module.exports = usersRouter;
