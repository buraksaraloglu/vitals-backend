# Performance Backend

An API Server for vitals analytics dashboard. Built with fastify.

### Important Specs
- Used MongoDB as a main database.
- Implemented Redis cache middleware. After each `post` request, cache's TTL increases to 1 min. Response times are reduced to 20ms.
- Implemented in-memory rate-limiter. It allows 4 `post` requests per second.

