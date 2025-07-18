# CampusNest

CampusNest is a full-stack web application for discovering, reviewing, and ranking university dorms. Students can search for dorms, read and write reviews, and explore amenities to make informed housing decisions.

## Features
- User registration and authentication
- Search and filter dorms by university, location, and amenities
- Add, edit, and delete reviews for dorms
- Star ratings and review counts
- User profile with editable info and profile photo
- Admin features (optional)
- Responsive, modern UI

## Tech Stack
- **Frontend:** React, CSS Modules
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** JWT

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- MongoDB (local or Atlas)

### Installation
1. **Clone the repository:**
   ```sh
   git clone https://github.com/yozanSAN/campusNest.git
   cd campusNest
   ```
2. **Install backend dependencies:**
   ```sh
   cd backend
   npm install
   ```
3. **Install frontend dependencies:**
   ```sh
   cd ../frontend
   npm install
   ```

### Environment Variables
Create a `.env` file in the `backend/` directory with the following:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
BASE_URL=http://localhost:5000
```

### Running the App
1. **Start the backend:**
   ```sh
   cd backend
   npm run dev
   ```
2. **Start the frontend:**
   ```sh
   cd ../frontend
   npm start
   ```
3. Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Usage
- Register a new account or log in.
- Search for dorms, view details, and read reviews.
- Add your own reviews and rate dorms.
- Edit your profile and upload a profile photo.

## Seeding the Database
- You can use the provided scripts in the `scripts/` folder to seed dorms and reviews for testing.
- Example: `mongosh campusnest scripts/seedDormReviews.js`

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## License
[MIT](LICENSE)

---
**CampusNest** — Helping students find their perfect college dorm through honest reviews and detailed information.
