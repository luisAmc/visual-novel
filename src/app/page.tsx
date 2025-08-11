import { Intro } from "~/components/Intro";
import { Outro } from "~/components/Outro";
import { Stories } from "~/components/Stories";
import { DotCursorProvider } from "~/hooks/useDotCursor";

export default function Home() {
  return (
    <div className="flex flex-col gap-y-12 bg-[#e8e8e3] text-[#101010]">
      <DotCursorProvider>
        <Intro />
        <Stories />
        <Outro />
      </DotCursorProvider>
    </div>
  );
}
