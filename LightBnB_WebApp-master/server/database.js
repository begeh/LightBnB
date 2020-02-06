// const properties = require('./json/properties.json');
// const users = require('../../json/users.json');

const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});


/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  return pool.query(`
  SELECT * FROM users WHERE users.email = $1
  `, [email])
    .then(res => { return res.rows[0] ? res.rows[0] : null })
    .catch((err) => {
      console.log('error: ', err);
    });
};
exports.getUserWithEmail = getUserWithEmail;



/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  return pool.query(`
  SELECT * FROM users WHERE users.id = $1
  `, [id])
    .then(res => { return res.rows[0] ? res.rows[0] : null })
    .catch((err) => {
      console.log('error: ', err);
    });
};
exports.getUserWithId = getUserWithId;


getUserWithId(1);
/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  return pool.query(`
  INSERT INTO users (name, email, password) 
  VALUES ($1, $2, $3)
  RETURNING *;
  `, [user.name, user.email, user.password])
    .then(res => res.rows[0])
    .catch((err) => {
      console.log('error: ', err);
    });
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  return pool.query(`
  SELECT properties.*, reservations.*, avg(rating) as average_rating
FROM reservations
JOIN properties ON reservations.property_id = properties.id
JOIN property_reviews ON properties.id = property_reviews.property_id
WHERE reservations.guest_id = $1 AND now() > end_date
GROUP BY reservations.id, properties.id
ORDER BY start_date
LIMIT $2;
  `, [guest_id, limit])
    .then(res => { return res.rows ? res.rows : null })
    .catch((err) => {
      console.log('error: ', err);
    });
  // return getAllProperties(null, 2);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function (options, limit = 10) {
  let queryParams = [];
  let queryString = `SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id `;
  
  if(options.city){
    if(queryParams.length === 0){
      queryString += `WHERE `
    } else{
      queryString += `AND `
    }
    queryParams.push(`%${options.city}%`);
    queryString += `city LIKE $${queryParams.length} `;
  }
  
  if(options.owner_id){
    if(queryParams.length === 0){
      queryString += `WHERE `;
    } else{
      queryString += `AND `;
    }
    queryParams.push(options.owner_id);
    queryString += `properties.owner_id = $${queryParams.length} `;
  }

  if(options.minimum_price_per_night){
    if(queryParams.length === 0){
      queryString += `WHERE `
    } else{
      queryString += `AND `
    }
    queryParams.push(options.minimum_price_per_night);
    queryString += `properties.cost_per_night >= $${queryParams.length} `;
  }

  if(options.maximum_price_per_night){
    if(queryParams.length === 0){
      queryString += `WHERE `
    } else{
      queryString += `AND `
    }
    queryParams.push(options.maximum_price_per_night);
    queryString += `properties.cost_per_night <= $${queryParams.length} `;
  }

  queryString += `GROUP BY properties.id `;

  if(options.minimum_rating){
    queryString += `HAVING `
    queryParams.push(options.minimum_rating);
    queryString += `avg(property_reviews.rating) >= $${queryParams.length} `;
  }

  queryParams.push(limit);
  queryString += `ORDER BY properties.cost_per_night
  LIMIT $${queryParams.length};
  `;

  return pool.query(queryString, queryParams)
    .then(res => res.rows)
    .catch((err) => {
      console.log('error: ', err);
    });
};
exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
