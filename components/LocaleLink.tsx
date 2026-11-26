"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useLanguage } from "./LanguageProvider";
import { localizeHref } from "@/lib/localePath";

export default function LocaleLink({ href, ...rest }: ComponentProps<typeof Link>) {
  const { locale } = useLanguage();
  return <Link href={typeof href === "string" ? localizeHref(href, locale) : href} {...rest} />;
}
