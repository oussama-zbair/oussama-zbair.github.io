import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { seoConfig, sameAsUrls, knownLanguages, knowsAbout, buildAbsoluteUrl } from '@/config/seo';
import { resolveCanonicalUrl } from '@/lib/canonical';
import { generateJsonLd } from '@/lib/jsonld';

interface SEOHeadProps {
  title?: string;
  description?: string;
  ogType?: 'profile' | 'website';
  path?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  ogType = 'website',
  path,
}) => {
  const location = useLocation();
  const currentPath = path ?? location.pathname;

  const pageTitle = title ?? `${seoConfig.name} | ${seoConfig.jobTitle}`;
  const pageDescription = description ?? seoConfig.description;
  const canonicalUrl = resolveCanonicalUrl(seoConfig.canonicalDomain, currentPath);
  const ogImageUrl = buildAbsoluteUrl(seoConfig.ogImagePath);

  const isHomepage = currentPath === '/' || currentPath === '';
  const jsonLd = isHomepage
    ? generateJsonLd(seoConfig, sameAsUrls, knownLanguages, knowsAbout)
    : null;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <link rel="canonical" href={canonicalUrl} />

      <meta name="description" content={pageDescription} />
      <meta name="author" content={seoConfig.name} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="keywords" content={seoConfig.keywords.join(', ')} />

      <meta property="og:title" content={pageTitle} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:site_name" content={seoConfig.siteName} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={seoConfig.twitterHandle} />
      <meta name="twitter:creator" content={seoConfig.twitterHandle} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={ogImageUrl} />

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
