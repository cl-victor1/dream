import DreamClient from "@/components/DreamClient";

export default function DreamPage({ params }: { params: { id: string } }) {
  return <DreamClient id={params.id} />;
}