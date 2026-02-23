import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Premium LVP Flooring Installed Fast | Senior Floors',
  description: 'High-quality Luxury Vinyl Plank + Expert Installation. Free Estimate in 24h. Licensed & Insured.',
  openGraph: { title: 'Premium LVP Flooring | Senior Floors', description: 'LVP + Expert Installation. Free Estimate in 24h.' },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Senior Floors',
  description: 'Premium LVP flooring installation. High-quality Luxury Vinyl Plank + Expert Installation. Free Estimate in 24h.',
  url: 'https://seniorfloors.com',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        {/* Pixel Meta / Google Tag Manager: add scripts here when IDs are set, e.g.:
            <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){...})(window,document,'script','dataLayer','GTM-XXXX');` }} />
            <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXX" ... /></noscript>
        */}
      </body>
    </html>
  )
}
