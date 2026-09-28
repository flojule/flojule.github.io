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
  aboutDescription: string;
}
export const siteConfig: SiteConfig = {
  name: "Florian Julé",
  title: "Mechanical & Robotics Engineer | Product Development",
  description: [
    "Mechanical and robotics engineer with 10 years of experience developing complex electromechanical systems from concept through production. Experienced in mechanical design, product development, systems integration, and robotics software using ROS 2.",
    "In my free time, I love \
    <a href='/gallery/flip.webp' data-photo-lightbox='hobbies'>BMXing</a>, \
    <a href='/gallery/utah.webp' data-photo-lightbox='hobbies'>mountain</a> \
    <a href='/gallery/tailwhip.webp' data-photo-lightbox='hobbies'>biking</a> \
    and \
    <a href='/gallery/cham.webp' data-photo-lightbox='hobbies'>ski</a> \
    <a href='/gallery/sierra.webp' data-photo-lightbox='hobbies'>mountaineering</a> \
    — I also share some of it on <a href='https://www.youtube.com/@flojule' target='_blank' rel='noopener noreferrer'>YouTube</a>.",
    "Feel free to <a href='https://linkedin.com/in/flojule' target='_blank' rel='noopener noreferrer'>connect</a> and reach out!",
  ],
  location: "Oakland, California",
  socialLinks: {
    github: "https://github.com/flojule",
    linkedin: "https://linkedin.com/in/flojule",
    // Viewer params are applied by the PDF overlay, not stored here.
    resume: `${import.meta.env.BASE_URL}FlorianJule_resume.pdf`,
  },
  ogImage: "/images/flo_1_0.webp",
  aboutDescription:
    "Florian Julé",
};
