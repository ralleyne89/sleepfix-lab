import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/mdx/mdx-components";

export async function renderArticleMdx(source: string) {
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      blockJS: false,
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return content;
}
