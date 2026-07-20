-- Run in Aiven SQL editor
-- Add 'founding' as a valid membership_plan option
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_membership_plan_check;
ALTER TABLE users ADD CONSTRAINT users_membership_plan_check CHECK (membership_plan IN ('free', 'premium', 'founding'));
