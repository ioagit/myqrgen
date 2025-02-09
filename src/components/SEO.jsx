import React from "react";
import { Helmet } from "react-helmet";

const SEO = ({
  title,
  description,
  canonicalUrl,
  ogType = "website",
  ogImage,
  schema,
}) => {
  const baseUrl = "https://qr-code-generator.com"; // Replace with your actual domain
  const fullTitle = `${title} | QR Code Generator`;

  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={`${baseUrl}${canonicalUrl}`} />

      {/* Open Graph meta tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={`${baseUrl}${canonicalUrl}`} />
      {ogImage && <meta property="og:image" content={`${baseUrl}${ogImage}`} />}

      {/* Twitter Card meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage && (
        <meta name="twitter:image" content={`${baseUrl}${ogImage}`} />
      )}

      {/* Schema.org markup */}
      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  );
};

export default SEO;
