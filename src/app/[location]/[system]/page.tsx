"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight, Camera } from "lucide-react"
import Link from "next/link"
import DefectForm from "@/components/defect-form"
import { motion, AnimatePresence } from "framer-motion"
import cn from "classnames"

const items = [
  {
    name: "Трещина в несущей стене",
    status: "Критический",
    date: "2024-02-14",
  },
  {
    name: "Протечка на потолке",
    status: "Средний",
    date: "2024-02-13",
  },
  {
    name: "Отслоение штукатурки",
    status: "Низкий",
    date: "2024-02-12",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Критический":
      return "bg-red-50 text-red-700"
    case "Средний":
      return "bg-yellow-50 text-yellow-700"
    case "Низкий":
      return "bg-green-50 text-green-700"
    default:
      return "bg-gray-50 text-gray-600"
  }
}

export default function SystemPage({
  params,
}: {
  params: { location: string; system: string }
}) {
  const [showDefectForm, setShowDefectForm] = useState(false)

  return (
    <>
      <div className="min-h-screen bg-zinc-50">
        <header className="bg-white border-b sticky top-0 z-30">
          <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-14">
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

        <main className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground">
              Главная
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={`/${params.location}`} className="hover:text-foreground">
              Светланская, 1
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground capitalize">{params.system}</span>
          </div>

          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold mb-1 capitalize">{params.system}</h1>
              <p className="text-sm text-muted-foreground">Светланская, 1</p>
            </div>
            <Button onClick={() => setShowDefectForm(true)}>
              <Camera className="h-4 w-4 mr-2" />
              Добавить дефект
            </Button>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-3">
            {items.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="grid gap-1">
                  <div className="font-medium">{item.name}</div>
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                        getStatusColor(item.status),
                      )}
                    >
                      {item.status}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(item.date).toLocaleDateString("ru-RU")}
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </main>
      </div>

      <AnimatePresence>{showDefectForm && <DefectForm onClose={() => setShowDefectForm(false)} />}</AnimatePresence>
    </>
  )
}

