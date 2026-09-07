export const SECTION_IDS = {
  slice: "slice",
  blog: "blog",
};

const anchor = (id) => `#${id}`;

/** The Ghost blog. Posts live on this host; the API is on dmnd.ghost.io. */
export const BLOG_HOST = "https://blog.dmnd.work";

const OTHER_PAGES = {
  sliceDeepDive: "https://dmnd.work/slice.html",
  terms: "https://dmnd.work/termsofservice.html",
  privacy: "https://dmnd.work/privacypolicy.html",
};

/**
 * Destinations with no page anywhere on the live site. Each stays a
 * self-referencing anchor until someone supplies a URL; swapping one here updates
 * every reference to it.
 */
const PENDING = {
  /**
   * The nav's "Docs" item. There is no docs site -- no subdomain, no link on the
   * live page. The setup guide is the closest thing that exists, but a guide is
   * not documentation, so this is left dead rather than pointed somewhere wrong.
   */
  docs: "#docs",
  /**
   * "Learn more" under the hash-hijack card. The live site makes the same claim
   * but links nowhere from it.
   */
  security: "#security",
};

export const LINKS = {
  home: "/",
  slice: anchor(SECTION_IDS.slice),
  blog: anchor(SECTION_IDS.blog),

  // Product surfaces.
  startMining: "https://dashboard.dmnd.work",
  signIn: "https://dashboard.dmnd.work",
  blogIndex: `${BLOG_HOST}/`,
  trustCenter: "https://app.eu.vanta.com/dmnd.work/trust/4u48n4nf8yiwi9swpqjsf",
  transparency: "https://transparency.dmnd.work",

  // Broker signup.
  brokerSignup: "https://dashboard.dmnd.work/broker",

  // "Mining at institutional scale? Talk to us" -- the live site publishes this
  // address in its footer and offers no contact form, so mail is the real route.
  institutions: "mailto:info@dmnd.work",

  // Long-form pieces that back up a specific claim on the page.
  runNode: `${BLOG_HOST}/build-your-own-blocks-set-up-dmnd-end-to-end/`,
  postTransactionPriority: `${BLOG_HOST}/prioritizing-transactions-on-your-own-block-templates-with-stratumv2/`,
  postBipSignaling: `${BLOG_HOST}/how-to-signal-for-any-bip-while-mining-on-dmnd/`,
  postMergeMining: `${BLOG_HOST}/build-your-own-blocks-with-stratum-v2-and-merge-mine-rootstock/`,
  postFirstBlock: `${BLOG_HOST}/dmnd-mines-the-first-known-bitcoin-block-using-stratum-v2-job-declaration/`,

  // Social.
  linkedin: "https://www.linkedin.com/company/dmndpool",
  x: "https://x.com/DMND_Sv2",

  ...OTHER_PAGES,
  ...PENDING,
};

/** True for destinations that have not been supplied yet. */
export const isPending = (href) => Object.values(PENDING).includes(href);
