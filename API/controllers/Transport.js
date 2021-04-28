'use strict';

var utils = require('../utils/writer.js');
var Transport = require('../service/TransportService');

module.exports.deleteQuotation = function deleteQuotation (req, res, next, quotationId) {
  Transport.deleteQuotation(quotationId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getProviders = function getProviders (req, res, next) {
  Transport.getProviders()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getQuotationById = function getQuotationById (req, res, next, quotationId) {
  Transport.getQuotationById(quotationId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.makeQuotation = function makeQuotation (req, res, next, body) {
  Transport.makeQuotation(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateQuotation = function updateQuotation (req, res, next, body, quotationId) {
  Transport.updateQuotation(body, quotationId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
