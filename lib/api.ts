import { NextResponse } from "next/server";

export const ok = (message: string) => NextResponse.json({ success: true, message });
