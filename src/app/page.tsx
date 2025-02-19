"use client"
import Link from "next/link"
import * as React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import debounce from "lodash.debounce"

interface BuildingItem {
  id: number
  address: string
}

const LOCAL_STORAGE_KEY = "recentBuildings"

export default function Home() {
  const [buildings, setBuildings] = useState<BuildingItem[]>([])
  const [allBuildings, setAllBuildings] = useState<BuildingItem[]>([])
  const [recentBuildings, setRecentBuildings] = useState<BuildingItem[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [inputFocused, setInputFocused] = useState(false) // ✅ Добавлено состояние для отслеживания фокуса

  useEffect(() => {
    const fetchAllBuildings = async () => {
      try {
        const response = await fetch("/api/buildings")
        const data = await response.json()
        if (Array.isArray(data.buildings)) {
          setAllBuildings(data.buildings)
        }
      } catch (error) {
        console.error("Ошибка загрузки всех зданий:", error)
      }
    }
    fetchAllBuildings()
  }, [])

  const parseAddress = (input: string) => {
    const cleaned = input.replace(/[,]/g, "").trim()
    const parts = cleaned.split(/\s+/)
    const street = parts.slice(0, -1).join(" ").trim()
    const houseNumber = parts[parts.length - 1]?.trim() || ""
    return { street, houseNumber }
  }

  const fetchBuildings = async (search = "") => {
    const { street, houseNumber } = parseAddress(search)
    setLoading(true)
    try {
      const apiUrl = `/api/buildings?search=${encodeURIComponent(`${street} ${houseNumber}`)}`
      const response = await fetch(apiUrl)
      const data = await response.json()

      if (Array.isArray(data.buildings)) {
        setBuildings(data.buildings)
      } else {
        setBuildings([])
      }

      if (data.buildings?.length > 0) {
        updateRecentBuildings(data.buildings)
      }
    } catch (error) {
      console.error("Ошибка загрузки объектов:", error)
      setBuildings([])
    } finally {
      setLoading(false)
    }
  }

  const updateRecentBuildings = (newBuildings: BuildingItem[]) => {
    const unique = [
      ...newBuildings,
      ...recentBuildings.filter(
        (b) => !newBuildings.some((newB: BuildingItem) => newB.id === b.id)
      ),
    ].slice(0, 5)

    setRecentBuildings(unique)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(unique))
  }

  const debouncedFetch = debounce(fetchBuildings, 300)

  useEffect(() => {
    if (searchTerm.trim()) {
      debouncedFetch(searchTerm)
      setShowDropdown(false)
    } else if (inputFocused) {
      setShowDropdown(true) // ✅ Показываем dropdown только если есть фокус
    }
    return () => debouncedFetch.cancel()
  }, [searchTerm, inputFocused])

  useEffect(() => {
    const storedBuildings = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (storedBuildings) {
      const parsed = JSON.parse(storedBuildings) as BuildingItem[]
      setRecentBuildings(parsed.slice(0, 5))
    }
  }, [])

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="bg-zinc-50">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-14">
          <h1 className="text-lg font-bold">ТЕХНОАУДИТ</h1>
          <Button variant="ghost" size="icon">
            <span className="sr-only">Меню</span>
            <Search className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        <div className="relative mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Введите адрес объекта"
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => {
                setInputFocused(true) // ✅ Фокус активирован
                if (!searchTerm.trim()) setShowDropdown(true)
              }}
              onBlur={() => setTimeout(() => {
                setInputFocused(false) // ✅ Фокус снят
                setShowDropdown(false)
              }, 150)}
            />
          </div>

          {/* ✅ Dropdown с последними найденными */}
          {showDropdown && inputFocused && recentBuildings.length > 0 && (
            <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
              {recentBuildings.map((building) => (
                <div
                  key={building.id}
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                  onMouseDown={() => {
                    setSearchTerm(building.address)
                    fetchBuildings(building.address)
                    setShowDropdown(false)
                  }}
                >
                  {building.address}
                </div>
              ))}
            </div>
          )}
        </div>

        {!searchTerm && (
          <>
            <h2 className="text-xl font-semibold mb-4">Все объекты</h2>
            <div className="grid gap-4">
              {allBuildings.map((building) => (
                <Link
                  key={building.id}
                  href={`/object/${building.id}?address=${encodeURIComponent(building.address)}`}
                  className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                >
                  <div className="font-medium">{building.address}</div>
                </Link>
              ))}
            </div>
          </>
        )}

        {searchTerm && (
          <>
            <h2 className="text-xl font-semibold mb-4">Результаты поиска</h2>
            {loading ? (
              <p className="text-gray-500">Загрузка...</p>
            ) : (
              <div className="grid gap-4">
                {buildings.length > 0 ? (
                  buildings.map((building) => (
                    <Link
                      key={building.id}
                      href={`/object/${building.id}?address=${encodeURIComponent(building.address)}`}
                      className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                    >
                      <div className="font-medium">{building.address}</div>
                    </Link>
                  ))
                ) : (
                  <p className="text-gray-500">Нет объектов по вашему запросу</p>
                )}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}