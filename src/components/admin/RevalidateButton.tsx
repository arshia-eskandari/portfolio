"use client";

import { Button } from "../ui/Button";
import revalidate from "@/app/admin/_actions/revalidate";

export default function RevalidateButton() {
  return (
    <Button type="button" onClick={() => revalidate("/")}>
      Revalidate
    </Button>
  );
}
