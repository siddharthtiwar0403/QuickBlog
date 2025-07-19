import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets, blog_data, comments_data } from '../assets/assets'
import Navbar from '../components/Navbar'
import Moment from 'moment'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Blog = () => {

  const {id} = useParams()

  const { axios } = useAppContext()

  const [data, setData] = useState(null)
  const [comments, setComments] = useState([])

  const [name, setName] = useState('')
  const [content, setContent] = useState('')

   const fetchBlogData = async ()=>{
   try {
    const {data} = await axios.get(`/api/blog/${id}`)
    console.log(data)
    data.success ? setData(data.blog) : toast.error(data.message)
   } catch (error) {
    toast.error(error.message)
   }
  }

  const fetchComments = async ()=> {
    try {
      const { data } = await axios.post('/api/blog/comments', {blogId: id})
      console.log(data)
      if(data.success){
        setComments(data.comments)
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }


  const addComment = async (e) =>{
    e.preventDefault()

    try {
      const { data } = await axios.post('/api/blog/add-comment', {blog: id, name, content})

      if(data.success){
        toast.success(data.message)
        setName('')
        setContent('')
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    fetchBlogData()
    fetchComments()
  },[])

  return data ? (
    <div className='relative'>
      <img src={assets.gradientBackground} className='absolute -top-50 -z-1 opacity-80' alt="" />
      <Navbar/>

      <div className='text-center mt-10 text-black'>
        <p className='text-primary py-4 font-medium'>Published on {Moment(data.createdAt).format('MMMM Do YYYY')}</p>

        <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-black'>{data.title}</h1>
        <h2 className='my-5 max-w-lg truncate mx-auto'>{data.subTitle}</h2>
        <p className='inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary'>Siddharth Tiwari</p>
      </div>

      <div className='mx-5 max-w-3xl md:mx-auto my-10 mt-6'>
        <img src={data.image} className='rounded-3xl mb-5' alt="" />

        <div className='rich-text max-w-3xl mx-auto' dangerouslySetInnerHTML={{__html:data.description}}></div>

        {/* comment section  */}

        <div className='mt-14 mb-10 max-w-3xl mx-auto'>
            <p className='font-semibold'>Comments ({comments.length})</p>
            <div className='mt-3 flex flex-col gap-4'>
              {comments.map((item, index) =>(
                <div key={index} className='relative bg-gray-200 border border-primary/5 max-w-xl p-4 rounded text-black'>
                  <div>
                    <img src={assets.user_icon} className='w-6' alt="" />
                    <p className='font-medium'>{item.name}</p>
                  </div>
                  <p className='text-sm max-w-md'>{item.content}</p>
                  <div className='absolute right-4 bottom-3 flex items-center gap-2 text-xs'>{Moment(item.createdAt).fromNow()}</div>
                </div>
              ))}
            </div>
        </div>

        {/* Add Coment section */}

        <div className='max-w-3xl mx-auto'>
  <p className='font-semibold mb-4'>Add a Comment</p>
  <form onSubmit={addComment} className='flex flex-col items-center gap-4 max-w-lg'>
    <input
      onChange={(e) => setName(e.target.value)}
      value={name}
      type='text'
      placeholder='Name'
      required
      className='w-full p-2 border border-gray-300 rounded outline-none'
    />
    <textarea
      onChange={(e) => setContent(e.target.value)}
      value={content}
      placeholder='Comment'
      required
      className='w-full h-40 p-2 border border-gray-300 rounded outline-none'
    ></textarea>
    <button
      type='submit'
      className='bg-primary text-white rounded p-2 px-8 hover:scale-105 transition-all cursor-pointer'
    >
      Submit
    </button>
  </form>
</div>


        {/* Share Buttons */}

        <div className='my-24 max-w-3xl mx-auto'>
          <p className='font-semibold my-4'>Share this article on social media</p>

          <div className='flex'>
            <img src={assets.facebook_icon} width={50} alt="" />
            <img src={assets.twitter_icon} width={50} alt="" />
            <img src={assets.googleplus_icon} width={50} alt="" />
          </div>
        </div>
      </div>
              <Footer/>
    </div>
  ) :<div>
    <Loader/>
  </div>
}

export default Blog
