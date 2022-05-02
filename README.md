#### Connect To DB

- get connection string
- setup .env with MONGO_URI variable and assign the value
- import 'dotenv' and setup package
- restart the server
- mongoose V6 info

#### Connect To Firebase

setup enviroment variable for the ff:
- FIREBASE_APIKEY
- FIREBASE_AUTHDOMAIN
- FIREBASE_PROJECTID
- FIREBASE_STORAGEBUCKET
- FIREBASE_MESSAGINGID
- FIREBASE_APPID

#### Reservation E-mail sending to customer

- create outlook e-mail @ outlook.live.com
- setup .env with MAIL_USER and assign your email
- setup .env with MAIL_PASSWORD and assign your password

#### Reservation E-mail sending to admin

- setup .env with ADMIN_EMAIL and assign your email

#### API

#### Rooms
- get all room
  - URL/api/v1/rooms
- get single room
  - URL/api/v1/rooms/:id

#### Amenities
- get all amenities
  - URL/api/v1/amenities
- get single amenities
  - URL/api/v1/amenities/:id

