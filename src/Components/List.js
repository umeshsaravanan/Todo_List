import { React, useState, useEffect } from 'react'
import { db } from './FirebaseConfig'
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore'
import { FaCheckSquare, FaRegSquare } from 'react-icons/fa'
import { ClipLoader } from 'react-spinners'
import './List.css'

const List = () => {

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const [checkList, setCheckList] = useState([]);

    const colRef = collection(db, "Todo List")
    const q = query(colRef, orderBy('createdAt'))
    let list = []
    onSnapshot(q, (snapshot) => {
        snapshot.docs.forEach(doc => {
            list.push({ ...doc.data(), id: doc.id })
        })
    })
    
    useEffect(() => {
        const unsubscribe = onSnapshot(colRef, (snapshot) => {
            const newList = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, checked: false }));
            setCheckList(newList);
            setIsLoading(false)
            
        })

        return () => {
            unsubscribe();
        };
    },[]);

    const handleItemClick = (index) => {
        const updatedCheckList = [...checkList];
        updatedCheckList[index].checked = !updatedCheckList[index].checked;
        setCheckList(updatedCheckList);
    };
    
    const handleDelete = (id) =>{
        const docRef = doc(db,"Todo List",id)

        deleteDoc(docRef)
        .catch(err => setError(err.message))
    }

    return (
        <div className='list' style={{marginTop : '30vh'}}>
            {error && <div><p style={{ color: 'red', fontSize: '20px', margin: '30px' }}>{error}</p></div>}
            {isLoading ? <div className='spinner-container'>
                <ClipLoader size={50} color={'blue'} loading={isLoading} />
            </div> : <>
                {checkList.map((item, index) => (
                    <div key={index} onClick={() => handleItemClick(index)} className='listitem'>
                        <div className='checkbox'>
                            {item.checked ?
                                <FaCheckSquare style={{ color: '#212122' }} />
                                :
                                <FaRegSquare style={{ color: '#212122' }} />
                            }
                        </div>
                        <p className='checklistitem'>{item.list}</p>
                        <button onClick={() => handleDelete(item.id)} className='btn-delete'>delete</button>
                    </div>
                ))}
            </>}

        </div>
    )
}

export default List
