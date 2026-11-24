import {notFound} from 'next/navigation';
import SitePage from '../../../SitePage.jsx';
import {jobs} from '../../../jobs.js';

const find = slug => jobs.find(item=>item.url===`/jobs/${slug}/`);
export function generateStaticParams() {
 return jobs.map(item=>({slug: item.url.split('/').filter(Boolean).at(-1)}));
}
export async function generateMetadata({params}) {
 const item=find((await params).slug);
 return {title: `${item?.title||item?.name||'Page not found'} | SMART YIELD PROPERTY`};
}
export default async function Page({params}) {
 const {slug}=await params;
 if(!find(slug)) notFound();
 return <SitePage page="job" slug={slug}/>;
}
