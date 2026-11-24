import {notFound} from 'next/navigation';
import SitePage from '../../../SitePage.jsx';
import {projects} from '../../../propertyData.js';

const find = slug => projects.find(item=>item.id===slug);
export function generateStaticParams() {
 return projects.map(item=>({slug: item.id}));
}
export async function generateMetadata({params}) {
 const item=find((await params).slug);
 return {title: `${item?.title||item?.name||'Page not found'} | SMART YIELD PROPERTY`};
}
export default async function Page({params}) {
 const {slug}=await params;
 if(!find(slug)) notFound();
 return <SitePage page="property" slug={slug}/>;
}
