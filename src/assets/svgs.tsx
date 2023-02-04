import {ReactNode, useMemo} from 'react';
import {PixelRatio} from 'react-native';
import SVG, {
  Circle,
  G,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
} from 'react-native-svg';
import {useTheme} from 'hooks';

export interface SvgProps {
  size?: number | string;
  color?: string;
}

type CSvgProps = SvgProps & {
  stroke?: string;
  children: ReactNode;
  viewBox?: string;
};

function CSVG({size = 24, color, viewBox, ...rest}: CSvgProps) {
  const {colors} = useTheme();
  const fontScale = PixelRatio.getFontScale();

  size = useMemo(() => {
    return Number(size) * fontScale;
  }, [size, fontScale]);

  color = color || colors.text.primary;

  return (
    <SVG
      width={size}
      height={size}
      viewBox={viewBox || '0 0 24 24'}
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      {...rest}
    />
  );
}
export function Watfoe(props: SvgProps) {
  return (
    <CSVG {...props} color="none" viewBox="0 0 705 233">
      <Path
        d="M691.86,0H485.14A13.14,13.14,0,0,0,472,13.14V219.86A13.14,13.14,0,0,0,485.14,233H691.86A13.14,13.14,0,0,0,705,219.86V13.14A13.14,13.14,0,0,0,691.86,0Z"
        fill="#0092cc"
      />
      <Path
        d="M339.88,7.8,237.51,212.56A14.12,14.12,0,0,0,250.13,233H454.87a14.12,14.12,0,0,0,12.62-20.44L365.12,7.8A14.11,14.11,0,0,0,339.88,7.8Z"
        fill="#793"
      />
      <Path
        d="M13.14,233H219.86A13.14,13.14,0,0,0,233,219.86V13.14A13.14,13.14,0,0,0,219.86,0H13.14A13.14,13.14,0,0,0,0,13.14V219.86A13.14,13.14,0,0,0,13.14,233ZM6.47,116.5a110,110,0,0,1,110-110h0a110,110,0,0,1,110,110h0a110,110,0,0,1-110,110h0a110,110,0,0,1-110-110Z"
        fill="#f33"
      />
    </CSVG>
  );
}
export function Google(props: SvgProps) {
  return (
    <CSVG {...props} color="none">
      <Path
        d="M23.9886 12.2245C23.9886 11.2413 23.9069 10.5237 23.7302 9.77963H12.2391V14.2176H18.9841C18.8482 15.3205 18.1138 16.9815 16.4819 18.0976L16.459 18.2461L20.0923 20.9963L20.344 21.0209C22.6558 18.9347 23.9886 15.8653 23.9886 12.2245Z"
        fill="#4285F4"
      />
      <Path
        d="M12.2391 23.9176C15.5436 23.9176 18.3177 22.8545 20.344 21.0209L16.4819 18.0976C15.4484 18.8018 14.0613 19.2934 12.2391 19.2934C9.00254 19.2934 6.25557 17.2074 5.27636 14.324L5.13282 14.3359L1.35489 17.1927L1.30548 17.3269C3.31811 21.2334 7.4522 23.9176 12.2391 23.9176Z"
        fill="#34A853"
      />
      <Path
        d="M5.27634 14.324C5.01797 13.5799 4.86844 12.7826 4.86844 11.9588C4.86844 11.1349 5.01797 10.3377 5.26275 9.5936L5.25591 9.43513L1.43062 6.53241L1.30547 6.59058C0.475969 8.21168 0 10.0321 0 11.9588C0 13.8855 0.475969 15.7058 1.30547 17.3269L5.27634 14.324Z"
        fill="#FBBC05"
      />
      <Path
        d="M12.2391 4.62403C14.5373 4.62403 16.0875 5.59402 16.9715 6.40461L20.4256 3.10928C18.3042 1.1826 15.5436 0 12.2391 0C7.4522 0 3.31811 2.68406 1.30548 6.59056L5.26276 9.59359C6.25557 6.7102 9.00254 4.62403 12.2391 4.62403Z"
        fill="#EB4335"
      />
    </CSVG>
  );
}

