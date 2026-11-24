import '../styles.css';
import '../homepage.css';
import '../property-location.css';
import '../career.css';
import '../blogs.css';
import '../local-pages.css';
import '../contact.css';
import '../about.css';
import '../floor-plans.css';
import '../properties.css';
import '../property-details.css';
import '../motion.css';

export const metadata = {
 title: 'SMART YIELD PROPERTY | Top Real Estate property in Top tier cities',
 description: 'Find apartments, villas and ready-to-move homes with SMART YIELD PROPERTY.',
 icons: {
  icon: [
   {url: '/favicon.ico', type: 'image/x-icon', sizes: '16x16 32x32 48x48 64x64 128x128 256x256'},
   ...[16,32,48,96,192,512].map(size=>({
    url: `/favicon-${size}x${size}.png`,
    type: 'image/png',
    sizes: `${size}x${size}`,
   })),
  ],
  shortcut: '/favicon.ico',
  apple: [{url: '/apple-touch-icon.png', type: 'image/png', sizes: '180x180'}],
 },
};
export const viewport = {themeColor: '#173f32'};

export default function RootLayout({children}) {
 return <html lang="en"><body><div id="root">{children}</div></body></html>;
}
