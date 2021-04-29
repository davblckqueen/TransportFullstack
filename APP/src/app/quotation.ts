export interface Timezone {
  zoneName: string;
  gmtOffset: number;
  gmtOffsetName: string;
  abbreviation: string;
  tzName: string;
}

export interface City {
  id: number;
  name: string;
  state_id: number;
  state_code: string;
  country_id: number;
  country_code: string;
  latitude: string;
  longitude: string;
  selected?: boolean;
}

export interface State {
  id: number;
  name: string;
  country_id: number;
  country_code: string;
  state_code: string;
  selected?: boolean;
}

export interface CountryModel {
  id: number;
  name: string;
  iso3: string;
  iso2: string;
  phone_code: string;
  capital: string;
  currency: string;
  native: string;
  region: string;
  subregion: string;
  timezones: Timezone[];
  emoji: string;
  emojiU: string;
  selected?: boolean;
}
