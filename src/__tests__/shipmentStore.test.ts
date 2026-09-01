import {
  advanceShipment,
  getShipment,
  listTrackingIds,
  resetStore
} from '@/lib/shipmentStore';

describe('shipmentStore', () => {
  beforeEach(() => {
    resetStore();
  });

  it('seeds known tracking ids', () => {
    expect(listTrackingIds()).toContain('TRK1001');
    expect(listTrackingIds()).toContain('TRK2002');
  });

  it('advances a shipment to the next status and appends an event', () => {
    const before = getShipment('TRK1001');
    expect(before?.status).toBe('IN_TRANSIT');

    const updated = advanceShipment('TRK1001');
    expect(updated?.status).toBe('OUT_FOR_DELIVERY');
    expect(updated?.events.length).toBe((before?.events.length ?? 0) + 1);
  });

  it('does not affect unrelated shipments when one advances', () => {
    advanceShipment('TRK1001');
    const other = getShipment('TRK2002');
    expect(other?.status).toBe('CREATED');
  });
});
