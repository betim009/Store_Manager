const chai = require('chai');
const sinon = require('sinon');

const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productsService = require('../../../src/services/products.service');
const { productsController }  = require('../../../src/controllers');

const { productsMock, productMock, newProduct, productTest } = require('./mocks/products.controller.mock');


describe('Controller', function () {
  describe('Listando produtos', function () {
    it('Listando todos os produtos', async function () {
      const res = {};
      const req = {};
      const productsist = [productsMock];

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'findAll')
        .resolves(productsist);

      await productsController.listProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productsist);
    });
  });

  it('Buscando produto por id', async function () {
    const res = {};
    const req = { params: { id: 1 }, };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    const productsist = [productMock];

    sinon
      .stub(productsService, 'findById')
      .resolves(productsist)

    await productsController.getProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsist);
  });

  it('Criando um novo produto', async function () {
    const res = {};
    const req = { body: newProduct };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productsService, 'createProduct')
      .resolves(newProduct);

    await productsController.createProduct(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newProduct);
  });

  afterEach(sinon.restore);
});
