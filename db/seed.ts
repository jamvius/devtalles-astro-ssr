import { getCollection } from "astro:content";
import { db, Clients, Posts } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Clients).values([
    { id: 1, name: "User1", age: 41, isActive: true },
    { id: 2, name: "User2", age: 42, isActive: true },
    { id: 3, name: "User3", age: 43, isActive: true },
    { id: 4, name: "User4", age: 44, isActive: true },
    { id: 5, name: "User5", age: 45, isActive: true },
  ]);

  const posts = await getCollection("blog");
  await db.insert(Posts).values(
    posts.map((post) => ({
      id: post.id,
      title: post.data.title,
      likes: Math.floor(Math.random() * 100),
    }))
  );

  console.log("Database seeded!");
}
