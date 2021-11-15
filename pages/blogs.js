import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'
import Link from 'next/link'

import Layout from '../components/Layout'


const BlogPost = (post) => {
    return (
        <Link href={'/blog/' + post.slug}>
        <a className="px-3 py-4 hover:shadow-lg">
            <h4 className="text-xl font-semibold mb-2
                        px-4 py-2
                        rounded-tl-xl
                        rounded-br-xl
                        bg-gray-200 dark:bg-gray-800
                        text-gray-800 dark:text-gray-200">
                {post.frontMatter.title}
            </h4>
            <p className="text-gray-600 dark:text-gray-400 
                        px-4 mb-2">
                {post.frontMatter.description}
            </p>
        </a>
    </Link>
    )
}
   

const Blogs = ({posts}) => {
    return (
        <Layout title="Blog - Arif Oyong"
                description="Thoughs and my learning journey on software development and interesting new technologies"
        >
            <div className="flex flex-col px-10 py-4 w-full space-y-6">
                <h2 className="text-xl sm:text-4xl font-bold">
                    All Blogs
                </h2>
                {posts.map( (post,i) => <BlogPost key={i} {...post}/> )}
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
            frontMatter,
            slug: filename.split('.')[0]
        }
    })

    return {
        props: { posts }
    }
}

export default Blogs