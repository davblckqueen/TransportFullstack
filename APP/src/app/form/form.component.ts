import { Component, OnInit, AfterViewInit, Output, EventEmitter} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import * as _ from 'lodash';

import {map, startWith} from 'rxjs/operators';
import {CountryModel, State, City} from "../quotation";

import {LocationService} from '../location.service';
import {QuotationsService} from '../quotations.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit,AfterViewInit {
  @Output() refreshList = new EventEmitter()
  date: any = null;
  // A
  countryCtrlA = new FormControl();
  stateCtrlA = new FormControl();
  cityCtrlA = new FormControl();
  countries: CountryModel[] | any[] = [];
  states: State[] | any[] = [];
  cities: City[] | any[] = [];
  filteredCountriesA: Observable<CountryModel[]>;
  filteredStatesA: Observable<State[]>;
  filteredCitiesA: Observable<City[]>;
  drawState = true;
  drawCity = true;
  selectedCountry: CountryModel | any;
  selectedState: State | any;
  selectedCity: City | any;
  // B
  countryCtrlB = new FormControl();
  stateCtrlB = new FormControl();
  cityCtrlB = new FormControl();
  countriesB: CountryModel[] | any[] = [];
  statesB: State[] | any[] = [];
  citiesB: City[] | any[] = [];
  filteredCountriesB: Observable<CountryModel[]>;
  filteredStatesB: Observable<State[]>;
  filteredCitiesB: Observable<City[]>;
  drawStateB = true;
  drawCityB = true;
  selectedCountryB: CountryModel | any;
  selectedStateB: State | any;
  selectedCityB: City | any;
  constructor(
    private snackBar:MatSnackBar,
    private LocationServiceV1: LocationService,
    private QuotationService1: QuotationsService
  ) {
    this.filteredCountriesA = this.countryCtrlA.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterCountries(state) : this.countries.slice())
      );
    this.filteredStatesA = this.stateCtrlA.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.states.slice())
      );
    this.filteredCitiesA = this.cityCtrlA.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterCities(state) : this.cities.slice())
      );
    this.filteredCountriesB = this.countryCtrlB.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterCountriesB(state) : this.countriesB.slice())
      );
    this.filteredStatesB = this.stateCtrlB.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStatesB(state) : this.statesB.slice())
      );
    this.filteredCitiesB = this.cityCtrlB.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterCitiesB(state) : this.citiesB.slice())
      );
  }
  ngAfterViewInit(): void {
    this.LocationServiceV1.getAllCountries()
      .then((foundCountries: any) => {
          this.countries = foundCountries;
          this.countriesB = foundCountries;
          this.countryCtrlA.setValidators([Validators.required]);
          this.countryCtrlB.setValidators([Validators.required]);
        }
      )
      .catch((err: any) => this.showError(err));
  }

  ngOnInit(): void {
    this.stateCtrlA.disable();
    this.cityCtrlA.disable();
    this.stateCtrlB.disable();
    this.cityCtrlB.disable();
  }

  onCountry(event: any, country: any, countryName = null) {
    this.selectedCountry = country;
    this.drawState = false;
    this.LocationServiceV1.getStatesByCountryId(this.selectedCountry.id)
      .then(states => {
        this.states = states;
        if (this.states.length > 0) {
          this.stateCtrlA.enable();
          this.stateCtrlA.setValidators([Validators.required]);
          this.drawState = true;
          // let county = this.cities.filter(city => city.name == cityName)
          // this.county.setValue(county[0])
          // if(this.viewOnly) this.county.disable();
        } else {
          this.stateCtrlA.disable();
          this.stateCtrlA.clearValidators();
        }
      })
      .catch(err => this.showError(err));
  }

  onState(event: any, state: any, cityName = null){
    this.selectedState = state;
    this.drawCity = false;
    this.LocationServiceV1.getCitiesByStateId(this.selectedState.id)
      .then(cities => {
        this.cities = cities;
        if (this.cities.length > 0) {
          this.cityCtrlA.enable();
          this.cityCtrlA.setValidators([Validators.required]);
          this.drawCity = true;
          // let county = this.cities.filter(city => city.name == cityName)
          // this.county.setValue(county[0])
          // if(this.viewOnly) this.county.disable();
        } else {
          this.cityCtrlA.disable();
          this.cityCtrlA.clearValidators();
        }
      })
      .catch(err => this.showError(err));
  }

  onCity(event: any, city: any, cityName = null) {
    this.selectedCity = city;
  }

  onCountryB(event: any, country: any, countryName = null) {
    this.selectedCountryB = country;
    this.drawStateB = false;
    this.LocationServiceV1.getStatesByCountryId(this.selectedCountryB.id)
      .then(states => {
        this.statesB = states;
        if (this.statesB.length > 0) {
          this.stateCtrlB.enable();
          this.stateCtrlB.setValidators([Validators.required]);
          this.drawStateB = true;
          // let county = this.cities.filter(city => city.name == cityName)
          // this.county.setValue(county[0])
          // if(this.viewOnly) this.county.disable();
        } else {
          this.stateCtrlB.disable();
          this.stateCtrlB.clearValidators();
        }
      })
      .catch(err => this.showError(err));
  }

  onStateB(event: any, state: any, cityName = null){
    this.selectedStateB = state;
    this.drawCityB = false;
    this.LocationServiceV1.getCitiesByStateId(this.selectedStateB.id)
      .then(cities => {
        this.citiesB = cities;
        if (this.citiesB.length > 0) {
          this.cityCtrlB.enable();
          this.cityCtrlB.setValidators([Validators.required]);
          this.drawCityB = true;
          // let county = this.cities.filter(city => city.name == cityName)
          // this.county.setValue(county[0])
          // if(this.viewOnly) this.county.disable();
        } else {
          this.cityCtrlB.disable();
          this.cityCtrlB.clearValidators();
        }
      })
      .catch(err => this.showError(err));
  }

  onCityB(event: any, city: any, cityName = null) {
    this.selectedCityB = city;
  }

  EndDateChange(event: any) {
      this.date = event.value;
  }
  // -------------------------------------SUBMIT--------------------------------------------------
  onSubmit() {
    if (!_.isNil(this.selectedCountry) &&
      !_.isNil(this.selectedCountryB) &&
      !_.isNil(this.selectedState) &&
      !_.isNil(this.selectedStateB) &&
      !_.isNil(this.selectedCity) &&
      !_.isNil(this.selectedCityB) &&
      !_.isNil(this.date)) {
      const body = {
        start: {
          country: this.selectedCountry.id,
          state: this.selectedState.id,
          city: this.selectedCity.id,
        },
        end: {
          country: this.selectedCountryB.id,
          state: this.selectedStateB.id,
          city: this.selectedCityB.id,
        },
        date: this.date
      }
      this.QuotationService1.createQuotation(body)
        .then(r => {
          this.showSuccess("Quotation generated!");
          this.refreshList.emit(true);
        })
        .catch(e => this.showError(e));
    }
  }
  // -------------------------------------FILTERS-------------------------------------------------
  private _filterCountries(value: string): CountryModel[] {
    const filterValue = value.toLowerCase();
    return _.filter(this.countries,country => country.name.toLowerCase().indexOf(filterValue) === 0);
  }
  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();
    return _.filter(this.states,state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }
  private _filterCities(value: string): State[] {
    const filterValue = value.toLowerCase();
    return _.filter(this.cities,state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }
  private _filterCountriesB(value: string): CountryModel[] {
    const filterValue = value.toLowerCase();
    return _.filter(this.countriesB,country => country.name.toLowerCase().indexOf(filterValue) === 0);
  }
  private _filterStatesB(value: string): State[] {
    const filterValue = value.toLowerCase();
    return _.filter(this.statesB,state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }
  private _filterCitiesB(value: string): State[] {
    const filterValue = value.toLowerCase();
    return _.filter(this.citiesB,state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }

  // -------------------------------------Snackbar Management-------------------------------------

  showError(error: any) {
    this.snackBar.open(error || 'Internal server error', '', {
      duration: 5000,
      panelClass: ['danger-snackbar']// 'success-snackbar', 'danger-snackbar', 'warning-snackbar', 'info-snackbar'
    });
  }

  showSuccess(response: any) {
    this.snackBar.open(response.message || 'Successful operation!', '', {
      duration: 5000,
      panelClass: ['success-snackbar']// 'success-snackbar', 'danger-snackbar', 'warning-snackbar', 'info-snackbar'
    });
  }
}
