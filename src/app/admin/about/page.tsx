import { H2 } from "../../../components/ui/Typography";
import { addAbout, getAbout } from "./_actions/about";
import { getImageMedia, getPDFMedia } from "./_actions/media";
import AboutForm from "./_components/AboutForm";

export default async function AdminHero() {
  const [about, pdfMedia, imageMedia] = await Promise.all([
    getAbout(),
    getPDFMedia(),
    getImageMedia(),
  ]);
  return (
    <div className="">
      <H2>About</H2>
      <AboutForm
        about={about}
        action={addAbout}
        pdfMedia={pdfMedia}
        imageMedia={imageMedia}
      />
    </div>
  );
}
