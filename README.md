# Meridian Freight — Shipment Tracking Freshness

## Task Overview

Meridian Freight customers track parcels on a server-rendered tracking route that shows live status and an event timeline. The page is already runnable and fast, but it has a freshness problem: once a shipment's status changes through the carrier update endpoint, the tracking page keeps showing the old status instead of the new one. Your job is to make the tracking experience reflect real status changes promptly while keeping repeat reads fast. The data store and status-advance logic are correct — the issue lives in how the read and mutation paths handle caching and revalidation.

## Helpful Tips

- Review how the tracking route reads shipment data and what freshness guarantees the current configuration actually provides.
- Think about the difference between keeping a page fast and never letting it update, and where that line is currently drawn.
- Consider which layer is responsible for serving a stale render even after the underlying data has changed.
- Explore how the mutation endpoint could signal that a specific shipment's view is no longer valid, rather than affecting everything.
- Analyze whether a blanket dynamic render or a more targeted freshness strategy is the better trade-off for this product.

## Objectives

- After a shipment is advanced through the carrier update endpoint, its tracking page reflects the new status and the newly appended timeline event.
- Updating one shipment does not invalidate or recompute unrelated shipments' cached data.
- Tracking pages remain server-rendered and stay fast for repeated reads of unchanged shipments.
- The mutation path is responsible for invalidating exactly the data that became stale.
- TypeScript remains strict and the project continues to build cleanly.

## How to Verify

- Render a tracking page for a known shipment and confirm the initial status matches the seeded data.
- Trigger the status-advance endpoint for that shipment, then re-request the page and confirm the status and timeline update.
- Confirm a second, untouched shipment still renders its original status after the first one is advanced.
- Run the test suite and confirm both the pre-existing tests and the freshness behavior pass.
- Confirm the production build completes without type or build errors.
