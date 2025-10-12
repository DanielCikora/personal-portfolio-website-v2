import { ChatsIcon, CodeIcon, DeviceMobileIcon, GaugeIcon, ShareNetworkIcon, SparkleIcon } from '@phosphor-icons/react';
import { AccordionItemType, NavigationPropsType } from '@/types/ui';

export const navigationItems: NavigationPropsType[] = [
 { text: 'Home', href: '/home' },
 { text: 'About', href: '/about' },
 { text: 'Contact', href: '/contact' },
 { text: 'Projects', href: '/projects' },
];

export const servicesAccordionItems: AccordionItemType[] = [
 {
  id: 'custom-website-development',
  title: 'Custom Website Development',
  content:
   'Tailor-made digital solutions that align with your brand identity and business objectives for a standout online presence.',
  icon: CodeIcon,
 },
 {
  id: 'responsive-web-development',
  title: 'Responsive Web Development',
  content: 'Ensure optimal user experience on any device with fluid and adaptive design techniques.',
  icon: DeviceMobileIcon,
 },
 {
  id: 'social-media-integration',
  title: 'Social Media Integration',
  content: 'Seamlessly integrate social platforms to enhance audience engagement and expand online reach.',
  icon: ShareNetworkIcon,
 },
 {
  id: 'consultation-services',
  title: 'Consultation Services',
  content:
   'Gain valuable insights and tailored strategies to elevate your online presence and achieve your business goals.',
  icon: ChatsIcon,
 },
 {
  id: 'website-optimization',
  title: 'Website Optimization',
  content:
   'Enhance website performance and user experience through strategic optimizations, ensuring maximum impact and visibility.',
  icon: GaugeIcon,
 },
 {
  id: 'creative-frontend-solutions',
  title: 'Creative Frontend Solutions',
  content: 'Showcase modern animations and interactive features to captivate users and leave a lasting impression.',
  icon: SparkleIcon,
 },
];

export const saturnInfo = [
 {
  infoText: 'POSITION:',
  infoNumber: '9.58 AU',
  borderRight: true,
 },
 {
  infoText: 'DIAMETER:',
  infoNumber: '120536 km',
  borderRight: true,
 },
 {
  infoText: 'ROTATION:',
  infoNumber: '10.7 hrs',
  borderRight: true,
 },
 {
  infoText: 'RINGS:',
  infoNumber: '7 major',
  borderRight: true,
 },
 {
  infoText: 'MOONS:',
  infoNumber: '145',
  borderRight: false,
 },
];
