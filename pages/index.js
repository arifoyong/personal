import Img from 'next/image'
import Link from 'next/link'
import Layout from '../components/Layout'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'


const BlogPostCard = ({title, description, date, slug}) => {
  return (
    <Link href={`/blog/${slug}`}>
      <a className="flex flex-col w-full md:w-1/3 justify-between
            border border-blue-600 rounded-lg shadow-md
            transform hover:scale-[1.04] transition-all">
        <div className="flex flex-col">
          <h3 className="text-lg text-gray-800 px-4 py-2 
                rounded-t-lg mb-2 bg-gray-200">
            {title}
          </h3>
          <p className="text-gray-600 px-4" >
            {description}
          </p>
        </div>
        
        <p className="text-sm text-right px-4 py-4 md:py-2">
            {date}
        </p>
        
      </a>
    </Link>
  )
}


export default function Home({sortedPosts}) {

  return (
    <Layout>
      <div className="flex flex-col px-6 py-4 space-y-6">
        {/* Hero section */}
        <section className="flex items-start justify-between">
          <div className="px-4">
            <h1 className="font-bold text-3xl md:text-5xl mb-2">
              Arif Wicaksono Oyong
            </h1>
            <h2 className="text-lg mb-4 text-gray-800 dark:text-gray-200">
              Asst. Manager - Machine Engineer
            </h2>
            <p className="mb-16 text-gray-600 dark:text-gray-400">
              Experienced in deploying smart factory solutions for manufacturing. Helping to bridge automation &#38; information technology. 
            </p>
   
          </div>

          <div className="px-2 flex flex-col space-y-4">
            <Img  className="rounded-full"
                  src="/profile.jpg"
                  alt="Picture of the author"
                  width={300}
                  height={300}/>

            <div className="flex flex-row justify-center space-x-4">
              <Link href="https://github.com/arifoyong">
                <a>
                  <svg  className="fill-current text-blue-600 hover:text-blue-800  dark:text-blue-500" 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
              </Link>
              <Link href="https://www.linkedin.com/in/arif-wicaksono-oyong-62087721/">
                <a>
                  <svg className="fill-current text-blue-600 hover:text-blue-800 dark:text-blue-500" 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" height="24" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
              </Link>
            </div>
          </div>
        </section>

        {/* Blog section */}
        <section>
          <h1 className="font-bold text-2xl mb-4">
            Recent Blogs
          </h1>
          
          <div className="flex flex-col md:flex-row gap-6 items-stretch items-start">
            {sortedPosts.slice(0,3).map((dt, index) => (
              <BlogPostCard key={index} {...dt} />
            ))}
          </div>
          
        </section>
      </div>
    </Layout>
  )
}


export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join('posts'))

  const posts = files.map(filename => {
      const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')
      const { data: frontMatter } = matter(markdownWithMeta)

      return {
          ...frontMatter,
          slug: filename.split('.')[0]
      }
  })

  const sortedPosts = posts.sort((a,b) => {
    if (a.date < b.date) {
      return 1
    } else if (a.date > b.date) {
      return -1
    } else {
      return 0
    }
  })

  return {
      props: { sortedPosts }
  }
}