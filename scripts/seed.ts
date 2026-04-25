/**
 * Sanity Content Seed Script
 * Populates the Ashore Painting Sanity dataset with local SEO content.
 *
 * Usage: npx tsx scripts/seed.ts
 *
 * Content rules:
 * - No fake testimonials, reviews, or before/after photos
 * - No fabricated experience claims
 * - Honest pricing language only
 * - Real St. Augustine local knowledge (verifiable facts)
 * - Natural keyword placement, not keyword stuffing
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'h85qpyij',
  dataset: 'production',
  apiVersion: '2025-01-28',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// Helper to create portable text blocks
function block(text: string, style = 'normal'): any {
  return {
    _type: 'block',
    _key: Math.random().toString(36).slice(2, 10),
    style,
    children: [{ _type: 'span', _key: Math.random().toString(36).slice(2, 10), text, marks: [] }],
  };
}

function blockWithMark(segments: Array<{ text: string; marks?: string[] }>): any {
  return {
    _type: 'block',
    _key: Math.random().toString(36).slice(2, 10),
    style: 'normal',
    markDefs: [],
    children: segments.map((seg) => ({
      _type: 'span',
      _key: Math.random().toString(36).slice(2, 10),
      text: seg.text,
      marks: seg.marks || [],
    })),
  };
}

async function seed() {
  console.log('Seeding Ashore Painting content...\n');

  // ============================================================
  // 1. BUSINESS INFO (singleton)
  // ============================================================
  console.log('Creating Business Info...');
  await client.createOrReplace({
    _id: 'businessInfo',
    _type: 'businessInfo',
    businessName: 'Ashore Painting',
    tagline: 'Professional Painting Services in St. Augustine, FL',
    description:
      'Ashore Painting provides professional interior and exterior painting services to homeowners and businesses throughout St. Augustine, Florida and the surrounding Northeast Florida communities. We focus on quality preparation, premium materials, and clean, detailed work on every project. Whether you need a single room refreshed or a full exterior repaint, we bring the same level of care and craftsmanship to every job. Serving St. Augustine, Ponte Vedra Beach, Nocatee, World Golf Village, and surrounding areas.',
    phone: '(619) 944-3226',
    city: 'St. Augustine',
    state: 'FL',
    postalCode: '32080',
    geoLatitude: 29.8946,
    geoLongitude: -81.3145,
    serviceRadius: 30,
    hours: [
      { _type: 'openingHours', _key: 'mon', day: 'Monday', opens: '08:00', closes: '17:00', closed: false },
      { _type: 'openingHours', _key: 'tue', day: 'Tuesday', opens: '08:00', closes: '17:00', closed: false },
      { _type: 'openingHours', _key: 'wed', day: 'Wednesday', opens: '08:00', closes: '17:00', closed: false },
      { _type: 'openingHours', _key: 'thu', day: 'Thursday', opens: '08:00', closes: '17:00', closed: false },
      { _type: 'openingHours', _key: 'fri', day: 'Friday', opens: '08:00', closes: '17:00', closed: false },
      { _type: 'openingHours', _key: 'sat', day: 'Saturday', opens: '08:00', closes: '17:00', closed: true },
      { _type: 'openingHours', _key: 'sun', day: 'Sunday', opens: '08:00', closes: '17:00', closed: true },
    ],
    socialLinks: [],
    schemaType: 'HousePainter',
    priceRange: '$$',
  });

  // ============================================================
  // 2. SITE SETTINGS (singleton)
  // ============================================================
  console.log('Creating Site Settings...');
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    gtmId: '',
    formEndpoint: '',
    googleBusinessProfileUrl: '',
    googleMapsApiKey: '',
  });

  // ============================================================
  // 3. SERVICES (5 documents)
  // ============================================================
  console.log('Creating Services...');

  const services = [
    {
      _id: 'service-interior-painting',
      title: 'Interior Painting',
      slug: { _type: 'slug', current: 'interior-painting' },
      shortDescription:
        'Transform your living spaces with professional interior painting. We handle walls, ceilings, trim, doors, and accent walls throughout your St. Augustine home.',
      priceRange: 'Call for a free estimate',
      orderRank: 1,
      body: [
        block('Interior House Painting in St. Augustine, FL', 'h2'),
        block(
          'A fresh coat of interior paint is one of the most effective ways to update your home. It changes the feel of a room, covers wear and tear, and protects your walls from moisture and daily use. In St. Augustine, where humidity levels stay high year-round, choosing the right paint and applying it correctly matters more than in drier climates.'
        ),
        block(
          'At Ashore Painting, we handle every step of your interior painting project from start to finish. That includes moving furniture, protecting your floors and fixtures, repairing minor wall damage, priming where needed, and applying finish coats with clean, even coverage.'
        ),
        block('What We Paint', 'h3'),
        block(
          'We paint walls, ceilings, trim and baseboards, crown molding, interior doors, closets, hallways, stairwells, and accent walls. Whether you need one room painted or your entire home refreshed, we bring the same attention to detail to every project.'
        ),
        block('Why Preparation Matters in Florida', 'h3'),
        block(
          "Florida's humidity creates unique challenges for interior painting. Moisture can prevent paint from adhering properly, cause bubbling, or lead to premature peeling. We check moisture levels before we start, use appropriate primers for the conditions, and ensure proper ventilation during and after painting. This preparation is what separates a paint job that lasts from one that doesn't."
        ),
        block('Our Approach', 'h3'),
        block(
          "We start with a walkthrough of your home to understand your goals, discuss color options, and identify any wall repairs that should be addressed before painting. We provide a clear estimate with no hidden fees. On painting day, we protect your home thoroughly, work efficiently to minimize disruption, and clean up completely at the end of each day."
        ),
        block(
          'We use premium paints from trusted manufacturers that are formulated to perform in humid coastal environments. The specific products we recommend depend on the room, the surface, and the finish you prefer.'
        ),
        block('Rooms We Commonly Paint', 'h3'),
        block(
          'Living rooms, bedrooms, kitchens, bathrooms, dining rooms, home offices, entryways, and hallways. Each type of room has different requirements. Bathrooms and kitchens need moisture-resistant finishes. High-traffic areas like hallways benefit from more durable, washable paint. We help you choose the right product for each space.'
        ),
        block(
          'If you are considering an interior painting project in St. Augustine or the surrounding area, call us to schedule a free estimate. We will walk through your home, discuss your vision, and provide straightforward pricing.'
        ),
      ],
      processSteps: [
        { _type: 'object', _key: 'ps1', title: 'Consultation & Estimate', description: 'We visit your home, discuss your project, review colors, and provide a detailed written estimate at no charge.' },
        { _type: 'object', _key: 'ps2', title: 'Preparation', description: 'We protect your furniture and floors, repair minor wall damage, fill nail holes, sand rough areas, and prime surfaces as needed.' },
        { _type: 'object', _key: 'ps3', title: 'Painting', description: 'We apply paint with careful technique — cutting in edges by hand, rolling walls evenly, and applying multiple coats for full, consistent coverage.' },
        { _type: 'object', _key: 'ps4', title: 'Final Walkthrough', description: 'We do a detailed inspection with you, touch up any areas that need attention, remove all protective materials, and leave your home clean.' },
      ],
      seo: {
        _type: 'seo',
        metaTitle: 'Interior Painting in St. Augustine, FL | Ashore Painting',
        metaDescription:
          'Professional interior painting services in St. Augustine, FL. Walls, ceilings, trim, and doors. Quality preparation and premium paints. Call for a free estimate.',
      },
    },
    {
      _id: 'service-exterior-painting',
      title: 'Exterior Painting',
      slug: { _type: 'slug', current: 'exterior-painting' },
      shortDescription:
        "Protect and refresh your home's exterior with professional painting built to withstand St. Augustine's coastal climate, humidity, and sun exposure.",
      priceRange: 'Call for a free estimate',
      orderRank: 2,
      body: [
        block('Exterior House Painting in St. Augustine, FL', 'h2'),
        block(
          "Your home's exterior paint does more than define its appearance. It is the first line of defense against sun, rain, humidity, salt air, and the mold and mildew that thrive in Northeast Florida's subtropical climate. A properly prepared and painted exterior protects your siding, trim, and structural elements from moisture damage and decay."
        ),
        block(
          'Ashore Painting provides full exterior painting services for homes throughout the St. Augustine area. We handle everything from surface preparation and repairs to primer application and finish coats, using paints and coatings designed to perform in coastal Florida conditions.'
        ),
        block('What We Paint', 'h3'),
        block(
          'We paint exterior siding (wood, stucco, HardiPlank, vinyl, and aluminum), fascia and soffit, exterior trim, shutters, front doors, garage doors, fences, and pergolas. We work with the materials common to St. Augustine homes and select products accordingly.'
        ),
        block('Surface Preparation Is Everything', 'h3'),
        block(
          'In a coastal environment like St. Augustine, exterior paint failure almost always traces back to inadequate preparation. Salt air deposits, mold, mildew, chalking old paint, and moisture all need to be addressed before a single coat of paint goes on. We pressure wash surfaces, scrape loose or failing paint, repair damaged wood or stucco, prime bare surfaces, and caulk gaps and joints. This preparation is the foundation of an exterior paint job that holds up.'
        ),
        block('Paint Selection for Coastal Florida', 'h3'),
        block(
          "Not all exterior paints perform equally in salt air and high humidity. We use 100% acrylic latex paints with mold and mildew resistance built in, UV-stable pigments that resist fading, and formulations designed for the expansion and contraction that Florida's temperature swings demand. We recommend specific products based on your home's siding material and exposure."
        ),
        block('When to Repaint Your Exterior', 'h3'),
        block(
          'In St. Augustine, most homes need exterior repainting every 5 to 7 years, depending on sun exposure, proximity to the coast, and the quality of the previous paint job. Signs it is time include fading, chalking (a powdery residue on the surface), peeling, cracking, or visible mold and mildew growth that cleaning cannot resolve.'
        ),
        block(
          'If your home needs exterior painting, call us to schedule a free on-site estimate. We will assess your surfaces, discuss preparation needs, and provide clear pricing.'
        ),
      ],
      processSteps: [
        { _type: 'object', _key: 'ps1', title: 'Inspection & Estimate', description: 'We inspect your exterior surfaces, identify problem areas, discuss color choices and product options, and provide a written estimate.' },
        { _type: 'object', _key: 'ps2', title: 'Surface Preparation', description: 'We pressure wash, scrape, sand, repair damaged surfaces, caulk gaps, and prime bare or repaired areas. This step takes time and we do not rush it.' },
        { _type: 'object', _key: 'ps3', title: 'Painting', description: 'We apply primer and finish coats using brushes, rollers, and spray equipment as appropriate for each surface. Multiple coats ensure even coverage and lasting protection.' },
        { _type: 'object', _key: 'ps4', title: 'Cleanup & Walkthrough', description: 'We remove all drop cloths and protective materials, clean up the work area, and walk the property with you to ensure everything meets your expectations.' },
      ],
      seo: {
        _type: 'seo',
        metaTitle: 'Exterior Painting in St. Augustine, FL | Ashore Painting',
        metaDescription:
          "Professional exterior house painting in St. Augustine, FL. Thorough prep, premium coastal-grade paints, and clean results. Protect your home from Florida's climate. Free estimates.",
      },
    },
    {
      _id: 'service-cabinet-painting',
      title: 'Cabinet Painting',
      slug: { _type: 'slug', current: 'cabinet-painting' },
      shortDescription:
        'Update your kitchen or bathroom with professionally painted cabinets. A cost-effective alternative to full cabinet replacement that delivers a dramatic transformation.',
      priceRange: 'Call for a free estimate',
      orderRank: 3,
      body: [
        block('Cabinet Painting in St. Augustine, FL', 'h2'),
        block(
          'Painting your kitchen or bathroom cabinets is one of the most impactful home updates you can make without a full renovation. It changes the look and feel of the entire room at a fraction of the cost of new cabinets. But cabinet painting requires a different approach than wall painting. The surfaces are smaller, harder, and subject to constant use. The finish needs to be durable enough to handle daily opening, closing, cleaning, and contact with moisture and grease.'
        ),
        block(
          'Ashore Painting provides professional cabinet painting for homeowners in St. Augustine and the surrounding area. We use proper preparation techniques and specialized cabinet-grade coatings to deliver a smooth, factory-like finish that lasts.'
        ),
        block('Why Cabinet Painting Works', 'h3'),
        block(
          'If your existing cabinets are structurally sound but look dated, worn, or are simply a color you no longer want, painting them is a practical solution. Solid wood and high-quality MDF cabinets are excellent candidates for painting. The result looks like new cabinetry without the cost, timeline, or disruption of a full kitchen remodel.'
        ),
        block('Our Cabinet Painting Process', 'h3'),
        block(
          'Cabinet painting requires meticulous preparation. We remove all doors, drawers, and hardware. We clean every surface to remove grease and residue. We sand to create proper adhesion, fill any imperfections, and apply a bonding primer designed for cabinetry. Finish coats are applied with a combination of brushes and fine rollers or spray equipment, depending on the desired finish. We reinstall hardware and rehang doors once everything is fully cured.'
        ),
        block('Choosing the Right Finish', 'h3'),
        block(
          'For cabinets, the finish matters as much as the color. We typically recommend satin or semi-gloss finishes for kitchen cabinets because they resist moisture, clean easily, and hold up to daily wear. We use paints and coatings formulated specifically for cabinetry — these are harder and more durable than standard wall paint.'
        ),
        block('Kitchen and Bathroom Cabinets', 'h3'),
        block(
          'We paint kitchen cabinets, bathroom vanities, laundry room cabinets, and built-in cabinetry throughout your home. In St. Augustine bathrooms, where humidity is a constant factor, we pay particular attention to moisture-resistant products and proper preparation to ensure the finish holds up.'
        ),
        block(
          'If your cabinets need updating, call us to schedule a free consultation. We will assess your cabinets, discuss color and finish options, and provide a clear estimate for the project.'
        ),
      ],
      processSteps: [
        { _type: 'object', _key: 'ps1', title: 'Consultation', description: 'We assess your cabinets, discuss color and finish preferences, and determine whether your cabinets are good candidates for painting.' },
        { _type: 'object', _key: 'ps2', title: 'Removal & Prep', description: 'We remove doors, drawers, and hardware. Every surface is cleaned, deglossed, sanded, and primed with a bonding primer formulated for cabinetry.' },
        { _type: 'object', _key: 'ps3', title: 'Painting', description: 'We apply cabinet-grade finish coats using techniques that produce a smooth, even finish. Multiple thin coats build a durable, professional result.' },
        { _type: 'object', _key: 'ps4', title: 'Reassembly', description: 'Once fully cured, we reinstall doors, drawers, and hardware. We inspect every piece and make sure everything opens, closes, and aligns properly.' },
      ],
      seo: {
        _type: 'seo',
        metaTitle: 'Cabinet Painting in St. Augustine, FL | Ashore Painting',
        metaDescription:
          'Professional cabinet painting in St. Augustine, FL. Transform your kitchen or bathroom cabinets with a durable, factory-quality finish. Free consultation.',
      },
    },
    {
      _id: 'service-commercial-painting',
      title: 'Commercial Painting',
      slug: { _type: 'slug', current: 'commercial-painting' },
      shortDescription:
        'Professional painting for offices, retail spaces, restaurants, and commercial properties in the St. Augustine area. Minimal disruption to your business operations.',
      priceRange: 'Call for a free estimate',
      orderRank: 4,
      body: [
        block('Commercial Painting in St. Augustine, FL', 'h2'),
        block(
          'The appearance of your commercial space directly affects how customers, clients, and employees experience your business. Worn, faded, or outdated paint sends the wrong message. A clean, well-maintained painted environment communicates professionalism and attention to detail.'
        ),
        block(
          'Ashore Painting provides interior and exterior painting services for commercial properties in St. Augustine and the surrounding area. We work with business owners, property managers, and building owners to deliver quality results on schedule and with minimal disruption to daily operations.'
        ),
        block('Commercial Spaces We Paint', 'h3'),
        block(
          'We paint offices, retail stores, restaurants, medical and dental offices, warehouses, multi-unit residential buildings, HOA common areas, churches, and other commercial and institutional spaces. Each type of space has different requirements — a restaurant needs washable, durable finishes while a professional office may prioritize a refined appearance.'
        ),
        block('Working Around Your Business', 'h3'),
        block(
          'We understand that your business cannot shut down for a paint job. We schedule work during off-hours, weekends, or in phases to keep your operations running. We contain our work areas to prevent dust and paint from affecting your products, equipment, or customers. We communicate clearly about timelines so you can plan accordingly.'
        ),
        block('Exterior Commercial Painting', 'h3'),
        block(
          "Your building's exterior is the first impression customers have of your business. In St. Augustine's commercial districts and shopping centers, maintaining a clean, professional exterior is essential. We handle surface preparation, repairs, and painting for all types of commercial exterior surfaces including stucco, concrete block, metal, and wood."
        ),
        block('Compliance and Coordination', 'h3'),
        block(
          "For properties in St. Augustine's historic district or in communities with HOA or architectural review requirements, we can help navigate color selection and approval processes. We are familiar with the guidelines that apply to commercial and mixed-use properties in the area."
        ),
        block(
          'Contact us to discuss your commercial painting project. We provide free on-site estimates and work with you to develop a plan that fits your schedule and budget.'
        ),
      ],
      processSteps: [
        { _type: 'object', _key: 'ps1', title: 'Site Assessment', description: 'We visit your property, evaluate the scope of work, discuss your needs and schedule constraints, and provide a detailed estimate.' },
        { _type: 'object', _key: 'ps2', title: 'Planning & Scheduling', description: 'We develop a work plan that minimizes disruption to your business. We coordinate timing, phasing, and access with your team.' },
        { _type: 'object', _key: 'ps3', title: 'Preparation & Painting', description: 'We prepare surfaces thoroughly, contain work areas, and apply commercial-grade coatings designed for durability and performance in high-use environments.' },
        { _type: 'object', _key: 'ps4', title: 'Final Inspection', description: 'We walk the completed project with you, address any touch-ups, and leave the space clean and ready for business.' },
      ],
      seo: {
        _type: 'seo',
        metaTitle: 'Commercial Painting in St. Augustine, FL | Ashore Painting',
        metaDescription:
          'Professional commercial painting services in St. Augustine, FL. Offices, retail, restaurants, and more. We work around your schedule. Free estimates.',
      },
    },
    {
      _id: 'service-color-consultation',
      title: 'Color Consultation',
      slug: { _type: 'slug', current: 'color-consultation' },
      shortDescription:
        'Not sure what colors to choose? We help you select the right paint colors for your home based on your style, your lighting, and the architectural character of your space.',
      priceRange: 'Call for a free estimate',
      orderRank: 5,
      body: [
        block('Color Consultation in St. Augustine, FL', 'h2'),
        block(
          'Choosing paint colors is one of the most common sources of hesitation for homeowners planning a painting project. With thousands of options available, it can be overwhelming to narrow down the right shades — especially when you are trying to coordinate rooms, complement existing finishes, and account for how light plays in your specific space.'
        ),
        block(
          'Ashore Painting offers color consultation as part of our painting services. We help you make confident color decisions based on your preferences, your home, and the natural and artificial light conditions in each room.'
        ),
        block('How Our Color Consultation Works', 'h3'),
        block(
          'We visit your home and look at the spaces you plan to paint. We consider your existing flooring, countertops, cabinetry, and furniture. We look at how light enters each room at different times of day. We discuss your style preferences and any colors you are drawn to or want to avoid. Based on all of this, we recommend specific colors and help you narrow your choices.'
        ),
        block('Color in Coastal Florida Light', 'h3'),
        block(
          "St. Augustine's strong natural sunlight affects how paint colors look on your walls. Colors that look perfect in a paint store can appear very different in a sun-filled Florida room versus a north-facing bedroom with minimal natural light. We account for these differences and can test sample colors on your walls so you can see them in your actual lighting conditions before committing."
        ),
        block('Exterior Color Selection', 'h3'),
        block(
          "Choosing exterior colors involves additional considerations. You need to coordinate your siding, trim, front door, and shutters. You should consider your roof color, your landscaping, and the overall character of your neighborhood. In communities like Nocatee and World Golf Village where HOA guidelines regulate exterior colors, we can help you select options that meet the requirements while still reflecting your taste."
        ),
        block('Working with Color Trends and Timeless Choices', 'h3'),
        block(
          'We can help you decide between on-trend colors and classic choices that will look good for years. Coastal Florida homes often work well with colors inspired by the natural landscape — warm whites, soft grays, muted blues, and earth tones. But the right choice depends on your home and your vision for it.'
        ),
        block(
          'Color consultation is available as part of any painting project. Call us to schedule a time to discuss your project and get help choosing the colors that will look best in your home.'
        ),
      ],
      processSteps: [
        { _type: 'object', _key: 'ps1', title: 'Discussion', description: 'We talk about your color preferences, the mood you want to create, and any colors or styles you want to avoid.' },
        { _type: 'object', _key: 'ps2', title: 'In-Home Assessment', description: 'We evaluate your lighting, existing finishes, and architectural features to understand what colors will work best in your space.' },
        { _type: 'object', _key: 'ps3', title: 'Color Recommendations', description: 'We present curated color options based on our assessment, and we can apply test samples on your walls so you can see them in real conditions.' },
        { _type: 'object', _key: 'ps4', title: 'Final Selection', description: 'Once you are happy with your choices, we finalize the color plan and move forward with your painting project.' },
      ],
      seo: {
        _type: 'seo',
        metaTitle: 'Color Consultation in St. Augustine, FL | Ashore Painting',
        metaDescription:
          'Paint color consultation for St. Augustine homeowners. We help you choose the right colors for your home based on your style, lighting, and space. Part of every painting project.',
      },
    },
  ];

  for (const service of services) {
    await client.createOrReplace({ _type: 'service', ...service });
  }

  // ============================================================
  // 4. SERVICE AREAS (6 Tier 1 documents)
  // ============================================================
  console.log('Creating Service Areas...');

  const serviceRefs = services.map((s) => ({
    _type: 'reference',
    _ref: s._id,
    _key: Math.random().toString(36).slice(2, 10),
  }));

  const areas = [
    {
      _id: 'area-st-augustine',
      name: 'St. Augustine',
      slug: { _type: 'slug', current: 'st-augustine' },
      county: 'St. Johns County',
      description:
        'Ashore Painting serves homeowners and businesses throughout St. Augustine with professional interior and exterior painting services. From the historic downtown to newer developments, we understand the unique painting needs of homes in the oldest city in the United States.',
      neighborhoods: ['Downtown Historic District', 'Uptown', 'North City', 'West Augustine', 'Lincolnville', 'Abbott Tract', 'Fullerwood', 'Nelmar Terrace', 'Lighthouse Park', 'Davis Shores'],
      localInsights:
        "St. Augustine's coastal location means homes face constant exposure to salt air, high humidity, and intense UV radiation. The historic district has specific guidelines for exterior colors and materials. Homes here range from century-old coquina and wood-frame structures to modern construction, each requiring different preparation and paint approaches.",
      housingTypes: 'Historic wood-frame homes, Mediterranean Revival, Spanish Colonial, coastal cottages, modern single-family homes, condominiums, and townhouses.',
      geoLatitude: 29.8946,
      geoLongitude: -81.3145,
      services: serviceRefs,
      seo: {
        _type: 'seo',
        metaTitle: 'Painters in St. Augustine, FL | Ashore Painting',
        metaDescription:
          'Professional painting services in St. Augustine, FL. Interior, exterior, cabinet, and commercial painting. Quality work built for coastal Florida conditions. Free estimates.',
      },
    },
    {
      _id: 'area-st-augustine-beach',
      name: 'St. Augustine Beach',
      slug: { _type: 'slug', current: 'st-augustine-beach' },
      county: 'St. Johns County',
      description:
        'We provide painting services to homeowners in St. Augustine Beach and the surrounding beachside communities. Homes this close to the ocean face accelerated paint wear from salt spray, wind, and direct sun exposure, making quality preparation and the right paint selection essential.',
      neighborhoods: ['Anastasia Island', 'Crescent Beach', 'Butler Beach', 'Summer Haven', 'Island Hammock', 'Sea Colony', 'Magnolia Dunes', 'Ocean Walk'],
      localInsights:
        'Beachside homes in St. Augustine experience the most aggressive conditions for exterior paint in the area. Direct salt spray can cause paint to deteriorate significantly faster than homes just a few miles inland. We recommend more frequent repainting cycles and salt-resistant coatings for properties on or near the beach.',
      housingTypes: 'Beachfront condos, elevated coastal homes, beach cottages, newer construction on Anastasia Island, and oceanfront single-family residences.',
      geoLatitude: 29.8561,
      geoLongitude: -81.2656,
      services: serviceRefs.map((r) => ({ ...r, _key: Math.random().toString(36).slice(2, 10) })),
      seo: {
        _type: 'seo',
        metaTitle: 'Painters in St. Augustine Beach, FL | Ashore Painting',
        metaDescription:
          'Painting services for St. Augustine Beach homes. We use coastal-grade paints and thorough preparation to protect your home from salt air and sun. Free estimates.',
      },
    },
    {
      _id: 'area-ponte-vedra-beach',
      name: 'Ponte Vedra Beach',
      slug: { _type: 'slug', current: 'ponte-vedra-beach' },
      county: 'St. Johns County',
      description:
        'Ashore Painting provides interior and exterior painting services to homeowners in Ponte Vedra Beach. This community features well-maintained homes where appearance matters. We deliver the quality and attention to detail that Ponte Vedra homeowners expect.',
      neighborhoods: ['Ponte Vedra', 'Sawgrass', 'Marsh Landing', 'Palm Valley', 'Sawgrass Country Club', 'The Plantation at Ponte Vedra', 'Harbour Island', 'Old Ponte Vedra'],
      localInsights:
        'Ponte Vedra Beach homes are generally well-maintained with high standards for appearance. Many communities here have HOA guidelines for exterior colors and maintenance. We are familiar with the approval processes and color palettes commonly accepted in Ponte Vedra neighborhoods.',
      housingTypes: 'Custom single-family homes, gated community residences, golf course homes, oceanfront properties, and Mediterranean-style estates.',
      geoLatitude: 30.2396,
      geoLongitude: -81.3857,
      services: serviceRefs.map((r) => ({ ...r, _key: Math.random().toString(36).slice(2, 10) })),
      seo: {
        _type: 'seo',
        metaTitle: 'Painters in Ponte Vedra Beach, FL | Ashore Painting',
        metaDescription:
          'Professional painting services in Ponte Vedra Beach, FL. Interior and exterior painting with the quality and attention to detail your home deserves. Free estimates.',
      },
    },
    {
      _id: 'area-nocatee',
      name: 'Nocatee',
      slug: { _type: 'slug', current: 'nocatee' },
      county: 'St. Johns County',
      description:
        'We serve homeowners in the Nocatee master-planned community with professional painting services. Nocatee homes are relatively new, but even newer construction benefits from timely interior updates and eventual exterior maintenance as homes age.',
      neighborhoods: ['Twenty Mile', 'Crosswater', 'Willowcove', 'Tidewater', 'Austin Park', 'Greenleaf Village', 'Kelly Pointe', 'Addison Park', 'Town Center'],
      localInsights:
        "Nocatee's HOA requires approval for exterior paint colors. We can help you navigate the architectural review process and select colors that meet community guidelines. Most Nocatee homes were built within the last 10-15 years, so exterior repainting needs are beginning to appear in older sections of the community.",
      housingTypes: 'Single-family homes, townhomes, and condos ranging from starter homes to large custom builds. Predominantly newer construction with stucco, HardiPlank, and vinyl siding.',
      geoLatitude: 30.0891,
      geoLongitude: -81.3988,
      services: serviceRefs.map((r) => ({ ...r, _key: Math.random().toString(36).slice(2, 10) })),
      seo: {
        _type: 'seo',
        metaTitle: 'Painters in Nocatee, FL | Ashore Painting',
        metaDescription:
          'Painting services for Nocatee homeowners. We help with HOA color approvals and deliver quality interior and exterior painting. Free estimates.',
      },
    },
    {
      _id: 'area-world-golf-village',
      name: 'World Golf Village',
      slug: { _type: 'slug', current: 'world-golf-village' },
      county: 'St. Johns County',
      description:
        'Ashore Painting provides painting services to homeowners in World Golf Village and the surrounding communities along International Golf Parkway. From golf course homes to family neighborhoods, we handle interior and exterior painting projects of all sizes.',
      neighborhoods: ['Royal Pines', 'King and Bear', 'Murabella', 'Palencia', 'South Hampton', 'Isles of Schooner Bend', 'Cypress Lakes'],
      localInsights:
        'World Golf Village homes range from established communities with homes 15-20+ years old to newer developments. Older homes in the area are reaching the point where exterior repainting becomes necessary. The area is slightly inland, so salt air exposure is less intense than beachside communities, but humidity and UV exposure still affect paint longevity.',
      housingTypes: 'Single-family homes, golf course homes, and townhomes. Mix of stucco, HardiPlank, and vinyl siding construction.',
      geoLatitude: 29.9574,
      geoLongitude: -81.4088,
      services: serviceRefs.map((r) => ({ ...r, _key: Math.random().toString(36).slice(2, 10) })),
      seo: {
        _type: 'seo',
        metaTitle: 'Painters in World Golf Village, FL | Ashore Painting',
        metaDescription:
          'Painting services for World Golf Village homeowners. Professional interior and exterior painting for golf course homes and family communities. Free estimates.',
      },
    },
    {
      _id: 'area-palm-valley',
      name: 'Palm Valley',
      slug: { _type: 'slug', current: 'palm-valley' },
      county: 'St. Johns County',
      description:
        'We serve homeowners in Palm Valley with professional painting services. Palm Valley offers a mix of established homes and newer communities along the Intracoastal Waterway, each with distinct painting needs based on age, construction type, and environmental exposure.',
      neighborhoods: ['Palm Valley Estates', 'Marsh Creek', 'Sawmill Lakes', 'Colony Cove', 'Palm Valley Gardens', 'Harbour Island'],
      localInsights:
        'Palm Valley properties along the Intracoastal Waterway face salt air exposure similar to beachside homes. Homes further inland experience less aggressive conditions but still deal with Florida humidity and intense sunlight. The area has a mix of older homes that may need more extensive preparation and newer construction that primarily needs cosmetic updates.',
      housingTypes: 'Waterfront homes, equestrian properties, single-family homes on large lots, and newer subdivision homes. Construction includes wood, stucco, HardiPlank, and brick.',
      geoLatitude: 30.1680,
      geoLongitude: -81.3894,
      services: serviceRefs.map((r) => ({ ...r, _key: Math.random().toString(36).slice(2, 10) })),
      seo: {
        _type: 'seo',
        metaTitle: 'Painters in Palm Valley, FL | Ashore Painting',
        metaDescription:
          'Professional painting services in Palm Valley, FL. Interior and exterior painting for waterfront homes, equestrian properties, and family homes. Free estimates.',
      },
    },
  ];

  for (const area of areas) {
    await client.createOrReplace({ _type: 'serviceArea', ...area });
  }

  // ============================================================
  // 5. FAQ ITEMS (12 items)
  // ============================================================
  console.log('Creating FAQ Items...');

  const faqs = [
    { _id: 'faq-1', question: 'How do I get an estimate for my painting project?', answer: 'Call us at (619) 944-3226 to schedule a free, no-obligation estimate. We will visit your property, assess the scope of work, discuss your goals and color preferences, and provide a clear written estimate. There is no charge for this consultation.', category: 'General', orderRank: 1, relatedService: { _type: 'reference', _ref: 'service-interior-painting' } },
    { _id: 'faq-2', question: 'How long does it take to paint the interior of a house?', answer: 'The timeline depends on the size of your home and the scope of work. A single room typically takes 1-2 days including preparation. A full interior for a 3-bedroom home usually takes 3-5 working days. We will provide a specific timeline estimate during your consultation.', category: 'Timeline', orderRank: 2, relatedService: { _type: 'reference', _ref: 'service-interior-painting' } },
    { _id: 'faq-3', question: 'How long does exterior painting take?', answer: 'Exterior painting timelines depend on the size of your home, the condition of existing paint, and weather conditions. A typical single-family home exterior takes 4-7 working days. Extensive preparation work or weather delays can extend this timeline. We discuss timing expectations during the estimate.', category: 'Timeline', orderRank: 3, relatedService: { _type: 'reference', _ref: 'service-exterior-painting' } },
    { _id: 'faq-4', question: 'What kind of paint do you use?', answer: 'We use premium paints from trusted manufacturers. The specific products we recommend depend on the surface, the environment, and the application. For exterior work in coastal Florida, we select paints with built-in mold and mildew resistance, UV stability, and flexibility for temperature changes. For interiors, we choose paints appropriate for each room — moisture-resistant finishes in bathrooms and durable, washable coatings in high-traffic areas.', category: 'Materials', orderRank: 4 },
    { _id: 'faq-5', question: 'Do I need to move my furniture before you arrive?', answer: 'No. We handle moving and protecting your furniture as part of our service. We cover floors, fixtures, and furnishings with protective materials before any painting begins. If there are large or fragile items you prefer to relocate yourself, we are happy to coordinate that with you.', category: 'Process', orderRank: 5, relatedService: { _type: 'reference', _ref: 'service-interior-painting' } },
    { _id: 'faq-6', question: 'How often should I repaint the exterior of my home in St. Augustine?', answer: 'In St. Augustine and coastal Northeast Florida, most homes need exterior repainting every 5 to 7 years. Homes closer to the ocean or with heavy sun exposure may need repainting sooner. Signs it is time include fading, chalking, peeling, cracking, or persistent mold and mildew that cleaning does not resolve.', category: 'General', orderRank: 6, relatedService: { _type: 'reference', _ref: 'service-exterior-painting' } },
    { _id: 'faq-7', question: 'Can you paint my kitchen cabinets?', answer: 'Yes. We provide professional cabinet painting for kitchens, bathrooms, laundry rooms, and built-in cabinetry. Cabinet painting requires specialized preparation and products. We clean, degloss, sand, prime with bonding primer, and apply cabinet-grade finishes for a durable, smooth result. We are happy to assess your cabinets and let you know if they are good candidates for painting.', category: 'Process', orderRank: 7, relatedService: { _type: 'reference', _ref: 'service-cabinet-painting' } },
    { _id: 'faq-8', question: 'Do you work with HOA color requirements?', answer: 'Yes. Many communities in St. Johns County — including Nocatee, World Golf Village, and Ponte Vedra Beach — have HOA guidelines for exterior paint colors. We can help you select colors that meet your community requirements and assist with the approval process if needed.', category: 'General', orderRank: 8, relatedService: { _type: 'reference', _ref: 'service-exterior-painting' } },
    { _id: 'faq-9', question: 'What preparation do you do before painting?', answer: 'Preparation is the most important part of any paint job. For interiors, we fill holes and cracks, sand rough spots, repair minor wall damage, and prime as needed. For exteriors, we pressure wash, scrape failing paint, repair damaged surfaces, caulk gaps, and prime bare or repaired areas. The specific preparation depends on the condition of your surfaces.', category: 'Process', orderRank: 9 },
    { _id: 'faq-10', question: 'Are you licensed and insured?', answer: 'Yes. Ashore Painting carries appropriate business licensing and insurance coverage for painting work in St. Johns County, Florida. We are happy to provide proof of insurance upon request.', category: 'General', orderRank: 10 },
    { _id: 'faq-11', question: 'Do you offer commercial painting services?', answer: 'Yes. We paint offices, retail spaces, restaurants, medical offices, and other commercial properties in the St. Augustine area. We schedule work to minimize disruption to your business, including off-hours and weekend availability. Call us to discuss your commercial project.', category: 'General', orderRank: 11, relatedService: { _type: 'reference', _ref: 'service-commercial-painting' } },
    { _id: 'faq-12', question: 'Can you help me choose paint colors?', answer: 'Yes. We offer color consultation as part of our painting services. We visit your home, evaluate your lighting and existing finishes, discuss your preferences, and recommend specific colors. We can also apply test samples on your walls so you can see how colors look in your actual space before making a final decision.', category: 'General', orderRank: 12, relatedService: { _type: 'reference', _ref: 'service-color-consultation' } },
  ];

  for (const faq of faqs) {
    const { relatedService, ...rest } = faq;
    await client.createOrReplace({
      _type: 'faqItem',
      ...rest,
      answer: [block(faq.answer)],
      ...(relatedService && { relatedService }),
    });
  }

  // ============================================================
  // 6. NAVIGATION
  // ============================================================
  console.log('Creating Navigation...');
  await client.createOrReplace({
    _id: 'nav-main',
    _type: 'navigation',
    title: 'Main',
    items: [
      { _type: 'object', _key: 'nav1', label: 'Home', url: '/' },
      {
        _type: 'object',
        _key: 'nav2',
        label: 'Services',
        url: '/services',
        children: [
          { _type: 'object', _key: 'nav2a', label: 'Interior Painting', url: '/services/interior-painting' },
          { _type: 'object', _key: 'nav2b', label: 'Exterior Painting', url: '/services/exterior-painting' },
          { _type: 'object', _key: 'nav2c', label: 'Cabinet Painting', url: '/services/cabinet-painting' },
          { _type: 'object', _key: 'nav2d', label: 'Commercial Painting', url: '/services/commercial-painting' },
          { _type: 'object', _key: 'nav2e', label: 'Color Consultation', url: '/services/color-consultation' },
        ],
      },
      { _type: 'object', _key: 'nav3', label: 'Areas', url: '/areas' },
      { _type: 'object', _key: 'nav4', label: 'About', url: '/about' },
      { _type: 'object', _key: 'nav5', label: 'Contact', url: '/contact' },
    ],
  });

  // ============================================================
  // 7. HOMEPAGE (singleton)
  // ============================================================
  console.log('Creating Homepage...');
  await client.createOrReplace({
    _id: 'homePage',
    _type: 'homePage',
    heroHeading: 'Professional Painting Services in St. Augustine, FL',
    heroSubheading:
      'Interior and exterior painting for homes and businesses throughout Northeast Florida. Quality preparation, premium materials, and clean results on every project.',
    heroCta: { _type: 'cta', text: 'Call (619) 944-3226', url: 'tel:6199443226', style: 'primary' },
    featuredServices: services.map((s) => ({
      _type: 'reference',
      _ref: s._id,
      _key: Math.random().toString(36).slice(2, 10),
    })),
    whyChooseUsHeading: 'Why St. Augustine Homeowners Choose Ashore Painting',
    whyChooseUsItems: [
      { _type: 'object', _key: 'wcu1', title: 'Thorough Preparation', description: 'We spend the time on preparation that most painters skip. Proper prep is what separates a paint job that lasts from one that fails early.' },
      { _type: 'object', _key: 'wcu2', title: 'Coastal Florida Knowledge', description: 'We understand how salt air, humidity, and intense UV exposure affect paint performance in Northeast Florida, and we choose products and techniques accordingly.' },
      { _type: 'object', _key: 'wcu3', title: 'Clear Communication', description: 'You will know exactly what the project involves, what it costs, and how long it takes before we start. No surprises, no hidden fees.' },
      { _type: 'object', _key: 'wcu4', title: 'Clean, Detailed Work', description: 'We protect your home, work neatly, clean up daily, and pay attention to the details that make the difference between acceptable work and quality work.' },
    ],
    ctaHeading: 'Ready to Get Started?',
    ctaText: 'Call us today to schedule a free, no-obligation estimate for your painting project.',
    ctaButton: { _type: 'cta', text: 'Call (619) 944-3226', url: 'tel:6199443226', style: 'secondary' },
    seo: {
      _type: 'seo',
      metaTitle: 'Ashore Painting | St. Augustine, FL Painters',
      metaDescription:
        'Professional painting services in St. Augustine, FL. Interior, exterior, cabinet, and commercial painting. Quality preparation and premium materials. Call (619) 944-3226 for a free estimate.',
    },
  });

  // ============================================================
  // 8. ABOUT PAGE (via page type)
  // ============================================================
  console.log('Creating About page...');
  await client.createOrReplace({
    _id: 'page-about',
    _type: 'page',
    title: 'About Ashore Painting',
    slug: { _type: 'slug', current: 'about' },
    body: [
      block(
        'Ashore Painting is a professional painting company serving St. Augustine, Florida and the surrounding Northeast Florida communities. We provide interior and exterior painting services for residential and commercial properties.'
      ),
      block(
        'We built this company on a simple idea: do quality work, communicate honestly, and treat every home like it matters. Painting is a craft that rewards patience and attention to detail. We take the time to prepare surfaces properly, use the right products for the conditions, and apply paint with care. The result is work that looks better and lasts longer.'
      ),
      block('What We Do', 'h2'),
      block(
        'We paint interiors, exteriors, cabinets, and commercial spaces. We also offer color consultation to help homeowners make confident decisions about their paint colors. Every project starts with a free on-site estimate and a clear discussion about scope, timeline, and cost.'
      ),
      block('Where We Work', 'h2'),
      block(
        'We serve St. Augustine, St. Augustine Beach, Ponte Vedra Beach, Nocatee, World Golf Village, Palm Valley, and the surrounding communities in St. Johns County. We are familiar with the housing stock, the climate conditions, and the HOA requirements common in these areas.'
      ),
      block('Our Approach', 'h2'),
      block(
        'We believe the preparation is at least as important as the painting itself. We do not cut corners on surface prep because we know it determines how long the finished product lasts. In coastal Florida, where humidity, salt air, and sun exposure take a toll on every exterior surface, proper preparation is not optional — it is essential.'
      ),
      block(
        'We use premium paints selected for the specific conditions each surface faces. We communicate clearly throughout the project so you always know what is happening and what to expect. And we clean up thoroughly at the end of every work day.'
      ),
      block(
        'If you have a painting project in mind, call us at (619) 944-3226 to schedule a free estimate. We look forward to working with you.'
      ),
    ],
    seo: {
      _type: 'seo',
      metaTitle: 'About Ashore Painting | St. Augustine, FL',
      metaDescription:
        'Ashore Painting provides professional painting services in St. Augustine, FL. Quality preparation, premium materials, and honest communication on every project.',
    },
  });

  console.log('\nContent seeded successfully!');
  console.log(`- 1 Business Info`);
  console.log(`- 1 Site Settings`);
  console.log(`- 1 Homepage`);
  console.log(`- 1 Navigation`);
  console.log(`- ${services.length} Services`);
  console.log(`- ${areas.length} Service Areas`);
  console.log(`- ${faqs.length} FAQ Items`);
  console.log(`- 1 About Page`);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
