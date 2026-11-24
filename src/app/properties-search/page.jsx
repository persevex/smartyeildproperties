import SitePage from '../../SitePage.jsx';

export const metadata = {title: 'Search Bangalore Properties | SMART YIELD PROPERTY'};

export default async function Page({searchParams}) {
 const values = await searchParams;
 const query = new URLSearchParams();
 for (const [key,value] of Object.entries(values)) {
  for (const item of Array.isArray(value)?value:[value]) if(item!==undefined) query.append(key,item);
 }
 return <SitePage page="search" initialSearch={query.toString()}/>;
}
