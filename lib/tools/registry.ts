export type ToolCategory = "converters" | "generators" | "calculators"

export type ToolSubCategory =
  | "unit"
  | "currency-finance"
  | "data-encoding"
  | "security-codes"
  | "random-data"
  | "game-utility"
  | "financial"
  | "health"
  | "math-science"

export type Tool = {
  name: string
  description: string
  href: string
  category: ToolCategory
  subCategory: ToolSubCategory
  props?: Record<string, unknown>
}

export type SubCategoryDef = {
  label: string
  value: ToolSubCategory
}

export type CategoryDef = {
  label: string
  value: ToolCategory
  subCategories: SubCategoryDef[]
}

export const categories: CategoryDef[] = [
  {
    label: "Converters",
    value: "converters",
    subCategories: [
      { label: "Unit", value: "unit" },
      { label: "Currency & Finance", value: "currency-finance" },
      { label: "Data & Encoding", value: "data-encoding" },
    ],
  },
  {
    label: "Generators",
    value: "generators",
    subCategories: [
      { label: "Security & Codes", value: "security-codes" },
      { label: "Random Data", value: "random-data" },
      { label: "Game & Utility", value: "game-utility" },
    ],
  },
  {
    label: "Calculators",
    value: "calculators",
    subCategories: [
      { label: "Financial", value: "financial" },
      { label: "Health", value: "health" },
      { label: "Math & Science", value: "math-science" },
    ],
  },
]

