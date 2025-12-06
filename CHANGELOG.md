# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-12-06

### Added
- Initial Smart Atom routing demo implementation.
- Route scoring based on sparse signatures (positions + elevations).
- Crypto stack selection (ed25519+x25519, p256-ecdsa, none) based on routeScore.
- Carbon-aware proxy estimates for per-packet energy.
- REST API with `/api/mesh/test` and `/api/mesh/ping` endpoints.
- Cloudflare Worker deployment configuration.
- USL repo-saturation audit compliance.
- Comprehensive README with examples and API reference.
- Apache 2.0 license.

### Security
- No production crypto implementations or key material included.
- No proprietary Smart Atom algorithms or internal IP included.
- Public-safe demonstration code only.

## [0.1.1] - 2025-12-06

### Changed
- Deployed to production: https://the-mesh.sparsesupernova.workers.dev
- Updated README with live API endpoints

### Verified
- All three routing tiers (LOW, MEDIUM, HIGH) working correctly
- Ping endpoint responding
- Smoke tests passing
