import Image from "next/image";
import LatestPosts from "./content/home/latest-post";
import { MainNav } from "./content/ui/main-nav";

export default function Home() {
  return (
    <>
      <MainNav />
      <main>
        <div>
          <LatestPosts />
        </div>
      </main>
    </>
  );
}
