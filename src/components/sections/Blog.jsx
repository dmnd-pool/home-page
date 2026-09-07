import { useEffect, useState } from 'react';
import Button from '../Button.jsx';
import Logo from '../Logo.jsx';
import AltArrowRight from '../icons/AltArrowRight.jsx';
import ArrowRightUp from '../icons/ArrowRightUp.jsx';
import { fetchLatestPosts } from '../../lib/ghost.js';
import { LINKS, SECTION_IDS } from '../../config/links.js';

const FALLBACK_POSTS = [
  {
    id: 'fallback-1',
    title: 'Build Your Own Blocks with Stratum V2 and Merge Mine Rootstock',
    url: LINKS.postMergeMining,
    image: null,
    date: '27 Jul 2026',
    readingTime: '6 min read',
  },
  {
    id: 'fallback-2',
    title: 'Prioritizing Transactions on Your Own Block Templates with StratumV2',
    url: LINKS.postTransactionPriority,
    image: null,
    date: '23 Jul 2026',
    readingTime: null,
  },
  {
    id: 'fallback-3',
    title: 'Build Your Own Blocks: Set Up DMND End to End with StratumV2',
    url: LINKS.runNode,
    image: null,
    date: '20 Jul 2026',
    readingTime: '4 min read',
  },
];

const CARD_COUNT = 3;

function CardShell({ children }) {
  return (
    <article className="flex w-full flex-col bg-bg-primary shadow-[inset_0_0_0_0.5px_var(--color-border-default)] lg:flex-1">
      {children}
    </article>
  );
}

function SkeletonCard() {
  return (
    <CardShell>
      <div className="h-[220px] w-full animate-pulse bg-bg-secondary" />
      <div className="flex flex-col gap-4 p-6">
        <div className="flex flex-col gap-1">
          {/* Two bars at the heading's own line-height, so the skeleton occupies
              the same 64px a two-line title will. */}
          <div className="flex h-16 flex-col justify-center gap-2">
            <div className="h-4 w-full animate-pulse bg-bg-secondary" />
            <div className="h-4 w-2/3 animate-pulse bg-bg-secondary" />
          </div>
          <div className="h-5 w-28 animate-pulse bg-bg-secondary" />
        </div>
        <div className="h-6 w-14 animate-pulse bg-bg-secondary" />
      </div>
    </CardShell>
  );
}

function PostCard({ post }) {
  const dateline = [post.date, post.readingTime].filter(Boolean).join(' · ');
  return (
    <CardShell>
      {post.image ? (
        // Remote, so it does not go through the local AVIF pipeline. The fixed
        // 220px height means an unknown intrinsic size costs no layout shift.
        <img
          src={post.image}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="h-[220px] w-full bg-bg-secondary object-cover"
        />
      ) : (
        // A post with no feature image falls back to the wordmark rather than
        // an unrelated stock photo, so the card reads as ours.
        <div className="flex h-[220px] w-full items-center justify-center bg-bg-secondary">
          <Logo width={96} height={40} className="text-body-alt" />
        </div>
      )}
      <div className="flex flex-col gap-4 p-6">
        <div className="flex flex-col gap-1">
          <h3 className="font-heading text-xl leading-8 text-body-default">{post.title}</h3>
          <p className="text-sm text-body-alt">{dateline}</p>
        </div>
        <Button variant="tertiary" size="default" href={post.url} link label="Read">
          <ArrowRightUp />
        </Button>
      </div>
    </CardShell>
  );
}

export default function Blog() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    fetchLatestPosts({ limit: CARD_COUNT, signal: controller.signal })
      .then((latest) => {
        if (latest.length > 0) setPosts(latest);
        else setPosts(FALLBACK_POSTS);
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setPosts(FALLBACK_POSTS);
      });
    return () => controller.abort();
  }, []);

  return (
    <section
      id={SECTION_IDS.blog}
      className="overflow-hidden bg-bg-default px-4 pt-12 pb-20 lg:px-6 lg:pt-16 lg:pb-30 xl:pr-28 xl:pl-30"
    >
      <div className="mx-auto grid w-full gap-6 lg:max-w-[1208px] lg:grid-cols-[1fr_auto] lg:items-center">
        <h2 className="font-heading text-4xl text-body-alt lg:row-start-1">
          {'Latest from the '}
          <span className="font-medium text-header-alt">blog</span>
        </h2>

        <div className="flex flex-col gap-1 lg:col-span-2 lg:row-start-2 lg:flex-row">
          {posts === null
            ? Array.from({ length: CARD_COUNT }, (_, i) => <SkeletonCard key={i} />)
            : posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
        </div>

        <Button
          variant="secondary"
          size="default"
          href={LINKS.blogIndex}
          label="Read all blogs"
          className="justify-self-center lg:col-start-2 lg:row-start-1 lg:justify-self-end"
        >
          <AltArrowRight />
        </Button>
      </div>
    </section>
  );
}
