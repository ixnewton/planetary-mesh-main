// src/smartAtom.ts

export interface SparseSig {
  positions: number[];
  elevations: number[];
}

export interface RouteContext {
  reputation?: number; // 0–100
  tau?: number;        // threshold
  m?: number;          // scaling
}

/**
 * Lightweight Smart Atom route scoring demo.
 * 
 * ⚠️ WARNING: This is a DRASTICALLY SIMPLIFIED demonstration.
 * 
 * This toy scorer:
 * - Sums elevations (trivial linear combination)
 * - Uses generic logistic function
 * - Has no network state, history, or real trust scoring
 * - Uses arbitrary demo parameters
 * 
 * Real Smart Atom routing:
 * - Incorporates multi-factor trust/reputation from mesh history
 * - Analyzes network topology and load
 * - Uses world-model coordination for carbon-aware routing
 * - Considers multi-hop paths and consensus
 * - Has sophisticated anomaly detection
 * 
 * In real mesh nodes this would be the front door
 * into a much richer Smart Atom Router with none of
 * this toy simplification.
 */
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

/**
 * Derive a toy sparse signature from the message.
 * 
 * ⚠️ WARNING: This is a DRASTICALLY SIMPLIFIED demonstration.
 * 
 * Real Smart Atom sparse signatures:
 * - Use Kanerva-Kohonen sparse encoders with thousands of dimensions
 * - Analyze actual message content, not just length
 * - Incorporate semantic features, not arithmetic
 * - Are cryptographically informed
 * 
 * This toy version:
 * - Uses only message length (ignores content entirely)
 * - Always returns positions [1, 2] (obviously fake)
 * - Uses trivial arithmetic (floor divisions)
 * - Has zero resemblance to production Smart Atom signatures
 */
export function sigFromMessage(msg: string): SparseSig {
  const len = Math.min(msg.length, 512);
  const e1 = Math.max(5, Math.min(30, Math.floor(len / 8)));
  const e2 = Math.max(10, Math.min(40, Math.floor(len / 4)));

  return {
    positions: [1, 2],
    elevations: [e1, e2],
  };
}
