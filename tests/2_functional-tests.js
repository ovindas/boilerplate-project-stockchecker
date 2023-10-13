const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
const axios = require("axios");

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

});
