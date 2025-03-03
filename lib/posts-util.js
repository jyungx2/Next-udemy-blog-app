import fs from "fs";
import path from "path";

import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export function getPostsFiles() {
  return fs.readdirSync(postsDirectory);
}

export function getPostData(postIdentifier) {
  const postSlug = postIdentifier.replace(/\.md$/, ""); // remove the file extension
  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent); // data property contains a metadata. & content property contains the actual content.

  const postData = {
    slug: postSlug,
    ...data,
    content,
  };
  return postData;
}

export function getAllPosts() {
  // const postFiles = fs.readdirSync(postsDirectory);
  const postFiles = getPostsFiles();

  // for (const postFile of postFiles) {
  //   const postData = getPostData(postFile);
  // }

  // How to return an array right away.. (not looping over like above)
  const allPosts = postFiles.map((postFile) => {
    return getPostData(postFile);
  });

  const sortedPosts = allPosts.sort(
    (postA, postB) => (postA.date > postB.date ? -1 : 1) // which will make sure that posts with a greater date, so more ✨recent✨ posts are actually sort at, in front of older posts.
  );

  return sortedPosts;
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts();
  const featuredPosts = allPosts.filter((post) => post.isFeatured);
  return featuredPosts;
}
