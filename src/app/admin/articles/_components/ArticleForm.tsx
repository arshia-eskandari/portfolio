"use client";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { ErrorAlert } from "@/components/ui/ErrorAlert";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { SearchInput } from "@/components/ui/SearchInput";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { Textarea } from "@/components/ui/Textarea";
import { H4 } from "@/components/ui/Typography";
import { formatDate } from "@/lib/time";
import { cn } from "@/lib/utils";
import { Article, Media } from "@prisma/client";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export default function ArticleForm({
  article,
  action,
  deleteAction,
  imageMedia,
}: {
  article: Article;
  action: (formData: FormData) => Promise<any>;
  deleteAction: (id: string) => Promise<any>;
  imageMedia: Media[];
}) {
  const [loading, setLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showDeleteSpinner, setShowDeleteSpinner] = useState(false);
  const router = useRouter();
  const [errorMssg, setErrorMssg] = useState<string>("");
  const [form, setForm] = useState<{
    title: string;
    content: string;
    tags: string;
  }>({
    title: "",
    content: "",
    tags: "",
  });
  const [formErrors, setFormErrors] = useState<{
    title: string;
    content: string;
    tags: string;
  }>({ title: "", content: "", tags: "" });

  const [selectedImage, setSelectedImage] = useState<Media | null>(null);

  useEffect(() => {
    if (!article) return;
    setForm({
      title: article.title ?? "",
      content: article.content ?? "",
      tags: article.tags.join(",") ?? "",
    });
  }, [article]);

  useEffect(() => {
    if (!imageMedia || !article) return;
    const found = imageMedia.find((m) => m.url === article.banner);
    setSelectedImage(found ?? null);
  }, [imageMedia, article]);

  const validateText = (text: string, lowerBound = 5, upperBound = 5000) => {
    const len = text.replace(/ /g, "").length;
    return len >= lowerBound && len <= upperBound;
  };

  const onInputChange = (
    type: "title" | "content" | "tags",
    e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    setFormErrors({
      title:
        type === "title" && !validateText(value, 5, 200)
          ? "The title must be 5 to 200 characters"
          : type === "title" && validateText(value, 5, 200)
            ? ""
            : formErrors.title,
      content:
        type === "content" && !validateText(value, 1, 10_000_000)
          ? "The content must be 10 to 5000 characters"
          : type === "content" && validateText(value, 1, 10_000_000)
            ? ""
            : formErrors.content,
      tags:
        type === "tags" && !validateText(value, 1, 300)
          ? "The tags must be 1 to 300 characters"
          : type === "tags" && validateText(value, 1, 300)
            ? ""
            : formErrors.tags,
    });
    setForm({ ...form, [type]: value });
  };

  const actionWithLoading = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMssg("");
    setLoading(true);
    setShowSpinner(true);
    const formEl = event.currentTarget;
    const formData = new FormData(formEl);

    formData.append("title", form.title);
    formData.append("content", form.content);
    formData.append("id", article.id);
    formData.append("banner", selectedImage ? selectedImage.url : "");

    const response = await action(formData);
    setLoading(false);

    if (response?.status === 200 || response?.status === 201) {
      router.refresh();
    } else {
      setErrorMssg(response?.message || "An error occurred");
    }
  };

  const onTransitionEnd = () => {
    setShowSpinner(false);
    setShowDeleteSpinner(false);
  };

  const availableImages = imageMedia
    ? imageMedia.filter((m) => selectedImage?.id !== m.id)
    : [];

  return (
    <form onSubmit={actionWithLoading}>
      <AccordionItem value={article.id} className="rounded-sm bg-slate-200 p-3">
        <AccordionTrigger className="no-underline">
          {`${article.title}  |  ${formatDate(article.createdAt)}`}
        </AccordionTrigger>
        <AccordionContent className="px-3">
          <div className="flex w-full items-center justify-between py-3">
            <H4>Article Details</H4>
            <div>
              <SubmitButton
                type="button"
                variant="destructive"
                className="mr-3"
                loading={deleteLoading}
                showSpinner={showDeleteSpinner}
                onTransitionEnd={onTransitionEnd}
                disabled={loading}
                onClick={async (e) => {
                  e.preventDefault();
                  setErrorMssg("");
                  setDeleteLoading(true);
                  setShowDeleteSpinner(true);
                  if (
                    window.confirm(
                      `Are you sure you want to delete "${article.title}"?`,
                    )
                  ) {
                    const response = await deleteAction(article.id);
                    if (response?.status === 200 || response?.status === 201) {
                      router.refresh();
                    } else {
                      setErrorMssg(response?.message || "Failed to delete");
                    }
                  } else {
                    setDeleteLoading(false);
                    setShowDeleteSpinner(false);
                  }
                }}
              >
                Delete
              </SubmitButton>
              <SubmitButton
                loading={loading}
                showSpinner={showSpinner}
                onTransitionEnd={onTransitionEnd}
                disabled={deleteLoading}
              >
                Save
              </SubmitButton>
            </div>
          </div>

          <Label htmlFor="title" className="my-3 block">
            Title
          </Label>
          <Input
            type="text"
            id="title"
            name="title"
            className="w-full lg:w-1/2"
            value={form.title}
            onChange={(e) => onInputChange("title", e)}
          />
          {formErrors.title ? (
            <span className="input-error-message">{formErrors.title}</span>
          ) : null}

          <Label htmlFor="content" className="my-3 block">
            Content
          </Label>
          <Textarea
            id="content"
            name="content"
            value={form.content}
            onChange={(e) => onInputChange("content", e)}
            placeholder="Enter article content"
            className={cn(
              formErrors.content === ""
                ? ""
                : "input-error ring-0 focus-visible:ring-0",
            )}
          />
          {formErrors.content ? (
            <span className="input-error-message">{formErrors.content}</span>
          ) : null}
          <Label htmlFor="tags" className="my-3 block">
            Tags
          </Label>
          <Input
            type="text"
            id="tags"
            name="tags"
            className="w-full lg:w-1/2"
            value={form.tags}
            onChange={(e) => onInputChange("tags", e)}
          />
          {formErrors.tags ? (
            <span className="input-error-message">{formErrors.tags}</span>
          ) : null}
          <Label htmlFor="banner" className="my-3 block">
            Banner Image
          </Label>
          <SearchInput
            id="banner"
            items={availableImages}
            itemClickHandler={(medium: Media) => setSelectedImage(medium)}
          />
          <div className="my-3">
            {selectedImage ? (
              <span className="flex items-center justify-start">
                <X
                  color="red"
                  className="w-content mr-3 inline-block hover:cursor-pointer"
                  onClick={() => setSelectedImage(null)}
                />
                {selectedImage.name}
              </span>
            ) : null}
          </div>
        </AccordionContent>
      </AccordionItem>
      <ErrorAlert errorMssg={errorMssg} />
    </form>
  );
}
