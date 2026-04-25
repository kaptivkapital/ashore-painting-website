import groq from 'groq';

// === Singletons ===

export const businessInfoQuery = groq`
  *[_type == "businessInfo"][0] {
    businessName,
    tagline,
    description,
    phone,
    email,
    logo,
    city,
    state,
    postalCode,
    geoLatitude,
    geoLongitude,
    serviceRadius,
    hours,
    socialLinks,
    schemaType,
    priceRange
  }
`;

export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    heroHeading,
    heroSubheading,
    heroImage,
    heroCta,
    featuredServices[]->{ _id, title, "slug": slug.current, shortDescription, mainImage, icon },
    featuredTestimonials[]->{ _id, quote, authorName, authorLocation, rating, source },
    featuredProjects[]->{ _id, title, "slug": slug.current, description, beforeAfterPairs, "serviceName": service->title },
    whyChooseUsHeading,
    whyChooseUsItems,
    ctaHeading,
    ctaText,
    ctaButton,
    seo
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    gtmId,
    formEndpoint,
    defaultOgImage,
    googleMapsApiKey,
    googleBusinessProfileUrl,
    featurableWidgetId
  }
`;

// === Navigation ===

export const navigationQuery = groq`
  *[_type == "navigation" && title == $title][0] {
    title,
    items[] {
      label,
      url,
      children[] { label, url }
    }
  }
`;

// === Services ===

export const allServicesQuery = groq`
  *[_type == "service"] | order(orderRank asc) {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    mainImage,
    icon,
    orderRank
  }
`;

export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    body,
    mainImage,
    icon,
    priceRange,
    processSteps,
    faqs[]->{ _id, question, answer },
    seo
  }
`;

export const serviceSlugsQuery = groq`
  *[_type == "service"]{ "slug": slug.current }
`;

// === Service Areas ===

export const allServiceAreasQuery = groq`
  *[_type == "serviceArea"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    county,
    description,
    heroImage
  }
`;

export const serviceAreaBySlugQuery = groq`
  *[_type == "serviceArea" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    county,
    description,
    body,
    heroImage,
    services[]->{ _id, title, "slug": slug.current, shortDescription, icon },
    neighborhoods,
    geoLatitude,
    geoLongitude,
    mapEmbedUrl,
    localInsights,
    housingTypes,
    seo
  }
`;

export const serviceAreaSlugsQuery = groq`
  *[_type == "serviceArea"]{ "slug": slug.current }
`;

// === Projects / Gallery ===

export const allProjectsQuery = groq`
  *[_type == "project"] | order(completedDate desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    "serviceName": service->title,
    "serviceSlug": service->slug.current,
    "areaName": serviceArea->name,
    beforeAfterPairs[0..0],
    featured,
    completedDate
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    "serviceName": service->title,
    "serviceSlug": service->slug.current,
    "areaName": serviceArea->name,
    "areaSlug": serviceArea->slug.current,
    completedDate,
    beforeAfterPairs,
    additionalImages,
    seo
  }
`;

export const projectSlugsQuery = groq`
  *[_type == "project"]{ "slug": slug.current }
`;

export const projectsByServiceQuery = groq`
  *[_type == "project" && service._ref == $serviceId] | order(completedDate desc) [0...6] {
    _id,
    title,
    "slug": slug.current,
    description,
    beforeAfterPairs[0..0]
  }
`;

export const projectsByAreaQuery = groq`
  *[_type == "project" && serviceArea._ref == $areaId] | order(completedDate desc) [0...6] {
    _id,
    title,
    "slug": slug.current,
    description,
    beforeAfterPairs[0..0],
    "serviceName": service->title
  }
`;

// === Testimonials ===

export const allTestimonialsQuery = groq`
  *[_type == "testimonial"] | order(dateReceived desc) {
    _id,
    quote,
    authorName,
    authorLocation,
    rating,
    "serviceName": service->title,
    "areaName": serviceArea->name,
    dateReceived,
    source,
    featured
  }
`;

export const googleReviewsQuery = groq`
  *[_type == "testimonial" && source == "Google" && featured == true] | order(dateReceived desc) [0...6] {
    _id,
    quote,
    authorName,
    authorLocation,
    rating,
    source,
    dateReceived
  }
`;

export const testimonialsByServiceQuery = groq`
  *[_type == "testimonial" && service._ref == $serviceId] | order(dateReceived desc) [0...4] {
    _id,
    quote,
    authorName,
    authorLocation,
    rating,
    source
  }
`;

export const testimonialsByAreaQuery = groq`
  *[_type == "testimonial" && serviceArea._ref == $areaId] | order(dateReceived desc) [0...4] {
    _id,
    quote,
    authorName,
    authorLocation,
    rating,
    source
  }
`;

// === FAQs ===

export const allFaqsQuery = groq`
  *[_type == "faqItem"] | order(orderRank asc) {
    _id,
    question,
    answer,
    category,
    "relatedServiceTitle": relatedService->title,
    orderRank
  }
`;

// === Blog ===

export const allBlogPostsQuery = groq`
  *[_type == "blogPost" && defined(publishedAt)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    mainImage,
    publishedAt,
    "relatedServiceTitles": relatedServices[]->title
  }
`;

export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    body,
    mainImage,
    publishedAt,
    relatedServices[]->{ _id, title, "slug": slug.current },
    seo
  }
`;

export const blogPostSlugsQuery = groq`
  *[_type == "blogPost" && defined(publishedAt)]{ "slug": slug.current }
`;

// === Pages ===

export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    body,
    seo
  }
`;

// === Aggregate data for JSON-LD ===

export const allServiceAreasForSchemaQuery = groq`
  *[_type == "serviceArea"] {
    name,
    "slug": slug.current
  }
`;

export const allServicesForSchemaQuery = groq`
  *[_type == "service"] | order(orderRank asc) {
    title,
    "slug": slug.current,
    shortDescription
  }
`;

export const aggregateRatingQuery = groq`
  {
    "ratingValue": math::avg(*[_type == "testimonial" && defined(rating)].rating),
    "reviewCount": count(*[_type == "testimonial" && defined(rating)])
  }
`;
