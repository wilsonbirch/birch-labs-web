import { about } from "@/content/about";
import { contact } from "@/content/contact";
import { home } from "@/content/home";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { work } from "@/content/work";
import { absoluteUrl } from "@/lib/site-url";
import { SOCIAL_LABELS, type ProjectCard, type SocialKey } from "@/lib/types";

/**
 * /llms.txt (https://llmstxt.org) and /llms-full.txt, generated from content/
 * so agents read the same facts as the pages. Drafts are already filtered out
 * of `projects` in production builds.
 */

const intro = `${site.businessName} is the freelance software practice of ${site.owner.name}, a ${site.owner.jobTitle.toLowerCase()}. ${site.workingModel}`;

function header(): string[] {
  return [
    `# ${site.businessName}`,
    "",
    `> ${intro} Services include ${services.services
      .slice(0, 5)
      .map((s) => s.title)
      .join(", ")}, and more.`,
    "",
    `Availability: ${site.availability}.`,
    `Engagements: ${site.engagements.join("; ")}.`,
    "",
    "## Contact",
    "",
    `- Email: ${site.email}`,
    `- [Project inquiry form](${absoluteUrl("/contact")}): name, email, and a short description of the project`,
    ...Object.entries(site.social)
      .filter(([, href]) => href)
      .map(([key, href]) => `- ${SOCIAL_LABELS[key as SocialKey]}: ${href}`),
    "",
  ];
}

const pages = [
  { name: "Home", path: "/", description: home.seo.description },
  { name: "Work", path: "/work", description: work.seo.description },
  { name: "Services", path: "/services", description: services.seo.description },
  { name: "About", path: "/about", description: about.seo.description },
  { name: "Contact", path: "/contact", description: contact.seo.description },
];

function projectLink(p: ProjectCard): string {
  return p.links.live ?? p.links.github ?? absoluteUrl("/work");
}

function projectLine(p: ProjectCard): string {
  return `- [${p.title}](${projectLink(p)}): ${p.summary} (${p.role}, ${p.year}; ${p.stack.join(", ")})`;
}

export function llmsTxt(): string {
  return [
    ...header(),
    "## Pages",
    "",
    ...pages.map((p) => `- [${p.name}](${absoluteUrl(p.path)}): ${p.description}`),
    "",
    "## Services",
    "",
    ...services.services.map((s) => `- ${s.title}: ${s.description ?? ""}`.trimEnd()),
    "",
    "## Selected work",
    "",
    ...projects.map(projectLine),
    "",
    "## Optional",
    "",
    `- [Full details](${absoluteUrl("/llms-full.txt")}): every service, project write-ups, and background`,
    "",
  ].join("\n");
}

export function llmsFullTxt(): string {
  return [
    ...header(),
    "## About",
    "",
    ...about.body,
    "",
    ...about.quickFacts.map((f) => `- ${f.label.trim()}: ${f.value}`),
    "",
    "## Services",
    "",
    ...services.services.flatMap((s) => [
      `### ${s.title}`,
      "",
      ...(s.description ? [s.description, ""] : []),
      ...(s.bullets ?? []).map((b) => `- ${b}`),
      "",
    ]),
    `Stack: ${services.stack.join(", ")}.`,
    "",
    "## Selected work",
    "",
    ...projects.flatMap((p) => [
      `### ${p.title}`,
      "",
      `${p.client} · ${p.year} · ${p.role}`,
      `Link: ${projectLink(p)}${p.links.github && p.links.live ? ` (source: ${p.links.github})` : ""}`,
      `Stack: ${p.stack.join(", ")}`,
      "",
      p.summary,
      "",
      ...p.body.flatMap((para) => [para, ""]),
    ]),
  ].join("\n");
}
