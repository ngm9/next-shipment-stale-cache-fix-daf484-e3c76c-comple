import { render, screen } from '@testing-library/react';
import { ShipmentStatusBadge } from '@/components/ShipmentStatusBadge';
import { EventTimeline } from '@/components/EventTimeline';
import { fetchShipment } from '@/lib/shipmentClient';
import { advanceShipment, resetStore } from '@/lib/shipmentStore';

async function renderShipment(trackingId: string) {
  const shipment = await fetchShipment(trackingId);
  if (!shipment) {
    throw new Error('missing shipment');
  }
  return render(
    <>
      <ShipmentStatusBadge status={shipment.status} />
      <EventTimeline events={shipment.events} />
    </>
  );
}

describe('tracking page freshness', () => {
  beforeEach(() => {
    resetStore();
  });

  it('renders the seeded status for a shipment', async () => {
    const { unmount } = await renderShipment('TRK1001');
    expect(screen.getByTestId('shipment-status')).toHaveTextContent('In Transit');
    unmount();
  });

  it('reflects the latest status after the shipment is advanced', async () => {
    advanceShipment('TRK1001');
    await renderShipment('TRK1001');
    expect(screen.getByTestId('shipment-status')).toHaveTextContent(
      'Out for Delivery'
    );
  });
});
