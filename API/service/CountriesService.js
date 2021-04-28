// Dependencies
const _ = require('lodash');
// Models
const Countries = require("../utils/countriesInfo/onlyCountriesInfo.json");
const States = require("../utils/countriesInfo/onlyStatesInfo.json");
const Cities = require("../utils/countriesInfo/onlyCitiesInfo.json");
// Utils
const msg = require('../utils/messages').msg;


/**
 * getCountries
 * Gets a list of all `Countries` entities.
 *
 * query Object.
 * returns List
 **/
exports.getCountries = function (queries = null) {
    return new Promise(function (resolve) {
        let countryList = [];
        if (queries !== null) {
            countryList = _.filter(Countries, country => (!_.isNil(queries.active) && queries.active) ?
                (country.iso3 === 'USA' || country.iso3 === 'COL') : !_.isNil(queries.iso3) ?
                    country.iso3 === queries.iso3 : !_.isNil(queries.iso2) ?
                        country.iso2 === queries.iso2 : true
            );
        } else {
            countryList = Countries;
        }
        return resolve(countryList);
    });
}

/**
 * getCountry
 * Gets the details of a single instance of a `Country`.
 *
 * getCountryById String A unique identifier for a `Country`.
 * returns Country
 **/
exports.getCountry = function (countryId) {
    return new Promise(function (resolve, reject) {
        const country = _.find(Countries, country => country.id === countryId);
        if (_.isNil(country)) return reject(msg.not_found("Country"));
        return resolve(country);
    });
}

/**
 * getStates
 * Gets a list of all `States` entities.
 *
 * query Object.
 * returns List
 **/
exports.getStates = function (countryId, state_code) {
    return new Promise(function (resolve, reject) {
        let stateList = [];
        stateList = _.filter(States, state => !_.isNil(state_code) ?
            (state.state_code === state_code && state.country_id === countryId ) : state.country_id === countryId
        );
        if (_.isEmpty(stateList)) return reject(msg.not_found("States"));

        return resolve(stateList);
    });
}

/**
 * getState
 * Gets the details of a single instance of a `State`.
 *
 * getStateById String A unique identifier for a `State`.
 * returns State
 **/
exports.getState = function (stateId) {
    return new Promise(function (resolve, reject) {
        const state = _.find(States, state => state.id === stateId);
        if (_.isNil(state)) return reject(msg.not_found("State"));
        return resolve(state);
    });
}

/**
 * getCities
 * Gets a list of all `Cities` entities.
 *
 * query Object.
 * returns List
 **/
exports.getCities = function (stateId) {
    return new Promise(function (resolve, reject) {
        let citiesList = [];
        if (_.isNil(stateId)) return reject(msg.not_found("States"));
        citiesList = _.filter(Cities, city => city.state_id === stateId);
        return resolve(citiesList);
    });
}

/**
 * getState
 * Gets the details of a single instance of a `State`.
 *
 * getStateById String A unique identifier for a `State`.
 * returns State
 **/
exports.getCity = function (cityId) {
    return new Promise(function (resolve, reject) {
        const city = _.find(Cities, city => city.id === cityId);
        if (_.isNil(city)) return reject(msg.not_found("City"));
        return resolve(city);
    });
}
