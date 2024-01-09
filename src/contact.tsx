import { addDoc, collection, getFirestore } from "firebase/firestore";
import React, { FormEvent, useState } from "react";
import app from "./config";

function Contact(){
    const db = getFirestore(app)
    const addToCollection = async (e: FormEvent) => {
        e.preventDefault()
          try {
            const doc = await addDoc(collection(db, "messages"), {
                from:name,
                content:content,
                email:email,
                date: Date.now(),
            });
            console.log("written to ", doc.id);
          } catch (err) {
            console.log("error: ", err);
          }
      };

    const [name, setname] = useState<String>('')
    const [email, setemail] = useState<String>('')
    const [content, setcontent] = useState<String>('')
    return (
        <div className="center">

        <div className="card bg-white">
        <div className="card-content ">
          <form>
            <h1>How May The Fizzulous Blaine McFizzleton May Assist you</h1>
            <h2>Let's start with some basic info</h2>
            <label htmlFor="name">name: </label>
            <br />
            <input
              id="name"
              name="name"
              type="text"
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
            <br />
            <label htmlFor="email">How Can Blaine McFizzleton find you?</label>
            <br />
            <input onChange={(e)=>{
                setemail(e.target.value);
            }} type="email" name="email" id="email" />
            <br />
            <label htmlFor="content">your Question: </label>
            <br />
            <input
              id="content"
              name="content"
              type="text"
              onChange={(e) => {
                setcontent(e.target.value);
              }}
            />
            <br />
            <button
              className="btn btn-gold"
              onClick={(e) => addToCollection(e)}
            >
              Post
            </button>
          </form>
          </div></div>
        </div>
    )
}

export default Contact