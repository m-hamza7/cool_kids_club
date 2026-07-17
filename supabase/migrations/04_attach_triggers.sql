-- Run 4 of 5: Attach triggers to tables
CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER events_updated_at
  BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER letters_updated_at
  BEFORE UPDATE ON monthly_letters FOR EACH ROW EXECUTE FUNCTION update_updated_at();
