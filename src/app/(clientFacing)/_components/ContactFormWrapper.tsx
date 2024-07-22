"use client";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import Contact from "./ContactForm";

export default function ContactFormWrapper({
  action,
}: {
  action: (formData: FormData) => Promise<any>;
}) {
  const enableReCaptcha = process.env.NEXT_PUBLIC_ENABLE_RECAPTCHA === "true";
  return (
    <>
      {enableReCaptcha ? (
        <GoogleReCaptchaProvider reCaptchaKey="6LfMFfgpAAAAAKENhwyOvyj9Ht2X9FDKVQKwT1ov">
          <Contact action={action} />
        </GoogleReCaptchaProvider>
      ) : (
        <Contact action={action} />
      )}
    </>
  );
}
