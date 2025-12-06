# The Mesh – Smart Atom Router Demo

[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-orange?style=flat-square&logo=cloudflare)](https://workers.cloudflare.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![USL Repo-Sat Audit](https://img.shields.io/badge/USL%20Repo--Sat-Passed-skyblue?style=flat-square)](audit/USL_REPO_SCAN_REPORT.md)

> _USL repo-saturation audit passed — no proprietary Smart Atom signatures, overlay protocols, or production crypto implementations detected._

**Status:** experimental demo (public-safe subset).

A lightweight Cloudflare Worker demonstrating **Smart Atom routing** and **crypto stack selection** for the Sparse Supernova **Planetary Cognitive Mesh**.

This package gives you:

- A simplified Smart Atom route scoring algorithm (positions + elevations → routeScore).
- Crypto stack policy (full E2E vs. signing-only vs. plaintext) based on routeScore.
- Carbon-aware proxy estimates for packet processing.
- A REST API for testing route decisions in real-time.

It is intended as a **public demonstration sandbox** – suitable for understanding mesh routing concepts, testing packet flows, and education – without exposing any private sparse encoders, production overlay protocols, or internal cryptographic key material.

---

## Security / IP Notice

This repository contains **only public, non-proprietary code** intended for demonstration, education, and experimentation.

No private algorithms, internal research components, or proprietary logic are included in this package.

Specifically, this repository **does not** include:

- any production Smart Atom sparse signature generators or Kanerva-Kohonen encoders
- any real Ed25519/X25519 key management or overlay wire protocols
- any internal mesh topology, consensus, or world-model optimization logic
- any USAD (Universal Sparse Anomaly Detector) components
- any USL (Universal Saturation Law) or FRAI asymmetry metrics
- any Quantum-HAL, hardware abstraction, or neuromorphic stack logic
- any production crypto implementations or private key material
- any code copied from private or internal repositories

All routing and crypto policy routines provided here are **simplified demonstrations** implemented solely for public understanding.

This project is published as open demonstration code for transparency and educational use.

The maintainers make **no commitment** that it reflects, approximates, or reveals any functionality of the private Smart Atom, mesh overlay, or production cryptographic systems.

---

## Features

- ✅ **Smart Atom route scoring** based on sparse signatures (positions + elevations).
- ✅ **Crypto stack selection**:
  - High-score packets → Full E2E encryption (ed25519+x25519+aes256gcm)
  - Medium-score packets → Signing only (p256-ecdsa)
  - Low-score packets → Plaintext (spam/telemetry)
- ✅ **Carbon-aware proxies** for per-packet energy estimation.
- ✅ **Pure Cloudflare Worker**, no external dependencies.
- ✅ **REST API** for real-time route testing.
- ✅ **TypeScript**, fully typed and inspectable.

This repo contains **only** the public-facing Smart Atom router demo and crypto policy logic.  
Production mesh protocols (end-to-end overlay encryption, consensus, world-model coordination, auto-scaling) live in separate internal systems and **are not part of this package**.

---

## Who is this for?

- **Developers interested in cognitive mesh networking** who want to understand how Smart Atom routing works at a conceptual level.

- **Edge computing enthusiasts** building on Cloudflare Workers who want to see routing + crypto policy in action.

- **Researchers and educators** who want a simple, inspectable demonstration of sparse-signature-based routing for cognitive packet networks.

## When to use vs not use

**Use this when:**

- You want to understand how Smart Atom routing scores packets based on sparse signatures.

- You're prototyping cognitive mesh concepts or edge routing policies.

- You need a simple REST API to test routing decisions for different message patterns.

**Do not use this when:**

- You need production-grade mesh networking (use full production overlay implementations).

- You require real cryptographic key exchange or E2E encryption (this demo describes policies, not implementations).

- You're building security-critical systems (this is a demonstration tool, not production crypto).

---

## USL Repo-Sat Audit

This repository has been checked using a *USL repo-saturation audit*, a safety scan designed to ensure that **no proprietary high-dimensional algorithms, internal mesh protocols, or production crypto implementations** are present in the public codebase.

📊 [View Full Audit Report](audit/USL_REPO_SCAN_REPORT.md)

**Key Findings:**

- D = 0.0064 (high structural diversity)
- No proprietary algorithms detected
- 3 files scanned: cryptoPlan.ts, smartAtom.ts, worker.ts
- ✅ Audit passed: public-safe demonstration code only

The audit verifies that the repository contains:

- no production Smart Atom sparse signature generators
- no real Ed25519/X25519 key material or overlay protocols
- no mesh consensus or world-model optimization kernels
- no anomaly-detection or trust scoring systems
- no universal scaling or asymmetry modules
- no neuromorphic, quantum, or hardware abstraction logic
- no high-dimensional patterns characteristic of internal systems

The current version of this package **passed the audit**, indicating that it contains only the intended **public demonstration routing logic** and no private or sensitive IP.

---

## Installation

```bash
npm install
npm run dev
```

**Requirements:** Node.js >= 20, Wrangler CLI (installed via npm).

## API Demo

Try the Smart Atom router without installing anything! The package is deployed as a Cloudflare Worker with a simple REST API.

**Live endpoint:** `https://the-mesh.sparsesupernova.workers.dev/api/mesh/test`

> ⚠️ **Important:** The endpoint only accepts **POST** requests. Browsers will send GET requests by default, so use `curl`, `fetch`, or a REST client.

### Example: Test a message route

**Using curl:**
```bash
curl -X POST https://the-mesh.sparsesupernova.workers.dev/api/mesh/test \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Route this through the Planetary Cognitive Mesh."
  }'
```

**Using JavaScript fetch:**
```javascript
const response = await fetch('https://the-mesh.sparsesupernova.workers.dev/api/mesh/test', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: 'Route this through the Planetary Cognitive Mesh.'
  })
});
const result = await response.json();
console.log(result);
```

**Response format:**
```json
{
  "ok": true,
  "nodeId": "demo-edge-1",
  "input": {
    "message": "Route this through the Planetary Cognitive Mesh."
  },
  "smartAtom": {
    "sig": {
      "positions": [1, 2],
      "elevations": [23, 46]
    },
    "routeScore": 0.9176
  },
  "crypto": {
    "alg": "ed25519+x25519+aes256gcm+hmac-sha256",
    "e2eEncrypted": true,
    "signed": true,
    "hop0": true,
    "notes": [
      "High routeScore: treat as important cognitive packet.",
      "Apply full Smart Atom E2E crypto from hop 0."
    ]
  },
  "carbon": {
    "estimatedMicroJoules": 132
  },
  "explanation": {
    "summary": "This endpoint shows how the Mesh scores and prepares your packet.",
    "steps": [
      "Your message was converted into a sparse-style signature (positions + elevations).",
      "The Smart Atom scorer computed a routeScore from 0 to 1.",
      "Based on routeScore, the Mesh selected an appropriate crypto stack.",
      "A rough carbon proxy was computed as a function of size and routeScore."
    ]
  }
}
```

### Health check

**Using curl:**
```bash
curl https://the-mesh.sparsesupernova.workers.dev/api/mesh/ping
```

**Response:**
```json
{
  "ok": true,
  "nodeId": "demo-edge-1",
  "message": "Planetary Cognitive Mesh demo node is alive."
}
```

---

## Basic usage

### Local development

Start the Cloudflare Worker locally:

```bash
npm run dev
```

Then test it:

```bash
curl -X POST http://127.0.0.1:8787/api/mesh/test \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello from the edge."}'
```

### Testing all three crypto tiers

The router demonstrates three different crypto policies based on message characteristics:

**Low-score packet (plaintext):**
```bash
curl -X POST http://127.0.0.1:8787/api/mesh/test \
  -H "Content-Type: application/json" \
  -d '{"message":"ping"}'
# routeScore ≈ 0.28 → crypto.alg: "none"
```

**Medium-score packet (signing only):**
```bash
curl -X POST http://127.0.0.1:8787/api/mesh/test \
  -H "Content-Type: application/json" \
  -d '{"message":"Route this through the Planetary Cognitive Mesh."}'
# routeScore ≈ 0.32 → crypto.alg: "p256-ecdsa-only"
```

**High-score packet (full E2E encryption):**
```bash
curl -X POST http://127.0.0.1:8787/api/mesh/test \
  -H "Content-Type: application/json" \
  -d '{"message":"This is a high-priority cognitive packet with substantial content that should be routed with full end-to-end encryption through the Smart Atom mesh network and requires special handling."}'
# routeScore ≈ 0.92 → crypto.alg: "ed25519+x25519+aes256gcm+hmac-sha256"
```

### Deploy to Cloudflare

```bash
npm run deploy
```

Your worker will be live at `https://the-mesh.{your-subdomain}.workers.dev`.

---

## How it works

### 1. Sparse signature generation

When a message arrives, the router generates a **sparse signature** – a lightweight representation of the packet's content:

```typescript
export interface SparseSig {
  positions: number[];  // Active dimensions in sparse space
  elevations: number[]; // Energy levels at those positions
}
```

In this demo, positions and elevations are derived from message length. Real Smart Atom systems use Kanerva-Kohonen sparse encoders.

### 2. Route scoring

The Smart Atom router computes a **routeScore** ∈ [0, 1] based on:

- **Elevations sum**: Higher "energy" packets score higher.
- **Reputation**: Trusted senders boost the score.
- **Logistic squashing**: Maps to [0, 1] for policy decisions.

```typescript
export function computeRouteScore(
  sig: SparseSig,
  ctx: RouteContext = {},
): number {
  const { reputation = 100, tau = 0.5, m = 10 } = ctx;

  const elevationsSum = sig.elevations.reduce((a, b) => a + b, 0);
  const elevationScore = 0.7 * elevationsSum * 0.01; // Increased from 0.001
  const reputationScore = 0.3 * (reputation / 100);

  const base = elevationScore + reputationScore;
  const scaled = 1 / (1 + Math.exp(-m * (base - tau)));

  return Number(scaled.toFixed(4));
}
```

### 3. Crypto stack selection

Based on routeScore, the mesh selects an appropriate crypto policy:

| Route Score | Crypto Stack | Use Case |
|-------------|--------------|----------|
| > 0.7 | ed25519+x25519+aes256gcm | High-priority cognitive packets |
| 0.3–0.7 | p256-ecdsa-only | Medium-trust packets |
| < 0.3 | none | Spam, telemetry, low-priority |

```typescript
export function computeCryptoPlan(
  routeScore: number,
  messageLength: number,
): CryptoPlan {
  if (routeScore > 0.7) {
    return {
      alg: "ed25519+x25519+aes256gcm+hmac-sha256",
      e2eEncrypted: true,
      signed: true,
      hop0: true,
      notes: ["High routeScore: treat as important cognitive packet."]
    };
  }
  // ... medium and low cases
}
```

### 4. Carbon proxy

A simple energy estimate based on packet size and routeScore:

```typescript
function estimateCarbonProxy(length: number, routeScore: number): number {
  const base = length * 0.5;
  const priorityFactor = 0.5 + routeScore;
  return Math.round(base * priorityFactor);
}
```

---

## ⚠️ What's Simplified in This Demo

**This is a DRASTICALLY SIMPLIFIED demonstration.** Here's what's toy-like vs. what's real:

### Toy Implementation (This Demo)

| Component | What This Demo Does | Why It's Obviously Fake |
|-----------|---------------------|-------------------------|
| **Sparse Signatures** | Uses only message length | Real: Analyze content semantically with KK encoders |
| **Positions** | Always returns `[1, 2]` | Real: Thousands of dimensions in sparse space |
| **Elevations** | Simple arithmetic: `floor(len/8)` | Real: Cryptographically-informed energy levels |
| **Route Scoring** | Sums elevations, adds reputation | Real: Multi-factor trust, network state, history |
| **Crypto Policy** | Returns string labels | Real: Actual Ed25519/X25519 key exchange |
| **Network** | Single node, no routing | Real: Multi-hop mesh with consensus |
| **Carbon** | Trivial: `length * 0.5 * score` | Real: World-model coordination, actual measurements |

### What Production Smart Atom Routing Includes (NOT in This Demo)

**Network-level complexity:**
- Multi-hop routing with topology awareness
- Consensus mechanisms across mesh nodes
- World-model coordination for carbon-optimal paths
- Dynamic load balancing and failover

**Security & Trust:**
- Real cryptographic key management (Ed25519, X25519)
- Production overlay wire protocols
- Sophisticated trust/reputation scoring with history
- Anomaly detection and adaptive filtering

**Smart Atom Intelligence:**
- Kanerva-Kohonen sparse encoders (thousands of dimensions)
- Semantic content analysis, not just length
- USAD anomaly detection integration
- USL saturation law compliance
- FRAI asymmetry metrics

### Why Show a Toy Demo?

This simplified demo serves an educational purpose:
- ✅ Makes the **concept** of tiered routing understandable
- ✅ Shows the **flow**: message → signature → score → policy
- ✅ Demonstrates **carbon-awareness** principle
- ✅ Gives developers something **concrete to play with**

But make no mistake: **this bears zero resemblance to production Smart Atom implementations.** The real system is orders of magnitude more sophisticated.

---

## API Reference

### `POST /api/mesh/test`

Test the Smart Atom router with a custom message.

**Request body:**
```json
{
  "message": "Your message here"
}
```

**Response:**
```json
{
  "ok": true,
  "nodeId": "demo-edge-1",
  "input": { "message": "..." },
  "smartAtom": {
    "sig": { "positions": [...], "elevations": [...] },
    "routeScore": 0.73
  },
  "crypto": {
    "alg": "...",
    "e2eEncrypted": true,
    "signed": true,
    "hop0": true,
    "notes": [...]
  },
  "carbon": {
    "estimatedMicroJoules": 45
  },
  "explanation": { ... }
}
```

### `GET /api/mesh/ping`

Health check endpoint.

**Response:**
```json
{
  "ok": true,
  "nodeId": "demo-edge-1",
  "message": "Planetary Cognitive Mesh demo node is alive."
}
```

---

## ❌ Explicitly Out of Scope (Not Supported, Never Exported)

This table is the important safety guarantee.

| Area | Status | Reason |
|------|--------|--------|
| Production Smart Atom sparse encoders | ❌ Not public | Proprietary IP |
| Ed25519/X25519 key management | ❌ Not public | Security-critical |
| Mesh overlay wire protocols | ❌ Not public | Proprietary network layer |
| World-model coordination | ❌ Not public | Internal optimization |
| USAD anomaly detection | ❌ Not public | Proprietary IP |
| Universal Saturation Law (USL) | ❌ Not public | Proprietary physics layer |
| FRAI / asymmetry metrics | ❌ Not public | Private research |
| Q-HAL / neuromorphic device abstraction | ❌ Not public | Internal only |
| Consensus protocols | ❌ Not public | Proprietary mesh layer |
| Real crypto key material | ❌ Never exported | Security boundary |

---

## Project structure

```
the-mesh/
  src/
    smartAtom.ts      # Smart Atom routing score demo
    cryptoPlan.ts     # Crypto stack policy logic
    worker.ts         # Cloudflare Worker API
  examples/
    example_message.json
  package.json
  wrangler.toml
  README.md
```

---

## Configuration

Edit `wrangler.toml` to customize your deployment:

```toml
name = "the-mesh"
main = "src/worker.ts"
compatibility_date = "2025-12-06"

[vars]
WORLD_MODEL_URL = "https://ssi-gateway-worker-production.sparsesupernova.workers.dev/world/plan"
MESH_NODE_ID = "demo-edge-1"
```

You can change `MESH_NODE_ID` to identify your node, or point `WORLD_MODEL_URL` to a different world-model gateway if needed.

---

## Carbon & efficiency note

This demo is designed for lightweight edge computing.  
The Smart Atom router runs in **microseconds** on Cloudflare Workers, keeping compute and energy use minimal.

For production deployments:

- Monitor carbon proxy values to understand per-packet energy costs.
- High-routeScore packets consume more crypto overhead but represent important cognitive traffic.
- Low-routeScore packets can be dropped or handled as plaintext to save energy.

As a rough rule of thumb:

- **High-score packets** (routeScore > 0.7): Full crypto, higher energy cost, important traffic.
- **Medium-score packets** (0.3–0.7): Signing only, moderate cost, trusted but not critical.
- **Low-score packets** (< 0.3): Plaintext or drop, minimal cost, spam or telemetry.

---

## Status and roadmap

**Status:** experimental demo, API may evolve.

**Near-term roadmap:**
- Additional example messages and routing scenarios.
- TypeScript type exports for external use.
- Integration examples with other mesh nodes.

---

## Contributing

Contributions are welcome! Please ensure:

- All code is public-safe (no proprietary algorithms or private IP).
- Tests pass locally before submitting PRs.
- Changes maintain the educational focus of the demo.

---

## License

This project is licensed under the Apache License 2.0 – see the [LICENSE](./LICENSE) file for details.

---

_Keywords: Smart Atom, cognitive mesh, sparse signatures, edge routing, Cloudflare Workers, packet routing, crypto policy, carbon-aware computing._
