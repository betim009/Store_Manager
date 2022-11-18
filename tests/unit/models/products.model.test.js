const sinon = require('sinon');
const { expect } = require('chai');


const { productsModel } = require('../../../src/models');
const { productsMock, productMock } = require('./mocks/products.model.mock')
const connection = require('../../../src/models/database/connection');

describe('Camada Model', function () {
  describe('Verifica se lsita  todos produtos', function () {

    before(async function () {
      sinon.stub(connection, 'execute').resolves([productsMock]);
    });

    after(async function () {
      connection.execute.restore();
    });

    it('com o tipo array', async function () {
      const response = await productsModel.findAll();

      expect(response).to.be.a('array');
    });

    it('com sucesso', async function () {
      const response = await productsModel.findAll();
      expect(response).to.deep.equal(productsMock)
    });
  });

  describe('Econtra produto por id', function () {
    before(async function () {
      sinon.stub(connection, 'execute').resolves([productMock])
    });

    after(async function () {
      connection.execute.restore();
    });

    it('com sucesso', async function () {
      const response = await productsModel.findById(1)
      expect(response).to.deep.equal(productMock[0]);
    });
  });


});
