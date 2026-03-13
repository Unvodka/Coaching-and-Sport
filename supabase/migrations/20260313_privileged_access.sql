-- Add is_privileged column to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_privileged boolean NOT NULL DEFAULT false;

-- Comment
COMMENT ON COLUMN profiles.is_privileged IS 'Coach-granted subscription bypass — user gets full portal access without Stripe subscription';
