import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db, storage } from "../db";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { FormEvent } from "react";

export const getPosts = async () => {
  try {
    const postsRef = collection(db, "posts"); //created a reference to the post collection
    //first parameter: the db instance
    //second parameter: name of the collection

    const docsSnapshot = await getDocs(postsRef); //creates a snapshot of the documents
    return docsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    //snapshots give access to data with .data()
    //this does not have the id included in the return value, so we are mapping to:
    // 1. get the actual data with .data()
    // 2. add the id (important for edits and deletes)
  } catch (error) {
    console.error(error);
  }
};

export const getPostById = async (id: string) => {
  const documentRef = doc(db, "posts", id); //get a document reference
  const data = await getDoc(documentRef); //get document snapshot
  if (data.exists()) {
    return { ...data.data(), id: data.id };
  } else throw new Error("Data with id " + id + " was not found");
};
interface Post {
    content: string | null 
    img: string | null
}
export const createPost = async (ev: FormEvent) => {
  ev.preventDefault(); //this is a submit event
  const fd = new FormData(ev.target as HTMLFormElement); //create a FormData from the form element
  // this could also be done in the component or through useRef
  const content = fd.get("content") as string | null; //get form value for "content"
  const img = fd.get("img") as File | null; //get form value for "img"
  const finalPost:Post = { content: content || "", img: "" };
  if (img) { 
    const storageRef = ref(storage, img.name); //create storage reference and give it a name (here we are using the oridinal file name)
    await uploadBytes(storageRef, img); //upload file to storage 
    finalPost.img = await getDownloadURL(storageRef); //from previously created reference, get url
  }
  const collectionRef = collection(db, "posts");
  await addDoc(collectionRef, finalPost); //save post with url and content
};

export const editPostById = async (id: string, body: string) => {
  const found = doc(db, "posts", id); 
  const data = await getDoc(found); 
  if (data.exists()) {
    setDoc(found, { content: body }); //setDoc takes a document reference and how to change it 
  } else throw new Error("Data with id " + id + " was not found");
};

export const deleteById = async (id: string) => {
  const found = doc(db, "posts", id);
  deleteDoc(found);
};
