import Link from 'next/link';
import { listTrackingIds } from '@/lib/shipmentStore';

export default function HomePage() {
  const ids = listTrackingIds();
  return (
    <main>
      <h1>Meridian Freight Tracking</h1>
      <ul>
        {ids.map((id) => (
          <li key={id}>
            <Link href={`/shipments/${id}`}>{id}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
