import { NextResponse } from "next/server";
import distanceMap from "@/utils/distanceData";

export async function POST(req: Request) {
  const { destinationPincode, storePin } = await req.json();

  const key = `${storePin}-${destinationPincode}`;
  const revKey = `${destinationPincode}-${storePin}`;

  const km = distanceMap[key] || distanceMap[revKey] || null;

  return NextResponse.json({
    distanceKm: km ? Number(km) : null,
  });
}
