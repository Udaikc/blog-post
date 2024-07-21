import Link from "next/link";
import { formatDate, getBlogposts } from "../blog/utils";

export default function LatestPosts() {
    let latestPosts = getBlogposts();

    return (
        <>
            <h1>Recently Published</h1>
            {
                latestPosts.sort((a, b) => {
                    if (new Date(a.metadata.PublishedAt) > new Date(b.metadata.PublishedAt)) {
                        return -1;
                    }
                    return 1;
                })
                    .map((post) => (
                        <article className="text-wrap max-w-md my-10" key={post.slug}>
                            <Link href={`${post.slug}`}>
                                <h1 className="text-blog py-2 leading-5 hover:text-blue-500">
                                    {post.metadata.title}
                                </h1>
                            </Link>
                            <p className="leading-10 my-5">{post.metadata.summary}</p>
                            <p className="text-sm text-muted-foreground">{formatDate(post.metadata.publishedAt)}</p>
                        </article>
                    ))
            }
        </>
    );
}
