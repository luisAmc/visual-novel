import { Intro } from "~/components/Intro";
import { Stories } from "~/components/Stories";

export default function Home() {
  return (
    <div className="relative flex flex-col gap-y-12">
      <Intro />
      <Stories />
    </div>
  );
}
