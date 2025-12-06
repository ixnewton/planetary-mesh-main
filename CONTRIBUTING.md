# Contributing to The Mesh

Thank you for your interest in contributing to The Mesh!

This repository is a **public demonstration** of Smart Atom routing concepts for the Sparse Supernova Planetary Cognitive Mesh.

## Guidelines

### What we welcome

- Bug fixes and improvements to the demo code.
- Better documentation and examples.
- Performance optimizations for the routing scorer.
- Additional test cases and validation.

### What we don't accept

- Production crypto implementations or key material.
- Proprietary Smart Atom algorithms or internal IP.
- Code that breaks the educational focus of this demo.
- Dependencies that bloat the worker or add security risks.

## How to contribute

1. **Fork the repository** and create a feature branch.
2. **Make your changes** ensuring all code is public-safe.
3. **Test locally** with `npm run dev`.
4. **Submit a pull request** with a clear description.

## Code style

- Use TypeScript for all source files.
- Keep functions small and well-documented.
- Follow existing code patterns for consistency.
- Add comments explaining non-obvious logic.

## Testing

Before submitting a PR:

```bash
npm run dev
# Test your changes locally
curl -X POST http://127.0.0.1:8787/api/mesh/test \
  -H "Content-Type: application/json" \
  -d '{"message":"Test message"}'
```

## Security

If you discover a security issue, please **do not** open a public issue. Instead, contact the maintainers directly.

## License

By contributing, you agree that your contributions will be licensed under the Apache License 2.0.
