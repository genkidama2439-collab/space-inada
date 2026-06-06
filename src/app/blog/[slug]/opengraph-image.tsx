import { getPost, getPosts } from "@/data/posts";
import { renderOgImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "星空フォトコラム";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  return renderOgImage({
    eyebrow: "星空フォトコラム",
    title: post ? post.title : "コラム",
  });
}
