interface Github {
  /**
   * GitHub org/user name
   */
  username: string;
}

interface GitHubProjects {
  /**
   * Display GitHub projects?
   */
  display?: boolean;

  /**
   * Header
   */
  header?: string;

  /**
   * 'automatic' | 'manual'
   */
  mode?: string;

  /**
   * Config of automatic mode
   */
  automatic?: {
    /**
     * 'stars' | 'updated'
     */
    sortBy?: string;

    /**
     * How many projects to display
     */
    limit?: number;

    /**
     * Exclude projects option
     */
    exclude?: {
      /**
       * Forked projects will not be displayed if set to true
       */
      forks?: boolean;

      /**
       * These projects will not be displayed
       *
       * example: ['my-project1', 'my-project2']
       */
      projects?: Array<string>;
    };
  };

  /**
   * Config of manual mode
   */
  manual?: {
    /**
     * These projects will be displayed
     *
     * example: ['my-project1', 'my-project2']
     */
    projects?: Array<string>;
  };
}

interface ExternalProjects {
  /**
   * Header
   */
  header?: string;

  /**
   * Project list
   */
  projects?: {
    title: string;
    description?: string;
    imageUrl?: string;
    link: string;
  }[];
}

interface Projects {
  github?: GitHubProjects;

  external?: ExternalProjects;
}

interface SEO {
  /**
   * Meta title
   */
  title?: string;

  /**
   * Meta description
   */
  description?: string;

  /**
   * Meta image
   */
  imageURL?: string;
}

interface Social {
  /**
   * LinkedIn
   */
  linkedin?: string;

  /**
   * Twitter
   */
  twitter?: string;

  /**
   * Mastodon
   */
  mastodon?: string;

  /**
   * ResearchGate username
   */
  researchGate?: string;

  /**
   * Facebook
   */
  facebook?: string;

  /**
   * Instagram
   */
  instagram?: string;

  /**
   * Reddit
   */
  reddit?: string;

  /**
   * Threads
   */
  threads?: string;

  /**
   * YouTube
   */
  youtube?: string;

  /**
   * Udemy
   */
  udemy?: string;

  /**
   * Dribbble
   */
  dribbble?: string;

  /**
   * Behance
   */
  behance?: string;

  /**
   * Medium
   */
  medium?: string;

  /**
   * dev
   */
  dev?: string;

  /**
   * Stack Overflow
   */
  stackoverflow?: string;

  /**
   * Website
   */
  website?: string;

  /**
   * Skype username
   */
  skype?: string;

  /**
   * Telegram username
   */
  telegram?: string;

  /**
   * Phone
   */
  phone?: string;

  /**
   * Email
   */
  email?: string;

  /**
   * Discord username
   */
  discord?: string;
}

interface Resume {
  /**
   * Resume file url
   */
  fileUrl?: string;
}

interface Experience {
  company?: string;
  position?: string;
  from: string;
  to: string;
  companyLink?: string;
}

interface Certification {
  body?: string;
  name?: string;
  year?: string;
  link?: string;
}

interface Education {
  institution?: string;
  degree?: string;
  from: string;
  to: string;
}

interface Publication {
  title: string;
  conferenceName?: string;
  journalName?: string;
  authors?: string;
  link?: string;
  description?: string;
}

interface GoogleAnalytics {
  /**
   * GA3 tracking id/GA4 tag id UA-XXXXXXXXX-X | G-XXXXXXXXXX
   */
  id?: string;
}

interface Hotjar {
  /**
   * Hotjar id
   */
  id?: string;

  /**
   * Snippet Version
   */
  snippetVersion?: number;
}

interface Blog {
  /**
   * medium | dev
   */
  source?: string;

  /**
   * Username
   */
  username?: string;

  /**
   * How many articles to display
   *
   * Max is 10
   */
  limit?: number;
}

interface CustomTheme {
  /**
   * Primary color
   */
  primary?: string;

  /**
   * Secondary color
   */
  secondary?: string;

  /**
   * Accent color
   */
  accent?: string;

  /**
   * Neutral color
   */
  neutral?: string;

  /**
   * Base color of page
   */
  'base-100'?: string;

  /**
   * Border radius of rounded-box
   */
  '--rounded-box'?: string;

  /**
   * Border radius of rounded-btn
   */
  '--rounded-btn'?: string;
}

interface ThemeConfig {
  /**
   * Default theme
   */
  defaultTheme?: string;

  /**
   * Hides the switch in the navbar
   */
  disableSwitch?: boolean;

  /**
   * Should use the prefers-color-scheme media-query
   */
  respectPrefersColorScheme?: boolean;

  /**
   * Hide the ring in Profile picture
   */
  displayAvatarRing?: boolean;

  /**
   * Available themes
   */
  themes?: Array<string>;

  /**
   * Custom theme
   */
  customTheme?: CustomTheme;
}

interface Config {
  /**
   * GitHub config
   */
  github: Github;

  /**
   * Vite's base url
   */
  base?: string;

  /**
   * Projects config
   */
  projects?: Projects;

  /**
   * SEO config
   */
  seo?: SEO;

  /**
   * Social links
   */
  social?: Social;

  /**
   * Skill list
   */
  skills?: Array<string>;

  /**
   * Experience list
   */
  experiences?: Array<Experience>;

  /**
   * Certifications list
   */
  certifications?: Array<Certification>;

  /**
   * Education list
   */
  educations?: Array<Education>;

  /**
   * Publication list
   */
  publications?: Array<Publication>;

  /**
   * Resume
   */
  resume?: Resume;

  /**
   * Google Analytics config
   */
  googleAnalytics?: GoogleAnalytics;

  /**
   * Hotjar config
   */
  hotjar?: Hotjar;

  /**
   * Blog config
   */
  blog?: Blog;

  /**
   * Theme config
   */
  themeConfig?: ThemeConfig;

  /**
   * Custom footer
   */
  footer?: string;

  /**
   * Enable PWA
   */
  enablePWA?: boolean;
}

declare const CONFIG: Config;
