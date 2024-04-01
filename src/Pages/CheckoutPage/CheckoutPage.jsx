import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CheckoutPage.scss";
import { FaCcApplePay, FaCcPaypal, FaGooglePay } from "react-icons/fa6";
import { FaCreditCard } from "react-icons/fa";
import { firestore } from "../../Firebase";
import { useAuth } from "../../auth";
import NavBar from "../../Components/Widgets/NavBar/NavBar";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    description,
    reviews,
    title,
    level,
    courseThumbnail,
    studentsEnrolled,
    price,
    lastUpdated,
    createdBy,
    creationTime,
    instructorName,
  } = location.state.course;
  const courseId = location.state.courseId;
  const {loggedInUser} = useAuth();
  const date = new Date(creationTime);
  const formattedDate = date.toLocaleDateString();

  const handleEnroll = async () => {
    try {
      // Get the reference to the course document
      const courseRef = firestore.collection("courses").doc(courseId);
      
      // Fetch the current course data
      const courseSnapshot = await courseRef.get();
      const currentStudentsEnrolled = courseSnapshot.data().studentsEnrolled || [];
  
      // Check if the current user is already enrolled
      if (!currentStudentsEnrolled.includes(loggedInUser.uid)) {
        // Update the studentsEnrolled array with the current user's UID
        const updatedStudentsEnrolled = [...currentStudentsEnrolled, loggedInUser.uid];
  
        // Update the course document with the updated studentsEnrolled array
        await courseRef.update({ studentsEnrolled: updatedStudentsEnrolled });
  
        // Navigate to the course enrolled page
        navigate(`/coursesEnrolled`);
      } else {
        // If the user is already enrolled, show a message or handle it accordingly
        console.log("User is already enrolled in this course.");
      }
    } catch (error) {
      console.error("Error enrolling in the course:", error);
    }
  };


  return (
    <div className="checkout">
      <NavBar isBack={true} />
      <div className="checkout__wrapper">
        <h1>Checkout</h1>
        <div className="checkout__courseCard">
          <img src={courseThumbnail} alt={title} />
          <div>
            <p>
              {title} by {instructorName}
            </p>
            <p>{formattedDate}</p>
          </div>

          <div>
            <p>Price</p>
            <p>${price}</p>
          </div>
        </div>
        <div className="checkout__paymentMethod">
            <h3>Payment Method</h3>
            <div className="checkout__methodsWrapper">
                <div className="checkout__methods" onClick={handleEnroll}>
                    <FaCreditCard/>
                </div>
                <div className="checkout__methods" onClick={handleEnroll}>
                    <FaCcPaypal/>
                </div>
                <div className="checkout__methods" onClick={handleEnroll}>
                    <FaCcApplePay/>
                </div>
                <div className="checkout__methods" onClick={handleEnroll}>
                    <FaGooglePay/>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
