# Technical Decisions & Architecture Trade-offs

## 1. API Data Fetching Strategy

### Considered Approaches

#### Option A: Server-Side Only
* **Pros:**
    * Fastest initial page load.
    * Simple implementation.
    * Excellent for SEO.
* **Cons:**
    * **Poor UX:** No background refetching.
    * **High Latency on Interaction:** Switching protocols triggers a full server round-trip.

#### Option B: Client-Side Only (TanStack Query)
* **Pros:**
    * Smart caching and instant transitions between previously visited protocols.
    * Automatic background refetching.
    * Optimistic UI capabilities.
* **Cons:**
    * Slower initial page load.
    * Complex management of loading states.
    * Higher risk of hitting API rate limits due to frequent mounting/remounting.

#### Option C: Hybrid Approach (Selected)
* **Pros:**
    * **Best of Both Worlds:** Fast First Contentful Paint via server pre-fetching, followed by client-side hydration.
    * **Efficiency:** Automatic refetching handles freshness, while initial server props reduce immediate client API calls.
    * **UX:** Fast content rendering for frequently visited pages.
* **Cons:**
    * Higher complexity in synchronizing server state with the client-side cache.

### **Decision:**
Adopted the **Hybrid Approach**. It prioritizes the user need for immediate historical data access upon landing, while the client-side logic handles the necessity of auto-refreshing the financial data.

---

## 2. State Management & Routing

### Protocol State Source of Truth
**Decision:** Use **URL Query Parameters** instead of React State or Cookies.

* **Shareability:** Users can share a specific protocol view via a direct link.
* **Navigation:** Enables native browser behavior (Back/Forward buttons) to traverse protocol history.
* **Why not Cookies?**
    * Cookies break shareability.
    * Cookies complicate server-side rendering (hydration mismatches).
    * Cookies persist state unintentionally across sessions where a reset might be preferred.

### Global State Management
**Decision:** React Context API.

Although handling a single variable in Context can appear to be "overkill," I preferred that for specific architectural benefits:
* **Uniformity:** Ensures all components read from a single source of truth.
* **Maintainability:** Eliminates prop-drilling through the component tree.
* **Performance:** Prevents redundant network requests that might occur if multiple components attempted to fetch protocol state independently.

---

## 3. Data Strategy & Caching Implementation

### Mock Data Generation
**Decision:** Moved from Client-Side (`useMemo`) to Server-Side (`fetchProtocolData`).

* **Consistency:** Ensures that the data shape is identical across both initial server render and client navigation.
* **Performance:** Offloads the computational cost of generating large mock datasets from the user's browser to the server.

### Cache Time Alignment
**Decision:** Synchronized Next.js (Server) and TanStack Query (Client) cache times to **5 minutes**.

* **Rationale:** This specific duration balances **Data Freshness** against **API Rate Limits**.
* **Trade-off:** Financial data is volatile, but a 5-minute window is acceptable for general trend analysis while significantly reducing load on the backend infrastructure.

---
