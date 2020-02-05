INSERT INTO users
  (name, email, password)
VALUES
  ('Bashir Egeh', 'b_e@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('James Patrick', 'jamesp@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Seth Rogen', 'setthyr@aol.ca', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Marge Simpson', 'msimpson@gmail.ca', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties
  (title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES
  ('Speed lamp', 'description', 'https://images.com', 'https://images.com', 900, 6, 4, 8, 'Canada', '53 Name Dr', 'Okotoks', 'Alberta', 'T4P0P1', TRUE ),
  ('Speed lamp', 'description', 'https://images.com', 'https://images.com', 900, 6, 4, 8, 'Canada', '53 Name Dr', 'Okotoks', 'Alberta', 'T4P0P1', TRUE ),
  ('Speed lamp', 'description', 'https://images.com', 'https://images.com', 900, 6, 4, 8, 'Canada', '53 Name Dr', 'Okotoks', 'Alberta', 'T4P0P1', TRUE ),
  ('Speed lamp', 'description', 'https://images.com', 'https://images.com', 900, 6, 4, 8, 'Canada', '53 Name Dr', 'Okotoks', 'Alberta', 'T4P0P1', TRUE );

INSERT INTO reservations
  (start_date, end_date, property_id, guest_id)
VALUES
  ('2018-09-11', '2018-09-26', 2, 3),
  ('2019-01-04', '2019-02-01', 2, 2),
  ('2021-10-01', '2021-10-01', 1, 4),
  ('2014-10-21', '2021-10-21', 3, 4 );

INSERT INTO property_reviews
  (guest_id, property_id, reservation_id, rating, message)
VALUES
  (2, 3, 1, 3, 'messages'),
  (1, 4, 1, 4, 'messages'),
  (2, 2, 3, 3, 'messages'),
  (1, 2, 3, 3, 'messages');