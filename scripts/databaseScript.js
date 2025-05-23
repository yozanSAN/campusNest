// Ensure the database is selected in your MongoDB connection setup
db.users.insertOne({
  name: "Alice Smith",
  email: "alice@university.com",
  password: "hashedPassword123",
  role: "student",
  createdAt: new Date()
})
db.dorms.insertOne({
  name: "Maple Hall",
  university: "Example University",
  location: "123 Campus Rd",
  description: "Cozy dorm with modern amenities",
  amenities: ["WiFi", "Laundry", "Study Room"],
  rating: 4.2,
  photoUrls: ["https://example.com/maplehall.jpg"],
  createdAt: new Date()
})

db.reviews.insertOne({
  dormId: dorm._id,
  userId: user._id,
  rating: 4,
  comment: "Great dorm, but WiFi can be spotty.",
  createdAt: new Date()
})
