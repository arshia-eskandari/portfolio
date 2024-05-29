import { H2 } from "../../../components/ui/Typography";
import MediaForm from "./_components/MediaForm";
import { addMedia, deleteMedia, getMedia } from "./_actions/media";
import MediaGrid from "@/app/admin/media/_components/MediaGrid";

export default async function AdminMedia() {
  const media = await getMedia();
  return (
    <div className="">
      <H2>Media</H2>
      <MediaForm action={addMedia} />
      <div className="my-3">
        <MediaGrid media={media} action={deleteMedia} />
      </div>
    </div>
  );
}
