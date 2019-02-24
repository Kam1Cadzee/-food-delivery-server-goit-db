const formatDataResponse = response => data => {
  let resp = {
    status: data.length === 0 ? "no products" : "success",
    products: data
  };
  response.send(resp);
};
module.exports = formatDataResponse;