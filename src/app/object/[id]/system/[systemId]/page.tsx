"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronRight, Camera } from "lucide-react"

const defects = [
  { id: 1, name: "Трещина в стене", status: "Критический", date: "2024-02-14" },
  { id: 2, name: "Отслоение краски", status: "Средний", date: "2024-02-13" },
  { id: 3, name: "Скол на углу", status: "Низкий", date: "2024-02-12" },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Критический":
      return "bg-red-100 text-red-800"
    case "Средний":
      return "bg-yellow-100 text-yellow-800"
    case "Низкий":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function SystemPage({ params }: { params: { id: string; systemId: string } }) {
  const searchParams = useSearchParams()
  const systemName = searchParams.get("systemName") || `Система ${params.systemId}`
  const rawAddress = searchParams.get("address")?.split("?")[0] 
  const address = rawAddress ? decodeURIComponent(rawAddress) : `Объект ${params.id}`

  return (
    <div className="min-h-screen bg-zinc-50">
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

      <main className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground">
            Главная
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href={`/object/${params.id}?address=${encodeURIComponent(address)}`} className="hover:text-foreground">
            {address}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{systemName}</span>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">{systemName}</h2>
          <Link href={`/object/${params.id}/system/${params.systemId}/new-defect?systemName=${encodeURIComponent(systemName)}&address=${encodeURIComponent(address)}`}>
            <Button>
              <Camera className="h-4 w-4 mr-2" />
              Добавить дефект
            </Button>
          </Link>
        </div>

        <div className="grid gap-4">
          {defects.map((defect) => (
            <Link
              key={defect.id}
              href={`/object/${params.id}/system/${params.systemId}/defect/${defect.id}`}
              className="block"
            >
              <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                <div>
                  <div className="font-medium">{defect.name}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(defect.status)}`}>
                      {defect.status}
                    </span>
                    <span className="text-sm text-muted-foreground">{defect.date}</span>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}