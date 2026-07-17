-- Run 4 of 4: Seed data

INSERT INTO events (title, description, category, image_url, is_published) VALUES
  ('Mindful Moments Workshop', 'A space to explore mindfulness and meditation practices.', 'wellness', 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=500&h=280&fit=crop', true),
  ('Self-Care & Stress Management Session', 'Learn practical self-care techniques and stress management.', 'wellness', 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&h=280&fit=crop', true),
  ('Emotional Wellness Circle', 'A supportive group for emotional awareness and growth.', 'wellness', 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=500&h=280&fit=crop', true),
  ('Confidence & Personal Growth Workshop', 'Build confidence and discover your personal strengths.', 'wellness', 'https://images.unsplash.com/photo-1552581234-26160f608093?w=500&h=280&fit=crop', true),
  ('Monthly Book Discussion Meetup', 'Discuss this month''s book pick with fellow readers.', 'bookclub', 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=500&h=280&fit=crop', true),
  ('Character & Story Analysis Workshop', 'Deep-dive into characters and story structure.', 'bookclub', 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=280&fit=crop', true),
  ('Book-to-Life Reflection Session', 'Connect book themes to your personal journey.', 'bookclub', 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&h=280&fit=crop', true),
  ('Creative Writing & Storytelling Workshop', 'Express yourself through creative writing exercises.', 'bookclub', 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=500&h=280&fit=crop', true),
  ('Community Connection Day', 'A day of building friendships and meaningful connections.', 'community', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=280&fit=crop', true),
  ('Friendship & Support Gathering', 'Strengthen bonds and support each other.', 'community', 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&h=280&fit=crop', true),
  ('Mental Health Awareness Meetup', 'Open conversation about mental health topics.', 'community', 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=500&h=280&fit=crop', true),
  ('Community Celebration Event', 'Celebrate our community milestones together.', 'community', 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=500&h=280&fit=crop', true),
  ('Art & Painting Workshop', 'Explore painting and visual art together.', 'creativity', 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&h=280&fit=crop', true),
  ('Journaling & Vision Board Session', 'Create your vision board and practice journaling.', 'creativity', 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=500&h=280&fit=crop', true),
  ('DIY Crafts & Creative Activities', 'Hands-on crafting and creative fun.', 'creativity', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=280&fit=crop', true),
  ('Photography & Storytelling Workshop', 'Tell stories through photography.', 'creativity', 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=500&h=280&fit=crop', true);

INSERT INTO monthly_letters (title, month, content, excerpt, tag, color, is_featured, is_published) VALUES
  (
    'You Don''t Have to Be "Okay" to Show Up',
    'July 2025',
    E'Dear Cool Kid, I want to tell you something I wish someone had told me at 17...\n\nThis month, I''ve been sitting with something heavy and I decided not to dress it up or make it neat for you. Because you deserve honesty more than you deserve a perfectly packaged message.\n\nI''ve been exhausted. The kind of tired that sleep doesn''t fix. I''ve been questioning decisions I made, missing people who''ve moved on, and feeling that hollow ache that comes when you''re trying to hold everything together.\n\nAnd here''s what I''m learning: you don''t have to be okay to show up.\n\nWe live in a world that constantly asks us to perform wellness. To post the aesthetic morning routine. To say "I''m good!" with a smile. And there''s nothing wrong with aspiring to those things — but there''s something deeply harmful about the pressure to arrive there before we''re actually ready.\n\nThis month, I''m inviting all of us — myself included — to practice showing up as we actually are. Not the curated version. Not the brave face. Just... you. Messy, trying, real.\n\nThe Cool Kids Club was built on this radical idea: that belonging doesn''t require being better first. That community is a place where you can fall apart and be caught.\n\nI love you. Keep going.\n\n— Areeba',
    'This month, I''ve been sitting with something heavy and I decided not to dress it up...',
    'Mental Wellness',
    'bg-[#EEF7EE]',
    true,
    true
  ),
  (
    'On Feeling Behind — And Why You''re Not',
    'June 2025',
    'This month I want to talk about comparison. About that gnawing feeling that everyone else has figured it out while you''re still searching...',
    'This month I want to talk about comparison. About that gnawing feeling that everyone else has figured it out while you''re still...',
    'Self-Compassion',
    'bg-[#EEF3FD]',
    false,
    true
  ),
  (
    'The Art of Doing Nothing',
    'May 2025',
    'We live in a world that glorifies busyness. But what if the most radical thing you could do this month was rest without guilt...',
    'We live in a world that glorifies busyness. But what if the most radical thing you could do this month was rest without guilt...',
    'Rest & Recovery',
    'bg-[#EEF7EE]',
    false,
    true
  ),
  (
    'Friendships That Fill You Up',
    'April 2025',
    'I''ve been thinking about what makes a friendship truly nourishing. Not just fun — but the kind that makes you feel more like yourself...',
    'I''ve been thinking about what makes a friendship truly nourishing. Not just fun — but the kind that makes you feel more like yourself...',
    'Relationships',
    'bg-[#FEF3EA]',
    false,
    true
  ),
  (
    'Your Grief Is Valid, No Matter the Loss',
    'March 2025',
    'Grief isn''t just for death. We grieve versions of ourselves, relationships that ended, dreams that shifted. This month, I wanted to...',
    'Grief isn''t just for death. We grieve versions of ourselves, relationships that ended, dreams that shifted. This month, I wanted to...',
    'Healing',
    'bg-[#FAFAF5]',
    false,
    true
  );
