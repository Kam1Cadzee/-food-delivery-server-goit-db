const  sendData  = require("./sendData");
const fs = require("fs");
const  formatDataResponse  = require("./formatDataResponse");


const productRouter = express => {
  const productRouter = express.Router();
  const jsonParser = express.json();

  productRouter.use("/:id", jsonParser, (request, response) => {
    const id = request.params["id"];
    
    sendData(
      product => product.id === +id,
      product => product,
      formatDataResponse(response)
    );
  });
  productRouter.use("/", jsonParser, function(request, response) {
    if (request.query.ids) {
      const ids = request.query.ids.split(",");
      sendData(
        product => ids.some(id => +id === product.id),
        product => ({
          id: product.id,
          sku: product.sku,
          name: product.name,
          description: product.description
        }), formatDataResponse(response)
      );
      return;
    } else if (request.query.category) {
      const categories = request.query.category.split(",");
      sendData(
        product => product.categories.some(c => categories.some(cat => cat === c)),
        product => ({
          id: product.id,
          sku: product.sku,
          name: product.name,
          description: product.description
        }), formatDataResponse(response)
      );
      return;
    }
    response.writeHead(200, { "Content-Type": "application/json" });
    fs.createReadStream("src/db/products/products-mock.json").pipe(response);
  });
  return productRouter;
};
module.exports = productRouter;
