'use strict';
// Dependencies
const _ = require('lodash');
const mongoose = require('mongoose');
// Models
const Quotations = require('../models/Quotation');
// Utils
const msg = require('../utils/messages').msg;
// Services
const LocationServices =  require('./CountriesService');

/**
 * Delete a quotation
 *
 * @param {string} quotationId String ID of quotation to delete
 * @return {string} Successfully response
 **/
exports.deleteQuotation = function(quotationId) {
  return new Promise(async (resolve, reject) => {
    try {
      //Validate the existence of the Quotation
      const quotationExists = await Quotations.exists({_id: mongoose.Types.ObjectId(quotationId)});
      if (!quotationExists) return reject(msg.not_found('Quotation'));
      // Delete Quotation
      await Quotations.findByIdAndDelete(quotationId);
      resolve(msg.ok());
    } catch (e) {
      reject(msg.internal_error(e));
    }
  });
}


/**
 * Returns all quotations
 *
 * @return {Array<Object>} List
 **/
exports.getQuotations = function() {
  return new Promise(async (resolve, reject) => {
    try {
      const quotations = await Quotations.find().lean();
      if (_.isEmpty(quotations)) return reject(msg.not_found("Quotations"));
      const finalQuotations = await Promise.all(_.map(quotations, async (quotation) => {
        // Map the locations by ids
        const  start = {
          country: await LocationServices.getCountry(quotation.start.country).then(res => res.name),
          state: await LocationServices.getState(quotation.start.state).then(res => res.name),
          city: await LocationServices.getCity(quotation.start.city).then(res => res.name)
        };
        const  end = {
          country: await LocationServices.getCountry(quotation.end.country).then(res => res.name),
          state: await LocationServices.getState(quotation.end.state).then(res => res.name),
          city: await LocationServices.getCity(quotation.end.city).then(res => res.name)
        };
        quotation.start = start;
        quotation.end = end;
        return quotation;
      }));
      resolve(finalQuotations);
    } catch (e) {
      reject(msg.internal_error(e));
    }
  });
}


/**
 * Returns one quotation
 *
 * @param {string} quotationId - String ID of quotation to return
 * @return {Object} QuotationResponse
 **/
exports.getQuotationById = function(quotationId) {
  return new Promise(async (resolve, reject) => {
    try {
      //Validate the existence of the Quotation
      const quotation = await Quotations.findById(quotationId).lean();
      if (_.isNil(quotation)) return reject(msg.not_found('Quotation'));
      // Map the locations by ids
      const  start = {
        country: await LocationServices.getCountry(quotation.start.country).then(res => res.name),
        state: await LocationServices.getState(quotation.start.state).then(res => res.name),
        city: await LocationServices.getCity(quotation.start.city).then(res => res.name)
      };
      const  end = {
        country: await LocationServices.getCountry(quotation.end.country).then(res => res.name),
        state: await LocationServices.getState(quotation.end.state).then(res => res.name),
        city: await LocationServices.getCity(quotation.end.city).then(res => res.name)
      };
      quotation.start = start;
      quotation.end = end;
      resolve(quotation);
    } catch (e) {
      reject(msg.internal_error(e));
    }
  });
}


/**
 * Make a quotation
 *
 * @param {{
 *     start: {
 *         country: number,
 *         state: number,
 *         city: number,
 *     },
 *     end: {
 *         country: number,
 *         state: number,
 *         city: number,
 *     },
 *     date: string
 * }} body -  QuotationRequest
 * @return {Object} QuotationResponse
 **/
exports.makeQuotation = function(body) {
  return new Promise(async (resolve, reject) => {
    try {
      // Validate locations
      const locationValidations = await Promise.all([
        // Start Locations
        LocationServices.getCountry(body.start.country),
        LocationServices.getState(body.start.state),
        LocationServices.getCity(body.start.city),
        // End Locations
        LocationServices.getCountry(body.end.country),
        LocationServices.getState(body.end.state),
        LocationServices.getCity(body.end.city)
      ])
          .then(results => !_.some(results, result => _.isNil(result)));
      if (!locationValidations) return reject(msg.not_found("Some Location"));
      // Calculate value
      let value = 0;
      if (body.start.country !== body.end.country) value += 400000;
      if (body.start.state !== body.end.state) value += 100000;
      if (body.start.city !== body.end.city) value += 50000;
      value += 10000;
      body.value = value;
      // Create Quotation
      const quotation = await Quotations.create(body)
          .then(async (quotation) => {
            // Map the locations by ids
            const  start = {
              country: await LocationServices.getCountry(quotation._doc.start.country).then(res => res.name),
              state: await LocationServices.getState(quotation._doc.start.state).then(res => res.name),
              city: await LocationServices.getCity(quotation._doc.start.city).then(res => res.name)
            };
            const  end = {
              country: await LocationServices.getCountry(quotation._doc.end.country).then(res => res.name),
              state: await LocationServices.getState(quotation._doc.end.state).then(res => res.name),
              city: await LocationServices.getCity(quotation._doc.end.city).then(res => res.name)
            };
            quotation._doc.start = start;
            quotation._doc.end = end;
            return quotation._doc;
          });
      // END
      resolve(quotation);
    } catch (e) {
      reject(msg.internal_error(e));
    }
  });
}


/**
 * Update a quotation
 *
 * @param {{
 *     start: {
 *         country: number,
 *         state: number,
 *         city: number,
 *     },
 *     end: {
 *         country: number,
 *         state: number,
 *         city: number,
 *     },
 *     date: string
 * }} body - QuotationRequest
 * @param {string} quotationId - String ID of quotation to update
 * @return {Object} QuotationResponse
 **/
exports.updateQuotation = function(body,quotationId) {
  return new Promise(async (resolve, reject) => {
    //Validate the existence of the Quotation
    const quotation = await Quotations.findById(quotationId).lean();
    if (!quotation) return reject(msg.not_found('Quotation'));
    // Validate locations
    const locationValidations = await Promise.all([
      // Start Locations
      LocationServices.getCountry(body.start.country),
      LocationServices.getState(body.start.state),
      LocationServices.getCity(body.start.city),
      // End Locations
      LocationServices.getCountry(body.end.country),
      LocationServices.getState(body.end.state),
      LocationServices.getCity(body.end.city)
    ])
        .then(results => !_.some(results, result => _.isNil(result)));
    if (!locationValidations) return reject(msg.not_found("Some Location"));
    // Calculate value
    let value = 0;
    if (body.start.country !== body.end.country) value += 400000;
    if (body.start.state !== body.end.state) value += 100000;
    if (body.start.city !== body.end.city) value += 50000;
    value += 10000;
    quotation.value = value;
    quotation.start = body.start;
    quotation.end = body.end;
    // Update Quotation
    await Quotations.findByIdAndUpdate(quotationId, quotation);
    // Map the locations by ids
    const  start = {
      country: await LocationServices.getCountry(quotation.start.country).then(res => res.name),
      state: await LocationServices.getState(quotation.start.state).then(res => res.name),
      city: await LocationServices.getCity(quotation.start.city).then(res => res.name)
    };
    const  end = {
      country: await LocationServices.getCountry(quotation.end.country).then(res => res.name),
      state: await LocationServices.getState(quotation.end.state).then(res => res.name),
      city: await LocationServices.getCity(quotation.end.city).then(res => res.name)
    };
    quotation.start = start;
    quotation.end = end;
    // END
    resolve(quotation);
  });
}

