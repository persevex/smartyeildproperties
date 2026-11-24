import data from './homeData.json';
import moreBlogs from './blogPosts.json';
export const journalPosts=[...new Map([...data.blogs,...moreBlogs].map(p=>[p.url,p])).values()];
