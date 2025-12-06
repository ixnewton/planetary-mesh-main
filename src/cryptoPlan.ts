// src/cryptoPlan.ts

export type CryptoAlg =
  | "ed25519+x25519+aes256gcm+hmac-sha256"
  | "p256-ecdsa-only"
  | "none";

export interface CryptoPlan {
  alg: CryptoAlg;
  e2eEncrypted: boolean;
  signed: boolean;
  hop0: boolean;        // crypto from hop 0 (client) or not
  notes: string[];
}

/**
 * Very small policy function:
 * Given routeScore + message length, decide
 * what crypto stack "the mesh" would use.
 *
 * This mirrors your real world: high-score, important
 * packets go full Smart Atom; low-score spam can be down-graded.
 */
export function computeCryptoPlan(
  routeScore: number,
  messageLength: number,
): CryptoPlan {
  const notes: string[] = [];

  if (routeScore > 0.7) {
    notes.push("High routeScore: treat as important cognitive packet.");
    notes.push("Apply full Smart Atom E2E crypto from hop 0.");
    return {
      alg: "ed25519+x25519+aes256gcm+hmac-sha256",
      e2eEncrypted: true,
      signed: true,
      hop0: true,
      notes,
    };
  }

  if (routeScore > 0.3) {
    notes.push("Medium routeScore: still trusted but not highest priority.");
    notes.push("Sign from hop 0, encrypt at edge if needed.");
    return {
      alg: "p256-ecdsa-only",
      e2eEncrypted: false,
      signed: true,
      hop0: true,
      notes,
    };
  }

  notes.push("Low routeScore: likely noise / spam / telemetry.");
  notes.push("Mesh may drop or treat as plaintext for stats only.");
  return {
    alg: "none",
    e2eEncrypted: false,
    signed: false,
    hop0: false,
    notes,
  };
}
