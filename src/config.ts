export interface SocialLinks {
  github?: string;
  linkedin?: string;
  resume?: string;
}
export interface SiteConfig {
  name: string;
  title: string;
  description: string[];
  location: string;
  socialLinks: SocialLinks;
  ogImage: string;
  projectsIndexDescription: string;
  aboutDescription: string;
}
export const siteConfig: SiteConfig = {
  name: "Florian Julé",
  title: "Product design, system integration and testing",
  description: [
    "Engineer with 8 years at Joby Aviation, where I led teams designing mechanisms and composite structures for the Joby S4 eVTOL — from first prototype to designs for FAA certification.",
    "I am currently pursuing an M.S. in Robotics at Northwestern University, with a focus on designing robotic systems for human augmentation.",
    "In my free time, I love \
    <a href='/gallery/flip.webp' data-photo-lightbox='true'>BMXing</a>, \
    <a href='/gallery/utah.webp' data-photo-lightbox='true'>mountain</a> \
    <a href='/gallery/tailwhip.webp' data-photo-lightbox='true'>biking</a> \
    and \
    <a href='/gallery/cham.webp' data-photo-lightbox='true'>ski</a> \
    <a href='/gallery/sierra.webp' data-photo-lightbox='true'>mountaineering</a> \
    — I also share some of it on <a href='https://www.youtube.com/@flojule' target='_blank' rel='noopener noreferrer'>YouTube</a>.",
    "Feel free to <a href='https://linkedin.com/in/flojule' target='_blank' rel='noopener noreferrer'>connect</a> and reach out!",
  ],
  location: "Berkeley, California",
  socialLinks: {
    github: "https://github.com/flojule",
    linkedin: "https://linkedin.com/in/flojule",
    resume: `${import.meta.env.BASE_URL}FlorianJule_resume.pdf#toolbar=0&navpanes=0`,
  },
  ogImage: "/images/flo_1_0.webp",
  projectsIndexDescription: "Engineering and robotics projects by Florian Julé.",
  aboutDescription:
    "Florian Julé — engineer with 8 years at Joby Aviation and currently pursuing an M.S. in Robotics at Northwestern, focused on robotic systems for human augmentation.",
};
