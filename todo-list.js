// [x] Login

// [x] Create, view, update, and delete users

// [x] Create, view, update, and delete hosts

// [x] Create, view, update, and delete properties

// [x]  Create, view, update, and delete amenities

// [x] Create, view, update, and delete bookings **

// [x] Create, view, update, and delete reviews

// [x] * NOTE * In the Prisma model, we will add several collections to make data retrieval easier.
// For example, when retrieving a property, we would like a list of all amenities it has and reviews.
// You will find the extra Prisma collections we want to add to property and host in the instructions.

// [x] create logger. * Done *

// [x] create error handler

// [x] /users/:id: GET (Fetch a single user), PUT (Update a user), DELETE (Remove a user)

// [x] Create the same CRUD API endpoints as described in /users and /users:id for hosts, properties, amenities, bookings, and reviews.

// [x] Implement the query parameters that make the following endpoints possible: /properties?location=Amsterdam&pricePerNight=88&amenities=Wifi
//      bookings?userId=ee4b8bc3-4e54-4e0a-962d-d5a5570db4e7
//      users?username=PietVanMolen
//      users?email=piet@vanmolen.nl
//      hosts?name=Linda+Pollen

// [ ] connect the amenity data to the property data

// [x] add the query options
// [x] the query

// [x] All fields related to indentify a person, must be and are unique values.
// [x] Profile pictures are not mandatory
// [x] 1 user can have many bookings and many reviews
// [x] Reviews can have only 1 user and 1 property
// [x] Property can have many reviews and many bookings, but only 1 host and many amenity's
// [x] A host can have many property's
// [x] Amenity's can have many property's

// [x] add a selection type to bookingStatus
