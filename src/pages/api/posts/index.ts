import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const prerender = false;

export const GET: APIRoute = async ({ params, request}) => {
    const posts = await getCollection("blog")
    const url = new URL(request.url);
    const slug = url.searchParams.get("slug")

    const postSlug = posts.find((post) => post.slug === slug)
    const result = (slug && postSlug !== null) ? postSlug : posts;

    console.log({slug, postSlug})

    return new Response(
        JSON.stringify(result), 
        { 
            status: 200,
            headers: {
                'Content-Type': "application/json"
            }
        }
    );
}
