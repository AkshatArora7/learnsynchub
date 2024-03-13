import { useEffect, useState } from 'react';
import { firestore } from '../../../Firebase';
import './ChatList.scss';

const ChatList = ({ uid, onSelect }) => {
  const [chatPartners, setChatPartners] = useState([]);

  useEffect(() => {
    const fetchChatPartners = async () => {
      try {
        const senderQuerySnapshot = await firestore
          .collection('messages')
          .where('receiver', '==', uid)
          .orderBy('timestamp', 'desc')
          .limit(10)
          .get();

        const receiverQuerySnapshot = await firestore
          .collection('messages')
          .where('sender', '==', uid)
          .orderBy('timestamp', 'desc')
          .limit(10)
          .get();

        const senderPartners = await Promise.all(senderQuerySnapshot.docs.map(async (doc) => {
          const senderUID = doc.data().sender;
          const userDoc = await firestore.collection('users').doc(senderUID).get();
          if (userDoc.exists) {
            return { id: userDoc.id, ...userDoc.data() };
          }
        }));

        const receiverPartners = await Promise.all(receiverQuerySnapshot.docs.map(async (doc) => {
          const receiverUID = doc.data().receiver;
          const userDoc = await firestore.collection('users').doc(receiverUID).get();
          if (userDoc.exists) {
            return { id: userDoc.id, ...userDoc.data() };
          }
        }));

        const allPartners = [...senderPartners, ...receiverPartners];
        const uniquePartners = allPartners.reduce((acc, partner) => {
          if (!acc.find((p) => p.id === partner.id)) {
            acc.push(partner);
          }
          return acc;
        }, []);

        setChatPartners(uniquePartners);
      } catch (error) {
        console.error('Error fetching chat partners:', error);
      }
    };

    fetchChatPartners();
  }, [uid]);

  return (
    <div className='chat-list'>
      <h2>Recent Chats</h2>
      <ul>
        {chatPartners.map((partner) => (
          <li onClick={() => onSelect(partner)} key={partner.id}>
            {partner.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
