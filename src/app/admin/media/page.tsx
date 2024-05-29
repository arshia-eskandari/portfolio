import { H2 } from "../../../components/ui/Typography";
import { Label } from "@/components/ui/label";
import MediaForm from "./_components/MediaForm";
import { addMedia, getMedia } from "./_actions/media";
import MediaGrid from "@/components/admin/MediaGrid";

export default async function AdminMedia() {
  const media = await getMedia();
  return (
    <div className="">
      <H2>Media</H2>
      <MediaForm action={addMedia} />
      <div className="my-3">
        <MediaGrid media={media} />
      </div>
    </div>
  );
}
