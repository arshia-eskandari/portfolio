"use client";
import { ErrorAlert } from "@/components/ui/ErrorAlert";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { Contact } from "@prisma/client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { H4, P } from "@/components/ui/Typography";
import { Label } from "@/components/ui/Label";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel";

export default function ContactForm({
  contacts,
  action,
}: {
  contacts: Contact[];
  action: (formData: FormData) => Promise<any>;
}) {
  const [form, setForm] = useState<{
    githubUrl: string;
    linkedinUrl: string;
    telegramUrl: string;
    emailAddress: string;
  }>({
    githubUrl: "",
    linkedinUrl: "",
    telegramUrl: "",
    emailAddress: "",
  });
  const [formErrors, setFormErrors] = useState<{
    githubUrl: string;
    linkedinUrl: string;
    telegramUrl: string;
    emailAddress: string;
  }>({
    githubUrl: "",
    linkedinUrl: "",
    telegramUrl: "",
    emailAddress: "",
  });
  const [loading, setLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const router = useRouter();
  const [errorMssg, setErrorMssg] = useState<string>("");
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const validateUrl = (text: string) => {
    return text.length <= 100;
  };

  const onInputChange = (
    type: "githubUrl" | "linkedinUrl" | "telegramUrl" | "emailAddress",
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    setFormErrors({
      ...formErrors,
      [type]: !validateUrl(e.target.value)
        ? "The url must be less than 100 characters"
        : validateUrl(e.target.value)
          ? ""
          : formErrors[type],
    });
    const newForm = { ...form, [type]: e.target.value };
    setForm(newForm);
  };

  const actionWithLoading = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMssg("");
    setLoading(true);
    setShowSpinner(true);
    const form = event.currentTarget;
    const formData = new FormData(form);
    const response = await action(formData);
    setLoading(false);

    if (response.status === 200 || response.status === 201) {
      router.refresh();
    } else {
      setErrorMssg(response.message);
    }
  };

  useEffect(() => {
    if (errorMssg !== "") setErrorMssg("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onTransitionEnd = () => {
    // EXPLANATION: Hide spinner only after the fade-out transition
    setShowSpinner(false);
  };

  return (
    <form className="my-3" onSubmit={actionWithLoading}>
      <div className="relative flex w-full items-center justify-between py-3">
        <H4>Contact Section</H4>
        <SubmitButton
          loading={loading}
          showSpinner={showSpinner}
          onTransitionEnd={onTransitionEnd}
        >
          Save
        </SubmitButton>
      </div>

      {/* EXPLANATION: The buttons consume 6rem of the width in total */}
      <div className="relative w-full">
        <Carousel
          className="absolute w-full md:w-[calc(100%-6rem)]"
          setApi={setApi}
        >
          {/* EXPLANATION: For vertical carousels add something similar to className="-mt-1 h-[200px]" */}
          <CarouselContent className="relative]">
            {Array.from({ length: 20 }).map((_, index) => (
              <CarouselItem className="relative" key={index}>
                <div className="border-[1px]">
                  <P>Name: Arshia Eskandari</P>
                  <div className="break-all">
                    Email: arshia.eskandari.3000@gmail.com
                  </div>
                  <P>Date: 2024-06-01</P>
                  <P>Message: This is a test.</P>
                  <Label className="block">Test</Label>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
          <div className="py-2 text-center text-sm text-muted-foreground">
            Slide {current} of {count}
          </div>
        </Carousel>
      </div>
      <ErrorAlert errorMssg={errorMssg} />
    </form>
  );
}
