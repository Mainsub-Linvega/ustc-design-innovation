import Link from 'next/link';
import { PageShell } from '@/components/site-shell';
import { PortalImage } from '@/components/portal-image';
import { getCurrentUser } from '@/lib/auth';
import { getPublicProjects } from '@/lib/queries';
import { getPostImage } from '@/lib/editorial-images';
import styles from './projects.module.css';

export const dynamic = 'force-dynamic';

export const metadata = { title: '项目', description: '按学期查阅设计创新课程已公开的项目。' };

type Project = Awaited<ReturnType<typeof getPublicProjects>>[number];

/** Projects of a public offering are filed under its term; others under the year they were published. */
function archiveLabel(project: Project) {
  return project.offering?.term.name ?? (project.publishedAt ? `${project.publishedAt.getFullYear()} 年` : '未注明时间');
}

export default async function ProjectsPage() {
  const [user, projects] = await Promise.all([getCurrentUser(), getPublicProjects()]);
  // The query is newest first, so groups keep that order.
  const groups = new Map<string, Project[]>();
  for (const project of projects) groups.set(archiveLabel(project), [...(groups.get(archiveLabel(project)) ?? []), project]);

  return <PageShell currentUser={user}><div className={`container ${styles.page}`}>
    <h1>项目</h1>
    {!projects.length && <p className="empty-state">暂无已公开的项目。</p>}
    {[...groups].map(([label, items]) => <section className={styles.group} key={label} aria-labelledby={`term-${items[0].slug}`}>
      <h2 id={`term-${items[0].slug}`}>{label}</h2>
      <ul className={styles.grid}>
        {items.map(project => <li key={project.slug}>
          <Link href={`/news/${project.slug}`}>
            <PortalImage image={getPostImage(project.slug)} ratio="4 / 3"/>
            <h3>{project.title}</h3>
            {project.excerpt && <p>{project.excerpt}</p>}
          </Link>
        </li>)}
      </ul>
    </section>)}
  </div></PageShell>;
}
