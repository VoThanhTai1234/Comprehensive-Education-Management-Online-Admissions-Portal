# Development seed data

This directory is intentionally outside Flyway's configured `db/migration` location.

Development/demo seed scripts may be added here later, after the shared schema and account contracts are approved. They must be safe to run repeatedly and must never contain real personal data, production credentials or secrets.

Production schema migrations belong in `db/migration`; development-only data does not.

