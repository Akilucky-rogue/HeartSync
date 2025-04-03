
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Calendar, Smile, MessageSquare } from 'lucide-react';

export interface HeaderLink {
  name: string;
  path: string;
  icon: React.ReactNode;
}

export const HeaderLinks: HeaderLink[] = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: <Home className="w-4 h-4 md:mr-2" />
  },
  {
    name: 'Timeline',
    path: '/timeline',
    icon: <Calendar className="w-4 h-4 md:mr-2" />
  },
  {
    name: 'Mood',
    path: '/mood',
    icon: <Smile className="w-4 h-4 md:mr-2" />
  },
  {
    name: 'Messages',
    path: '/messages',
    icon: <MessageSquare className="w-4 h-4 md:mr-2" />
  }
];

export default HeaderLinks;
