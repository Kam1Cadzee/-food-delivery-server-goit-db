const fs = require("fs");
const v4 = require('uuid');

const ordersRouter = express => {
  const ordersRouter = express.Router();
  const jsonParser = express.json();
  
  ordersRouter.post("/", jsonParser, (request, response) => {
    let order = { ...request.body, id: v4() };
    const path = "./src/db/products/products-mock.json";
    fs.readFile(path, (err, data) => {
      const products = JSON.parse(data);
      const isCreateOrder = order.products.every(productId =>
        products.some(product => +product.id === +productId)
      );
      if (!isCreateOrder) {
        response.send('{"status": "failed", "order": null}');
      } else {
        const pathOrder = `./src/db/orders/${order.id}.json`;
        fs.writeFile(pathOrder, JSON.stringify(order), err => {
          response.send(
            JSON.stringify({
              status: "success",
              order
            })
          );
        });
      }
    });
  });
  return ordersRouter;
};
module.exports = ordersRouter;
