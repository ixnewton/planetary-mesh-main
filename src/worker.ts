// src/worker.ts

import { computeRouteScore, sigFromMessage } from "./smartAtom";
import { computeCryptoPlan } from "./cryptoPlan";

export interface Env {
  WORLD_MODEL_URL: string;
  MESH_NODE_ID?: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/mesh/ping") {
      return json({
        ok: true,
        nodeId: env.MESH_NODE_ID ?? "the-mesh-demo",
        message: "Planetary Cognitive Mesh demo node is alive.",
      });
    }

    if (url.pathname === "/api/mesh/test") {
      if (request.method === "POST") {
        const body = (await request.json().catch(() => ({}))) as { message?: string };
        const text: string = body.message ?? "Hello from the Planetary Cognitive Mesh.";

        // 1) Smart Atom sparse signature + routeScore
        const sig = sigFromMessage(text);
        const routeScore = computeRouteScore(sig, { reputation: 100 });

        // 2) Crypto plan based on routeScore
        const cryptoPlan = computeCryptoPlan(routeScore, text.length);

        // 3) (Optional) carbon-aware / world-model stub
        const carbonProxy = estimateCarbonProxy(text.length, routeScore);

        const explanation = {
          summary: "This endpoint shows how the Mesh scores and prepares your packet.",
          steps: [
            "Your message was converted into a sparse-style signature (positions + elevations).",
            "The Smart Atom scorer computed a routeScore from 0 to 1.",
            "Based on routeScore, the Mesh selected an appropriate crypto stack.",
            "A rough carbon proxy was computed as a function of size and routeScore.",
          ],
        };

        return json(
          {
            ok: true,
            nodeId: env.MESH_NODE_ID ?? "the-mesh-demo",
            input: { message: text },
            smartAtom: {
              sig,
              routeScore,
            },
            crypto: cryptoPlan,
            carbon: {
              estimatedMicroJoules: carbonProxy,
            },
            explanation,
          },
          200,
        );
      } else {
        // GET request - return usage instructions
        return json(
          {
            ok: false,
            error: "Method not allowed",
            message: "This endpoint requires a POST request with a JSON body.",
            usage: {
              method: "POST",
              url: "/api/mesh/test",
              headers: {
                "Content-Type": "application/json",
              },
              body: {
                message: "Your message here",
              },
            },
            example: {
              curl: 'curl -X POST https://the-mesh.sparsesupernova.workers.dev/api/mesh/test -H "Content-Type: application/json" -d \'{"message":"Route this through the Planetary Cognitive Mesh."}\'',
            },
          },
          405,
        );
      }
    }

    return new Response("Not found", { status: 404 });
  },
};

function json(obj: unknown, status = 200): Response {
  return new Response(JSON.stringify(obj, null, 2), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

// Stupidly simple carbon proxy: just enough to show the concept.
// You can swap this for your real per-packet energy estimates.
function estimateCarbonProxy(length: number, routeScore: number): number {
  const base = length * 0.5; // "cost" per char
  const priorityFactor = 0.5 + routeScore; // high-score = more spend
  return Math.round(base * priorityFactor);
}
