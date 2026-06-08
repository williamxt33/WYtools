"use client"

import { useState } from "react"
import { Units, getConvertedUnit, convertToAllUnits } from "@/lib/tools/converters/unitConverters"

type Mode = "quick" | "all"

export default function UnitConverter({ unitType }: { unitType: string }) {
  const [mode, setMode] = useState<Mode>("quick")
  const units = Units[unitType]?.units ?? []
  const [fromUnit, setFromUnit] = useState(units[0]?.value ?? '')
  const [toUnit, setToUnit] = useState(units[1]?.value ?? '')
  const [inputValue, setInputValue] = useState<string>("")

  const quickResult = getConvertedUnit(unitType, fromUnit, toUnit, parseFloat(inputValue) || 0)
  const allResults = convertToAllUnits(unitType, fromUnit, parseFloat(inputValue) || 0)

  const quickResultDesc = ` ${inputValue} ${fromUnit} = ${quickResult} ${toUnit}`

  return (
    <section className="flex flex-col gap-4">
      {/* Mode toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setMode("quick")}
          className={`px-4 py-1.5 rounded text-sm font-medium transition-colors cursor-pointer ${
            mode === "quick" ? "bg-primary text-white" : "bg-background text-muted-foreground border border-black"
          }`}
        >
          Quick Convert
        </button>
        <button
          onClick={() => setMode("all")}
          className={`px-4 py-1.5 rounded text-sm font-medium transition-colors cursor-pointer ${
            mode === "all" ? "bg-primary text-white" : "bg-background text-muted-foreground border border-black"
          }`}
        >
          All Units
        </button>
      </div>

      {/* Input row */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">From:</label>
        <div className="flex gap-2">
          <input
            type="number"
            value={inputValue}
            min={0}
            onChange={(e) => setInputValue(e.target.value)}
            className="border rounded px-3 py-2 w-40 text-sm [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="border rounded px-3 py-2 text-sm"
          >
            {units.map((u) => (
              <option key={u.value} value={u.value}>{u.label} ({u.value})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Quick Convert */}
      {mode === "quick" && (
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">To:</label>
          <div className="flex gap-2">
            <input
              type="number"
              readOnly
              value={inputValue == "" ? "" : quickResult}
              className="border rounded px-3 py-2 w-40 text-sm"
            />
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="border rounded px-3 py-2 text-sm"
            >
              {units.map((u) => (
                <option key={u.value} value={u.value}>{u.label} ({u.value})</option>
              ))}
            </select>
          </div>
          <p className={inputValue == "" ? "hidden" : "block"}>
            <span className="text-red-600 font-bold text-lg">Result:</span>
            <span className="font-medium }">{quickResultDesc}</span>
          </p>
        </div>
      )}

      {/* All Units */}
      {mode === "all" && (
        <ul className="flex flex-col gap-1">
          {units.map((u, i) => (
            <li key={u.value} className="flex justify-between text-sm py-1 border-b last:border-0">
              <span className="text-muted-foreground">{u.label} ({u.value})</span>
              <span className="font-medium">{inputValue === "" ? "" : `${allResults[i]} ${u.value}`}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
