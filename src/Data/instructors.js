import Instructor from "../Models/Instructors.js"; // Assuming the file path where Instructor class is defined
// Placeholder image URLs
const placeholderImgUrl = "https://via.placeholder.com/120";

// Creating instructor instances
const instructors = [
  new Instructor(
    1,
    "John Doe",
    "john@example.com",
    "I am an experienced developer.",
    [
      { courseId: 1, totalStudent: 50, rating: 4.5 },
      { courseId: 2, totalStudent: 30, rating: 4.2 },
    ],
    4.35,
    [
      { userId: 123, rating: 4, review: "Great instructor!" },
      { userId: 456, rating: 5, review: "Excellent teaching!" },
    ],
    placeholderImgUrl
  ),
  new Instructor(
    2,
    "Jane Smith",
    "jane@example.com",
    "I specialize in web development.",
    [
      { courseId: 3, totalStudent: 40, rating: 4.8 },
      { courseId: 4, totalStudent: 20, rating: 4.3 },
    ],
    4.55,
    [
      { userId: 789, rating: 4.5, review: "Very knowledgeable!" },
      { userId: 101, rating: 4.7, review: "Clear explanations!" },
    ],
    placeholderImgUrl
  ),
  new Instructor(
    3,
    "Alice Johnson",
    "alice@example.com",
    "I teach programming and software engineering.",
    [
      { courseId: 5, totalStudent: 35, rating: 4.6 },
      { courseId: 6, totalStudent: 25, rating: 4.1 },
    ],
    4.35,
    [
      { userId: 111, rating: 4.2, review: "Helpful course!" },
      { userId: 222, rating: 4.5, review: "Enjoyed learning!" },
    ],
    placeholderImgUrl
  ),
  new Instructor(
    4,
    "Bob Brown",
    "bob@example.com",
    "I have a passion for teaching.",
    [
      { courseId: 7, totalStudent: 45, rating: 4.4 },
      { courseId: 8, totalStudent: 15, rating: 4.0 },
    ],
    4.2,
    [
      { userId: 333, rating: 4.3, review: "Good course!" },
      { userId: 444, rating: 4.1, review: "Learned a lot!" },
    ],
    placeholderImgUrl
  ),
  new Instructor(
    5,
    "Eva Green",
    "eva@example.com",
    "I love helping students learn new skills.",
    [
      { courseId: 9, totalStudent: 55, rating: 4.7 },
      { courseId: 10, totalStudent: 10, rating: 4.5 },
    ],
    4.6,
    [
      { userId: 555, rating: 4.8, review: "Fantastic course!" },
      { userId: 666, rating: 4.6, review: "Highly recommended!" },
    ],
    placeholderImgUrl
  ),
  new Instructor(
    6,
    "Sarah Johnson",
    "sarah@example.com",
    "I specialize in machine learning and data science.",
    [
      { courseId: 11, totalStudent: 60, rating: 4.9 },
      { courseId: 12, totalStudent: 25, rating: 4.7 },
    ],
    4.8,
    [
      { userId: 777, rating: 4.9, review: "Excellent instructor!" },
      { userId: 888, rating: 4.8, review: "Great teaching!" },
    ],
    placeholderImgUrl
  ),
  new Instructor(
    7,
    "Michael Smith",
    "michael@example.com",
    "I am passionate about frontend development.",
    [
      { courseId: 13, totalStudent: 70, rating: 4.6 },
      { courseId: 14, totalStudent: 35, rating: 4.4 },
    ],
    4.5,
    [
      { userId: 999, rating: 4.7, review: "Very helpful instructor!" },
      { userId: 1010, rating: 4.5, review: "Clear explanations!" },
    ],
    placeholderImgUrl
  ),
  new Instructor(
    8,
    "Emma Brown",
    "emma@example.com",
    "I teach web design and development.",
    [
      { courseId: 15, totalStudent: 45, rating: 4.3 },
      { courseId: 16, totalStudent: 20, rating: 4.0 },
    ],
    4.2,
    [
      { userId: 1111, rating: 4.3, review: "Good course content!" },
      { userId: 1212, rating: 4.1, review: "Learned a lot!" },
    ],
    placeholderImgUrl
  ),
  new Instructor(
    9,
    "David Wilson",
    "david@example.com",
    "I have years of experience in backend development.",
    [
      { courseId: 17, totalStudent: 55, rating: 4.5 },
      { courseId: 18, totalStudent: 30, rating: 4.2 },
    ],
    4.35,
    [
      { userId: 1313, rating: 4.4, review: "Well-organized course!" },
      { userId: 1414, rating: 4.6, review: "Engaging teaching style!" },
    ],
    placeholderImgUrl
  ),
  new Instructor(
    10,
    "Laura Taylor",
    "laura@example.com",
    "I am passionate about teaching programming fundamentals.",
    [
      { courseId: 19, totalStudent: 65, rating: 4.7 },
      { courseId: 20, totalStudent: 40, rating: 4.3 },
    ],
    4.5,
    [
      { userId: 1515, rating: 4.8, review: "Amazing course!" },
      { userId: 1616, rating: 4.6, review: "Highly recommend!" },
    ],
    placeholderImgUrl
  ),
];

export default instructors;
