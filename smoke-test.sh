#!/bin/bash
set -e

BASE_URL="https://the-mesh.sparsesupernova.workers.dev"
FAILED=0

echo "🔥 Running smoke tests..."
echo ""

# Test 1: Ping
echo "Test 1: Ping endpoint"
RESPONSE=$(curl -s "$BASE_URL/api/mesh/ping")
if echo "$RESPONSE" | grep -q '"ok":\s*true'; then
  echo "✅ Ping passed"
else
  echo "❌ Ping failed"
  echo "Response: $RESPONSE"
  FAILED=$((FAILED + 1))
fi
echo ""

# Test 2: LOW tier
echo "Test 2: LOW tier routing"
RESPONSE=$(curl -s -X POST "$BASE_URL/api/mesh/test" \
  -H "Content-Type: application/json" \
  -d '{"message":"ping"}')
SCORE=$(echo "$RESPONSE" | grep -oE '"routeScore":\s*[0-9.]+' | awk -F': ' '{print $2}')
CRYPTO=$(echo "$RESPONSE" | grep -A 1 '"crypto"' | grep '"alg"' | awk -F': "' '{print $2}' | awk -F'"' '{print $1}')
if [ "$CRYPTO" = "none" ]; then
  echo "✅ LOW tier: score=$SCORE, crypto=$CRYPTO"
else
  echo "❌ LOW tier failed: crypto='$CRYPTO' (expected: none)"
  FAILED=$((FAILED + 1))
fi
echo ""

# Test 3: MEDIUM tier
echo "Test 3: MEDIUM tier routing"
RESPONSE=$(curl -s -X POST "$BASE_URL/api/mesh/test" \
  -H "Content-Type: application/json" \
  -d '{"message":"Route this through the Planetary Cognitive Mesh."}')
SCORE=$(echo "$RESPONSE" | grep -oE '"routeScore":\s*[0-9.]+' | awk -F': ' '{print $2}')
CRYPTO=$(echo "$RESPONSE" | grep -A 1 '"crypto"' | grep '"alg"' | awk -F': "' '{print $2}' | awk -F'"' '{print $1}')
if [ "$CRYPTO" = "p256-ecdsa-only" ]; then
  echo "✅ MEDIUM tier: score=$SCORE, crypto=$CRYPTO"
else
  echo "❌ MEDIUM tier failed: crypto='$CRYPTO' (expected: p256-ecdsa-only)"
  FAILED=$((FAILED + 1))
fi
echo ""

# Test 4: HIGH tier
echo "Test 4: HIGH tier routing"
RESPONSE=$(curl -s -X POST "$BASE_URL/api/mesh/test" \
  -H "Content-Type: application/json" \
  -d '{"message":"This is a high-priority cognitive packet with substantial content that should be routed with full end-to-end encryption through the Smart Atom mesh network and requires special handling."}')
SCORE=$(echo "$RESPONSE" | grep -oE '"routeScore":\s*[0-9.]+' | awk -F': ' '{print $2}')
CRYPTO=$(echo "$RESPONSE" | grep -A 1 '"crypto"' | grep '"alg"' | awk -F': "' '{print $2}' | awk -F'"' '{print $1}')
if [[ "$CRYPTO" == *"ed25519"* ]]; then
  echo "✅ HIGH tier: score=$SCORE, crypto=$CRYPTO"
else
  echo "❌ HIGH tier failed: crypto='$CRYPTO' (expected: ed25519+...)"
  FAILED=$((FAILED + 1))
fi
echo ""

# Summary
if [ $FAILED -eq 0 ]; then
  echo "🎉 All smoke tests passed!"
  exit 0
else
  echo "💥 $FAILED test(s) failed"
  exit 1
fi
