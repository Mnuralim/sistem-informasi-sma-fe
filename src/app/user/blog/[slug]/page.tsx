// pages/blog/[slug].tsx
import Image from 'next/image'
import React from 'react'

const blogPosts = [
  {
    slug: 'first-blog-post',
    title: 'First Blog Post',
    content: `<p>This is the detailed content of the first blog post.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque leo nec augue auctor, ac facilisis est cursus. Nam in massa venenatis, vestibulum mi vel, dignissim justo.</p>
              <h2>Subheading</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque leo nec augue auctor, ac facilisis est cursus.</p>
              <ul>
                <li>First point</li>
                <li>Second point</li>
                <li>Third point</li>
              </ul>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque leo nec augue auctor, ac facilisis est cursus.</p>`,
    author: 'Author One',
    date: 'July 20, 2024',
    coverImage: '/img/misi.png',
  },
  {
    slug: 'second-blog-post',
    title: 'Second Blog Post',
    content: `<p>This is the detailed content of the second blog post.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque leo nec augue auctor, ac facilisis est cursus. Nam in massa venenatis, vestibulum mi vel, dignissim justo.</p>
              <h2>Subheading</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque leo nec augue auctor, ac facilisis est cursus.</p>
              <ul>
                <li>First point</li>
                <li>Second point</li>
                <li>Third point</li>
              </ul>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque leo nec augue auctor, ac facilisis est cursus.</p>`,
    author: 'Author Two',
    date: 'July 21, 2024',
    coverImage: '/img/misi.png',
  },
]

interface Props {
  params: {
    slug: string
  }
}

const BlogDetailPage = ({ params }: Props) => {
  const { slug } = params

  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <Image
            src={post.coverImage}
            alt={post.title}
            width={1200}
            height={700}
            className="w-full  object-cover rounded-md mb-6"
          />
          <h1 className="text-3xl font-bold text-[#202244] mb-4">{post.title}</h1>
          <p className="text-sm text-gray-600 mb-6">
            By {post.author} on {post.date}
          </p>
          <div className="text-gray-800" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </div>
    </section>
  )
}

export default BlogDetailPage
