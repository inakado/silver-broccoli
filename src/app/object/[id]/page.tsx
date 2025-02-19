"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, MoreVertical } from "lucide-react"



export default function ObjectPage({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams()
  const rawAddress = searchParams.get("address")?.split("?")[0] // Отрезаем "мусор"
  const address = rawAddress ? decodeURIComponent(rawAddress) : `Объект №${params.id}`

  const [systems, setSystems] = useState<{ id: number; name: string }[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)


  // 🚀 Загружаем системы здания
  useEffect(() => {
    async function fetchSystems() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`/api/building-systems?id=${params.id}`)
        if (!response.ok) throw new Error("Ошибка загрузки данных")

        const data = await response.json()
        setSystems(data.systems || [])
      } catch (err) {
        setError("Не удалось загрузить системы")
      } finally {
        setLoading(false)
      }
    }

    fetchSystems()
  }, [params.id])

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* ✅ Шапка */}
      <header className="bg-zinc-50">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-14">
          <h1 className="text-lg font-bold">ТЕХНОАУДИТ</h1>
          <Button variant="ghost" size="icon">
            <span className="sr-only">Меню</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-12 h-12"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </header>

      {/* ✅ Основной контент */}
      <main className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Link href="/" className="hover:text-foreground">Главная</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{address}</span>
        </div>

        {/* ✅ Карточка информации */}
        <Card className="rounded-xl border">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">{address}</h2> {/* ✅ Показываем адрес */}
                <p className="text-sm text-muted-foreground">г. Владивосток</p>
              </div>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>

            {/* ✅ Системы объекта */}
            <div className="space-y-2">
              {loading ? (
                <p>Загрузка систем...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : systems.length === 0 ? (
                <p className="text-muted-foreground">Нет данных о системах</p>
              ) : (
                systems.map((system) => (
              <Link
                key={system.id}
                href={`/object/${params.id}/system/${system.id}?systemName=${encodeURIComponent(system.name)}&address=${encodeURIComponent(address)}`}
                className="flex items-center justify-between py-2 border-b last:border-b-0"
              >
                <div className="font-medium">{system.name}</div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Link>
                ))
              )}
            </div>

            {/* ✅ Общая информация */}
            <div className="grid gap-2 border-t pt-4">
              <p><strong>Общая информация</strong></p>
              {["Тип", "Этажность", "Год постройки"].map((label, index) => (
                <div key={index} className="flex justify-between text-m">
                  <span className="font-medium text-muted-foreground">{label}:</span>
                  <span>{["Панельный", "9 этажей", "2001 г."][index]}</span>
                </div>
              ))}
            </div>

            {/* ✅ Ответственный эксперт */}
            <div className="space-y-1 text-m">
              <p><strong>Ответственный эксперт</strong></p>
              <p><strong>ФИО:</strong> Иванов Иван Иванович</p>
              <p><strong>Email:</strong> liam@acme.com</p>
              <p><strong>Телефон:</strong> +1 234 567 890</p>
            </div>

            {/* ✅ Дата обновления */}
            <div className="text-xs text-muted-foreground text-right">
              Обновлено 15 Февраля, 2023
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}