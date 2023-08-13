import { React, useState, useEffect} from 'react'
import './Addingnew.css'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from './FirebaseConfig'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'
const Addingnew = () => {

    const [List, setList] = useState('');
    const notify = () => {
        toast.success('Added Successfully', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
    }
    useEffect(() => {
        const newlist = document.querySelector('.add');
        const handleSubmit = (e) => {
            e.preventDefault();
            addNewDocument();   
            notify()
        };

        const addNewDocument = async () => {
            const colRef = collection(db, "Todo List");
            try {
                await addDoc(colRef, {
                    list: List,
                    createdAt : serverTimestamp()
                }).then(() => {
                    setList(' ')
                })
                
                console.log("Added");
            } catch (err) {
                console.error(err.message);
            }
        };

        newlist.addEventListener("submit", handleSubmit);

        return () => {
            newlist.removeEventListener("submit", handleSubmit);
        };
    }, [List]);

  return (
    <div>
        <form className='add'>
            <div className='input-container'>
                <label className='input-label' htmlFor='list'>Task</label>
                <input className="input-field" type='text' value={List} name='list' onChange={e => setList(e.target.value)} />
            </div>
            <button className={!List ? 'button_disabled' : 'submit-button'} disabled={!List}>Add</button>
        </form>
        <ToastContainer />
    </div>
  )
}

export default Addingnew
