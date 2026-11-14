import { COURSE_PRESETS } from './course-presets';

type CourseSlug = (typeof COURSE_PRESETS)[number]['slug'];

export type CourseKind = {
  slug: CourseSlug;
  title: string;
  /** Shown beside the title, e.g. the Ⅰ / Ⅱ parts of the practice course. */
  parts?: string;
  /** The one sentence a visitor reads about the course. */
  position: string;
};

const title = (slug: CourseSlug) => COURSE_PRESETS.find(preset => preset.slug === slug)!.title;

// Wording follows docs/platform-design.md. Credits, prerequisites and how
// 实践Ⅰ carries into 实践Ⅱ are not confirmed yet, so they are not stated here.
export const courseKinds: readonly CourseKind[] = [
  { slug: 'design-thinking', title: title('design-thinking'), position: '按周上课，在课堂活动和练习里学会观察、访谈、做原型和测试。' },
  { slug: 'design-practice', title: title('design-practice'), parts: 'Ⅰ · Ⅱ', position: '一个小组，一个项目，从秋季做到春季。' },
];

export function getCourseKind(slug: string): CourseKind | undefined {
  return courseKinds.find(kind => kind.slug === slug);
}
