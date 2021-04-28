'use strict';


/**
 * Delete a quotation
 *
 * quotationId String ID of quotation to delete
 * no response value expected for this operation
 **/
exports.deleteQuotation = function(quotationId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Returns all quotations
 *
 * returns List
 **/
exports.getProviders = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "date" : "2000-01-23T04:56:07.000+00:00",
  "start" : {
    "country" : "Colombia",
    "city" : "Bogota",
    "state" : "Cundinamarca"
  },
  "value" : 0.8008282
}, {
  "date" : "2000-01-23T04:56:07.000+00:00",
  "start" : {
    "country" : "Colombia",
    "city" : "Bogota",
    "state" : "Cundinamarca"
  },
  "value" : 0.8008282
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Returns one quotation
 *
 * quotationId String ID of quotation to return
 * returns QuotationResonse
 **/
exports.getQuotationById = function(quotationId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "date" : "2000-01-23T04:56:07.000+00:00",
  "start" : {
    "country" : "Colombia",
    "city" : "Bogota",
    "state" : "Cundinamarca"
  },
  "value" : 0.8008282
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Make a quotation
 *
 * body QuotationRequest 
 * returns List
 **/
exports.makeQuotation = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "date" : "2000-01-23T04:56:07.000+00:00",
  "start" : {
    "country" : "Colombia",
    "city" : "Bogota",
    "state" : "Cundinamarca"
  },
  "value" : 0.8008282
}, {
  "date" : "2000-01-23T04:56:07.000+00:00",
  "start" : {
    "country" : "Colombia",
    "city" : "Bogota",
    "state" : "Cundinamarca"
  },
  "value" : 0.8008282
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update a quotation
 *
 * body QuotationRequest 
 * quotationId String ID of quotation to update
 * returns List
 **/
exports.updateQuotation = function(body,quotationId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "date" : "2000-01-23T04:56:07.000+00:00",
  "start" : {
    "country" : "Colombia",
    "city" : "Bogota",
    "state" : "Cundinamarca"
  },
  "value" : 0.8008282
}, {
  "date" : "2000-01-23T04:56:07.000+00:00",
  "start" : {
    "country" : "Colombia",
    "city" : "Bogota",
    "state" : "Cundinamarca"
  },
  "value" : 0.8008282
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

