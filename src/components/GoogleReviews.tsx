import { ReactGoogleReviews } from "react-google-reviews";
import "react-google-reviews/dist/index.css";

interface Props {
  featurableId?: string;
}

export default function GoogleReviews({ featurableId }: Props) {
  if (!featurableId) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px', color: '#718096' }}>
        <p>Google Reviews will appear here once connected.</p>
        <p style={{ fontSize: '0.875rem' }}>
          Set up a free Featurable account at featurable.com, create a widget, and add the widget ID to Site Settings in Sanity.
        </p>
      </div>
    );
  }

  return (
    <ReactGoogleReviews
      layout="carousel"
      featurableId={featurableId}
      theme="light"
      structuredData={true}
      nameDisplay="firstAndLastInitials"
      maxCharacters={200}
      carouselAutoplay={true}
      carouselSpeed={5000}
    />
  );
}
