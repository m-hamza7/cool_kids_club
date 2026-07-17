-- Run 2 of 5: Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_events_category ON events(category);
CREATE INDEX idx_events_published ON events(is_published);
CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_attendees_event ON event_attendees(event_id);
CREATE INDEX idx_attendees_user ON event_attendees(user_id);
CREATE INDEX idx_letters_published ON monthly_letters(is_published);
CREATE INDEX idx_letters_featured ON monthly_letters(is_featured);
