import { NextResponse } from "next/server"

// ✅ API-роут для поиска объектов по адресу
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const search = searchParams.get("search")?.toLowerCase() || ""

  try {
    // 📌 Логируем переменные окружения для проверки
    console.log("🔑 BASEROW URL:", process.env.NEXT_PUBLIC_BASEROW_URL)
    console.log("📊 BASEROW TABLE:", process.env.NEXT_PUBLIC_BASEROW_TABLE_BUILDINGS_ID)
    console.log("🗝️ BASEROW API KEY:", process.env.NEXT_PUBLIC_BASEROW_API_KEY ? "OK" : "NOT SET")

    const apiUrl = `${process.env.NEXT_PUBLIC_BASEROW_URL}/api/database/rows/table/${process.env.NEXT_PUBLIC_BASEROW_TABLE_BUILDINGS_ID}/?user_field_names=true`
    
    // 📌 Логируем URL запроса
    console.log("🚀 Requesting Baserow:", apiUrl)

    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Token ${process.env.NEXT_PUBLIC_BASEROW_API_KEY}`,
      },
      next: { revalidate: 60 },
    })

    // 📌 Логируем ответ напрямую
    const rawData = await response.json()
    console.log("🌐 Ответ от Baserow:", rawData)

    if (!response.ok) {
      console.error("❌ Ошибка Baserow:", rawData)
      return NextResponse.json({ error: `Ошибка загрузки из Baserow: ${rawData.detail ?? "Неизвестная ошибка"}` }, { status: response.status })
    }

    // ✅ Фильтрация по адресу с использованием регулярного выражения (RegExp)
    const filteredBuildings = rawData.results
      .filter((row: any) => {
        const address = `${row.Street ?? ""} ${row.House_Number ?? ""}`.toLowerCase()

        // Создаем регулярное выражение из введённого поиска
        const regex = new RegExp(search.replace(/\s+/g, ".*"), "i") // Игнорируем регистр и пробелы

        // Проверяем совпадение с помощью регулярного выражения
        return regex.test(address)
      })
      .map((row: any) => ({
        id: row.id,
        address: `${row.Street}, ${row.House_Number}`,
      }))

    return NextResponse.json({
      buildings: filteredBuildings,
    })
  } catch (error) {
    console.error("💥 Ошибка запроса к Baserow:", error)
    return NextResponse.json({ error: "Ошибка загрузки из Baserow" }, { status: 500 })
  }
}