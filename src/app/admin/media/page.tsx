import { Input } from "@/components/ui/Input";
import { H2 } from "../../../components/ui/Typography";
import { Label } from "@/components/ui/label";
import { getMedia } from "./_actions/media";
import { Button } from "@/components/ui/Button";

export default async function AdminMedia() {
  const media = await getMedia();
  return (
    <div className="">
      <H2>Media</H2>
      <div className="my-3">
        <div className="w-full flex items-center justify-between">
          <Label htmlFor="file" className="hover:cursor-pointer">
            Upload New File
          </Label>
          <Button>Upload</Button>
        </div>
        <Input
          name="file"
          id="file"
          type="file"
          className="my-3 hover:cursor-pointer"
        />

        <Label>Uploaded Files</Label>
      </div>
    </div>
  );
}
