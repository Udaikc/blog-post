import { getBlogposts } from "../blog/utils";

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
                        <article key={post.slug}>{post.metadata.title}</article>
                    ))
            }
        </>
    );
}
