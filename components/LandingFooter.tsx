import { Github, LucideTwitter } from "lucide-react";
import Link from "next/link";

export const LandingFooter = () => {
  return (
    <footer className="p-4">
      <div className="flex max-w-7xl mx-auto text-center text-muted-foreground items-center justify-between">
        <p> {`Designed and Developed by Prathamesh`}</p>
        <span className="flex gap-4">
          <Link href={"https://github.com/Prathamesh0222"}>
            <Github />
          </Link>
          <Link href={"http://x.com/Prathamesh_0222"}>
            <LucideTwitter />
          </Link>
        </span>
      </div>
    </footer>
  );
};
