export type ShipmentStatus =
  | 'CREATED'
  | 'IN_TRANSIT'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED';

export interface ShipmentEvent {
  id: string;
  label: string;
  at: string;
}

export interface Shipment {
  trackingId: string;
  status: ShipmentStatus;
  events: ShipmentEvent[];
}
