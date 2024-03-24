import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

/**
 * @titleBy name
 */
export interface SlideProps {
  name: string;
  description?: string;
  /**
   * @minItems 1
   * @maxItems 3
   */
  tags?: string[];
  repeat?: number;
  image: {
    src: ImageWidget;
    alt: string;
  };
}

export interface Props {
  title: string;
  description?: string;
  content?: SlideProps[];
}

export default function Slide({
  title,
  description,
  content = [],
}: Props) {
  const slideContent = content?.map(
    ({ name, description, tags = [], image, repeat = 1 }) => {
      return (
        <div class="flex items-center gap-x-10 mx-4">
          {Array(repeat).fill(0).map(() => (
            <div class="flex flex-col relative w-[273px] h-[340px]">
              <Image
                src={image.src}
                alt={image.alt}
                width={273}
                height={340}
                decoding="async"
                fetchPriority="low"
                class="w-full h-full object-center object-cover rounded-3xl bg-black"
              />

              <div class="absolute flex flex-1 flex-col gap-1.5 bottom-0 text-primary pl-6 pb-6 w-[270px]">
                <span class="text-lg font-bold text-primary whitespace-nowrap pointer-events-none">
                  {name}
                </span>

                <p class="text-sm font-bold text-primary truncate w-full pointer-events-none">
                  {description}
                </p>

                <ul class="flex flex-wrap w-full gap-1.5 mt-0.5">
                  {tags.map((tag) => (
                    <li class="inline-flex items-center justify-center border border-white/40 font-bold text-xs py-1 px-4 rounded-3xl pointer-events-none">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      );
    },
  );

  return (
    <div class="flex flex-col w-full h-full py-6">
      <div class="flex flex-col gap-0.5 text-center items-center justify-center w-full mb-8">
        <h1 class="text-3xl tracking-wide font-black leading-tight text-primary">
          {title}
        </h1>
        {description && (
          <h2 class="text-lg tracking-wide leading-tight text-primary font-bold">
            {description}
          </h2>
        )}
      </div>

      <div class="relative w-full overflow-hidden h-[340px]">
        <div class="animate-sliding absolute top-0 left-0 flex flex-nowrap h-[340px]">
          {slideContent}
        </div>
      </div>
    </div>
  );
}
