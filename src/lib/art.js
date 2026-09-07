/**
 * Every picture on the page, with its encoded variants, in one place.
 *
 * Astro resolved this through `astro:assets` and a `getImage()` call inside the
 * component. Vite has no equivalent, so the transforms are asked for by import
 * query (`vite-imagetools` runs sharp behind them) and collected here rather than
 * scattered three-to-a-file through the sections.
 *
 * Two rules decide which variants an image gets:
 *
 *  - AVIF, always. It roughly halves every asset here, photographs included.
 *  - WebP, only when the source is not already lossy. The three blog photographs
 *    are 800px JPEGs that have been through an encoder once; re-encoding them to
 *    WebP lands within a few percent of the original, and on two of the three it
 *    lands OVER it. A <source> that is bigger than the file it replaces is worse
 *    than no <source> at all, so those get AVIF and the original and nothing in
 *    between.
 *
 * Quality is the third rule, and it is set per picture rather than globally,
 * because the encoder default of 50 is either wasteful or wrong depending on what
 * is in the frame:
 *
 *  - 35 for the flat two-tone art (hero, CTA texture, aerial map, server rack).
 *    These are dithered vector exports -- two colours and hard edges, nothing for
 *    a lossy encoder to blur -- and 35 is pixel-indistinguishable from 50 at 1:1
 *    while cutting each file by roughly a third.
 *  - 40 for the dashboard backdrop, a photographic halftone that is full-bleed
 *    behind a scrim. Finer grain than the flat art, so it gets a gentler step.
 *  - The default for the dashboard screenshots and the blog photographs. The
 *    screenshots carry readable product UI and the photographs are editorial;
 *    neither is the place to save 15KB.
 *
 * `?as=img` returns `{src, w, h}`, which is where the intrinsic dimensions come
 * from -- they go on the <img> to reserve the box and keep the page from
 * reflowing as each one lands.
 *
 * Sizes are never reduced. The exports are already 2x their drawn size, which is
 * what a retina screen wants, and re-deriving a width per breakpoint would drift
 * from the crops Figma produced.
 */

import heroImg from '../assets/art-hero-warehouse.png?as=img';
import heroAvif from '../assets/art-hero-warehouse.png?format=avif&quality=35&as=url';
import heroWebp from '../assets/art-hero-warehouse.png?format=webp&quality=65&as=url';

import heroMobileImg from '../assets/art-hero-warehouse-mobile.png?as=img';
import heroMobileAvif from '../assets/art-hero-warehouse-mobile.png?format=avif&quality=35&as=url';
import heroMobileWebp from '../assets/art-hero-warehouse-mobile.png?format=webp&quality=65&as=url';

import ctaImg from '../assets/art-cta-texture.png?as=img';
import ctaAvif from '../assets/art-cta-texture.png?format=avif&quality=35&as=url';
import ctaWebp from '../assets/art-cta-texture.png?format=webp&quality=65&as=url';

import ctaMobileImg from '../assets/art-cta-texture-mobile.png?as=img';
import ctaMobileAvif from '../assets/art-cta-texture-mobile.png?format=avif&quality=35&as=url';
import ctaMobileWebp from '../assets/art-cta-texture-mobile.png?format=webp&quality=65&as=url';

import shotImg from '../assets/dashboard-screenshot.png?as=img';
import shotAvif from '../assets/dashboard-screenshot.png?format=avif&as=url';
import shotWebp from '../assets/dashboard-screenshot.png?format=webp&as=url';

import shotMobileImg from '../assets/dashboard-screenshot-mobile.png?as=img';
import shotMobileAvif from '../assets/dashboard-screenshot-mobile.png?format=avif&as=url';
import shotMobileWebp from '../assets/dashboard-screenshot-mobile.png?format=webp&as=url';

import backdropImg from '../assets/art-dashboard-backdrop.webp?as=img';
import backdropAvif from '../assets/art-dashboard-backdrop.webp?format=avif&quality=40&as=url';
import backdropWebp from '../assets/art-dashboard-backdrop.webp?format=webp&quality=65&as=url';

import aerialImg from '../assets/art-aerial-map.png?as=img';
import aerialAvif from '../assets/art-aerial-map.png?format=avif&quality=35&as=url';
import aerialWebp from '../assets/art-aerial-map.png?format=webp&quality=65&as=url';

import rackImg from '../assets/art-server-rack.png?as=img';
import rackAvif from '../assets/art-server-rack.png?format=avif&quality=35&as=url';
import rackWebp from '../assets/art-server-rack.png?format=webp&quality=65&as=url';

import chevronImg from '../assets/art-efficiency-chevron.png?as=img';
import chevronAvif from '../assets/art-efficiency-chevron.png?format=avif&as=url';
import chevronWebp from '../assets/art-efficiency-chevron.png?format=webp&as=url';

import shieldImg from '../assets/art-security-shield.png?as=img';
import shieldAvif from '../assets/art-security-shield.png?format=avif&as=url';
import shieldWebp from '../assets/art-security-shield.png?format=webp&as=url';

import soc2Img from '../assets/art-soc2-badge.png?as=img';
import soc2Avif from '../assets/art-soc2-badge.png?format=avif&as=url';
import soc2Webp from '../assets/art-soc2-badge.png?format=webp&as=url';

import blog1Img from '../assets/blog/blog-1.jpg?as=img';
import blog1Avif from '../assets/blog/blog-1.jpg?format=avif&as=url';

import blog2Img from '../assets/blog/blog-2.jpg?as=img';
import blog2Avif from '../assets/blog/blog-2.jpg?format=avif&as=url';

import blog3Img from '../assets/blog/blog-3.jpg?as=img';
import blog3Avif from '../assets/blog/blog-3.jpg?format=avif&as=url';

/** `webp` is null for sources that gain nothing from it. See the note above. */
const asset = (img, avif, webp = null) => ({
  src: img.src,
  width: img.w,
  height: img.h,
  avif,
  webp,
});

export const heroWarehouse = asset(heroImg, heroAvif, heroWebp);
export const heroWarehouseMobile = asset(heroMobileImg, heroMobileAvif, heroMobileWebp);

export const ctaTexture = asset(ctaImg, ctaAvif, ctaWebp);
export const ctaTextureMobile = asset(ctaMobileImg, ctaMobileAvif, ctaMobileWebp);

export const dashboardScreenshot = asset(shotImg, shotAvif, shotWebp);
export const dashboardScreenshotMobile = asset(shotMobileImg, shotMobileAvif, shotMobileWebp);

// Already WebP on disk, so a same-quality re-encode would gain nothing. A
// re-encode at 65 is a different question: it takes the fallback from 525KB to a
// fraction of that, which is worth having for the browsers that miss the AVIF.
export const dashboardBackdrop = asset(backdropImg, backdropAvif, backdropWebp);

export const aerialMap = asset(aerialImg, aerialAvif, aerialWebp);
export const serverRack = asset(rackImg, rackAvif, rackWebp);
export const efficiencyChevron = asset(chevronImg, chevronAvif, chevronWebp);
export const securityShield = asset(shieldImg, shieldAvif, shieldWebp);
export const soc2Badge = asset(soc2Img, soc2Avif, soc2Webp);

export const blogPhotos = [asset(blog1Img, blog1Avif), asset(blog2Img, blog2Avif), asset(blog3Img, blog3Avif)];
