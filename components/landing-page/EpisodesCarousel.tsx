import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

import Slider from "../../components/ui/Slider.tsx";
import SliderJS from "../../islands/SliderJS.tsx";

import { useId } from "../../sdk/useId.ts";

export type Tag = { [tag: string]: string };

export interface Banner {
  banner: {
    src: ImageWidget;
    alt: string;
  };
  /**
   * @hide
   */
  lcp?: boolean;
  title: string;
  /**
   * @format textarea
   */
  description?: string;
}

export interface Props {
  banners?: Banner[];
  dots?: boolean;
  preload?: boolean;
  interval?: number;
}

function EpisodeCard({ banner, lcp, title, description }: Banner) {
  if (!banner) return null;

  return (
    <div class="relative w-[240px] md:w-[540px] xl:w-[860px] rounded-3xl h-full">
      <Image
        src={banner.src}
        alt={banner.alt}
        width={860}
        height={537}
        preload={lcp}
        class="w-full h-full object-center object-cover rounded-3xl bg-black"
      />

      <div class="absolute flex flex-1 flex-col gap-3 -translate-y-1/2 top-1/2 text-primary pl-6">
        <h2 class="text-2xl font-black tracking-widest">{title}</h2>
        <p class="tracking-widest leading-tight text-zinc-200 truncate">
          {description}
        </p>

        <div class="flex justify-start">
          <div class="btn border border-zinc-500 bg-zinc-950 rounded-2xl hover:bg-zinc-950/90 duration-500 transition-all ease-in-out">
            <span class="text-zinc-300">Type:</span>{" "}
            <span class="text-primary font-bold">Comic</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Dots({ banners }: Props) {
  return (
    <ul class="carousel justify-center col-span-full gap-2.5 z-10 row-start-4">
      {banners?.map((_, index) => (
        <li class="carousel-item">
          <Slider.Dot index={index}>
            <div class="py-5">
              <div class="w-6 h-1 rounded-xl bg-zinc-200/20 group-disabled:bg-white" />
            </div>
          </Slider.Dot>
        </li>
      ))}
    </ul>
  );
}

export default function EpisodesCarousel(
  { banners = [], preload = false, dots = false, interval }: Props,
) {
  const id = useId();

  return (
    <div
      id={id}
      class="grid min-h-[537px] py-6 px-2"
    >
      <Slider class="carousel carousel-center w-full gap-6 h-full">
        {banners?.map((banner, index) => (
          <Slider.Item
            index={index}
            class="carousel-item w-[240px] md:w-[540px] xl:w-[860px] h-full"
          >
            <EpisodeCard
              lcp={(index === 0 || index === 1) && preload}
              {...banner}
            />
          </Slider.Item>
        ))}
      </Slider>

      {dots && <Dots banners={banners} />}

      <SliderJS rootId={id} interval={interval && interval * 1e3} infinite />
    </div>
  );
}
