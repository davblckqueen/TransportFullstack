import { Component, OnInit, AfterViewInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import * as _ from 'lodash';

import {map, startWith} from 'rxjs/operators';
import {CountryModel, State, City} from "../quotation";

import {LocationService} from '../location.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit,AfterViewInit {
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
  constructor(
    private snackBar:MatSnackBar,
    private LocationServiceV1: LocationService
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
        map(state => state ? this._filterCities(state) : this.states.slice())
      );
  }
  ngAfterViewInit(): void {
    this.LocationServiceV1.getAllCountries()
      .then((foundCountries: any) => {
          this.countries = foundCountries;
          this.countryCtrlA.setValidators([Validators.required]);
        }
      )
      .catch((err: any) => this.showError(err));
  }

  ngOnInit(): void {
    this.stateCtrlA.disable();
    this.cityCtrlA.disable();
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
