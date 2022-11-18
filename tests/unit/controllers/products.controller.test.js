const chai = require('chai');
const sinon = require('sinon');

const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productsService = require('../../../src/services/products.service');
const { productsController }  = require('../../../src/controllers');

const { productsMock } = require('./mocks/products.controller.mock');

describe('Controller', function () {
  describe('listando prodcuts', function () {
    it('', async function () {
      const res = {};
      const req = {};
      const productsist = [productsMock];

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'findAll')
        .resolves({ type: null, message: productsist });

      await productsController.listProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productsist);
    });
  });
});
