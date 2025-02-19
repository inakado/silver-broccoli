import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

export default function DefectPage({
  params,
}: {
  params: { location: string; system: string }
}) {
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
          <Link href={`/${params.location}`} className="hover:text-foreground">
            Светланская, 1
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href={`/${params.location}/${params.system}`} className="hover:text-foreground capitalize">
            {params.system}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Дефект</span>
        </div>
        <div className="max-w-2xl space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Название дефекта</label>
            <Input defaultValue="Pedro Duarte" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Выберите подсистему</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Выберите подсистему" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Подсистема 1</SelectItem>
                <SelectItem value="2">Подсистема 2</SelectItem>
                <SelectItem value="3">Подсистема 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Указать дефект на плане</label>
            <div className="relative aspect-[4/3] w-full border rounded-lg overflow-hidden">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled-BQTmBAAlw4E3Kl7bEeCAtU8lfzf98h.png"
                alt="Floor plan"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Причина дефекта</label>
            <Input defaultValue="Разрушение..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Площадь</label>
              <div className="flex items-center gap-2">
                <Input defaultValue="2" />
                <span className="text-sm">м2</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Раскрытие</label>
              <div className="flex items-center gap-2">
                <Input defaultValue="" />
                <span className="text-sm">см</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Кол-во дефектов</label>
            <Input defaultValue="2" />
          </div>
          <Button className="w-full">Сохранить дефект</Button>
        </div>
      </div>
    </div>
  )
}

