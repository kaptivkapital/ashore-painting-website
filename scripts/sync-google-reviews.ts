/**
 * Google Reviews Sync Script
 * Fetches reviews from Google Places API and writes them into Sanity.
 *
 * Usage:
 *   GOOGLE_PLACES_API_KEY=xxx GOOGLE_PLACE_ID=xxx npx tsx scripts/sync-google-reviews.ts
 *
 * Setup:
 * 1. Enable the Places API in Google Cloud Console
 * 2. Create an API key (restrict to Places API)
 * 3. Find your Place ID at: https://developers.google.com/maps/documentation/places/web-service/place-id
 *    (search for your business name + city)
 * 4. Set GOOGLE_PLACE_ID in your .env file
 * 5. Set GOOGLE_PLACES_API_KEY in your .env file
 *
 * Limitations:
 * - Google Places API returns a maximum of 5 most recent reviews
 * - To get more, you need the Google Business Profile API (requires OAuth)
 * - Reviews sync is additive -- it won't delete reviews from Sanity if removed from Google
 *
 * Run this before each build or on a cron schedule to keep reviews fresh.
 */

import { createClient } from '@sanity/client';

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const PLACE_ID = process.env.GOOGLE_PLACE_ID;
const SANITY_TOKEN = process.env.SANITY_API_TOKEN;

if (!GOOGLE_API_KEY) {
  console.error('Missing GOOGLE_PLACES_API_KEY environment variable');
  console.log('\nTo set up:');
  console.log('1. Go to https://console.cloud.google.com');
  console.log('2. Enable "Places API (New)" or "Places API"');
  console.log('3. Create an API key');
  console.log('4. Add GOOGLE_PLACES_API_KEY=your_key to .env');
  process.exit(1);
}

if (!PLACE_ID) {
  console.error('Missing GOOGLE_PLACE_ID environment variable');
  console.log('\nTo find your Place ID:');
  console.log('1. Go to https://developers.google.com/maps/documentation/places/web-service/place-id');
  console.log('2. Search for "Ashore Painting St Augustine FL"');
  console.log('3. Copy the Place ID');
  console.log('4. Add GOOGLE_PLACE_ID=your_place_id to .env');
  process.exit(1);
}

const sanityClient = createClient({
  projectId: 'h85qpyij',
  dataset: 'production',
  apiVersion: '2025-01-28',
  token: SANITY_TOKEN,
  useCdn: false,
});

interface GoogleReview {
  authorAttribution: { displayName: string };
  rating: number;
  text: { text: string };
  relativePublishTimeDescription: string;
  publishTime: string;
}

async function fetchGoogleReviews(): Promise<GoogleReview[]> {
  // Use Places API (New) - the current version
  const url = `https://places.googleapis.com/v1/places/${PLACE_ID}?fields=reviews,rating,userRatingCount&key=${GOOGLE_API_KEY}`;

  const res = await fetch(url, {
    headers: { 'X-Goog-FieldMask': 'reviews,rating,userRatingCount' },
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('Google Places API error:', res.status, err);

    // Fallback to legacy API
    console.log('Trying legacy Places API...');
    const legacyUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,rating,user_ratings_total&key=${GOOGLE_API_KEY}`;
    const legacyRes = await fetch(legacyUrl);
    const legacyData = await legacyRes.json();

    if (legacyData.result?.reviews) {
      return legacyData.result.reviews.map((r: any) => ({
        authorAttribution: { displayName: r.author_name },
        rating: r.rating,
        text: { text: r.text },
        publishTime: new Date(r.time * 1000).toISOString(),
      }));
    }

    throw new Error('Failed to fetch reviews from both APIs');
  }

  const data = await res.json();
  return data.reviews || [];
}

function reviewToSanityId(review: GoogleReview): string {
  // Create a stable ID from author name + first 50 chars of review
  const key = `${review.authorAttribution.displayName}-${review.text.text.slice(0, 50)}`
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);
  return `google-review-${key}`;
}

async function syncReviews() {
  console.log('Fetching Google reviews...');
  const reviews = await fetchGoogleReviews();
  console.log(`Found ${reviews.length} reviews from Google\n`);

  if (reviews.length === 0) {
    console.log('No reviews found. Make sure the Place ID is correct and the business has reviews.');
    return;
  }

  let created = 0;
  let skipped = 0;

  for (const review of reviews) {
    if (!review.text?.text || review.text.text.trim().length === 0) {
      skipped++;
      continue;
    }

    const id = reviewToSanityId(review);
    const publishDate = review.publishTime
      ? new Date(review.publishTime).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0];

    try {
      await sanityClient.createIfNotExists({
        _id: id,
        _type: 'testimonial',
        quote: review.text.text,
        authorName: review.authorAttribution.displayName,
        rating: review.rating,
        source: 'Google',
        featured: true,
        dateReceived: publishDate,
      });
      created++;
      console.log(`+ ${review.authorAttribution.displayName} (${review.rating}★)`);
    } catch (err: any) {
      if (err.statusCode === 409) {
        skipped++;
        console.log(`= ${review.authorAttribution.displayName} (already exists)`);
      } else {
        console.error(`! Error saving review from ${review.authorAttribution.displayName}:`, err.message);
      }
    }
  }

  console.log(`\nDone: ${created} new, ${skipped} skipped`);
  console.log('Reviews are now in Sanity. Rebuild the site to display them.');
}

syncReviews().catch((err) => {
  console.error('Sync failed:', err);
  process.exit(1);
});
