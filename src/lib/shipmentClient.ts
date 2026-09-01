import type { Shipment } from '@/types/shipment';
import { getShipment } from '@/lib/shipmentStore';

export async function fetchShipment(trackingId: string): Promise<Shipment | null> {
  const shipment = getShipment(trackingId);
  return shipment ? structuredClone(shipment) : null;
}
