"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Camera, X, MapPin } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface DefectFormProps {
  onClose: () => void
}

export default function DefectForm({ onClose }: DefectFormProps) {
  const [photo, setPhoto] = useState<string | null>(null)
  const [planImage, setPlanImage] = useState<string>("/plan-image.jpg") // Путь к изображению плана
  const [markedPlan, setMarkedPlan] = useState<string | null>(null) // Сохранённое изображение с точкой
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhoto(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onClose()
  }

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const img = new Image()
        img.src = planImage
        img.onload = () => {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
          ctx.fillStyle = "red"
          ctx.beginPath()
          ctx.arc(x, y, 5, 0, Math.PI * 2)
          ctx.fill()
          const markedImage = canvas.toDataURL("image/png")
          setMarkedPlan(markedImage)
        }
      }
    }
  }

  const handleSavePlan = () => {
    if (markedPlan) {
      setPhoto(markedPlan)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Новый дефект</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <Label htmlFor="photo">Фото дефекта</Label>
            <div className="mt-1">
              {photo ? (
                <div className="relative aspect-video">
                  <img
                    src={photo || "/placeholder.svg"}
                    alt="Captured defect"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="absolute bottom-2 right-2"
                    onClick={() => setPhoto(null)}
                  >
                    Изменить фото
                  </Button>
                </div>
              ) : (
                <div className="relative">
                  <input
                    id="photo"
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleCapture}
                    className="sr-only"
                  />
                  <label
                    htmlFor="photo"
                    className="flex items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <div className="text-center">
                      <Camera className="mx-auto h-12 w-12 text-gray-400" />
                      <span className="mt-2 block text-sm font-medium text-gray-900">Сделать фото</span>
                    </div>
                  </label>
                </div>
              )}
            </div>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button type="button" variant="outline" className="w-full">
                <MapPin className="mr-2 h-4 w-4" /> Отметить на плане
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-3/4">
              <SheetHeader>
                <SheetTitle>Отметка на плане</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col items-center justify-center mt-4">
                <canvas
                  ref={canvasRef}
                  width={500}
                  height={500}
                  className="w-full h-auto border rounded-lg"
                  onClick={handleCanvasClick}
                />
                <Button onClick={handleSavePlan} className="mt-4">
                  Сохранить отметку
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          <div>
            <Label htmlFor="name">Название дефекта</Label>
            <Input id="name" required />
          </div>

          <div>
            <Label htmlFor="subsystem">Подсистема</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Выберите подсистему" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Несущие конструкции</SelectItem>
                <SelectItem value="2">Кровля</SelectItem>
                <SelectItem value="3">Фасад</SelectItem>
                <SelectItem value="4">Инженерные системы</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Описание дефекта</Label>
            <Textarea id="description" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="area">Площадь (м²)</Label>
              <Input id="area" type="number" min="0" step="0.01" required />
            </div>
            <div>
              <Label htmlFor="depth">Глубина (мм)</Label>
              <Input id="depth" type="number" min="0" step="0.1" required />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Отмена
            </Button>
            <Button type="submit">Сохранить</Button>
          </div>
        </form>
      </div>
    </div>
  )
}