import {
  getFirestore,
  addDoc,
  collection,
  where,
  query,
  getDocs,
} from "firebase/firestore";
import React, { FormEvent, useState } from "react";
import app from "./config";
import Modal from "./components/modal";
import "./index.css";

function AddNew() {
  const [title, setTitle] = useState<String>("");
  const [text, setText] = useState<String>("");
  const [un, setUn] = useState<String>("");
  const [pw, setPw] = useState<String>("");
  const [isUrl, setIsURL] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const db = getFirestore(app);
  const addToCollection = async (e: FormEvent) => {
    e.preventDefault();
    if (isLoggedIn) {
      try {
        const doc = await addDoc(collection(db, "posts"), {
          title: title,
          text: text,
          url: isUrl,
          date: Date.now(),
        });
        console.log("written to ", doc.id);
      } catch (err) {
        console.log("error: ", err);
      }
    } else {
      alert(
        "You sneaky bastard, you thought you can get in!!!\n\nWell you CANT!!!"
      );
    }
  };
  function handleClick(): void {
    setIsURL(!isUrl);
  }

  async function auth(e: FormEvent): Promise<void> {
    e.preventDefault();
    console.log("auth");
    const collref = collection(db, "users");
    const q = query(collref, where("name", "==", un));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      if (querySnapshot.docs[0].data()["password"] === pw) {
        setIsLoggedIn(!isLoggedIn);
      } else {
        alert("The password or username doesn't quite check out :/");
      }
    } else {
      alert("no user found");
    }
  }

  return (
    <div className="center">
      <div className="App bg-onyx">
        <Modal isOpen={!isLoggedIn}>
          <div className="bg-white">
            <form>
              <h1>Hello there</h1>
              <h3>You Should Log In :)</h3>
              <label htmlFor="username">username</label>
              <input
                onChange={(e) => setUn(e.target.value)}
                type="text"
                name="username"
                id="username"
              />
              <label htmlFor="password">password</label>
              <input
                onChange={(e) => setPw(e.target.value)}
                type="password"
                name="password"
                id="password"
              />
              <br />
              <button
                className="btn btn-gold"
                type="submit"
                onClick={(e) => auth(e)}
              >
                login
              </button>
            </form>
          </div>
        </Modal>
        <div className="card">
          <div className="card-content bg-white">
            <form>
              <h1>Welcome Back!</h1>
              <h2>Let's add a new Post!</h2>
              <label htmlFor="title">Title: </label>
              <br />
              <input
                id="title"
                name="title"
                type="text"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <br />
              <label htmlFor="content">Content: </label>
              <br />
              <input
                id="content"
                name="content"
                type="text"
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
              <br />
              <label htmlFor="usurl">Is It a soc-media post?</label>
              <input
                id="isurl"
                name="isurl"
                type="checkbox"
                onChange={handleClick}
                checked={isUrl}
              />
              <br />
              <button
                className="btn btn-gold"
                onClick={(e) => addToCollection(e)}
              >
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNew;
