import { Fragment } from 'react';
import {
  AiFillGithub,
  AiFillInstagram,
  AiFillMediumSquare,
} from 'react-icons/ai';
import { CgDribbble } from 'react-icons/cg';
import {
  FaBehanceSquare,
  FaBuilding,
  FaDev,
  FaFacebook,
  FaGlobe,
  FaLinkedin,
  FaMastodon,
  FaReddit,
  FaSkype,
  FaStackOverflow,
  FaTelegram,
  FaYoutube,
} from 'react-icons/fa';
import { FaSquareThreads } from 'react-icons/fa6';
import { MdLocationOn } from 'react-icons/md';
import { RiDiscordFill, RiMailFill, RiPhoneFill } from 'react-icons/ri';
import { SiResearchgate, SiTwitter, SiUdemy } from 'react-icons/si';
import { Profile } from '../../interfaces/profile';
import {
  SanitizedGithub,
  SanitizedSocial,
} from '../../interfaces/sanitized-config';
import { skeleton } from '../../utils';

type Props = {
  profile: Profile | null;
  loading: boolean;
  social: SanitizedSocial;
  github: SanitizedGithub;
};

const isCompanyMention = (company: string): boolean => {
  return company.startsWith('@') && !company.includes(' ');
};

const companyLink = (company: string): string => {
  return `https://github.com/${company.substring(1)}`;
};

const getFormattedMastodonValue = (
  mastodonValue: string,
  isLink: boolean,
): string => {
  const [username, server] = mastodonValue.split('@');

  if (isLink) {
    return `https://${server}/@${username}`;
  } else {
    return `${username}@${server}`;
  }
};

const ListItem: React.FC<{
  icon: React.ReactNode;
  title: React.ReactNode;
  value: React.ReactNode;
  link?: string;
  skeleton?: boolean;
}> = ({ icon, title, value, link, skeleton = false }) => {
  return (
    <div className="flex justify-start py-2 px-1 items-center">
      <div className="flex-grow font-medium gap-2 flex items-center my-1">
        {icon} {title}
      </div>
      <div
        className={`${
          skeleton ? 'flex-grow' : ''
        } text-sm font-normal text-right mr-2 ml-3 ${link ? 'truncate' : ''}`}
        style={{
          wordBreak: 'break-word',
        }}
      >
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="flex justify-start py-2 px-1 items-center"
        >
          {value}
        </a>
      </div>
    </div>
  );
};

const OrganizationItem: React.FC<{
  icon: React.ReactNode;
  title: React.ReactNode;
  value: React.ReactNode | string;
  link?: string;
  skeleton?: boolean;
}> = ({ icon, title, value, link, skeleton = false }) => {
  const renderValue = () => {
    if (typeof value === 'string') {
      return value.split(' ').map((company) => {
        company = company.trim();
        if (!company) return null;

        if (isCompanyMention(company)) {
          return (
            <a
              href={companyLink(company)}
              target="_blank"
              rel="noreferrer"
              key={company}
            >
              {company}
            </a>
          );
        } else {
          return <span key={company}>{company}</span>;
        }
      });
    }
    return value;
  };

  return (
    <div className="flex justify-start py-2 px-1 items-center">
      <div className="flex-grow font-medium gap-2 flex items-center my-1">
        {icon} {title}
      </div>
      <div
        className={`${
          skeleton ? 'flex-grow' : ''
        } text-sm font-normal text-right mr-2 ml-3 space-x-2 ${link ? 'truncate' : ''}`}
        style={{
          wordBreak: 'break-word',
        }}
      >
        {renderValue()}
      </div>
    </div>
  );
};

/**
 * Renders the details card component.
 *
 * @param {Object} profile - The profile object.
 * @param {boolean} loading - Indicates whether the data is loading.
 * @param {Object} social - The social object.
 * @param {Object} github - The GitHub object.
 * @return {JSX.Element} The details card component.
 */
