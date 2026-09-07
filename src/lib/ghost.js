/**
 * Reads the blog straight from Ghost, so the homepage never carries a stale copy
 * of a post list someone has to remember to update.
 *
 * WHICH HOST. Posts are served from blog.dmnd.work, but the API is not: that
 * domain 302s every /ghost/api/ request, and its RSS feed sends no
 * `Access-Control-Allow-Origin` at all, so neither is reachable from the browser
 * on another origin. The Ghost-hosted origin answers the Content API with
 * `Access-Control-Allow-Origin: *`, which is the only cross-origin route that
 * works. Post URLs in the response still point at blog.dmnd.work, so readers
 * never see this host.
 *
 * THE KEY. Content API keys are public by design -- Ghost ships them in page
 * markup for its own client-side search, which is exactly where this one came
 * from. It grants read access to published posts and nothing else. Worth issuing
 * a dedicated integration key rather than borrowing the search widget's, though:
 * rotating that one would silently empty this section.
 */
const GHOST_API = 'https://dmnd.ghost.io/ghost/api/content/posts/';
const CONTENT_API_KEY = '123895ea550e80b78a314ed590';

/**
 * Ghost serves resized derivatives under a `/size/wNNN/` path segment. The
 * originals are full-resolution uploads -- the current lead image is 1.07MB,
 * against 268KB at w800 -- and the card only ever paints a 220px-tall strip.
 * Left alone if the URL is not a Ghost content image, so an externally hosted
 * feature image passes through untouched.
 */
export const sizedImage = (url, width = 800) =>
  url && url.includes('/content/images/')
    ? url.replace('/content/images/', `/content/images/size/w${width}/`)
    : url;

/** "27 Jul 2026", matching how the live site datelines its posts. */
const formatDate = (iso) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? ''
    : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

/**
 * The newest posts, already shaped for the card.
 *
 * Ghost's default order is `published_at desc`, but it is passed explicitly so
 * the ordering is a property of this call rather than of a remote default. No
 * `fields` filter: restricting it drops `reading_time`, which is computed rather
 * than stored.
 */
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
