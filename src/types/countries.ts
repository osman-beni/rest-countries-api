export type Countries = {
  flags: { svg: string; alt: string };
  name: { common: string };
  cca3: string;
  capital: string[];
  region: string;
  population: number;
};

export type CountriesResponse = Countries[];

export type Country = {
  tld: string[];
  cca3: string;
  independent: boolean;
  status: string;

  capital: string[];
  altSpellings: string[];

  region: string;
  subregion: string;

  borders: string[];

  population: number;

  flag: string;

  name: {
    common: string;
    official: string;
    nativeName: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };

  currencies: {
    [code: string]: {
      name: string;
      symbol: string;
    };
  };

  languages: {
    [code: string]: string;
  };

  flags: {
    png: string;
    svg: string;
    alt: string;
  };
};

export type CountryResponse = Country[];