export const tools: Tool[] = [
  // ── Converters / Unit — Space & Geometry ──────────────────────────────────
  {
    name: "Length Converter",
    description: "Convert between meters, feet, inches, miles and more",
    href: "/tools/converters/length",
    category: "converters",
    subCategory: "unit",
    props: { unitType: "length" },
  },
  {
    name: "Area Converter",
    description: "Convert between m², ft², acres and hectares",
    href: "/tools/converters/area",
    category: "converters",
    subCategory: "unit",
    props: { unitType: "area" },
  },
  {
    name: "Volume Converter",
    description: "Convert between liters, gallons, cups and ml",
    href: "/tools/converters/volume",
    category: "converters",
    subCategory: "unit",
    props: { unitType: "volume" },
  },
  {
    name: "Angle Converter",
    description: "Convert between degrees, radians, gradians and more",
    href: "/tools/converters/angle-plane",
    category: "converters",
    subCategory: "unit",
    props: { unitType: "anglePlane" },
  },
  // ── Converters / Unit — Time & Frequency ──────────────────────────────────
  {
    name: "Time Converter",
    description: "Convert between seconds, minutes, hours and days",
    href: "/tools/converters/time",
    category: "converters",
    subCategory: "unit",
    props: { unitType: "time" },
  },
  {
    name: "Frequency Converter",
    description: "Convert between Hz, kHz, MHz, GHz and RPM",
    href: "/tools/converters/frequency",
    category: "converters",
    subCategory: "unit",
    props: { unitType: "frequency" },
  },
  // ── Converters / Unit — Mechanics & Kinematics ────────────────────────────
  {
    name: "Weight Converter",
    description: "Convert between kg, lbs, oz, grams and more",
    href: "/tools/converters/weight",
    category: "converters",
    subCategory: "unit",
    props: { unitType: "weight" },
  },
  {
    name: "Temperature Converter",
    description: "Convert between Celsius, Fahrenheit, Kelvin and more",
    href: "/tools/converters/temperature",
    category: "converters",
    subCategory: "unit",
    props: { unitType: "temperature" },
  },
  {
    name: "Speed Converter",
    description: "Convert between km/h, mph, m/s and knots",
    href: "/tools/converters/speed",
    category: "converters",
    subCategory: "unit",
    props: { unitType: "speed" },
  },
  {
    name: "Acceleration Converter",
    description: "Convert between m/s², g-force and ft/s²",
    href: "/tools/converters/acceleration",
    category: "converters",
    subCategory: "unit",
    props: { unitType: "acceleration" },
  },
  {
    name: "Force Converter",
    description: "Convert between newtons, pound-force, kilogram-force and more",
    href: "/tools/converters/force",
    category: "converters",
    subCategory: "unit",
    props: { unitType: "force" },
  },
  {
    name: "Pressure Converter",
    description: "Convert between Pascal, bar, PSI, atmosphere and more",
    href: "/tools/converters/pressure",
    category: "converters",
    subCategory: "unit",
    props: { unitType: "pressure" },
  },
  {
    name: "Torque Converter",
    description: "Convert between Newton-meter, pound-foot and kilogram-force meter",
    href: "/tools/converters/torque",
    category: "converters",
    subCategory: "unit",
    props: { unitType: "torque" },
  },
  {
    name: "Density Converter",
    description: "Convert between kg/m³, g/cm³, lb/ft³ and more",
    href: "/tools/converters/density",
    category: "converters",
    subCategory: "unit",
    props: { unitType: "density" },
  },
  // ── Converters / Unit — Energy & Power ────────────────────────────────────
  {
    name: "Energy Converter",
    description: "Convert between joules, calories, BTU, kWh and more",
    href: "/tools/converters/energy",
    category: "converters",
    subCategory: "unit",
    props: { unitType: "energy" },
  },
  {
    name: "Power Converter",
    description: "Convert between watts, horsepower, BTU/hr and more",
    href: "/tools/converters/power",
    category: "converters",
    subCategory: "unit",
    props: { unitType: "power" },
  },
  // ── Converters / Unit — Electricity & Magnetism ───────────────────────────
  {
    name: "Electric Charge Converter",
    description: "Convert between coulombs, ampere-hours and milliampere-hours",
    href: "/tools/converters/charge",
    category: "converters",
    subCategory: "unit",
    props: { unitType: "charge" },
  },
  {
    name: "Voltage Converter",
    description: "Convert between volts, millivolts, kilovolts and more",
    href: "/tools/converters/voltage",
    category: "converters",
    subCategory: "unit",
    props: { unitType: "voltage" },
  },
  {
    name: "Current Converter",
    description: "Convert between amperes, milliamperes, microamperes and more",
    href: "/tools/converters/current",
    category: "converters",
    subCategory: "unit",
    props: { unitType: "current" },
  },
  {
    name: "Resistance Converter",
    description: "Convert between ohms, kilohms, megohms and more",
    href: "/tools/converters/resistance",
    category: "converters",
    subCategory: "unit",
    props: { unitType: "resistance" },
  },
  {
    name: "Capacitance Converter",
    description: "Convert between farads, microfarads, picofarads and more",
    href: "/tools/converters/capacitance",
    category: "converters",
    subCategory: "unit",
    props: { unitType: "capacitance" },
  },
  {
    name: "Inductance Converter",
    description: "Convert between henries, millihenries and microhenries",
    href: "/tools/converters/inductance",
    category: "converters",
    subCategory: "unit",
    props: { unitType: "inductance" },
  },
  {
    name: "Magnetic Flux Converter",
    description: "Convert between tesla, millitesla, gauss and more",
    href: "/tools/converters/magnetic-flux",
    category: "converters",
    subCategory: "unit",
    props: { unitType: "magneticFlux" },
  },
  // ── Converters / Unit — Light & Radiation ─────────────────────────────────
  {
    name: "Illuminance Converter",
    description: "Convert between lux, foot-candles and phot",
    href: "/tools/converters/illuminance",
    category: "converters",
    subCategory: "unit",
    props: { unitType: "illuminance" },
  },
  {
    name: "Radioactivity Converter",
    description: "Convert between becquerel, curie and millicurie",
    href: "/tools/converters/radioactivity",
    category: "converters",
    subCategory: "unit",
    props: { unitType: "radioactivity" },
  },
  {
    name: "Radiation Dose Converter",
    description: "Convert between sievert, millisievert, rem and more",
    href: "/tools/converters/radiation-dose",
    category: "converters",
    subCategory: "unit",
    props: { unitType: "radiationDose" },
  },
  // ── Converters / Unit — Chemistry ─────────────────────────────────────────
  {
    name: "Substance Amount Converter",
    description: "Convert between moles, millimoles and micromoles",
    href: "/tools/converters/substance",
    category: "converters",
    subCategory: "unit",
    props: { unitType: "substance" },
  },
  // ── Converters / Unit — Information & Data ────────────────────────────────
  {
    name: "Digital Storage Converter",
    description: "Convert between bytes, kilobytes, megabytes, gigabytes and more",
    href: "/tools/converters/digital-storage",
    category: "converters",
    subCategory: "unit",
    props: { unitType: "digital" },
  },
  {
    name: "Data Rate Converter",
    description: "Convert between bps, Mbps, Gbps and more",
    href: "/tools/converters/data-rate",
    category: "converters",
    subCategory: "unit",
    props: { unitType: "dataRate" },
  },
  // ── Converters / Unit — Ratios & Counting ─────────────────────────────────
  {
    name: "Ratio Converter",
    description: "Convert between percent, permille, PPM, PPB and more",
    href: "/tools/converters/ratio",
    category: "converters",
    subCategory: "unit",
    props: { unitType: "ratio" },
  },
  {
    name: "Counting Converter",
    description: "Convert between pieces, dozens, gross, ream and more",
    href: "/tools/converters/counting",
    category: "converters",
    subCategory: "unit",
    props: { unitType: "counting" },
  },
  // ── Converters / Currency & Finance ───────────────────────────────────────
  {
    name: "Currency Converter",
    description: "Live exchange rates between world currencies",
    href: "/tools/converters/currency",
    category: "converters",
    subCategory: "currency-finance",
  },
  {
    name: "Cryptocurrency Converter",
    description: "Convert between Bitcoin, Ethereum and fiat currencies",
    href: "/tools/converters/crypto",
    category: "converters",
    subCategory: "currency-finance",
  },
  {
    name: "Unit Price Converter",
    description: "Compare prices per unit across different quantities",
    href: "/tools/converters/unit-price",
    category: "converters",
    subCategory: "currency-finance",
  },
  // ── Converters / Data & Encoding ──────────────────────────────────────────
  {
    name: "Morse Code Translator",
    description: "Translate text to Morse code and back",
    href: "/tools/converters/morse-code",
    category: "converters",
    subCategory: "data-encoding",
  },
  {
    name: "Binary / Hex / Text",
    description: "Convert between binary, hexadecimal and plain text",
    href: "/tools/converters/binary-hex-text",
    category: "converters",
    subCategory: "data-encoding",
  },
  {
    name: "Base64 Encoder / Decoder",
    description: "Encode and decode Base64 strings",
    href: "/tools/converters/base64",
    category: "converters",
    subCategory: "data-encoding",
  },
  {
    name: "Color Code Converter",
    description: "Convert between HEX, RGB, HSL and CSS color names",
    href: "/tools/converters/color",
    category: "converters",
    subCategory: "data-encoding",
  },
  {
    name: "Number Base Converter",
    description: "Convert between binary, octal, decimal and hexadecimal",
    href: "/tools/converters/number-base",
    category: "converters",
    subCategory: "data-encoding",
  },
  // ── Generators / Security & Codes ─────────────────────────────────────────
  {
    name: "Password Generator",
    description: "Generate strong, secure random passwords",
    href: "/tools/generators/password",
    category: "generators",
    subCategory: "security-codes",
  },
  {
    name: "UUID Generator",
    description: "Generate random UUIDs (v4)",
    href: "/tools/generators/uuid",
    category: "generators",
    subCategory: "security-codes",
  },
  {
    name: "QR Code Generator",
    description: "Generate QR codes for URLs, text and contact info",
    href: "/tools/generators/qr-code",
    category: "generators",
    subCategory: "security-codes",
  },
  {
    name: "Barcode Generator",
    description: "Generate Code128, EAN-13 and other barcode formats",
    href: "/tools/generators/barcode",
    category: "generators",
    subCategory: "security-codes",
  },
  {
    name: "Hash Generator",
    description: "Generate MD5, SHA-1, SHA-256 and SHA-512 hashes",
    href: "/tools/generators/hash",
    category: "generators",
    subCategory: "security-codes",
  },
  // ── Generators / Random Data ──────────────────────────────────────────────
  {
    name: "Random Number Generator",
    description: "Generate random numbers within any range",
    href: "/tools/generators/random-number",
    category: "generators",
    subCategory: "random-data",
  },
  {
    name: "Lorem Ipsum Generator",
    description: "Generate placeholder text for designs and mockups",
    href: "/tools/generators/lorem-ipsum",
    category: "generators",
    subCategory: "random-data",
  },
  {
    name: "Random Name Generator",
    description: "Generate realistic random names for any locale",
    href: "/tools/generators/random-name",
    category: "generators",
    subCategory: "random-data",
  },
  {
    name: "Fake Data Generator",
    description: "Generate fake emails, phone numbers and addresses",
    href: "/tools/generators/fake-data",
    category: "generators",
    subCategory: "random-data",
  },
  // ── Generators / Game & Utility ───────────────────────────────────────────
  {
    name: "Dice Roller",
    description: "Roll any number and type of dice (D4, D6, D20...)",
    href: "/tools/generators/dice-roller",
    category: "generators",
    subCategory: "game-utility",
  },
  {
    name: "Coin Flipper",
    description: "Flip a fair coin to decide between two options",
    href: "/tools/generators/coin-flipper",
    category: "generators",
    subCategory: "game-utility",
  },
  {
    name: "Random Color Generator",
    description: "Generate random colors with HEX, RGB and HSL values",
    href: "/tools/generators/random-color",
    category: "generators",
    subCategory: "game-utility",
  },
  {
    name: "Groups Generator",
    description: "Randomly split a list of names into balanced teams",
    href: "/tools/generators/team-randomizer",
    category: "generators",
    subCategory: "game-utility",
  },
  // ── Calculators / Financial ────────────────────────────────────────────────
  {
    name: "Percentage Calculator",
    description: "Calculate percentages, discounts and changes",
    href: "/tools/calculators/percentage",
    category: "calculators",
    subCategory: "financial",
  },
  {
    name: "Tip Calculator",
    description: "Calculate tip amount and split bills between people",
    href: "/tools/calculators/tip",
    category: "calculators",
    subCategory: "financial",
  },
  {
    name: "Loan Calculator",
    description: "Calculate monthly payments and total interest on a loan",
    href: "/tools/calculators/loan",
    category: "calculators",
    subCategory: "financial",
  },
  {
    name: "Compound Interest Calculator",
    description: "Calculate investment growth with compound interest",
    href: "/tools/calculators/compound-interest",
    category: "calculators",
    subCategory: "financial",
  },
  {
    name: "Tax Calculator",
    description: "Estimate income tax based on bracket and income",
    href: "/tools/calculators/tax",
    category: "calculators",
    subCategory: "financial",
  },
  // ── Calculators / Health ──────────────────────────────────────────────────
  {
    name: "BMI Calculator",
    description: "Calculate Body Mass Index from height and weight",
    href: "/tools/calculators/bmi",
    category: "calculators",
    subCategory: "health",
  },
  {
    name: "Age Calculator",
    description: "Calculate exact age and time until next birthday",
    href: "/tools/calculators/age",
    category: "calculators",
    subCategory: "health",
  },
  {
    name: "Calorie Calculator",
    description: "Estimate daily calorie needs based on activity level",
    href: "/tools/calculators/calorie",
    category: "calculators",
    subCategory: "health",
  },
  {
    name: "Body Fat Calculator",
    description: "Estimate body fat percentage using body measurements",
    href: "/tools/calculators/body-fat",
    category: "calculators",
    subCategory: "health",
  },
  // ── Calculators / Math & Science ─────────────────────────────────────────
  {
    name: "Date Difference Calculator",
    description: "Calculate the number of days between two dates",
    href: "/tools/calculators/date-difference",
    category: "calculators",
    subCategory: "math-science",
  },
  {
    name: "Fraction Calculator",
    description: "Add, subtract, multiply and divide fractions",
    href: "/tools/calculators/fraction",
    category: "calculators",
    subCategory: "math-science",
  },
  {
    name: "Scientific Calculator",
    description: "Advanced calculator with trigonometry and logarithms",
    href: "/tools/calculators/scientific",
    category: "calculators",
    subCategory: "math-science",
  },
]

export function getToolsByCategory(category: ToolCategory): Tool[] {
  return tools.filter((t) => t.category === category)
}

export function getToolsBySubCategory(subCategory: ToolSubCategory): Tool[] {
  return tools.filter((t) => t.subCategory === subCategory)
}

export function getSubCategories(category: ToolCategory): SubCategoryDef[] {
  return categories.find((c) => c.value === category)?.subCategories ?? []
}