const DetailsCard = ({ profile, loading, social, github }: Props) => {
  const renderSkeleton = () => {
    const array = [];
    for (let index = 0; index < 4; index++) {
      array.push(
        <ListItem
          key={index}
          skeleton={true}
          icon={skeleton({ widthCls: 'w-4', heightCls: 'h-4' })}
          title={skeleton({ widthCls: 'w-24', heightCls: 'h-4' })}
          value={skeleton({ widthCls: 'w-full', heightCls: 'h-4' })}
        />,
      );
    }

    return array;
  };

  return (
    <div className="card shadow-lg compact bg-base-100">
      <div className="card-body">
        <div className="text-base-content text-opacity-60">
          {loading || !profile ? (
            renderSkeleton()
          ) : (
            <Fragment>
              {profile.location && (
                <ListItem
                  icon={<MdLocationOn />}
                  title="Based in:"
                  value={profile.location}
                />
              )}
              {profile.company && (
                <OrganizationItem
                  icon={<FaBuilding />}
                  title="Organization:"
                  value={profile.company}
                  link={
                    isCompanyMention(profile.company.trim())
                      ? companyLink(profile.company.trim())
                      : undefined
                  }
                />
              )}
              <ListItem
                icon={<AiFillGithub />}
                title="GitHub:"
                value={github.username}
                link={`https://github.com/${github.username}`}
              />
              {social?.researchGate && (
                <ListItem
                  icon={<SiResearchgate />}
                  title="ResearchGate:"
                  value={social.researchGate}
                  link={`https://www.researchgate.net/profile/${social.researchGate}`}
                />
              )}
              {social?.twitter && (
                <ListItem
                  icon={<SiTwitter />}
                  title="Twitter:"
                  value={social.twitter}
                  link={`https://twitter.com/${social.twitter}`}
                />
              )}
              {social?.mastodon && (
                <ListItem
                  icon={<FaMastodon />}
                  title="Mastodon:"
                  value={getFormattedMastodonValue(social.mastodon, false)}
                  link={getFormattedMastodonValue(social.mastodon, true)}
                />
              )}
              {social?.linkedin && (
                <ListItem
                  icon={<FaLinkedin />}
                  title="LinkedIn:"
                  value={social.linkedin}
                  link={`https://www.linkedin.com/in/${social.linkedin}`}
                />
              )}
              {social?.dribbble && (
                <ListItem
                  icon={<CgDribbble />}
                  title="Dribbble:"
                  value={social.dribbble}
                  link={`https://dribbble.com/${social.dribbble}`}
                />
              )}
              {social?.behance && (
                <ListItem
                  icon={<FaBehanceSquare />}
                  title="Behance:"
                  value={social.behance}
                  link={`https://www.behance.net/${social.behance}`}
                />
              )}
              {social?.facebook && (
                <ListItem
                  icon={<FaFacebook />}
                  title="Facebook:"
                  value={social.facebook}
                  link={`https://www.facebook.com/${social.facebook}`}
                />
              )}
              {social?.instagram && (
                <ListItem
                  icon={<AiFillInstagram />}
                  title="Instagram:"
                  value={social.instagram}
                  link={`https://www.instagram.com/${social.instagram}`}
                />
              )}
              {social?.reddit && (
                <ListItem
                  icon={<FaReddit />}
                  title="Reddit:"
                  value={social.reddit}
                  link={`https://www.reddit.com/user/${social.reddit}`}
                />
              )}
              {social?.threads && (
                <ListItem
                  icon={<FaSquareThreads />}
                  title="Threads:"
                  value={social.threads}
                  link={`https://www.threads.net/@${social.threads.replace('@', '')}`}
                />
              )}
              {social?.youtube && (
                <ListItem
                  icon={<FaYoutube />}
                  title="YouTube:"
                  value={`@${social.youtube}`}
                  link={`https://www.youtube.com/@${social.youtube}`}
                />
              )}
              {social?.udemy && (
                <ListItem
                  icon={<SiUdemy />}
                  title="Udemy:"
                  value={social.udemy}
                  link={`https://www.udemy.com/user/${social.udemy}`}
                />
              )}
              {social?.medium && (
                <ListItem
                  icon={<AiFillMediumSquare />}
                  title="Medium:"
                  value={social.medium}
                  link={`https://medium.com/@${social.medium}`}
                />
              )}
              {social?.dev && (
                <ListItem
                  icon={<FaDev />}
                  title="Dev:"
                  value={social.dev}
                  link={`https://dev.to/${social.dev}`}
                />
              )}
              {social?.stackoverflow && (
                <ListItem
                  icon={<FaStackOverflow />}
                  title="Stack Overflow:"
                  value={social.stackoverflow.split('/').slice(-1)}
                  link={`https://stackoverflow.com/users/${social.stackoverflow}`}
                />
              )}
              {social?.website && (
                <ListItem
                  icon={<FaGlobe />}
                  title="Website:"
                  value={social.website
                    .replace('https://', '')
                    .replace('http://', '')}
                  link={
                    !social.website.startsWith('http')
                      ? `http://${social.website}`
                      : social.website
                  }
                />
              )}
              {social?.skype && (
                <ListItem
                  icon={<FaSkype />}
                  title="Skype"
                  value={social.skype}
                  link={`skype:${social.skype}?chat`}
                />
              )}
              {social?.telegram && (
                <ListItem
                  icon={<FaTelegram />}
                  title="Telegram"
                  value={social.telegram}
                  link={`https://t.me/${social.telegram}`}
                />
              )}
              {social?.phone && (
                <ListItem
                  icon={<RiPhoneFill />}
                  title="Phone:"
                  value={social.phone}
                  link={`tel:${social.phone}`}
                />
              )}
              {social?.email && (
                <ListItem
                  icon={<RiMailFill />}
                  title="Email:"
                  value={social.email}
                  link={`mailto:${social.email}`}
                />
              )}
              {social?.discord && (
                <ListItem
                  icon={<RiDiscordFill />}
                  title="Discord:"
                  value={social.discord}
                  link={`https://discord.com/app`}
                />
              )}
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsCard;
