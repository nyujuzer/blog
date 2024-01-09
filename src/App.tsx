/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { collection, getFirestore, query, getDocs, limit } from "firebase/firestore";
import "./App.css";
import app from "./config";
import "./index.css";
import { Link } from "react-router-dom";

  function App() {
    const [posts, setPosts] = useState<Tpost>({text:'', title:""})
  const db= getFirestore(app)
  const setup = async ()=>{
    const collref = collection(db, "posts");
    const q = query(collref, limit(1));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty){
      setPosts(querySnapshot.docs[0].data() as Tpost);
      
    }else{
      alert("fucky")
    }
  }


  useEffect(()=>{
    setup()
    console.log(posts)
  },[])

  return (
    <div className="container col">
      <div className="c-card bg-sky-blue">
        <img
          src={process.env.PUBLIC_URL + "/realistic.jpg"}
          alt="Placeholder Image"
        />
        <h1>Greetings, Earthlings!</h1>
        <h2>
          Brace yourselves for the extraordinary presence of the one and only
          Blaine McFizzleton, alias The Quantum Maestro!{" "}
        </h2>
        <p style={{fontSize:15}}>
          Behold, Quantum Quokka Juice - a beverage so revolutionary, it defies
          the laws of nature. Sip into the future with charm and agility
          bestowed upon you by the quokka itself! I, Blaine McFizzleton,
          stand as the visionary disruptor, conducting cutting-edge experiments
          in my secret lab that will leave you in awe.
        </p>
      </div>
      <div className="posts-carousel c-card bg-light-red">
        <div className="post">
          <img src={process.env.PUBLIC_URL+"/duct.jpg"} className="img-fluid" alt="Post Image" />
          <h2>Quenching Curiosity: Unveiling the Enchanting World of Quantum Quokka Juice</h2>
          <p>
          Quantum Quokka Juice comes packaged in a sleek, holographic can adorned with whimsical quokka illustrations. The liquid within shimmers with a vibrant, iridescent glow, reminiscent of a cosmic elixir. As you crack open the can, a burst of fruity and exotic aromas engulfs your senses, teasing a blend of otherworldly flavors like celestial berries, interdimensional citrus, and a hint of quokka joy.

Upon sipping, the taste is a cosmic dance on your taste buds – a refreshing amalgamation of sweet and tangy notes, leaving a subtle aftertaste that lingers like a quokka's mischievous grin. It's a sip into the unknown, promising a journey through flavors as unique and fanciful as the Quantum Maestro himself.          </p>
        </div>
      </div>
      <div className="posts-carousel c-card bg-harvest-gold ">
        <div className="post">
        <h1>{posts.title}</h1>
          <h3>{posts.text}</h3>

          <button  className="btn btn-blue">
            <Link to={"/all"}>
            See More
            </Link>
            </button>
        </div>
      </div>
    </div>
  );
}

export default App;
