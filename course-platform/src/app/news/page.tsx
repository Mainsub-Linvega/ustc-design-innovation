import Link from 'next/link';
import { PageShell } from '@/components/site-shell';
import { getCurrentUser } from '@/lib/auth';
import { getPublicNews } from '@/lib/queries';
import { newsFeatures } from '@/lib/home-editorial';
import { displayDate } from '@/lib/policy';
import styles from './news.module.css';

export const dynamic = 'force-dynamic';

export const metadata = { title: '新闻', description: '设计创新课程的通知、活动报道与项目进展。' };

export default async function NewsPage() {
  const [user, posts] = await Promise.all([getCurrentUser(), getPublicNews()]);
  const items = [
    ...posts.map(post => ({ href: `/news/${post.slug}`, title: post.title, excerpt: post.excerpt, date: post.publishedAt })),
    ...newsFeatures.map(post => ({ href: `/updates/${post.slug}`, title: post.title, excerpt: post.excerpt, date: null as Date | null })),
  ];

  return <PageShell currentUser={user}><div className={`container ${styles.page}`}>
    <h1>新闻</h1>
    {!items.length && <p className="empty-state">暂无已发布新闻。</p>}
    <ul className={styles.list}>
      {items.map(item => <li key={item.href}>
        <Link href={item.href}>
          {item.date && <time dateTime={item.date.toISOString()}>{displayDate(item.date)}</time>}
          <h2>{item.title}</h2>
          {item.excerpt && <p>{item.excerpt}</p>}
        </Link>
      </li>)}
    </ul>
  </div></PageShell>;
}
