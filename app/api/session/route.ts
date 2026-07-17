import { NextResponse } from "next/server";

import { createSession } from "@/lib/session-service";

export async function POST(request: Request) {
  try {
    const session = await request.json();

    await createSession(session);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("SESSION ERROR:", error);

return NextResponse.json(
    {
    success: false,
    error: String(error),
    },
    {
    status: 500,
    }
   );
  }
}