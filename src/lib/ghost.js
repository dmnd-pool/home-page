// The public Ghost origin supports browser CORS; blog.dmnd.work redirects API requests.
const GHOST_API = 'https://dmnd.ghost.io/ghost/api/content/posts/';
const CONTENT_API_KEY = '123895ea550e80b78a314ed590';

export const sizedImage = (url, width = 800) =>
  url && url.includes('/content/images/')
    ? url.replace('/content/images/', `/content/images/size/w${width}/`)
    : url;

const formatDate = (iso) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? ''
    : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

export async function fetchLatestPosts({ limit = 3, signal } = {}) {
  const url = `${GHOST_API}?key=${CONTENT_API_KEY}&limit=${limit}&order=${encodeURIComponent('published_at desc')}`;
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(`Ghost responded ${response.status}`);

  const { posts = [] } = await response.json();
  return posts.map((post) => ({
    id: post.id,
    title: post.title,
    url: post.url,
    image: post.feature_image ? sizedImage(post.feature_image) : null,
    date: formatDate(post.published_at),
    readingTime: post.reading_time ? `${post.reading_time} min read` : null,
  }));
}
