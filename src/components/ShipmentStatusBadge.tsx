import type { ShipmentStatus } from '@/types/shipment';

const LABELS: Record<ShipmentStatus, string> = {
  CREATED: 'Created',
  IN_TRANSIT: 'In Transit',
  OUT_FOR_DELIVERY: 'Out for Delivery',
  DELIVERED: 'Delivered'
};

export function ShipmentStatusBadge({ status }: { status: ShipmentStatus }) {
  return (
    <p>
      Status: <strong data-testid="shipment-status">{LABELS[status]}</strong>
    </p>
  );
}
