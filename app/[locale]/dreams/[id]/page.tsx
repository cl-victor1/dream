import DreamClient from "@/components/DreamClient";
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function DreamPage({ params }: { params: { id: string } }) {
  return (
    <>
      <LanguageSwitcher />
      <DreamClient id={params.id} />
    </>
  );
}