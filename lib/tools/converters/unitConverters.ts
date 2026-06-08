export type Unit = {
  label: string
  value: string
  toBase: number 
}

export type UnitCategory = {
  units: Unit[]
}

export const Units: Record<string, UnitCategory> = {
  length: {
    units: [
      { label: 'Meter',             value: 'm',   toBase: 1 },
      { label: 'Kilometer',         value: 'km',  toBase: 1000 },
      { label: 'Centimeter',        value: 'cm',  toBase: 0.01 },
      { label: 'Millimeter',        value: 'mm',  toBase: 0.001 },
      { label: 'Inch',              value: 'in',  toBase: 0.0254 },
      { label: 'Foot',              value: 'ft',  toBase: 0.3048 },
      { label: 'Yard',              value: 'yd',  toBase: 0.9144 },
      { label: 'Mile',              value: 'mi',  toBase: 1609.344 },
      { label: 'Nautical Mile',     value: 'nmi', toBase: 1852 },
      { label: 'Decimeter',         value: 'dm',  toBase: 0.1 },
      { label: 'Micrometer',        value: 'µm',  toBase: 1e-6 },
      { label: 'Nanometer',         value: 'nm',  toBase: 1e-9 },
      { label: 'Hectometer',        value: 'hm',  toBase: 100 },
      { label: 'Decameter',         value: 'dam', toBase: 10 },
      { label: 'Fathom',            value: 'ftm', toBase: 1.8288 },
      { label: 'Rod',               value: 'rod', toBase: 5.0292 },
      { label: 'Furlong',           value: 'fur', toBase: 201.168 },
      { label: 'Mil / Thou',        value: 'mil', toBase: 0.0000254 },
      { label: 'Picometer',         value: 'pm',  toBase: 1e-12 },
      { label: 'Femtometer',        value: 'fm',  toBase: 1e-15 },
      { label: 'Ångström',          value: 'Å',   toBase: 1e-10 },
      { label: 'Astronomical Unit', value: 'au',  toBase: 1.495978707e11 },
      { label: 'Light Year',        value: 'ly',  toBase: 9.4607304725808e15 },
      { label: 'Parsec',            value: 'pc',  toBase: 3.0856775814913673e16 },
      { label: 'Kiloparsec',        value: 'kpc', toBase: 3.0856775814913673e19 },
      { label: 'Megaparsec',        value: 'Mpc', toBase: 3.0856775814913673e22 },
      { label: 'Yottameter',        value: 'Ym',  toBase: 1e24 },
      { label: 'Zettameter',        value: 'Zm',  toBase: 1e21 },
      { label: 'Exameter',          value: 'Em',  toBase: 1e18 },
      { label: 'Petameter',         value: 'Pm',  toBase: 1e15 },
      { label: 'Terameter',         value: 'Tm',  toBase: 1e12 },
      { label: 'Gigameter',         value: 'Gm',  toBase: 1e9 },
      { label: 'Megameter',         value: 'Mm',  toBase: 1e6 },
      { label: '台尺 (Chi)',         value: 'chi', toBase: 0.303030 },
      { label: '台寸 (Cun)',         value: 'cun', toBase: 0.0303030 },
      { label: '尺 (Shaku)',         value: 'shaku', toBase: 0.303030 },
      { label: '里 (Li)',            value: 'li',  toBase: 500 }
    ],
  },
  area: {
    units: [
      { label: 'Square Meter',      value: 'm2',  toBase: 1 },
      { label: 'Square Kilometer',  value: 'km2', toBase: 1e6 },
      { label: 'Square Centimeter', value: 'cm2', toBase: 0.0001 },
      { label: 'Square Millimeter', value: 'mm2', toBase: 1e-6 },
      { label: 'Hectare',           value: 'ha',  toBase: 10000 },
      { label: 'Acre',              value: 'ac',  toBase: 4046.8564224 },
      { label: 'Square Inch',       value: 'in2', toBase: 0.00064516 },
      { label: 'Square Foot',       value: 'ft2', toBase: 0.09290304 },
      { label: 'Square Yard',       value: 'yd2', toBase: 0.83612736 },
      { label: 'Square Mile',       value: 'mi2', toBase: 2589988.110336 },
      { label: 'Are',               value: 'a',   toBase: 100 },
      { label: 'Square Decimeter',  value: 'dm2', toBase: 0.01 },
      { label: 'Rood',              value: 'rood',toBase: 1011.7141 },
      { label: '坪 (Ping)',         value: 'ping',toBase: 3.305785 },
      { label: '畝 (Mu)',           value: 'mu',  toBase: 666.6667 }
    ],
  },
  volume: {
    units: [
      { label: 'Milliliter',        value: 'ml',   toBase: 0.001 },
      { label: 'Liter',             value: 'l',    toBase: 1 },
      { label: 'Cubic Meter',       value: 'm3',   toBase: 1000 },
      { label: 'Cubic Centimeter',  value: 'cm3',  toBase: 0.001 },
      { label: 'Deciliter',         value: 'dl',   toBase: 0.1 },
      { label: 'Centiliter',        value: 'cl',   toBase: 0.01 },
      { label: 'US Cup',            value: 'cup',  toBase: 0.2365882365 },
      { label: 'US Pint',           value: 'pt',   toBase: 0.473176473 },
      { label: 'US Quart',          value: 'qt',   toBase: 0.946352946 },
      { label: 'US Gallon',         value: 'gal',  toBase: 3.785411784 },
      { label: 'US Teaspoon',       value: 'tsp',  toBase: 0.0049289216 },
      { label: 'US Tablespoon',     value: 'tbsp', toBase: 0.0147867648 },
      { label: 'Hectoliter',        value: 'hl',   toBase: 100 },
      { label: 'Kiloliter',         value: 'kl',   toBase: 1000 },
      { label: 'Microliter',        value: 'µl',   toBase: 1e-6 },
      { label: 'Cubic Inch',        value: 'in3',  toBase: 0.016387064 },
      { label: 'Cubic Foot',        value: 'ft3',  toBase: 28.316846592 },
      { label: 'Cubic Yard',        value: 'yd3',  toBase: 764.554857984 },
      { label: 'Imperial Gallon',   value: 'igal', toBase: 4.54609 },
      { label: 'Imperial Quart',    value: 'iqt',  toBase: 1.1365225 },
      { label: 'Imperial Pint',     value: 'ipt',  toBase: 0.56826125 },
      { label: 'Imperial Fluid Oz', value: 'ifloz',toBase: 0.0284130625 },
      { label: 'Barrel (Oil)',      value: 'bbl',  toBase: 158.987294928 },
      { label: 'Bushel (US)',       value: 'bu',   toBase: 35.2390704 },
      { label: 'US Fluid Ounce',    value: 'floz', toBase: 0.0295735296 }
    ],
  },
  anglePlane: {
    units: [
      { label: 'Degree',            value: 'deg',    toBase: 1 },
      { label: 'Radian',            value: 'rad',    toBase: 57.29577951308232 },
      { label: 'Arcminute',         value: 'arcmin', toBase: 0.016666666666666666 },
      { label: 'Arcsecond',         value: 'arcsec', toBase: 0.0002777777777777778 },
      { label: 'Gradian / Gon',     value: 'grad',   toBase: 0.9 },
      { label: 'Turn / Revolution', value: 'turn',   toBase: 360 },
      { label: 'Milliradian',       value: 'mrad',   toBase: 0.05729577951308 }
    ],
  },
  time: {
    units: [
      { label: 'Second',      value: 's',   toBase: 1 },
      { label: 'Minute',      value: 'min', toBase: 60 },
      { label: 'Hour',        value: 'h',   toBase: 3600 },
      { label: 'Day',         value: 'd',   toBase: 86400 },
      { label: 'Millisecond', value: 'ms',  toBase: 0.001 },
      { label: 'Week',        value: 'wk',  toBase: 604800 },
      { label: 'Month (avg)', value: 'mo',  toBase: 2629800 },
      { label: 'Year (Julian)', value: 'yr',toBase: 31557600 },
      { label: 'Microsecond', value: 'µs',  toBase: 1e-6 },
      { label: 'Nanosecond',  value: 'ns',  toBase: 1e-9 },
      { label: 'Fortnight',   value: 'fn',  toBase: 1209600 },
      { label: 'Decade',      value: 'dec', toBase: 315576000 },
      { label: 'Century',     value: 'cen', toBase: 3155760000 },
      { label: 'Millennium',  value: 'mil', toBase: 31557600000 }
    ],
  },
  frequency: {
    units: [
      { label: 'Hertz',      value: 'hz',  toBase: 1 },
      { label: 'Kilohertz',  value: 'khz', toBase: 1000 },
      { label: 'Megahertz',  value: 'Mhz', toBase: 1e6 },
      { label: 'Gigahertz',  value: 'Ghz', toBase: 1e9 },
      { label: 'RPM',        value: 'rpm', toBase: 0.016666666666666666 },
      { label: 'Millihertz', value: 'mhz', toBase: 0.001 },
      { label: 'Terahertz',  value: 'Thz', toBase: 1e12 }
    ],
  },
  weight: {
    units: [
      { label: 'Kilogram',     value: 'kg',  toBase: 1 },
      { label: 'Gram',         value: 'g',   toBase: 0.001 },
      { label: 'Pound',        value: 'lb',  toBase: 0.45359237 },
      { label: 'Ounce',        value: 'oz',  toBase: 0.028349523125 },
      { label: 'Milligram',    value: 'mg',  toBase: 1e-6 },
      { label: 'Tonne',        value: 't',   toBase: 1000 },
      { label: 'Stone',        value: 'st',  toBase: 6.35029318 },
      { label: 'Microgram',    value: 'µg',  toBase: 1e-9 },
      { label: 'Centigram',    value: 'cg',  toBase: 1e-5 },
      { label: 'Decigram',     value: 'dg',  toBase: 1e-4 },
      { label: 'Grain',        value: 'gr',  toBase: 0.00006479891 },
      { label: 'Dram',         value: 'dr',  toBase: 0.0017718451953 },
      { label: 'US Ton (short)', value: 'ust', toBase: 907.18474 },
      { label: 'Imperial Ton (long)', value: 'imt', toBase: 1016.0469088 },
      { label: 'Kilotonne',    value: 'kt',  toBase: 1e6 },
      { label: 'Megatonne',    value: 'Mt',  toBase: 1e9 },
      { label: 'Slug',         value: 'slug',toBase: 14.59390294 },
      { label: 'Carat',        value: 'ct',  toBase: 0.0002 },
      { label: 'Dalton (u)',   value: 'u',   toBase: 1.66053906660e-27 },
      { label: '台斤 (Jin)',    value: 'jin', toBase: 0.6 },
      { label: '台兩 (Liang)',  value: 'liang', toBase: 0.0375 },
      { label: '錢 (Qian)',     value: 'qian',toBase: 0.00375 }
    ],
  },
  temperature: {
    units: [
      { label: 'Celsius',    value: 'c',  toBase: 1 },
      { label: 'Fahrenheit', value: 'f',  toBase: 1 },
      { label: 'Kelvin',     value: 'k',  toBase: 1 },
      { label: 'Rankine',    value: 'r',  toBase: 1 },
      { label: 'Gas Mark',   value: 'gm', toBase: 1 },
    ],
  },
  speed: {
    units: [
      { label: 'Kilometer per Hour',    value: 'kmh',  toBase: 0.2777777778 },
      { label: 'Meter per Second',      value: 'mps',  toBase: 1 },
      { label: 'Mile per Hour',         value: 'mph',  toBase: 0.44704 },
      { label: 'Knot',                  value: 'kn',   toBase: 0.5144444444 },
      { label: 'Foot per Second',       value: 'fps',  toBase: 0.3048 },
      { label: 'Centimeter per Second', value: 'cmps', toBase: 0.01 },
      { label: 'Millimeter per Second', value: 'mmps', toBase: 0.001 },
      { label: 'Mach (sea level)',      value: 'mach', toBase: 340.29 },
      { label: 'Speed of Light',        value: 'c',    toBase: 299792458 }
    ],
  },
  acceleration: {
    units: [
      { label: 'Meter per Second²',   value: 'mps2', toBase: 1 },
      { label: 'Standard Gravity (g)',value: 'g',    toBase: 9.80665 },
      { label: 'Foot per Second²',    value: 'fps2', toBase: 0.3048 },
      { label: 'Gal (Galileo)',       value: 'gal',  toBase: 0.01 },
      { label: 'Milligal',            value: 'mgal', toBase: 1e-5 }
    ],
  },
  force: {
    units: [
      { label: 'Newton',        value: 'n',   toBase: 1 },
      { label: 'Kilonewton',    value: 'kn',  toBase: 1000 },
      { label: 'Kilogram-force',value: 'kgf', toBase: 9.80665 },
      { label: 'Pound-force',   value: 'lbf', toBase: 4.4482216153 },
      { label: 'Millinewton',   value: 'mn',  toBase: 0.001 },
      { label: 'Meganewton',    value: 'Mn',  toBase: 1e6 },
      { label: 'Dyne',          value: 'dyn', toBase: 1e-5 },
      { label: 'Gram-force',    value: 'gf',  toBase: 0.00980665 },
      { label: 'Poundal',       value: 'pdl', toBase: 0.138254954376 },
      { label: 'Kip',           value: 'kip', toBase: 4448.2216153 },
      { label: 'Micronewton',   value: 'µn',  toBase: 1e-6 }
    ],
  },
  pressure: {
    units: [
      { label: 'Pascal',         value: 'pa',   toBase: 1 },
      { label: 'Kilopascal',     value: 'kpa',  toBase: 1000 },
      { label: 'Bar',            value: 'bar',  toBase: 100000 },
      { label: 'Atmosphere',     value: 'atm',  toBase: 101325 },
      { label: 'PSI',            value: 'psi',  toBase: 6894.757293 },
      { label: 'Millibar',       value: 'mbar', toBase: 100 },
      { label: 'Hectopascal',    value: 'hpa',  toBase: 100 },
      { label: 'Megapascal',     value: 'mpa',  toBase: 1e6 },
      { label: 'Gigapascal',     value: 'gpa',  toBase: 1e9 },
      { label: 'Torr',           value: 'torr', toBase: 133.322368 },
      { label: 'mmHg',           value: 'mmhg', toBase: 133.322368 },
      { label: 'inHg',           value: 'inhg', toBase: 3386.389 },
      { label: 'PSF',            value: 'psf',  toBase: 47.880259 }
    ],
  },
  torque: {
    units: [
      { label: 'Newton Meter',         value: 'nm',  toBase: 1 },
      { label: 'Kilogram-force Meter', value: 'kgfm',toBase: 9.80665 },
      { label: 'Pound-foot',           value: 'lbft',toBase: 1.3558179483 },
      { label: 'Pound-inch',           value: 'lbin',toBase: 0.1129848290 }
    ],
  },
  density: {
    units: [
      { label: 'Kilogram per m³', value: 'kgm3', toBase: 1 },
      { label: 'Gram per cm³',    value: 'gcm3', toBase: 1000 },
      { label: 'Gram per mL',     value: 'gml',  toBase: 1000 },
      { label: 'Pound per ft³',   value: 'lbft3',toBase: 16.018463 },
      { label: 'Pound per in³',   value: 'lbin3',toBase: 27679.905 }
    ],
  },
  energy: {
    units: [
      { label: 'Joule',         value: 'j',    toBase: 1 },
      { label: 'Kilojoule',     value: 'kj',   toBase: 1000 },
      { label: 'Kilocalorie',   value: 'kcal', toBase: 4184 },
      { label: 'Calorie',       value: 'cal',  toBase: 4.184 },
      { label: 'Kilowatt Hour', value: 'kwh',  toBase: 3.6e6 },
      { label: 'Watt Hour',     value: 'wh',   toBase: 3600 },
      { label: 'Megajoule',     value: 'mj',   toBase: 1e6 },
      { label: 'Gigajoule',     value: 'gj',   toBase: 1e9 },
      { label: 'BTU',           value: 'btu',  toBase: 1055.05585 },
      { label: 'Electronvolt',  value: 'ev',   toBase: 1.602176634e-19 },
      { label: 'Erg',           value: 'erg',  toBase: 1e-7 },
      { label: 'Foot-Pound',    value: 'ftlb', toBase: 1.3558179483 },
      { label: 'Megawatt Hour', value: 'mwh',  toBase: 3.6e9 },
      { label: 'Therm',         value: 'thm',  toBase: 1.05506e8 },
      { label: 'Ton of TNT',    value: 'tnt',  toBase: 4.184e9 }
    ],
  },
  power: {
    units: [
      { label: 'Watt',                  value: 'w',   toBase: 1 },
      { label: 'Kilowatt',              value: 'kw',  toBase: 1000 },
      { label: 'Mechanical Horsepower', value: 'hp',  toBase: 745.699872 },
      { label: 'Megawatt',              value: 'Mw',  toBase: 1e6 },
      { label: 'Gigawatt',              value: 'Gw',  toBase: 1e9 },
      { label: 'Metric Horsepower',     value: 'ps',  toBase: 735.49875 },
      { label: 'Milliwatt',             value: 'mw',  toBase: 0.001 },
      { label: 'BTU per Hour',          value: 'btuh',toBase: 0.29307107 },
      { label: 'Ton of Refrigeration',  value: 'tr',  toBase: 3516.8528421 },
      { label: 'Microwatt',             value: 'µw',  toBase: 1e-6 }
    ],
  },
  charge: {
    units: [
      { label: 'Coulomb',           value: 'c',   toBase: 1 },
      { label: 'Milliampere-hour',  value: 'mah', toBase: 3.6 },
      { label: 'Ampere-hour',       value: 'ah',  toBase: 3600 },
      { label: 'Millicoulomb',      value: 'mc',  toBase: 0.001 },
      { label: 'Microcoulomb',      value: 'µc',  toBase: 1e-6 },
      { label: 'Nanocoulomb',       value: 'nc',  toBase: 1e-9 },
      { label: 'Picocoulomb',       value: 'pc',  toBase: 1e-12 },
      { label: 'Kilocoulomb',       value: 'kc',  toBase: 1000 },
      { label: 'Elementary Charge', value: 'e',   toBase: 1.602176634e-19 }
    ],
  },
  voltage: {
    units: [
      { label: 'Volt',      value: 'v',  toBase: 1 },
      { label: 'Millivolt', value: 'mv', toBase: 0.001 },
      { label: 'Kilovolt',  value: 'kv', toBase: 1000 },
      { label: 'Microvolt', value: 'µv', toBase: 1e-6 },
      { label: 'Nanovolt',  value: 'nv', toBase: 1e-9 },
      { label: 'Megavolt',  value: 'Mv', toBase: 1e6 }
    ],
  },
  current: {
    units: [
      { label: 'Ampere',      value: 'a',  toBase: 1 },
      { label: 'Milliampere', value: 'ma', toBase: 0.001 },
      { label: 'Microampere', value: 'µa', toBase: 1e-6 },
      { label: 'Nanoampere',  value: 'na', toBase: 1e-9 },
      { label: 'Picoampere',  value: 'pa', toBase: 1e-12 },
      { label: 'Kiloampere',  value: 'ka', toBase: 1000 }
    ],
  },
  resistance: {
    units: [
      { label: 'Ohm',      value: 'ohm',  toBase: 1 },
      { label: 'Kilohm',   value: 'kohm', toBase: 1000 },
      { label: 'Megohm',   value: 'Mohm', toBase: 1e6 },
      { label: 'Milliohm', value: 'mohm', toBase: 0.001 },
      { label: 'Microohm', value: 'µohm', toBase: 1e-6 },
      { label: 'Gigaohm',  value: 'Gohm', toBase: 1e9 }
    ],
  },
  capacitance: {
    units: [
      { label: 'Microfarad', value: 'µf', toBase: 1e-6 },
      { label: 'Nanofarad',  value: 'nf', toBase: 1e-9 },
      { label: 'Picofarad',  value: 'pf', toBase: 1e-12 },
      { label: 'Millifarad', value: 'mf', toBase: 0.001 },
      { label: 'Farad',      value: 'f',  toBase: 1 }
    ],
  },
  inductance: {
    units: [
      { label: 'Millihenry', value: 'mh', toBase: 0.001 },
      { label: 'Microhenry', value: 'µh', toBase: 1e-6 },
      { label: 'Henry',      value: 'h',  toBase: 1 }
    ],
  },
  magneticFlux: {
    units: [
      { label: 'Tesla',      value: 't',  toBase: 1 },
      { label: 'Millitesla', value: 'mt', toBase: 0.001 },
      { label: 'Microtesla', value: 'µt', toBase: 1e-6 },
      { label: 'Nanotesla',  value: 'nt', toBase: 1e-9 },
      { label: 'Gauss',      value: 'g',  toBase: 1e-4 }
    ],
  },
  illuminance: {
    units: [
      { label: 'Lux',         value: 'lx', toBase: 1 },
      { label: 'Foot-candle', value: 'fc', toBase: 10.763910417 },
      { label: 'Phot',        value: 'ph', toBase: 10000 }
    ],
  },
  radioactivity: {
    units: [
      { label: 'Becquerel',     value: 'bq',  toBase: 1 },
      { label: 'Kilobecquerel', value: 'kbq', toBase: 1000 },
      { label: 'Megabecquerel', value: 'mbq', toBase: 1e6 },
      { label: 'Gigabecquerel', value: 'gbq', toBase: 1e9 },
      { label: 'Curie',         value: 'ci',  toBase: 3.7e10 },
      { label: 'Millicurie',    value: 'mci', toBase: 3.7e7 },
      { label: 'Microcurie',    value: 'µci', toBase: 3.7e4 }
    ],
  },
  radiationDose: {
    units: [
      { label: 'Sievert',      value: 'sv',  toBase: 1 },
      { label: 'Millisievert', value: 'msv', toBase: 0.001 },
      { label: 'Microsievert', value: 'µsv', toBase: 1e-6 },
      { label: 'Rem',          value: 'rem', toBase: 0.01 },
      { label: 'Millirem',     value: 'mrem',toBase: 1e-5 }
    ],
  },
  substance: {
    units: [
      { label: 'Mole',      value: 'mol',  toBase: 1 },
      { label: 'Millimole', value: 'mmol', toBase: 0.001 },
      { label: 'Micromole', value: 'µmol', toBase: 1e-6 },
      { label: 'Nanomole',  value: 'nmol', toBase: 1e-9 },
      { label: 'Kilomole',  value: 'kmol', toBase: 1000 }
    ],
  },
  digital: {
    units: [
      { label: 'Byte',     value: 'B',   toBase: 8 },
      { label: 'Kilobyte', value: 'KB',  toBase: 8e3 },
      { label: 'Megabyte', value: 'MB',  toBase: 8e6 },
      { label: 'Gigabyte', value: 'GB',  toBase: 8e9 },
      { label: 'Terabyte', value: 'TB',  toBase: 8e12 },
      { label: 'Bit',      value: 'bit', toBase: 1 },
      { label: 'Nibble',   value: 'nib', toBase: 4 },
      { label: 'Petabyte', value: 'PB',  toBase: 8e15 },
      { label: 'Exabyte',  value: 'EB',  toBase: 8e18 },
      { label: 'Kibibyte', value: 'KiB', toBase: 8192 },
      { label: 'Mebibyte', value: 'MiB', toBase: 8388608 },
      { label: 'Gibibyte', value: 'GiB', toBase: 8589934592 },
      { label: 'Tebibyte', value: 'TiB', toBase: 8796093022208 },
      { label: 'Pebibyte', value: 'PiB', toBase: 9007199254740992 }
    ],
  },
  dataRate: {
    units: [
      { label: 'Megabit per Second',  value: 'mbps', toBase: 1e6 },
      { label: 'Gigabit per Second',  value: 'gbps', toBase: 1e9 },
      { label: 'Kilobit per Second',  value: 'kbps', toBase: 1e3 },
      { label: 'Bit per Second',      value: 'bps',  toBase: 1 },
      { label: 'Terabit per Second',  value: 'tbps', toBase: 1e12 },
      { label: 'Megabyte per Second', value: 'MBps', toBase: 8e6 },
      { label: 'Gigabyte per Second', value: 'GBps', toBase: 8e9 },
      { label: 'Kilobyte per Second', value: 'KBps', toBase: 8e3 },
      { label: 'Byte per Second',     value: 'Bps',  toBase: 8 }
    ],
  },
  ratio: {
    units: [
      { label: 'Percent (%)',        value: 'pct',  toBase: 0.01 },
      { label: 'Parts per Million',  value: 'ppm',  toBase: 1e-6 },
      { label: 'Fraction (1)',       value: 'frac', toBase: 1 },
      { label: 'Permille (‰)',       value: 'pml',  toBase: 0.001 },
      { label: 'Parts per Billion',  value: 'ppb',  toBase: 1e-9 },
      { label: 'Parts per Trillion', value: 'ppt',  toBase: 1e-12 }
    ],
  },
  counting: {
    units: [
      { label: 'Piece',         value: 'pc',     toBase: 1 },
      { label: 'Pair',          value: 'pair',   toBase: 2 },
      { label: 'Dozen',         value: 'doz',    toBase: 12 },
      { label: 'Score',         value: 'score',  toBase: 20 },
      { label: 'Gross',         value: 'gross',  toBase: 144 },
      { label: 'Quire',         value: 'quire',  toBase: 25 },
      { label: 'Ream',          value: 'ream',   toBase: 500 },
      { label: 'Great Gross',   value: 'ggross', toBase: 1728 }
    ],
  },
}

