import Course from "../Models/Course";
const courses = [
    new Course(
      1,
      "Introduction to React",
      50,
      "12/01/24",
      "Learn the basics of React",
      "John Doe",
      "$99",
      "4 weeks",
      "Beginner",
      "https://via.placeholder.com/250"
    ),
    new Course(
      2,
      "Intermediate React",
      30,
      "12/02/24",
      "Build on your React knowledge",
      "Jane Smith",
      "$149",
      "6 weeks",
      "Intermediate",
      "https://via.placeholder.com/250"
    ),
    new Course(
      3,
      "Advanced React",
      20,
      "12/03/24",
      "Master React concepts",
      "Alice Johnson",
      "$199",
      "8 weeks",
      "Advanced",
      "https://via.placeholder.com/250"
    ),
    new Course(
      4,
      "React Hooks",
      40,
      "12/04/24",
      "Explore React hooks",
      "Bob Smith",
      "$129",
      "5 weeks",
      "Intermediate",
      "https://via.placeholder.com/250"
    ),
  ];

  export default courses;