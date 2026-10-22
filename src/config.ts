export interface SocialLinks {
  github?: string;
  linkedin?: string;
  resume?: string;
}
export interface EducationEntry {
  school: string;
  degree: string;
  year: string;
  link?: string;
}
export interface SiteConfig {
  name: string;
  title: string;
  description: string[];
  location: string;
  // Shown in this order (most recent first).
  education: EducationEntry[];
  socialLinks: SocialLinks;
  ogImage: string;
}
export const siteConfig: SiteConfig = {
  name: "Florian Julé",
  title: "Mechanical & Robotics Engineer | Product Development",
  description: [
    "10 years developing electromechanical systems from concept through production: mechanical design, product development, systems integration, and ROS 2 robotics software.",
    "In my free time, I love \
    <a href='/gallery/flip.webp' data-photo-lightbox='hobbies'>BMXing</a>, \
    <a href='/gallery/utah.webp' data-photo-lightbox='hobbies'>mountain</a> \
    <a href='/gallery/tailwhip.webp' data-photo-lightbox='hobbies'>biking</a> \
    and \
    <a href='/gallery/cham.webp' data-photo-lightbox='hobbies'>ski</a> \
    <a href='/gallery/sierra.webp' data-photo-lightbox='hobbies'>mountaineering</a>. \
    I share some of it on <a href='https://www.youtube.com/@flojule' target='_blank' rel='noopener noreferrer'>YouTube</a>.",
    "Feel free to <a href='https://linkedin.com/in/flojule' target='_blank' rel='noopener noreferrer'>connect</a> and reach out!",
  ],
  location: "Oakland, California",
  education: [
    { school: "Northwestern University", degree: "MS Robotics", year: "2026", link: "https://www.mccormick.northwestern.edu/robotics/" },
    { school: "University of Michigan", degree: "MS Aerospace Engineering", year: "2016", link: "https://aero.engin.umich.edu/" },
    { school: "Arts et Métiers ParisTech", degree: "BS Engineering", year: "2015", link: "https://artsetmetiers.fr/en" },
  ],
  socialLinks: {
    github: "https://github.com/flojule",
    linkedin: "https://linkedin.com/in/flojule",
    // Viewer params are applied by the PDF overlay, not stored here.
    resume: `${import.meta.env.BASE_URL}docs/FlorianJule_resume.pdf`,
  },
  ogImage: "/og.webp",
};