function toCelsius(unit: string, value: number): number {
  if (unit === 'f')  return (value - 32) * 5 / 9
  if (unit === 'k')  return value - 273.15
  if (unit === 'r')  return (value - 491.67) * 5 / 9
  if (unit === 'gm') return (value * 25 + 218) * 5 / 9
  return value
}

function fromCelsius(unit: string, celsius: number): number {
  if (unit === 'f')  return celsius * 9 / 5 + 32
  if (unit === 'k')  return celsius + 273.15
  if (unit === 'r')  return celsius * 9 / 5 + 491.67
  if (unit === 'gm') return (celsius * 9 / 5 - 218) / 25
  return celsius
}

export function getConvertedUnit(unitType: string, fromUnit: string, toUnit: string, fromValue: number): number {
  if (unitType === 'temperature') {
    return fromCelsius(toUnit, toCelsius(fromUnit, fromValue))
  }

  const fromMultiplier = Units[unitType].units.find((u) => u.value === fromUnit)?.toBase
  const toMultiplier = Units[unitType].units.find((u) => u.value === toUnit)?.toBase

  if (fromMultiplier === undefined || toMultiplier === undefined) return 0

  return (fromValue * fromMultiplier) / toMultiplier
}

export function convertToAllUnits(unitType: string, fromUnit: string, fromValue: number): number[] {
  if (unitType === 'temperature') {
    const celsius = toCelsius(fromUnit, fromValue)
    return Units[unitType].units.map((u) => fromCelsius(u.value, celsius))
  }

  const fromMultiplier = Units[unitType].units.find((u) => u.value === fromUnit)?.toBase
  if (fromMultiplier === undefined) return []

  return Units[unitType].units.map((u) => (fromValue * fromMultiplier) / u.toBase)
}
