const chai = require('chai');
const sinon = require('sinon');

const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const salesService = require('../../../src/services/sales.service');
const salesController = require('../../../src/controllers/sales.controller');

const mockAllSales = [
  {
    "saleId": 1,
    "date": "2023-03-17T00:55:52.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2023-03-17T00:55:52.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2023-03-17T00:55:52.000Z",
    "productId": 3,
    "quantity": 15
  }
];

const mockSaleId = [
  {
    "date": "2023-03-17T00:55:52.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "date": "2023-03-17T00:55:52.000Z",
    "productId": 2,
    "quantity": 10
  }
];

describe('Sales Controller', function () {
  describe('Listando Todas Sales', function () {
    it('Com sucesso', async function () {
      const res = {};
      const req = {};
      const productsist = mockAllSales;

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'findAll')
        .resolves(productsist);

      await salesController.listSales(req, res);
      // res.json = sinon.stub().returns(productsist);

      // console.log("Resposta: ", res.json());

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productsist);
    });
  });

  it('Buscando sales por id', async function () {
    const res = {};
    const req = { params: { id: 1 } };
    const saleId = mockSaleId;

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(salesService, 'findById')
      .resolves({ type: false, message: saleId });

    await salesController.getSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(saleId);
  });

  it('Retorna status 404 e mensagem de "Sale not found" para id inválido', async function () {
    const res = {};
    const req = { params: { id: 99 } };

    res.status = sinon.stub().returns(res);
    res.send = sinon.stub().returns(res);

    sinon.stub(salesService, 'findById').resolves({ type: true });

    await salesController.getSales(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.send).to.have.been.calledWith({ message: 'Sale not found' });
  });

  afterEach(sinon.restore);
});
