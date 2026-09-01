import type { ShipmentEvent } from '@/types/shipment';

export function EventTimeline({ events }: { events: ShipmentEvent[] }) {
  return (
    <ol data-testid="event-timeline">
      {events.map((event) => (
        <li key={event.id}>
          <span>{event.label}</span>
          <time dateTime={event.at}>{event.at}</time>
        </li>
      ))}
    </ol>
  );
}
