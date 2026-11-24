import {notFound} from 'next/navigation';
import SitePage from '../../../SitePage.jsx';
import {journalPosts} from '../../../journalPosts.js';

const find = slug => journalPosts.find(item=>item.url===`/blogs/${slug}/`);
export function generateStaticParams() {
 return journalPosts.map(item=>({slug: item.url.split('/').filter(Boolean).at(-1)}));
}
export async function generateMetadata({params}) {
 const item=find((await params).slug);
 return {title: `${item?.title||item?.name||'Page not found'} | SMART YIELD PROPERTY`};
}
export default async function Page({params}) {
 const {slug}=await params;
 if(!find(slug)) notFound();
 return <SitePage page="article" slug={slug}/>;
}
