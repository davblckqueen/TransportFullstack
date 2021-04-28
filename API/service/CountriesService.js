'use strict';


/**
 * getCitiesByStateId
 * Gets a list of all `Cities` entities.
 *
 * stateId Integer A unique identifier for a `State`.
 * returns List
 **/
exports.getCities = function(stateId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "latitude" : "4.61263889",
  "name" : "Bogota",
  "id" : 143873,
  "state_id" : 2875,
  "country_id" : 48,
  "longitude" : "-74.07050000"
}, {
  "latitude" : "4.61263889",
  "name" : "Bogota",
  "id" : 143873,
  "state_id" : 2875,
  "country_id" : 48,
  "longitude" : "-74.07050000"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * getCityById
 * Gets the details of a single instance of a `City`
 *
 * cityId Integer A unique identifier for a `City`.
 * returns CityResponse
 **/
exports.getCity" = function(cityId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "latitude" : "4.61263889",
  "name" : "Bogota",
  "id" : 143873,
  "state_id" : 2875,
  "country_id" : 48,
  "longitude" : "-74.07050000"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * getAllCountries
 * Gets a list of all `Countries` entities.
 *
 * active Boolean Gets only active Countries. (optional)
 * iso3 String Filter Countries by iso3 name. (optional)
 * iso2 String Filter Countries by iso2 name. (optional)
 * returns List
 **/
exports.getCountries = function(active,iso3,iso2) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "name" : "Colombia",
  "id" : 48
}, {
  "name" : "Colombia",
  "id" : 48
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * getCountryById
 * Gets the details of a single instance of a `Country`
 *
 * countryId Integer A unique identifier for a `Country`.
 * returns CountryResponse
 **/
exports.getCountry = function(countryId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "name" : "Colombia",
  "id" : 48
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * getStateById
 * Gets the details of a single instance of a `State`
 *
 * stateId Integer A unique identifier for a `State`.
 * returns StateResponse
 **/
exports.getState = function(stateId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "name" : "Cundinamarca Department",
  "id" : 2875,
  "country_id" : 48
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * getStatesByCountryId
 * Gets a list of all `States` entities.
 *
 * countryId Integer A unique identifier for a `Country`.
 * state_code String Filter States by state code name. (optional)
 * returns List
 **/
exports.getStates = function(countryId,state_code) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "name" : "Cundinamarca Department",
  "id" : 2875,
  "country_id" : 48
}, {
  "name" : "Cundinamarca Department",
  "id" : 2875,
  "country_id" : 48
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

