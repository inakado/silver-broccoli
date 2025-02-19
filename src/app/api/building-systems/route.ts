import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const buildingId = searchParams.get("id")?.trim();

  if (!buildingId) {
    return NextResponse.json({ error: "ID здания не указан" }, { status: 400 });
  }

  try {
    console.log("🔍 Получение данных здания ID:", buildingId);

    // 1️⃣ Запрос информации о здании, включая системы
    const buildingUrl = `${process.env.NEXT_PUBLIC_BASEROW_URL}/api/database/rows/table/${process.env.NEXT_PUBLIC_BASEROW_TABLE_BUILDINGS_ID}/${buildingId}/?user_field_names=true`;

    const buildingRes = await fetch(buildingUrl, {
      headers: { Authorization: `Token ${process.env.NEXT_PUBLIC_BASEROW_API_KEY}` },
    });

    if (!buildingRes.ok) {
      return NextResponse.json({ error: "Здание не найдено" }, { status: 404 });
    }

    const buildingData = await buildingRes.json();

    

    // 2️⃣ Извлекаем связанные системы
    const systems = buildingData.Buildings_Systems?.map((system: any) => ({
      id: system.id,
      name: system.value,
    })) || [];

   

    return NextResponse.json({ systems });
  } catch (error) {
    console.error("❌ Ошибка получения данных:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}