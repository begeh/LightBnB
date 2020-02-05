SELECT reservations.*, properties.*, AVG(property_reviews.rating) as average_rating
FROM users JOIN reservations ON users.id = reservations.guest_id JOIN properties ON properties.id = reservations.property_id JOIN property_reviews ON properties.id = property_reviews.property_id
WHERE reservations.guest_id = 1 AND now() > end_date
GROUP BY reservations.id, properties.id
ORDER BY start_date
LIMIT 10;