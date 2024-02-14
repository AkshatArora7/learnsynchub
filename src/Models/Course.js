class Course {
  constructor(courseId, title, totalStudent, dateReleased, shortDesc, instructor, price, duration, difficulty, img) {
    this.courseId = courseId;
    this.title = title;
    this.totalStudent = totalStudent;
    this.dateReleased = dateReleased;
    this.shortDesc = shortDesc;
    this.instructor = instructor;
    this.price = price;
    this.duration = duration;
    this.difficulty = difficulty;
    this.img = img;
  }

  displayInfo() {
    console.log(`Course ID: ${this.courseId}`);
    console.log(`Title: ${this.title}`);
    console.log(`Total Students: ${this.totalStudent}`);
    console.log(`Date Released: ${this.dateReleased}`);
    console.log(`Short Description: ${this.shortDesc}`);
    console.log(`Instructor: ${this.instructor}`);
    console.log(`Price: ${this.price}`);
    console.log(`Duration: ${this.duration}`);
    console.log(`Difficulty: ${this.difficulty}`);
    console.log(`Image: ${this.img}`);
  }
}

export default Course;