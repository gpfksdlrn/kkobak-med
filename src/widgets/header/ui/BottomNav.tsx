'use client';

import { History, Home, Pill } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/shared/lib/utils';

const NAV_ITEMS = [
  { href: '/', label: '홈', icon: Home },
  { href: '/medications', label: '약 관리', icon: Pill },
  { href: '/history', label: '기록', icon: History },
];

const HIDDEN_PATHS = ['/login'];

export function BottomNav() {
  const pathname = usePathname();

  if (HIDDEN_PATHS.includes(pathname)) return null;

  return (
    <nav className="bg-background fixed inset-x-0 bottom-0 z-50 border-t">
      <ul className="mx-auto flex max-w-md items-center justify-around">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === '/' ? pathname === '/' : pathname.startsWith(href);

          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={cn(
                  'flex flex-col items-center gap-1 py-2 text-xs',
                  isActive ? 'text-foreground' : 'text-muted-foreground'
                )}
              >
                <Icon className="size-5" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
