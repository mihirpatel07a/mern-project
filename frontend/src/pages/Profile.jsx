import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from '../firebase';

export default function Profile() {
 
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileref = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  // const [updateSuccess, setUpdateSuccess] = useState(false);
  // const dispatch = useDispatch();

  useEffect(()=>{
if(file)

 handlefileupload(file);
  }, [file])


  const handlefileupload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        // console.log('Upload is: ' + progress + ' % done');
        setFilePerc(Math.round(progress));
      },

      (error) => {
        setFileUploadError(true);
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  


  }

  return (
    <>
    
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-center text-3xl font-semibold p-3 my-7 '>Profile</h1>
  
<form className='flex flex-col gap-4'>
  <input onChange={(e)=> setFile(e.target.files[0])} type='file' ref ={fileref} hidden accept='image./*'></input>
         <img onClick={()=> fileref.current.click()} className='rounded-full w-24 h-24 self-center object-cover cursor-pointer' src={formData.avatar ||  currentUser.avatar} ></img>

         <p className="text-sm self-center">
            {fileUploadError ?
              (<span className="text-red-700">Unable to Upload Image (Image must be less than 5 MB)</span>) :
              filePerc > 0 && filePerc < 100 ? (
                <span className="text-slate-700">
                  {`Uploading ${filePerc}%`}
                </span>
              ) :
              filePerc === 100 ? (
                <span className="text-green-700">
                  Image Successfully Uploaded
                </span>
              ) : (
                ''
              )
            }
          </p>

<input className='border rounded-lg p-2 ' type='text' placeholder='username' id='username' ></input>

<input className='border rounded-lg p-2 ' type='text' placeholder='username' id='username' ></input>

<input className='border rounded-lg p-2 ' type='text' placeholder='username' id='username' ></input>

<button className='rounded-lg p-2 border bg-slate-700 text-white'>Update</button>

</form>
<div className="flex justify-between mt-5">
          <span 
            className="text-red-700 cursor-pointer"
            
          >
              Delete Account
          </span>

          <span 
            className="text-red-700 cursor-pointer"
            
          >
            Sign Out
          </span>
        </div>
    </div> 
  
   

    </>
  )
}
