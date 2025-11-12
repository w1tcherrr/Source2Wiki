// src/components/GameIcon.tsx
import React from 'react';
import { Games } from '@site/src/constants/software';
import { Tools } from '@site/src/constants/software';
import { Socials } from '@site/src/constants/software';
import { SoftwareInfo } from '@site/src/constants/software';
import { useColorMode } from '@docusaurus/theme-common';

interface SoftwareProps {
  name: string;
  size?: number | string;
  link?: string;
  iconOnly?: boolean;
  suffix?: string;
}

export function Game(SoftwareProps: SoftwareProps)
{
  if (!SoftwareProps.name)
  {
    throw new Error(`name parameter missing from Game element`);
  }

  const softwateInfo = Games[SoftwareProps.name];

  if (!softwateInfo)
  {
    throw new Error(`Game name "${SoftwareProps.name}" is invalid, if you want to add a new game, go to src/constants/software`);
  }

  return GetSoftwareHtml(softwateInfo, SoftwareProps);
}

export function Tool(SoftwareProps: React.FC<SoftwareProps>)
{
  if (!SoftwareProps.name)
  {
    throw new Error(`name parameter missing from Tool element`);
  }

  const softwateInfo = Tools[SoftwareProps.name];

  if (!softwateInfo)
  {
    throw new Error(`Tool name "${SoftwareProps.name}" is invalid, if you want to add a new tool, go to src/constants/software`);
  }

  return GetSoftwareHtml(softwateInfo, SoftwareProps);
}

export function Social(SoftwareProps: React.FC<SoftwareProps>)
{
  if (!SoftwareProps.name)
  {
    throw new Error(`name parameter missing from Social element`);
  }

  const softwateInfo = Socials[SoftwareProps.name];

  if (!softwateInfo)
  {
    throw new Error(`Social name "${SoftwareProps.name}" is invalid, if you want to add a new social, go to src/constants/software`);
  }

  return GetSoftwareHtml(softwateInfo, SoftwareProps);
}

const GetSoftwareHtml = (softwateInfo: SoftwareInfo, {
  name,
  size = 16,
  link,
  iconOnly,
  suffix
}: SoftwareProps): React.JSX.Element =>
{
  const { colorMode } = useColorMode(); // 'light' or 'dark'

  // color overlay for the background
  const overlayColor =
      colorMode === 'light'
        ? 'rgba(255, 255, 255, 0.3)' // lighten in light mode
        : 'rgba(0, 0, 0, 0.4)';      // slightly darken in dark mode

  const content = (
    <span
      style={{
        backgroundColor: softwateInfo.Color,
        borderRadius: '6px',
        verticalAlign: 'middle',
        alignItems: 'center', 
        display: 'inline-flex', 
      }}
    >
      <span 
        style={{ 
          backgroundColor: overlayColor,
	  borderRadius: '6px',
          paddingRight: '0.2rem',
          paddingLeft: '0.2rem',
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '4px',
          verticalAlign: 'middle',
        }}
      >
        {softwateInfo.IconPath && (
          <img 
            src={softwateInfo.IconPath} 
            alt={`${softwateInfo.PrettyName} icon`}
            style={{ 
              width: `${size}px`, 
              height: `${size}px`,
              display: 'inline-block'
            }}
          />
        )}
        {!iconOnly && (
          <span
          style={{ 
              textAlign: "center",
              lineHeight: '1.5', // match image height better
            }}
          >
            {softwateInfo.PrettyName}
            {suffix && suffix}
          </span>
        )}
      </span>
    </span>
  );

  if(link === undefined && softwateInfo.Link)
  {
    link = softwateInfo.Link;
  }

  if (link) {
    return (
      <a 
        target="_blank" 
        rel="noopener noreferrer"
        href={link} 
        style={{ 
          textDecoration: 'none',
          color: 'inherit'
        }}
      >
        {content}
      </a>
    );
  }

  return content;
};