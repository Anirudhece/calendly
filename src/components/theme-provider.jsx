'use client'

import * as React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
const NextThemesProvider = dynamic(
  () => import("next-themes").then((mod) => mod.ThemeProvider),
  {
    ssr: false,
    loading: () => <Skeleton className="w-[100px] h-[20px] rounded-full" />, // will update it later
  }
);

import dynamic from 'next/dynamic'

export function ThemeProvider({ children, ...props }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
