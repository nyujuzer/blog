import { useState, useEffect } from 'react';
import app from './config';
import { collection, getDocs, getFirestore } from 'firebase/firestore';


const All = () => {
  const colorClasses = ['bg-sky-blue', 'bg-harvest-gold', 'bg-light-red', 'bg-hot-pink', "bg-white"]
  const [data, setData] = useState([]);
  const setup = async ()=>{
    //Reference to the Firestore collection
    const db= getFirestore(app);
    const collectionRef = collection(db, 'posts'); // Replace with your actual collection name

    // Subscribe to the collection data
    const docs = await getDocs(collectionRef);
      const newData = docs.docs.map((doc:any) => ({
        id: doc.id,
        ...doc.data(),
      })) as [];
      setData(newData);
    };
  useEffect(() => {
    setup()
  }, []); // Empty dependency array ensures that this effect runs only once when the component mounts

  return (
    <div>
      <div className="c-card bg-white">
      <h1>The Ever Fizzoulous and Rather handsome Entrepreneur, Blaine McFizzleton's Pleasurably Perfect Posts</h1>
      </div>
      <div className='row'>
        {data.map((item:any) => (
          <div className={'card '+colorClasses[Math.floor(Math.random() * colorClasses.length)]} key={item.id}>
            <h1>{item.title}</h1>
            <h3>{item.text}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default All;
