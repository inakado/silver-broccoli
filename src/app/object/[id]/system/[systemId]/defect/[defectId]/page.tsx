import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

// This would typically come from a database or API
const defectData = {
  id: "1",
  name: "Трещина в несущей стене",
  status: "Критический",
  date: "2024-02-14",
  description: "Глубокая трещина в несущей стене, требует немедленного внимания.",
  area: 2.5,
  depth: 15,
  photo: "/placeholder.svg", // Replace with actual photo URL
}

export default function DefectPage({ params }: { params: { id: string; systemId: string; defectId: string } }) {
  return (
    <div className="min-h-screen bg-zinc-50 p-4">
      <div className="max-w-2xl mx-auto">
        <Link href={`/object/${params.id}/system/${params.systemId}`}>
          <Button variant="ghost" className="mb-4">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Назад к системе
          </Button>
        </Link>

        <h1 className="text-2xl font-bold mb-4">{defectData.name}</h1>

        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <img
            src={defectData.photo || "/placeholder.svg"}
            alt={defectData.name}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h2 className="text-sm font-medium text-gray-500">Статус</h2>
              <p className="mt-1 text-sm text-gray-900">{defectData.status}</p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500">Дата обнаружения</h2>
              <p className="mt-1 text-sm text-gray-900">{defectData.date}</p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500">Площадь</h2>
              <p className="mt-1 text-sm text-gray-900">{defectData.area} м²</p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500">Глубина</h2>
              <p className="mt-1 text-sm text-gray-900">{defectData.depth} мм</p>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-medium text-gray-500">Описание</h2>
            <p className="mt-1 text-sm text-gray-900">{defectData.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

