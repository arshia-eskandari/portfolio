"use client";
import { ErrorAlert } from "@/components/ui/ErrorAlert";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { Contact, Status } from "@prisma/client";
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
import { capitalizeFirstLetter } from "@/lib/string";
import { formatReadableDate } from "@/lib/time";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { MailCheck, MailWarning, Mails } from "lucide-react";

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
  const [filterIndex, setFilterIndex] = useState<number>(0);

  const nextFilter = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setFilterIndex(filterIndex + 1 === 3 ? 0 : filterIndex + 1);
  };

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

      <div className="flex w-full transform items-center justify-start pb-6">
        <Button
          type="button"
          onClick={nextFilter}
          className="transition-transform"
        >
          {filterIndex === 0 ? (
            <Mails />
          ) : filterIndex === 1 ? (
            <MailWarning />
          ) : (
            <MailCheck />
          )}
        </Button>
      </div>

      {/* EXPLANATION: The buttons consume 6rem of the width in total */}
      <div className="relative w-full">
        <Carousel
          // EXPLANATION: Force re-render on filter change for the accurate counts
          key={filterIndex}
          className="absolute w-full md:w-[calc(100%-6rem)]"
          setApi={setApi}
        >
          {/* EXPLANATION: For vertical carousels add something similar to className="-mt-1 h-[200px]" */}
          <CarouselContent className="relative">
            {contacts
              .filter(({ status }) => {
                switch (filterIndex) {
                  case 0:
                    return true;
                  case 1:
                    return status === Status.RESPONDED;
                  case 2:
                    return status === Status.PENDING;
                }
              })
              .map(
                (
                  {
                    id,
                    firstName,
                    lastName,
                    email,
                    message,
                    createdAt,
                    status,
                  },
                  index,
                ) => (
                  // EXPLANATION: every slide other than the first needs to shift to the right by 1rem
                  <CarouselItem
                    className="relative [&:not(:first-child)]:translate-x-4"
                    key={index}
                  >
                    <div className="border-[1px] p-3">
                      <Label
                        htmlFor={id}
                        className="mr-3 mt-6 break-all text-base font-bold"
                      >
                        Responded:
                      </Label>
                      <Checkbox
                        name={id}
                        id={id}
                        value={id}
                        className="bg-white"
                        // EXPLANATION: When clicking on the checkbox the modal should not appear
                        onClick={(e) => e.stopPropagation()}
                      />
                      <P className="break-all font-bold">Name:</P>
                      <P className="break-all [&:not(:first-child)]:mt-2">{`${capitalizeFirstLetter(
                        firstName,
                      )} ${capitalizeFirstLetter(lastName)}`}</P>
                      <P className="break-all font-bold">Email:</P>
                      <P className="break-all [&:not(:first-child)]:mt-2">
                        {email}
                      </P>
                      <P className="break-all font-bold">Date:</P>
                      <P className="break-all [&:not(:first-child)]:mt-2">
                        {formatReadableDate(createdAt)}
                      </P>
                      <P className="break-all font-bold">Message:</P>
                      <P className="break-all [&:not(:first-child)]:mt-2">
                        {message}
                      </P>
                    </div>
                  </CarouselItem>
                ),
              )}
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
