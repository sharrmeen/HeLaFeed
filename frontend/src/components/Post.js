import React from "react";

function Post({ post }) {
    return (
        <div className='bg-background-light rounded-lg shadow-md p-6 mb-6 border border-background-dark'>
            <div className='flex items-center mb-4'>
                <div className='w-10 h-10 rounded-full bg-primary flex items-center justify-center text-background-dark font-bold mr-3'>
                    {post.authorUsername[0].toUpperCase()}
                </div>
                <div>
                    <p className='font-semibold text-text-dark'>{post.authorUsername}</p>
                </div>
            </div>
            <p className='text-text-light mb-4'>{post[2]}</p>
        </div>
    );
}

export default Post;