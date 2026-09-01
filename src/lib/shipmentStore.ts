import type { Shipment, ShipmentStatus } from '@/types/shipment';

const STATUS_ORDER: ShipmentStatus[] = [
  'CREATED',
  'IN_TRANSIT',
  'OUT_FOR_DELIVERY',
  'DELIVERED'
];

const STATUS_LABELS: Record<ShipmentStatus, string> = {
  CREATED: 'Label created',
  IN_TRANSIT: 'Departed origin facility',
  OUT_FOR_DELIVERY: 'Out for delivery',
  DELIVERED: 'Delivered to recipient'
};

function seed(): Map<string, Shipment> {
  const store = new Map<string, Shipment>();
  store.set('TRK1001', {
    trackingId: 'TRK1001',
    status: 'IN_TRANSIT',
    events: [
      { id: 'e1', label: STATUS_LABELS.CREATED, at: '2024-05-01T08:00:00.000Z' },
      { id: 'e2', label: STATUS_LABELS.IN_TRANSIT, at: '2024-05-01T12:30:00.000Z' }
    ]
  });
  store.set('TRK2002', {
    trackingId: 'TRK2002',
    status: 'CREATED',
    events: [
      { id: 'e1', label: STATUS_LABELS.CREATED, at: '2024-05-02T09:15:00.000Z' }
    ]
  });
  return store;
}

type GlobalWithStore = typeof globalThis & {
  __shipmentStore__?: Map<string, Shipment>;
};

function store(): Map<string, Shipment> {
  const globalRef = globalThis as GlobalWithStore;
  if (!globalRef.__shipmentStore__) {
    globalRef.__shipmentStore__ = seed();
  }
  return globalRef.__shipmentStore__;
}

export function listTrackingIds(): string[] {
  return Array.from(store().keys());
}

export function getShipment(trackingId: string): Shipment | undefined {
  return store().get(trackingId);
}

export function advanceShipment(trackingId: string): Shipment | undefined {
  const shipment = store().get(trackingId);
  if (!shipment) {
    return undefined;
  }
  const currentIndex = STATUS_ORDER.indexOf(shipment.status);
  if (currentIndex >= STATUS_ORDER.length - 1) {
    return shipment;
  }
  const nextStatus = STATUS_ORDER[currentIndex + 1];
  const nextEvent = {
    id: `e${shipment.events.length + 1}`,
    label: STATUS_LABELS[nextStatus],
    at: new Date('2024-05-03T10:00:00.000Z').toISOString()
  };
  const updated: Shipment = {
    ...shipment,
    status: nextStatus,
    events: [...shipment.events, nextEvent]
  };
  store().set(trackingId, updated);
  return updated;
}

export function resetStore(): void {
  const globalRef = globalThis as GlobalWithStore;
  globalRef.__shipmentStore__ = seed();
}
