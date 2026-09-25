// JPEG blog photos omit WebP because re-encoding them produced larger files.

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

export const dashboardBackdrop = asset(backdropImg, backdropAvif, backdropWebp);

export const aerialMap = asset(aerialImg, aerialAvif, aerialWebp);
export const serverRack = asset(rackImg, rackAvif, rackWebp);
export const efficiencyChevron = asset(chevronImg, chevronAvif, chevronWebp);
export const securityShield = asset(shieldImg, shieldAvif, shieldWebp);
export const soc2Badge = asset(soc2Img, soc2Avif, soc2Webp);

export const blogPhotos = [asset(blog1Img, blog1Avif), asset(blog2Img, blog2Avif), asset(blog3Img, blog3Avif)];