export function ArrowLeft(props: SvgProps) {
  return (
    <CSVG {...props}>
      <Line x1="19" y1="12" x2="5" y2="12" />
      <Polyline points="12 19 5 12 12 5" />
    </CSVG>
  );
}
export function At(props: SvgProps) {
  return (
    <CSVG {...props}>
      <Circle cx="12" cy="12" r="4" />
      <Path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
    </CSVG>
  );
}
export function Bell(props: SvgProps) {
  return (
    <CSVG {...props}>
      <Path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <Path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </CSVG>
  );
}
export function Bookmark(props: SvgProps) {
  return (
    <CSVG {...props}>
      <Path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </CSVG>
  );
}
export function Briefcase(props: SvgProps) {
  return (
    <CSVG {...props}>
      <Rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <Path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </CSVG>
  );
}
export function Calendar(props: SvgProps) {
  return (
    <CSVG {...props}>
      <Rect x="3" y="4" width="20" height="18" rx="2" ry="2" />
      <Line x1="18" y1="2" x2="18" y2="6" />
      <Line x1="8" y1="2" x2="8" y2="6" />
      <Line x1="3" y1="10" x2="23" y2="10" />
    </CSVG>
  );
}
export function CalendarFilled(props: SvgProps) {
  const {colors} = useTheme();
  return (
    <CSVG {...props}>
      <Rect
        x="3"
        y="4"
        width="20"
        height="18"
        rx="2"
        ry="2"
        fill={colors.primary}
      />
      <Line x1="18" y1="2" x2="18" y2="6" />
      <Line x1="8" y1="2" x2="8" y2="6" />
      <Line x1="3" y1="10" x2="23" y2="10" stroke={colors.background} />
    </CSVG>
  );
}
export function Chat(props: SvgProps) {
  return (
    <CSVG {...props}>
      <Path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </CSVG>
  );
}
export function ChatFilled(props: SvgProps) {
  const {colors} = useTheme();
  return (
    <CSVG {...props}>
      <Path
        stroke={colors.primary}
        fill={colors.primary}
        d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
      />
    </CSVG>
  );
}
export function ChatAdd(props: SvgProps) {
  return (
    <CSVG {...props}>
      <Path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      <Line x1="20" y1="8" x2="20" y2="14" />
      <Line x1="23" y1="11" x2="17" y2="11" />
    </CSVG>
  );
}
export function Clear(props: SvgProps) {
  return (
    <CSVG {...props}>
      <Line x1="18" y1="6" x2="6" y2="18" />
      <Line x1="6" y1="6" x2="18" y2="18" />
    </CSVG>
  );
}
export function Users(props: SvgProps) {
  return (
    <CSVG {...props}>
      <Path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <Circle cx="9" cy="7" r="4" />
      <Path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <Path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </CSVG>
  );
}
export function Discover(props: SvgProps) {
  return (
    <CSVG {...props}>
      <Circle cx="12" cy="12" r="10" />
      <Polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </CSVG>
  );
}
export function DiscoverFilled(props: SvgProps) {
  const {colors} = useTheme();
  return (
    <CSVG {...props}>
      <Circle cx="12" cy="12" r="10" fill={colors.primary} />
      <Polygon
        points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"
        fill={colors.primary}
        stroke={colors.background}
      />
    </CSVG>
  );
}
export function Edit(props: SvgProps) {
  return (
    <CSVG {...props}>
      <Path d="M12 20h9" />
      <Path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </CSVG>
  );
}
export function EmojiSmile(props: SvgProps) {
  return (
    <CSVG {...props}>
      <Circle cx="12" cy="12" r="10" />
      <Path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <Line x1="9" y1="9" x2="9.01" y2="9" />
      <Line x1="15" y1="9" x2="15.01" y2="9" />
    </CSVG>
  );
}
export function Eye(props: SvgProps) {
  return (
    <CSVG {...props}>
      <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <Circle cx="12" cy="12" r="3" />
    </CSVG>
  );
}
export function EyeOff(props: SvgProps) {
  return (
    <CSVG {...props}>
      <Path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <Line x1="1" y1="1" x2="23" y2="23" />
    </CSVG>
  );
}
export function Filter(props: SvgProps) {
  return (
    <CSVG {...props}>
      <Polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </CSVG>
  );
}
export function Grid(props: SvgProps) {
  return (
    <CSVG {...props}>
      <Rect x="3" y="3" width="7" height="7" />
      <Rect x="14" y="3" width="7" height="7" />
      <Rect x="14" y="14" width="7" height="7" />
      <Rect x="3" y="14" width="7" height="7" />
    </CSVG>
  );
}
export function Hash(props: SvgProps) {
  return (
    <CSVG {...props}>
      <Line x1="4" y1="9" x2="20" y2="9" />
      <Line x1="4" y1="15" x2="20" y2="15" />
      <Line x1="10" y1="3" x2="8" y2="21" />
      <Line x1="16" y1="3" x2="14" y2="21" />
    </CSVG>
  );
}
export function Home(props: SvgProps) {
  return (
    <CSVG {...props}>
      <Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </CSVG>
  );
}
export function HomeFilled(props: SvgProps) {
  const {colors} = useTheme();
  return (
    <CSVG {...props}>
      <Path
        d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
        stroke={colors.primary}
        fill={colors.primary}
      />
    </CSVG>
  );
}
export function Highlight(props: SvgProps) {
  return (
    <CSVG {...props}>
      <Polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </CSVG>
  );
}
export function HighlightFilled(props: SvgProps) {
  const {colors} = useTheme();
  return (
    <CSVG {...props}>
      <Polygon
        points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"
        stroke={colors.primary}
        fill={colors.primary}
      />
    </CSVG>
  );
}
export function Learn(props: SvgProps) {
  return (
    <CSVG {...props}>
      <Path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1" />
      <Polygon points="12 15 17 21 7 21 12 15" />
    </CSVG>
  );
}
export function List(props: SvgProps) {
  return (
    <CSVG {...props}>
      <Line x1="8" y1="6" x2="21" y2="6" />
      <Line x1="8" y1="12" x2="21" y2="12" />
      <Line x1="8" y1="18" x2="21" y2="18" />
      <Line x1="3" y1="6" x2="3.01" y2="6" />
      <Line x1="3" y1="12" x2="3.01" y2="12" />
      <Line x1="3" y1="18" x2="3.01" y2="18" />
    </CSVG>
  );
}
export function MessageSquare(props: SvgProps) {
  return (
    <CSVG {...props}>
      <Path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </CSVG>
  );
}
export function Mic(props: SvgProps) {
  return (
    <CSVG {...props}>
      <Path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <Path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <Line x1="12" y1="19" x2="12" y2="23" />
      <Line x1="8" y1="23" x2="16" y2="23" />
    </CSVG>
  );
}
export function MicOff(props: SvgProps) {
  return (
    <CSVG {...props}>
      <Line x1="1" y1="1" x2="23" y2="23" />
      <Path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
      <Path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
      <Line x1="12" y1="19" x2="12" y2="23" />
      <Line x1="8" y1="23" x2="16" y2="23" />
    </CSVG>
  );
}
export function MoreHorizontal(props: SvgProps) {
  return (
    <CSVG {...props}>
      <Circle cx="12" cy="12" r="1" />
      <Circle cx="19" cy="12" r="1" />
      <Circle cx="5" cy="12" r="1" />
    </CSVG>
  );
}
export function MoreVertical(props: SvgProps) {
  return (
    <CSVG {...props}>
      <Circle cx="12" cy="12" r="1" />
      <Circle cx="12" cy="5" r="1" />
      <Circle cx="12" cy="19" r="1" />
    </CSVG>
  );
}
export function PaperClip(props: SvgProps) {
  return (
    <CSVG {...props}>
      <Path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </CSVG>
  );
}
export function Phone(props: SvgProps) {
  return (
    <CSVG {...props}>
      <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </CSVG>
  );
}
export function Plus(props: SvgProps) {
  return (
    <CSVG {...props}>
      <Line x1="12" y1="5" x2="12" y2="19" />
      <Line x1="5" y1="12" x2="19" y2="12" />
    </CSVG>
  );
}
export function Remove(props: SvgProps) {
  return (
    <CSVG {...props}>
      <Line x1="18" y1="6" x2="6" y2="18" />
      <Line x1="6" y1="6" x2="18" y2="18" />
    </CSVG>
  );
}
export function Send(props: SvgProps) {
  return (
    <CSVG {...props}>
      <G transform="matrix(1.7142857142857142,0,0,1.7142857142857142,0,0)">
        <Path d="M5.818,10.992,8,13.171a1.124,1.124,0,0,0,1.861-.439L13.442,1.979A1.123,1.123,0,0,0,12.021.558L1.268,4.142A1.124,1.124,0,0,0,.829,6L3.57,8.744l-.093,3.465Z" />
        <Path d="M13.121 0.782L3.57 8.744" />
      </G>
    </CSVG>
  );
}
export function Search(props: SvgProps) {
  return (
    <CSVG {...props}>
      <Circle cx="11" cy="11" r="8" />
      <Line x1="21" y1="21" x2="16.65" y2="16.65" />
    </CSVG>
  );
}
export function Share(props: SvgProps) {
  return (
    <CSVG {...props}>
      <Circle cx="18" cy="5" r="3" />
      <Circle cx="6" cy="12" r="3" />
      <Circle cx="18" cy="19" r="3" />
      <Line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <Line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </CSVG>
  );
}
export function Sliders(props: SvgProps) {
  return (
    <CSVG {...props}>
      <Line x1="4" y1="21" x2="4" y2="14" />
      <Line x1="4" y1="10" x2="4" y2="3" />
      <Line x1="12" y1="21" x2="12" y2="12" />
      <Line x1="12" y1="8" x2="12" y2="3" />
      <Line x1="20" y1="21" x2="20" y2="16" />
      <Line x1="20" y1="12" x2="20" y2="3" />
      <Line x1="1" y1="14" x2="7" y2="14" />
      <Line x1="9" y1="8" x2="15" y2="8" />
      <Line x1="17" y1="16" x2="23" y2="16" />
    </CSVG>
  );
}
export function ThumbsUp(props: SvgProps) {
  return (
    <CSVG {...props}>
      <Path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
    </CSVG>
  );
}
export function ThumbsDown(props: SvgProps) {
  return (
    <CSVG {...props}>
      <Path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
    </CSVG>
  );
}
export function UserPlus(props: SvgProps) {
  return (
    <CSVG {...props}>
      <Path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <Circle cx="8.5" cy="7" r="4" />
      <Line x1="20" y1="8" x2="20" y2="14" />
      <Line x1="23" y1="11" x2="17" y2="11" />
    </CSVG>
  );
}
