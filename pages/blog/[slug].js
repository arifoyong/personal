import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import Layout from '../../components/Layout'

const PostPage = ({ frontMatter, mdxSource}) => (
    <Layout title={frontMatter.title} 
        description={frontMatter.description}
    >
        <div className="px-10">
            <h1 className="text-2xl md:text-5xl font-bold mb-8">
                {frontMatter.title}
            </h1>
            <div className="prose prose-lg dark:prose-dark max-w-full">
                <MDXRemote {...mdxSource} />
            </div>
        </div>
    </Layout>
)


export const getStaticPaths = async () => {
    const files = fs.readdirSync(path.join('posts'))

    const paths = files.map(filename => ({
        params: {
            slug: filename.replace('.mdx', '')
        }
    }))

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async ({params: { slug }}) => {
    const markdownWithMeta = fs.readFileSync(path.join('posts', `${slug}.mdx`), 'utf-8')

    const { data: frontMatter, content } = matter(markdownWithMeta) 
    const mdxSource = await serialize(content)

    return {
        props: {
            frontMatter,
            mdxSource
        }
    }
}

export default PostPage