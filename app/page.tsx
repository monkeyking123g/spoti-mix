import NextLink from "next/link";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>
          Welcome to my personal web development project.&nbsp;
        </h1>
        <br />
        <h2 className={subtitle({ class: "mt-4" })}>
          Hello and thanks for joining! This project is a reflection of my
          passion and dedication. I've carefully crafted every detail and am
          excited to share it with you. Want to contribute or suggest
          improvements? Your input is invaluable.
        </h2>
        <h2 className={title({ color: "violet" })}>Let's get started!</h2>
      </div>

      <div className="mt-8 flex flex-col">
        <Snippet>
          <span>git colne https://github.com/monkeyking123g/spoti-mix.git</span>
          <span>cd spoti-mix</span>
          <span>npm i</span>
        </Snippet>
      </div>
    </section>
  );
}
