import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
export default function Users() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const {currentUser} = useSelector((state) => state.user);
  const useNavigate = 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/admin/users');
        const data = await res.json();

        if (data.success === false) {
          setError(data.message);
        }
        setUsers(data);
        setUsers((prev) => prev.filter((user) => user._id !== currentUser._id));
      
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, [users]);

  const handleDeleteUser = async (id)=>{

     try{
         
        const res = await fetch(`/api/admin/delete/${id}`, {
            method : 'DELETE',
        });

        const data = res.json();

        if(data.success === false){
            console.log(data.message);
            return;
          }

     }
     catch(error)
     {
        console.log(error);
     }
  }

   const handleUser = ()=>{
       
      
   }


  return (
    <main>
      <div className="text-5xl text-center p-3"> Users</div>

      <div className="my-3 flex flex-col gap-4">
        <div className=" h-[100px] w-[800px] self-center ">
          {users.map((user) => (
            <div
              key={user._id} // Fix: Use user._id instead of listing._id
              className="border rounded-lg p-3 flex justify-between items-center my-4"
            >
              <img
                src={user.avatar}
                alt="user avatar"
                className="h-16 w-16 object-contain"
              />
              <button onClick={handleUser} className='text-2xl font-semibold text-slate-700'>{user.username}</button>
              <Link
            to={`mailto:${user.email}?`}
            className="bg-slate-700 text-center text-white p-3 uppercase rounded-lg hover:opacity-95"
          >
            Send Message
          </Link>


              <button 
                    className="text-red-700 uppercase"
                    onClick={ ()=>  handleDeleteUser(user._id)}
                  >
                    Delete
                  </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
