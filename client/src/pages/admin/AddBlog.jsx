import React, { useEffect, useRef, useState } from 'react'
import { assets, blogCategories } from '../../assets/assets'
import Quill from 'quill'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import {parse} from 'marked'

const AddBlog = () => {

  const { axios } = useAppContext()
  const [isAdding, setIsAdding] = useState(false)
  const [loading, setLoading] = useState(false)

  const editorRef = useRef(null)
  const quillRef = useRef(null)

  const [image, setImage] = useState(false)
  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [category, setCategory] = useState('Startup')
  const [isPublished, setIsPublished] = useState(false)

  const generateContent = async() =>{
    if(!title) return toast.error('Please enter a title')

      try {
        setLoading(true)

        const { data } = await axios.post('/api/blog/generate', {prompt: title})
        if(data.success){
          quillRef.current.root.innerHTML = parse(data.content)
        }else{
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }finally{
        setLoading(false)
      }
  }

  const onSubmitHandler = async (e) =>{

    try {
       e.preventDefault()
       setIsAdding(true)

       const blog = {
        title, subTitle,
        description: quillRef.current.root.innerHTML,
        category, isPublished
       }

       const formData = new FormData()
       formData.append('blog', JSON.stringify(blog))
       formData.append('image', image)

       const { data} = await axios.post('/api/blog/add', formData)
       if(data.success){
        toast.success(data.message)
        setImage(false)
        setTitle('')
        quillRef.current.root.innerHTML = ''
        setCategory('Startup')
       }else{
        toast.error(data.message)
       }
    } catch (error) {
      toast.error(error.message)
    }finally{
      setIsAdding(false)
    }
   
  }

  useEffect(()=>{
    if(!quillRef.current && editorRef.current){
      quillRef.current = new Quill(editorRef.current, {theme: 'snow'})
    }
  },[])

  return (
    <form onSubmit={onSubmitHandler} className='flex-1 bg-blue-50/50 text-black h-full overflow-scroll'>
      <div className='bg-white w-full max-w-4xl p-4 md:p-10 sm:m-10 shadow rounded'>

        <p>Upload Thumbnail</p>
        <label htmlFor="image">
          <img src={!image ? assets.upload_area : URL.createObjectURL(image)} className='mt-2 h-16 rounded cursor-pointer' alt="" />
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image'  name="image" hidden required/>
        </label>

        <p className='mt-4'>Blog Title</p>
        <input type="text" placeholder='Type here' className='w-full max-w-lg mt-2 p-3
         border border-gray-300 outline-none rounded' onChange={e => setTitle(e.target.value)} value={title}/>

        <p className='mt-4'>Sub Title</p>
        <input type="text" placeholder='Type here' className='w-full max-w-lg mt-2 p-3
         border border-gray-300 outline-none rounded' onChange={e => setSubTitle(e.target.value)} value={subTitle}/>

         <p className='mt-4'>Blog Description</p>
         <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative'>
          <div className='' ref={editorRef}></div>

          {loading && (
            <div className='absolute right-0 top-0 bottom-0 left-0 flex items-center justify-center bg-black/10'>
              <div className='w-8 h-8 rounded-full border-2 border-t-white animate-spin'></div>
            </div>
          )}
          <button type='button' disabled={loading} onClick={generateContent} className='absolute bottom-1 right-2 ml-2 text-x text-white bg-primary px-4 py-1.5 rounded-2xl hover:scale-110 transition cursor-pointer'>Gentrate With AI</button>
         </div>

         <p className='mt-4'>Blog Category</p>
         <select onChange={e => setCategory(e.target.value)} className='mt-2 px-3 py-2 border text-black border-gray-300 outline-none rounded' name="category" >
          <option value="">Select Category</option>
            {blogCategories.map((item, index) =>{
              return <option key={index} value={item}>{item}</option>
            })}
         </select>

         <div className='flex gap-3 mt-4'>
          <p>Publish Now</p>
          <input type="checkbox" checked={isPublished} className='cursor-pointer scale-125' onChange={e => setIsPublished(e.target.checked)}/>
         </div>

         <button type='submit' disabled={isAdding} className='mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm  hover:bg-blue-700'>{isAdding ? 'Adding!!' : 'Add Blog'}</button>
      </div>
    </form>
  )
}

export default AddBlog
