class Instructor {
    constructor(id, name, email, bio, courses, overallRating = 0, reviews = [], img) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.bio = bio;
      this.courses = courses;
      this.overallRating = overallRating;
      this.reviews = reviews;
      this.img = img;
    }
  
    getTotalEnrolledStudents() {
      return this.courses.reduce((total, course) => total + course.totalStudent, 0);
    }
  
    getAverageRating() {
      if (this.reviews.length === 0) {
        return 0; // If no reviews, return 0
      }
      const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
      return totalRating / this.reviews.length;
    }
  }
  
  export default Instructor;
  