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
      { courseId: 1, totalStudent: 50, rating: 4 },
      { courseId: 2, totalStudent: 30, rating: 4 },
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
      { courseId: 3, totalStudent: 40, rating: 4 },
      { courseId: 4, totalStudent: 20, rating: 4 },
    ],
    4.55,
    [
      { userId: 789, rating: 4, review: "Very knowledgeable!" },
      { userId: 101, rating: 4, review: "Clear explanations!" },
    ],
    placeholderImgUrl
  ),
  new Instructor(
    3,
    "Alice Johnson",
    "alice@example.com",
    "I teach programming and software engineering.",
    [
      { courseId: 2, totalStudent: 35, rating: 4 },
      { courseId: 1, totalStudent: 25, rating: 4 },
    ],
    4.35,
    [
      { userId: 111, rating: 4, review: "Helpful course!" },
      { userId: 222, rating: 4, review: "Enjoyed learning!" },
    ],
    placeholderImgUrl
  ),
  new Instructor(
    4,
    "Bob Brown",
    "bob@example.com",
    "I have a passion for teaching.",
    [
      { courseId: 2, totalStudent: 45, rating: 4 },
      { courseId: 3, totalStudent: 15, rating: 2 },
    ],
    4.2,
    [
      { userId: 333, rating: 4, review: "Good course!" },
      { userId: 444, rating: 4, review: "Learned a lot!" },
    ],
    placeholderImgUrl
  ),
  new Instructor(
    5,
    "Eva Green",
    "eva@example.com",
    "I love helping students learn new skills.",
    [
      { courseId: 4, totalStudent: 55, rating: 5 },
      { courseId: 3, totalStudent: 10, rating: 1 },
    ],
    4.6,
    [
      { userId: 555, rating: 4, review: "Fantastic course!" },
      { userId: 666, rating: 4, review: "Highly recommended!" },
    ],
    placeholderImgUrl
  ),
  new Instructor(
    6,
    "Sarah Johnson",
    "sarah@example.com",
    "I specialize in machine learning and data science.",
    [
      { courseId: 1, totalStudent: 60, rating: 2 },
      { courseId: 2, totalStudent: 25, rating: 4 },
    ],
    4.8,
    [
      { userId: 777, rating: 4, review: "Excellent instructor!" },
      { userId: 888, rating: 4, review: "Great teaching!" },
    ],
    placeholderImgUrl
  ),
  new Instructor(
    7,
    "Michael Smith",
    "michael@example.com",
    "I am passionate about frontend development.",
    [
      { courseId: 3, totalStudent: 70, rating: 4 },
      { courseId: 4, totalStudent: 35, rating: 4 },
    ],
    4.5,
    [
      { userId: 999, rating: 4, review: "Very helpful instructor!" },
      { userId: 1010, rating: 4, review: "Clear explanations!" },
    ],
    placeholderImgUrl
  ),
  new Instructor(
    8,
    "Emma Brown",
    "emma@example.com",
    "I teach web design and development.",
    [
      { courseId: 2, totalStudent: 45, rating: 4 },
      { courseId: 1, totalStudent: 20, rating: 4 },
    ],
    4.2,
    [
      { userId: 1111, rating: 4, review: "Good course content!" },
      { userId: 1212, rating: 4, review: "Learned a lot!" },
    ],
    placeholderImgUrl
  ),
  new Instructor(
    9,
    "David Wilson",
    "david@example.com",
    "I have years of experience in backend development.",
    [
      { courseId: 2, totalStudent: 55, rating: 4 },
      { courseId: 3, totalStudent: 30, rating: 4 },
    ],
    4.35,
    [
      { userId: 1313, rating: 4, review: "Well-organized course!" },
      { userId: 1414, rating: 4, review: "Engaging teaching style!" },
    ],
    placeholderImgUrl
  ),
  new Instructor(
    10,
    "Laura Taylor",
    "laura@example.com",
    "I am passionate about teaching programming fundamentals.",
    [
      { courseId: 4, totalStudent: 65, rating: 4 },
      { courseId: 1, totalStudent: 40, rating: 4 },
    ],
    4.5,
    [
      { userId: 1515, rating: 4, review: "Amazing course!" },
      { userId: 1616, rating: 4, review: "Highly recommend!" },
    ],
    placeholderImgUrl
  ),
];

export default instructors;
