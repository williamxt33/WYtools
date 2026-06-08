import type { IconType } from "react-icons"
import {
  MdStraighten, MdFitnessCenter, MdThermostat, MdSpeed,
  MdCropSquare, MdLocalDrink, MdAccessTime,
  MdAttachMoney, MdCurrencyBitcoin, MdLocalOffer,
  MdRadio, MdCode, MdTransform, MdColorLens, MdTag,
  MdLock, MdFingerprint, MdQrCode, MdQrCode2, MdVpnKey,
  MdShuffle, MdTextFields, MdPerson, MdBadge,
  MdCasino, MdMonetizationOn, MdColorize, MdGroups,
  MdPercent, MdRestaurant, MdAccountBalance, MdTrendingUp, MdReceipt,
  MdDirectionsRun, MdCake, MdLocalFireDepartment, MdSelfImprovement,
  MdDateRange, MdFunctions, MdCalculate,
  MdRotate90DegreesCcw, MdWaves, MdCompress, MdAutorenew,
  MdOpacity, MdBolt, MdFlashOn, MdBatteryChargingFull,
  MdElectricalServices, MdCable, MdMemory, MdLoop,
  MdExplore, MdWbSunny, MdWarning, MdHealthAndSafety,
  MdScience, MdStorage, MdSdStorage, MdNetworkCheck, MdBalance,
  MdFormatListNumbered, MdPanTool, MdArrowUpward, MdSwapHoriz, MdAutoAwesome
} from "react-icons/md"


export const categoryIcons: Record<string, React.ElementType> = {
  converters:  MdSwapHoriz,
  generators:  MdAutoAwesome,
  calculators: MdCalculate,
}

export const toolIcons: Record<string, IconType> = {
  // Unit — Space & Geometry
  "length":            MdStraighten,
  "area":              MdCropSquare,
  "volume":            MdLocalDrink,
  "angle-plane":       MdRotate90DegreesCcw,
  // Unit — Time & Frequency
  "time":              MdAccessTime,
  "frequency":         MdWaves,
  // Unit — Mechanics & Kinematics
  "weight":            MdFitnessCenter,
  "temperature":       MdThermostat,
  "speed":             MdSpeed,
  "acceleration":      MdArrowUpward,
  "force":             MdPanTool,
  "pressure":          MdCompress,
  "torque":            MdAutorenew,
  "density":           MdOpacity,
  // Unit — Energy & Power
  "energy":            MdBolt,
  "power":             MdFlashOn,
  // Unit — Electricity & Magnetism
  "charge":            MdBatteryChargingFull,
  "voltage":           MdElectricalServices,
  "current":           MdCable,
  "resistance":        MdMemory,
  "capacitance":       MdStorage,
  "inductance":        MdLoop,
  "magnetic-flux":     MdExplore,
  // Unit — Light & Radiation
  "illuminance":       MdWbSunny,
  "radioactivity":     MdWarning,
  "radiation-dose":    MdHealthAndSafety,
  // Unit — Chemistry
  "substance":         MdScience,
  // Unit — Information & Data
  "digital-storage":   MdSdStorage,
  "data-rate":         MdNetworkCheck,
  // Unit — Ratios & Counting
  "ratio":             MdBalance,
  "counting":          MdFormatListNumbered,
  // Currency & Finance
  "currency":          MdAttachMoney,
  "crypto":            MdCurrencyBitcoin,
  "unit-price":        MdLocalOffer,
  // Data & Encoding
  "morse-code":        MdRadio,
  "binary-hex-text":   MdCode,
  "base64":            MdTransform,
  "color":             MdColorLens,
  "number-base":       MdTag,
  // Security & Codes
  "password":          MdLock,
  "uuid":              MdFingerprint,
  "qr-code":           MdQrCode,
  "barcode":           MdQrCode2,
  "hash":              MdVpnKey,
  // Random Data
  "random-number":     MdShuffle,
  "lorem-ipsum":       MdTextFields,
  "random-name":       MdPerson,
  "fake-data":         MdBadge,
  // Game & Utility
  "dice-roller":       MdCasino,
  "coin-flipper":      MdMonetizationOn,
  "random-color":      MdColorize,
  "team-randomizer":   MdGroups,
  // Financial
  "percentage":        MdPercent,
  "tip":               MdRestaurant,
  "loan":              MdAccountBalance,
  "compound-interest": MdTrendingUp,
  "tax":               MdReceipt,
  // Health
  "bmi":               MdDirectionsRun,
  "age":               MdCake,
  "calorie":           MdLocalFireDepartment,
  "body-fat":          MdSelfImprovement,
  // Math & Science
  "date-difference":   MdDateRange,
  "fraction":          MdFunctions,
  "scientific":        MdCalculate,
}
