const Product = require("../../db/model/product");

const productRouter = express => {
  const productRouter = express.Router();
  const jsonParser = express.json();

  productRouter.use("/:id", jsonParser, (request, response) => {
    const id = request.params["id"];
    Product.findById(id, (err, product) => {
      if (err) {
        response.send({ status: `failed for value ${id}` });
      } else {
        response.send(product);
      }
    });
  });
  productRouter.put("/:id", jsonParser, (request, response) => {
    const id = request.params["id"];
    const data = request.body;
    Product.findByIdAndUpdate(id, data, {new: true}, (err, product) => {
      if(err) response.send({status: "failed"});
      else {
        product.updatedAt = Date.now();
        product.save(err => {
          response.send({status: "success", product })
        });
        
      }
    })
  });

  productRouter.use("/", jsonParser, function(request, response) {
    let conditions = {},
      projection = {};
    if (request.query.ids) {
      const ids = request.query.ids.split(",");
      conditions = {
        _id: { $in: [...ids] }
      };
      projection = { sku: true, name: true, description: true };
    } else if (request.query.category) {
      const categories = request.query.category.split(",");
      conditions = {
        categories: { $in: [...categories] }
      };
      projection = { sku: true, name: true, description: true };
    }
    Product.find(conditions, projection).exec((err, products) => {
      if (err) {
        response.send({ status: "no products" });
      }
      response.send(products);
    });
  });
  return productRouter;
};
module.exports = productRouter;
