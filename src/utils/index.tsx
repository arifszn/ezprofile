import { hotjar } from 'react-hotjar';
import { LOCAL_STORAGE_KEY_NAME } from '../constants';
import { DEFAULT_CUSTOM_THEME } from '../constants/default-custom-theme';
import { DEFAULT_THEMES } from '../constants/default-themes';
import colors from '../data/colors.json';
import {
  SanitizedConfig,
  SanitizedHotjar,
  SanitizedThemeConfig,
} from '../interfaces/sanitized-config';

export const isDarkishTheme = (appliedTheme: string): boolean => {
  return ['dark', 'halloween', 'forest', 'black', 'luxury', 'dracula'].includes(
    appliedTheme,
  );
};

type EventParams = {
  [key: string]: string;
};

type Colors = {
  [key: string]: { color: string | null; url: string };
};

export const getSanitizedConfig = (
  config: Config,
): SanitizedConfig | Record<string, never> => {
  try {
    return {
      github: {
        username: config.github.username,
      },
      projects: {
        github: {
          display: config?.projects?.github?.display ?? true,
          header: config?.projects?.github?.header || 'Github Projects',
          mode: config?.projects?.github?.mode || 'automatic',
          automatic: {
            sortBy: config?.projects?.github?.automatic?.sortBy || 'stars',
            limit: config?.projects?.github?.automatic?.limit || 8,
            exclude: {
              forks:
                config?.projects?.github?.automatic?.exclude?.forks || false,
              projects:
                config?.projects?.github?.automatic?.exclude?.projects || [],
            },
          },
          manual: {
            projects: config?.projects?.github?.manual?.projects || [],
          },
        },
        external: {
          header: config?.projects?.external?.header || 'My Projects',
          projects: config?.projects?.external?.projects || [],
        },
      },
      seo: {
        title: config?.seo?.title,
        description: config?.seo?.description,
        imageURL: config?.seo?.imageURL,
      },
      social: {
        linkedin: config?.social?.linkedin,
        twitter: config?.social?.twitter,
        mastodon: config?.social?.mastodon,
        facebook: config?.social?.facebook,
        instagram: config?.social?.instagram,
        reddit: config?.social?.reddit,
        threads: config?.social?.threads,
        youtube: config?.social?.youtube,
        udemy: config?.social?.udemy,
        dribbble: config?.social?.dribbble,
        behance: config?.social?.behance,
        medium: config?.social?.medium,
        dev: config?.social?.dev,
        stackoverflow: config?.social?.stackoverflow,
        website: config?.social?.website,
        phone: config?.social?.phone,
        email: config?.social?.email,
        skype: config?.social?.skype,
        telegram: config?.social?.telegram,
        researchGate: config?.social?.researchGate,
        discord: config?.social?.discord,
      },
      resume: {
        fileUrl: config?.resume?.fileUrl || '',
      },
      skills: config?.skills || [],
      experiences:
        config?.experiences?.filter(
          (experience) =>
            experience.company ||
            experience.position ||
            experience.from ||
            experience.to,
        ) || [],
      certifications:
        config?.certifications?.filter(
          (certification) =>
            certification.year || certification.name || certification.body,
        ) || [],
      educations:
        config?.educations?.filter(
          (item) => item.institution || item.degree || item.from || item.to,
        ) || [],
      publications: config?.publications?.filter((item) => item.title) || [],
      googleAnalytics: {
        id: config?.googleAnalytics?.id,
      },
      hotjar: {
        id: config?.hotjar?.id,
        snippetVersion: config?.hotjar?.snippetVersion || 6,
      },
      blog: {
        username: config?.blog?.username || '',
        source: config?.blog?.source || 'dev',
        limit: config?.blog?.limit || 5,
        display: !!config?.blog?.username && !!config?.blog?.source,
      },
      themeConfig: {
        defaultTheme: config?.themeConfig?.defaultTheme || DEFAULT_THEMES[0],
        disableSwitch: config?.themeConfig?.disableSwitch || false,
        respectPrefersColorScheme:
          config?.themeConfig?.respectPrefersColorScheme || false,
        displayAvatarRing: config?.themeConfig?.displayAvatarRing ?? true,
        themes: config?.themeConfig?.themes || DEFAULT_THEMES,
        customTheme: {
          primary:
            config?.themeConfig?.customTheme?.primary ||
            DEFAULT_CUSTOM_THEME.primary,
          secondary:
            config?.themeConfig?.customTheme?.secondary ||
            DEFAULT_CUSTOM_THEME.secondary,
          accent:
            config?.themeConfig?.customTheme?.accent ||
            DEFAULT_CUSTOM_THEME.accent,
          neutral:
            config?.themeConfig?.customTheme?.neutral ||
            DEFAULT_CUSTOM_THEME.neutral,
          'base-100':
            config?.themeConfig?.customTheme?.['base-100'] ||
            DEFAULT_CUSTOM_THEME['base-100'],
          '--rounded-box':
            config?.themeConfig?.customTheme?.['--rounded-box'] ||
            DEFAULT_CUSTOM_THEME['--rounded-box'],
          '--rounded-btn':
            config?.themeConfig?.customTheme?.['--rounded-btn'] ||
            DEFAULT_CUSTOM_THEME['--rounded-btn'],
        },
      },
      footer: config?.footer,
      enablePWA: config?.enablePWA ?? true,
    };
  } catch (error) {
    return {};
  }
};

export const getInitialTheme = (themeConfig: SanitizedThemeConfig): string => {
  if (themeConfig.disableSwitch) {
    return themeConfig.defaultTheme;
  }

  if (
    typeof window !== 'undefined' &&
    !(localStorage.getItem(LOCAL_STORAGE_KEY_NAME) === null)
  ) {
    const savedTheme = localStorage.getItem(LOCAL_STORAGE_KEY_NAME);

    if (savedTheme && themeConfig.themes.includes(savedTheme)) {
      return savedTheme;
    }
  }

  if (themeConfig.respectPrefersColorScheme && !themeConfig.disableSwitch) {
    return typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : themeConfig.defaultTheme;
  }

  return themeConfig.defaultTheme;
};

export const skeleton = ({
  widthCls = null,
  heightCls = null,
  style = {} as React.CSSProperties,
  shape = 'rounded-full',
  className = null,
}: {
  widthCls?: string | null;
  heightCls?: string | null;
  style?: React.CSSProperties;
  shape?: string;
  className?: string | null;
}): JSX.Element => {
  const classNames = ['bg-base-300', 'animate-pulse', shape];
  if (className) {
    classNames.push(className);
  }
  if (widthCls) {
    classNames.push(widthCls);
  }
  if (heightCls) {
    classNames.push(heightCls);
  }

  return <div className={classNames.join(' ')} style={style} />;
};

export const setupHotjar = (hotjarConfig: SanitizedHotjar): void => {
  if (hotjarConfig?.id) {
    const snippetVersion = hotjarConfig?.snippetVersion || 6;
    hotjar.initialize({ id: parseInt(hotjarConfig.id), sv: snippetVersion });
  }
};

export const ga = {
  event(action: string, params: EventParams): void {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any)?.gtag('event', action, params);
    } catch (error) {
      console.error(error);
    }
  },
};

export const getLanguageColor = (language: string): string => {
  const languageColors: Colors = colors;
  if (typeof languageColors[language] !== 'undefined') {
    return languageColors[language].color || 'gray';
  } else {
    return 'gray';
  }
};
