import React from "react";
import { Helmet } from "react-helmet-async";
import { SITE, SEOProps } from "../lib/SEOConfig";

interface Props extends SEOProps {
  schema?: object | object[];
}

const SEO: React.FC<Props> = ({
  title,
  description,
  path = "/",
  keywords,
  ogType = "website",
  ogImage = SITE.ogImage,
  schema,
}) => {
  const url = `${SITE.url}${path}`;
  const jsonLd = schema ? JSON.stringify(schema) : undefined;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={SITE.locale} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SITE.twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="author" content={SITE.author} />
      {jsonLd && (
        <script type="application/ld+json">{jsonLd}</script>
      )}
    </Helmet>
  );
};

export default SEO;
