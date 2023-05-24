import { useRef } from 'react'
import ScrollableFeed from 'react-scrollable-feed'

const Chatbox = ({ selectedChat }) => {
    const imgRef = useRef();

    return (
        <div className='w-full shadow-bg'>
            {
                selectedChat 
                ? 
                    <div>
                        <div className='py-4 px-4 flex items-center justify-between border-b'>
                            <div>
                                <img 
                                src={selectedChat?.image} 
                                alt="User" 
                                className='w-[60px] h-[60px] rounded-full object-cover'
                                />
                            </div>
                            <div className='font-semibold'>
                                <span>{selectedChat?.name}</span>
                            </div>
                        </div>
                        {/* Messages */}
                        <ScrollableFeed>
                            <div className='flex flex-col gap-4 p-4 h-[350px] overflow-auto '>
                                {
                                    [...Array(6).keys()].map((item , i) => (
                                        <div 
                                        className={`
                                        ${i%2 !== 0 ? 'flex justify-end' : ''}`} 
                                        key={i}>
                                            <div className={`w-fit max-w-[400px] rounded-md border p-3 text-[15px]
                                            ${i%2 !== 0 ? "bg-primary text-white" : "bg-gray-200 text-black"}
                                            `}>
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, sunt!
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </ScrollableFeed>
                        {/* Write Message */}
                        <div className='w-full table-header-shadow rounded-md flex items-center gap-3 mt-4 border-t border-t-gray-300'>
                            <form className='flex items-center justify-between w-full px-3 gap-4 py-6'>
                                <div className='w-fit'>
                                    <input type="file" hidden ref={imgRef} />
                                    <div className='cursor-pointer round-shadow rounded-full w-[40px] h-[40px] bg-gray-200 flex items-center justify-center text-xl'
                                    onClick={() => imgRef.current.click() }>
                                       <i className="uil uil-camera"></i>
                                    </div>
                                </div>
                                <div className='w-full'>
                                    <input 
                                    placeholder='Write message here...'
                                    className='rounded-full w-full py-2 px-4   bg-transparent outline-none  border border-gray-400 focus:border-primary'
                                    />
                                </div>
                                <div className='flex-[0.1]'>
                                    <button className='btn-primary py-2 px-4'>Send</button>
                                </div>
                            </form>
                        </div>
                    </div>
                : 
                    <div className=' flex items-center justify-center text-grayText font-semibold text-2xl w-full h-[510px]'>
                        No Chat is Selected
                    </div>
            }
        </div>
    )
}

export default Chatbox