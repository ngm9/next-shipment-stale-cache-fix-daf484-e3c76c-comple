import { NextResponse } from 'next/server';
import { advanceShipment } from '@/lib/shipmentStore';

interface RouteContext {
  params: { trackingId: string };
}

export async function POST(_request: Request, context: RouteContext) {
  const updated = advanceShipment(context.params.trackingId);

  if (!updated) {
    return NextResponse.json({ error: 'Shipment not found' }, { status: 404 });
  }

  return NextResponse.json({ shipment: updated });
}
