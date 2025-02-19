import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

export default function LocationPage({ params }: { params: { location: string } }) {
  const systems = [
    { name: "Крыша", count: 0 },
    { name: "Фасад", count: 2 },
    { name: "Фундамент", count: 1 },
    { name: "Стены", count: 6 },
  ]

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="container flex items-center justify-between h-14">
          <h1 className="text-lg font-medium">ТЕХНОАУДИТ</h1>
          <Button variant="ghost" size="icon">
            <span className="sr-only">Menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </header>
      <div className="container py-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Link href="/" className="hover:text-foreground">
            Главная
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Светланская, 1</span>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h1 className="text-xl font-medium mb-1">Светланская, 1</h1>
          <p className="text-sm text-muted-foreground">г. Владивосток</p>
        </div>
        <div className="space-y-6">
          <div>
            <h2 className="text-sm font-medium mb-3">Системы:</h2>
            <div className="space-y-2">
              {systems.map((system) => (
                <Link
                  key={system.name}
                  href={`/${params.location}/${system.name.toLowerCase()}`}
                  className="flex items-center justify-between p-3 bg-white border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-2">
                    <span>{system.name}</span>
                    <span className="text-sm text-muted-foreground">({system.count})</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-sm font-medium mb-3">Общая информация</h2>
            <div className="space-y-2">
              <div className="flex justify-between p-3 bg-white border rounded-lg">
                <span className="text-muted-foreground">Тип</span>
                <span>Панельный</span>
              </div>
              <div className="flex justify-between p-3 bg-white border rounded-lg">
                <span className="text-muted-foreground">Этажность</span>
                <span>9 этажей</span>
              </div>
              <div className="flex justify-between p-3 bg-white border rounded-lg">
                <span className="text-muted-foreground">Год постройки</span>
                <span>2001 г.</span>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-sm font-medium mb-3">Ответственный эксперт</h2>
            <div className="space-y-2">
              <div className="flex justify-between p-3 bg-white border rounded-lg">
                <span className="text-muted-foreground">ФИО</span>
                <span>Иванов Иван Иванович</span>
              </div>
              <div className="flex justify-between p-3 bg-white border rounded-lg">
                <span className="text-muted-foreground">Email</span>
                <span>ivan@techaudit.com</span>
              </div>
              <div className="flex justify-between p-3 bg-white border rounded-lg">
                <span className="text-muted-foreground">Телефон</span>
                <span>+1 234 567 890</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

