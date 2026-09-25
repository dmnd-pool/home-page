export const SECTION_IDS = {
  slice: 'slice',
  blog: 'blog',
};

const anchor = (id) => `#${id}`;

export const BLOG_HOST = 'https://blog.dmnd.work';

export const LINKS = {
  home: '/',
  slice: anchor(SECTION_IDS.slice),
  blog: anchor(SECTION_IDS.blog),

  startMining: 'https://dashboard.dmnd.work',
  signIn: 'https://dashboard.dmnd.work',
  blogIndex: `${BLOG_HOST}/`,
  trustCenter: 'https://app.eu.vanta.com/dmnd.work/trust/4u48n4nf8yiwi9swpqjsf',
  transparency: 'https://transparency.dmnd.work',

  brokerSignup: 'https://dashboard.dmnd.work/broker',

  institutions: 'mailto:info@dmnd.work',

  runNode: `${BLOG_HOST}/build-your-own-blocks-set-up-dmnd-end-to-end/`,
  postTransactionPriority: `${BLOG_HOST}/prioritizing-transactions-on-your-own-block-templates-with-stratumv2/`,
  postBipSignaling: `${BLOG_HOST}/how-to-signal-for-any-bip-while-mining-on-dmnd/`,
  postMergeMining: `${BLOG_HOST}/build-your-own-blocks-with-stratum-v2-and-merge-mine-rootstock/`,
  postFirstBlock: `${BLOG_HOST}/dmnd-mines-the-first-known-bitcoin-block-using-stratum-v2-job-declaration/`,

  linkedin: 'https://www.linkedin.com/company/dmndpool',
  x: 'https://x.com/DMND_Sv2',
  sliceDeepDive: 'https://dmnd.work/slice.html',
  terms: 'https://dmnd.work/termsofservice.html',
  privacy: 'https://dmnd.work/privacypolicy.html',
};
