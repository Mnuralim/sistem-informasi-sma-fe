import React from 'react'
import BlogCard from './components/blog-card'
import { getBlog } from '@/lib/blog'

const BlogPage = async () => {
  const posts = await getBlog()
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-base font-semibold tracking-wide uppercase text-orange-05">Blog</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-dark-blue">Artikel Terbaru</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.content}
              author={post.createdByAdmin.username}
              date={post.createdAt}
              coverImage={post.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default BlogPage
