export const SECTION_IDS = {
  slice: 'slice',
  blog: 'blog',
};

const anchor = (id) => `#${id}`;

export const BLOG_HOST = 'https://blog.dmnd.work';

export const LINKS = {
  home: '/',
  slice: '/slice',
  blog: `/${anchor(SECTION_IDS.blog)}`,
  apiDocs: '/api',

  startMining: 'https://new-platform.dmnd.work/signup',
  signIn: 'https://new-platform.dmnd.work',
  blogIndex: `${BLOG_HOST}/`,
  trustCenter: '/trust-center',
  transparency: 'https://transparency.dmnd.work',

  brokerSignup: 'https://new-platform.dmnd.work/broker/signin',

  institutions: 'mailto:info@dmnd.work',

  runNode: `${BLOG_HOST}/build-your-own-blocks-set-up-dmnd-end-to-end/`,
  postTransactionPriority: `${BLOG_HOST}/prioritizing-transactions-on-your-own-block-templates-with-stratumv2/`,
  postBipSignaling: `${BLOG_HOST}/how-to-signal-for-any-bip-while-mining-on-dmnd/`,
  postMergeMining: `${BLOG_HOST}/build-your-own-blocks-with-stratum-v2-and-merge-mine-rootstock/`,
  postFirstBlock: `${BLOG_HOST}/dmnd-mines-the-first-known-bitcoin-block-using-stratum-v2-job-declaration/`,

  linkedin: 'https://www.linkedin.com/company/dmndpool',
  x: 'https://x.com/DMND_Sv2',
  sliceDeepDive: '/slice',
  sliceExplainer: `${BLOG_HOST}/understanding-slice-pplns-jd/`,
  sliceWhitepaper: 'https://www.dmnd.work/pplns-with-job-declaration/pplns-with-job-declaration.pdf',
  terms: '/termsofservice',
  privacy: '/privacypolicy',
};
