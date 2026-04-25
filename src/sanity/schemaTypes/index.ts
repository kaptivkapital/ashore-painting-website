// Document types
import { businessInfoType } from './documents/businessInfo';
import { homePageType } from './documents/homePage';
import { siteSettingsType } from './documents/siteSettings';
import { serviceType } from './documents/service';
import { serviceAreaType } from './documents/serviceArea';
import { projectType } from './documents/project';
import { testimonialType } from './documents/testimonial';
import { faqItemType } from './documents/faqItem';
import { blogPostType } from './documents/blogPost';
import { pageType } from './documents/page';
import { navigationType } from './documents/navigation';

// Object types
import { seoType } from './objects/seo';
import { blockContentType } from './objects/blockContent';
import { beforeAfterType } from './objects/beforeAfter';
import { ctaType } from './objects/cta';
import { openingHoursType } from './objects/openingHours';
import { socialLinkType } from './objects/socialLink';

export const schema = {
  types: [
    // Singletons
    businessInfoType,
    homePageType,
    siteSettingsType,
    // Documents
    serviceType,
    serviceAreaType,
    projectType,
    testimonialType,
    faqItemType,
    blogPostType,
    pageType,
    navigationType,
    // Objects
    seoType,
    blockContentType,
    beforeAfterType,
    ctaType,
    openingHoursType,
    socialLinkType,
  ],
};
