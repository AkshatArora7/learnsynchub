import { useEffect, useState } from 'react';
import { firestore } from '../../../Firebase';
import './ChatList.scss';

const ChatList = ({ uid, onSelect }) => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const coursesRef = firestore.collection('courses');
        const querySnapshot = await coursesRef.where('studentsEnrolled', 'array-contains', uid).get();

        const instructorIds = [];
        querySnapshot.forEach((doc) => {
          const courseData = doc.data();
          const instructorId = courseData.createdBy;
          if (!instructorIds.includes(instructorId)) {
            instructorIds.push(instructorId);
          }
        });

        const instructorPromises = instructorIds.map(async (instructorId) => {
          const instructorRef = firestore.collection('users').doc(instructorId);
          const instructorDoc = await instructorRef.get();
          if (instructorDoc.exists) {
            return { id: instructorDoc.id, ...instructorDoc.data() };
          }
          console.log(instructorDoc)
          return null;
        });

        const instructorData = await Promise.all(instructorPromises);
        setInstructors(instructorData.filter((instructor) => instructor !== null));
      } catch (error) {
        console.error('Error fetching instructors:', error);
      }
    };

    fetchInstructors();
  }, [uid]);

  return (
    <div className='chat-list'>
      <h2>Instructors Available to Chat</h2>
      <ul>
        {instructors.map((instructor) => (
          <li onClick={()=>{onSelect(instructor)}} key={instructor.id}>{instructor.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
