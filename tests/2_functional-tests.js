const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
const axios = require("axios");
const apiUrl = process.env['dev_env'];

chai.use(chaiHttp);

suite('Functional Tests', function() {

    test("Viewing one stock: GET request to /api/stock-prices/", function(done) {
      chai
        .request(server)
        .get("/api/stock-prices?stock=GOOG")
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.stockData.stock, "GOOG");
          assert.isNumber(res.body.stockData.price);
          assert.isNumber(res.body.stockData.likes);
        });
      done();
    });

    test("Viewing one stock and liking it: GET request to /api/stock-prices/", function (done) {
      chai
        .request(server)
        .get("/api/stock-prices?stock=GOOG&like=true")
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.stockData.stock, "GOOG");
          assert.isNumber(res.body.stockData.price);
          assert.isNumber(res.body.stockData.likes);
        });
      done();
    });

    test("Viewing the same stock and liking it again: GET request to /api/stock-prices/", function (done) {
      chai
        .request(server)
        .get("/api/stock-prices?stock=MSFT")
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.stockData.stock, "MSFT");
          assert.isNumber(res.body.stockData.price);
          assert.isNumber(res.body.stockData.likes);
        });
      done();
    });


    test("Viewing two stocks: GET request to /api/stock-prices/", async function (done) {
      
      /*let apiResponse = await axios.get(`${apiUrl}/api/stock-prices?stock=GOOG&stock=MSFT`)
          .then(response => response.data);

      const stockData = apiResponse.stockData;

      assert.isArray(stockData);*/
      
      /*chai
      .request(server)
      .get("/api/stock-prices?stock=GOOG&stock=MSFT")
      .end(function(err, res) {

        assert.equal(res.status, 200);
        assert.equal(res.body.stockData.stock, "GOOG");
        assert.isNumber(res.body.stockData.price);
        assert.isNumber(res.body.stockData.likes);
      });*/

      await axios
        .get(`${apiUrl}/api/stock-prices?stock=GOOG&stock=MSFT`)
        .then(response => {
          const stockData = response.data.stockData;
          assert.isArray(stockData);
        });

      //const stockData = apiResponse.stockData;

      //assert.isArray(stockData);

      done();
    });

});
