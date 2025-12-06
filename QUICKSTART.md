# Quickstart Guide

Get started with The Mesh Smart Atom router demo in 5 minutes.

## 1. Install dependencies

```bash
npm install
```

## 2. Start local development server

```bash
npm run dev
```

The worker will be available at `http://127.0.0.1:8787`.

## 3. Test the router

In another terminal:

```bash
curl -X POST http://127.0.0.1:8787/api/mesh/test \
  -H "Content-Type: application/json" \
  -d '{"message":"Route this through the Planetary Cognitive Mesh."}'
```

You should see a JSON response showing:
- **smartAtom.routeScore**: How the packet is scored (0–1)
- **crypto.alg**: Which crypto stack would be applied
- **carbon.estimatedMicroJoules**: Energy cost estimate

## 4. Try different messages

High-score message (longer, more important):
```bash
curl -X POST http://127.0.0.1:8787/api/mesh/test \
  -H "Content-Type: application/json" \
  -d '{"message":"This is a high-priority cognitive packet with substantial content that should be routed with full end-to-end encryption through the Smart Atom mesh network."}'
```

Low-score message (short, less important):
```bash
curl -X POST http://127.0.0.1:8787/api/mesh/test \
  -H "Content-Type: application/json" \
  -d '{"message":"ping"}'
```

## 5. Deploy to Cloudflare (optional)

```bash
npm run deploy
```

Your worker will be live at `https://the-mesh.{your-subdomain}.workers.dev`.

## What's happening?

1. Your message is converted to a **sparse signature** (positions + elevations).
2. The **Smart Atom scorer** computes a routeScore ∈ [0, 1].
3. Based on the score, a **crypto policy** is selected:
   - High score (>0.7): Full E2E encryption
   - Medium (0.3–0.7): Signing only
   - Low (<0.3): Plaintext or drop
4. A **carbon proxy** estimates the energy cost.

## Next steps

- Read the [README](./README.md) for full API documentation.
- Explore [examples/](./examples/) for more test cases.
- Check [CONTRIBUTING.md](./CONTRIBUTING.md) to contribute.
