"use client";

import { Link2, Share2 } from "lucide-react";
import { FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { toast } from "sonner";

import { ExternalLink } from "@/components/shared/external-link";

type ShareButtonsProps = { url: string; title: string; text: string };

const buttonClass =
  "inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-surface px-3 text-sm text-muted transition-[border-color,color,transform] duration-200 hover:border-primary hover:text-primary active:scale-95 [&_svg]:size-4";

export function ShareButtons({ url, title, text }: ShareButtonsProps) {
  async function nativeShare() {
    const currentUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: currentUrl });
      } catch {
        // A pessoa cancelou o compartilhamento: nada a fazer.
      }
      return;
    }
    await copyLink();
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copiado.");
    } catch {
      toast.error("Não foi possível copiar o link.");
    }
  }

  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(`${title} — ${url}`);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 font-mono text-xs tracking-wider text-subtle uppercase">Compartilhar</span>
      <button type="button" onClick={nativeShare} className={buttonClass}>
        <Share2 /> Compartilhar
      </button>
      <button type="button" onClick={copyLink} className={buttonClass} aria-label="Copiar link do projeto">
        <Link2 /> Copiar link
      </button>
      <ExternalLink
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        className={buttonClass}
        aria-label="Compartilhar no LinkedIn"
      >
        <FaLinkedinIn />
      </ExternalLink>
      <ExternalLink href={`https://wa.me/?text=${encodedText}`} className={buttonClass} aria-label="Compartilhar no WhatsApp">
        <FaWhatsapp />
      </ExternalLink>
    </div>
  );
}
