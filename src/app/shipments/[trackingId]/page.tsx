import { notFound } from 'next/navigation';
import { fetchShipment } from '@/lib/shipmentClient';
import { ShipmentStatusBadge } from '@/components/ShipmentStatusBadge';
import { EventTimeline } from '@/components/EventTimeline';

export const dynamic = 'force-static';

interface PageProps {
  params: { trackingId: string };
}

export default async function ShipmentTrackingPage({ params }: PageProps) {
  const shipment = await fetchShipment(params.trackingId);

  if (!shipment) {
    notFound();
  }

  return (
    <main>
      <h1>Shipment {shipment.trackingId}</h1>
      <ShipmentStatusBadge status={shipment.status} />
      <EventTimeline events={shipment.events} />
    </main>
  );
}
