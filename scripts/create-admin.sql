-- Create admin user for Cerebrum Biology Academy
-- Email: admin@cerebrumbiologyacademy.com
-- Password: admin123

INSERT INTO users (
  id,
  email,
  name,
  role,
  "passwordHash",
  "emailVerified",
  "createdAt",
  "updatedAt"
) VALUES (
  gen_random_uuid()::text,
  'admin@cerebrumbiologyacademy.com',
  'Admin User',
  'ADMIN',
  '$2b$12$IbC2f2coL062v4I5VSG57Od7e3gmUpJkgC3i4jmwxfIGqGRdOafVC',
  NOW(),
  NOW(),
  NOW()
)
ON CONFLICT (email)
DO UPDATE SET
  "passwordHash" = EXCLUDED."passwordHash",
  role = 'ADMIN',
  "updatedAt" = NOW();
