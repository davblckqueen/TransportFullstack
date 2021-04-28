'use strict';

var utils = require('../utils/writer.js');
var Countries = require('../service/CountriesService');

module.exports.getCities = function getCities (req, res, next, stateId) {
  Countries.getCities(stateId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getCity = function getCity (req, res, next, cityId) {
  Countries.getCity(cityId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getCountries = function getCountries (req, res, next, active, iso3, iso2) {
  Countries.getCountries(active, iso3, iso2)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getCountry = function getCountry (req, res, next, countryId) {
  Countries.getCountry(countryId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getState = function getState (req, res, next, stateId) {
  Countries.getState(stateId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getStates = function getStates (req, res, next, state_code, countryId) {
  Countries.getStates(countryId, state_code)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
