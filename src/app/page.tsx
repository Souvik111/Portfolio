import { redirect } from "next/navigation";

// Temporary until the homepage is designed — land on the Deepr case study.
export default function Home() {
  redirect("/work/deepr");
}
