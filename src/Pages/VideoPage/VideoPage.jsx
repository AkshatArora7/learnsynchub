import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { firestore } from "../../Firebase";
import "./VideoPage.scss";
import FaqItem from "../../Components/Widgets/FAQItem/FAQItem";
import Modal from "../../Components/Widgets/Modal/Modal";
import FAQForm from "../../Components/Widgets/FAQForm/FAQForm";
import loading from "../../Components/Assets/loading.gif";
import Loading from "../../Components/Widgets/Loading/Loading";
import NavBar from "../../Components/Widgets/NavBar/NavBar";

const VideoPage = () => {
  const { courseId, videoId } = useParams();
  console.log(courseId);
  const location = useLocation();
  const videoSnapshot = location.state.videoSnapshot;
  const [videoData, setVideoData] = useState(videoSnapshot);
  const [faqData, setFaqData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        if (!videoSnapshot) {
          const videoRef = firestore.collection("videos").doc(videoId);
          const videoDoc = await videoRef.get();
          if (videoDoc.exists) {
            setVideoData(videoDoc.data());
          } else {
            console.log("Video not found");
          }
        }
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    };

    const fetchFaqData = async () => {
      if (videoSnapshot && videoSnapshot.faq) {
        const faqQuery = firestore
          .collection("faq")
          .where("videoId", "==", videoId);

        try {
          const faqSnapshot = await faqQuery.get();
          const faqData = faqSnapshot.docs.map((doc) => doc.data());
          setFaqData(faqData);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching FAQ data:", error);
        }
      }
    };

    fetchVideoData();
    fetchFaqData();
  }, [videoSnapshot, videoId]);

  const handleAddFaq = (newFaq) => {
    setFaqData([...faqData, newFaq]); // Add the new FAQ to the list of FAQs
    setIsModalOpen(false); // Close the modal after adding FAQ
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <NavBar isBack={true}/>
      <div className="video-page">
        <video src={videoSnapshot.url} controls autoPlay />
        <div className="video-details">
          <h2>{videoData.title}</h2>
          <p>Description: {videoData.description}</p>

          <div className="faq-container">
            <div className="faq-header">
              <h2>FAQs</h2>
              <div
                className="add-faq-button"
                onClick={() => setIsModalOpen(true)}
              >
                Add FAQ
              </div>
            </div>
            {faqData.map((faq, index) => (
              <FaqItem key={index} faq={faq} />
            ))}
          </div>
        </div>
        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)} isOpen={isModalOpen}>
            <FAQForm
              videoId={videoId}
              onSubmit={handleAddFaq}
              onCancel={() => setIsModalOpen(false)}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default VideoPage;
