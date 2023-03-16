const sinon = require('sinon');
const { expect } = require('chai');

const { productsModel } = require('../../../src/models');

const { productsService } = require('../../../src/services');
const { productsMock, productMock, errorMock } = require('./mocks/products.service.mock');

const connection = require('../../../src/models/database/connection');

describe('Camada Service', function () {
  describe('Listando os produtos', function () {
    beforeEach(function () {
      sinon.stub(productsModel, 'findAll').resolves(productsMock);
    });

    afterEach(function () {
      sinon.restore();
    });

    it('a lista de produtos é um array', async function () {
      const response = await productsService.findAll();

      expect(response instanceof Array).to.equal(true);
    });

    it('com sucesso', async function () {
      const response = await productsService.findAll();

      expect(response).to.deep.equal(productsMock);
    });
  });

  describe('Listando por Id', function () {
    beforeEach(function () {
      sinon.stub(productsModel, 'findById').resolves(productsMock[0]);
    });

    afterEach(function () {
      sinon.restore();
    });

    it('com sucesso', async function () {
      const response = await productsService.findById(1);

      console.log('TESTE:', productMock);
      expect(response).to.be.deep.equal(productMock)
    });
  });

  describe('Buscando por id', function () {
    beforeEach(function () {
      sinon.stub(productsModel, 'findById').resolves(errorMock);
    });

    afterEach(function () {
      sinon.restore();
    });

    it('com erro', async function () {
      const response = await productsService.findById(20);
      console.log(errorMock);
      console.log(response);
      expect(response).to.deep.equal({ message: 'Product not found' });
    });
  });

});
