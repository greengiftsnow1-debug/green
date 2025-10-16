import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { destinationPincode } = await req.json();

    if (!destinationPincode || destinationPincode.length !== 6) {
      return NextResponse.json({ error: 'Valid 6-digit Destination PIN code is required' }, { status: 400 });
    }

    const storePincode = '462022';
    const apiKey = '5b3ce3597851110001cf624874a7f18552b5435eb4c9c6bdb4aadc99';

    // Better geocoding with `layers=postalcode`
    const fromRes = await fetch(`https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${storePincode}&layers=postalcode`);
    const toRes = await fetch(`https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${destinationPincode}&layers=postalcode`);

    const fromData = await fromRes.json();
    const toData = await toRes.json();

    const fromCoords = fromData.features?.[0]?.geometry?.coordinates;
    const toCoords = toData.features?.[0]?.geometry?.coordinates;

    if (!fromCoords || !toCoords) {
      return NextResponse.json({ error: 'Failed to locate one or both PIN codes' }, { status: 500 });
    }

    const routeRes = await fetch('https://api.openrouteservice.org/v2/directions/driving-car/geojson', {
      method: 'POST',
      headers: {
        Authorization: apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        coordinates: [fromCoords, toCoords],
      }),
    });

    const routeData = await routeRes.json();

    const distanceInMeters = routeData.features?.[0]?.properties?.summary?.distance;
    if (!distanceInMeters) {
      return NextResponse.json({ error: 'Failed to get route distance' }, { status: 500 });
    }

    const distanceKm = parseFloat((distanceInMeters / 1000).toFixed(1));
    return NextResponse.json({ distanceKm });

  } catch (error) {
    console.error('Distance API error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
