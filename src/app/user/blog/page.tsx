// pages/blog.tsx
import React from 'react'
import BlogCard from './components/blog-card'

const blogPosts = [
  {
    slug: 'first-blog-post',
    title: 'First Blog Post',
    summary: 'This is the summary of the first blog post.',
    author: 'Author One',
    date: 'July 20, 2024',
    coverImage: '/img/misi.png',
  },
  {
    slug: 'second-blog-post',
    title: 'Second Blog Post',
    summary: 'This is the summary of the second blog post.',
    author: 'Author Two',
    date: 'July 21, 2024',
    coverImage: '/img/misi.png',
  },
]

const BlogPage: React.FC = () => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-base text-[#EB5437] font-semibold tracking-wide uppercase">Blog</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-[#202244] sm:text-4xl">
            Artikel Terbaru
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <BlogCard
              key={index}
              slug={post.slug}
              title={post.title}
              summary={post.summary}
              author={post.author}
              date={post.date}
              coverImage={post.coverImage}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default BlogPage
