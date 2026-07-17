import { NextResponse } from "next/server";

import { updateSession } from "@/lib/session-service";

export async function PATCH(request: Request) {
  try {
    const session = await request.json();

    await updateSession(session);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Erro ao atualizar a Session.",
      },
      {
        status: 500,
      }
    );
  }
}