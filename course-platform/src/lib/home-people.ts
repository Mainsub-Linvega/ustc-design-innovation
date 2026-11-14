export type TeamMember = { name: string; role: string; href?: string };
export type Partner = { name: string; href: string };

// Left empty until the teaching team provides a list that may be published.
// The homepage shows the names only when there are some.
export const teachingTeam: readonly TeamMember[] = [];

// Only relations that can be checked against a public source are listed:
// the SUGAR member list names USTC (Hefei).
export const partners: readonly Partner[] = [
  { name: 'SUGAR Network', href: 'https://sugar-network.org/network/' },
  { name: 'Stanford ME310', href: 'https://me310.stanford.edu/' },
];
