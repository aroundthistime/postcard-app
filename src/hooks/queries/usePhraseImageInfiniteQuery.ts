import { Category } from "../../types/Category";
import { useInfiniteQuery } from "@tanstack/react-query";

const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const usePhraseImageInfiniteQuery = (category: Category) => {
  return useInfiniteQuery({
    queryKey: ["image", category],
    queryFn: async ({ pageParam }) => {
      await sleep(2000);
      /**
       * @TODO replace with images that actually belong to the certain category
       */
      if (pageParam === 0) {
        return [
          "https://s3-alpha-sig.figma.com/img/b91c/a30f/b329e7ab19bbba782380ab34686a3a6f?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eWpu5kbVveJPFqaWoBBD6seGBV-oi3VckR4v3tnv8f2VrJNCLHIRMRom8BeB0oNrQ27YjKrK9XOQE~RHtF-2dqKhd3SfuKclboHfP8ofwtRuZy4WXjomkDCKTNyjHvKl~RuaEisorbNKYeRVGIDTmIQz8lRAccpfSpKCMpFok~FrYt-SSjKS2nBa68hsWuTHGCOv~BPKoBv45XUTcv3nGJ1sB~fryEOzbSjG35y~G2V0AlQvzXJjShGSq0u7XDoFmM7j5vpDzTHtCBi~do2PWyAkTHZ5lbMf~uzRLgwUKErk8qLFJ9qSfNXO1e6GfpnCGX9nqXtJpf6rX5BoXeyvlA__",
          "https://s3-alpha-sig.figma.com/img/65c2/1f83/a84019e0a30d7b9060bb595265d79e91?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eN4wdJwdielfwdRh6Z0GdFwXVlxMYNkttc0G1WWdaQ3fHMtwrcB6ZLty~aWHhOisoKwRtXQ~OQkUcejQ9VTTA9MITUqNgQqtbHWT1yG1kA-nfhgK7kOqMbI0sFr9UMx5GmZfxVV2RhQQE3-t379A1-1fM5igsKx-79iJJA2XlclgbIPguf09lfnWg9AGbqGyF0CrWIFdZSM5fvPp0rbYMxstDuQkhxgwv1TNmbTBxBHhPPZnaW4KfraXipEc8RIvlhiHcV7qiVopB1Iaxj92fmEsMgB-Yjg8j8UtoWl8iBIuuwbb-Wb-STrb~7gB3hOKCfUlomVuTtb-Q8ixLI~iPg__",
          "https://s3-alpha-sig.figma.com/img/b4a8/8adc/17a17ab3d3bb0028fcfd19ed9f746334?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fc9~pYtzWvM7rT0XSCjp5J-9EWojZDhLCwPg1YFsmNsvjt9BHs4AiJ1We8iwpcqQT8GXvgk2-F2DxzPSneKXsFCMeTDC2hwzUV3MziS56JXUDIFrFEWIXT6Or-5Rq45l8Iy6rtMnBvMBR~~eNLZwJBA-rLU3cYYvum14yB5e4BfzQxre3c3LpA-SE393zFZfetePs59jUCsYyOwVu0IzIkoPp8NvrKzgMrlISfGwo8LEByH2USBqUlgOTtVNSSacVb3sWo0PH-~laDtQMBWGA7NdBcBI77hQHM-KOZVRy~nqXMuLmHbLINGsYdmX4OiNQHp6KaL5b0eu4O-2nVHz0g__",
          "https://s3-alpha-sig.figma.com/img/832d/44ad/04d2f32553ed56ddd6d5223d5086df74?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=p1LQthj2YoPjgmKbVbGsQ8YmRmkRXi-g9rfQ1SR1bR2HyE2X1g0XFLLQ18KnuV3rjrMfyxd7odcFPtYY9oMiNMYerGCNnFNjk3cuqke9fSa1lGCnmaxEh6WsR267EjcgbWu5GjkInnXytY~BnHKTr~H04QtKW3XAoeE~wFGpAzxhAR7GoB2CnpwkY6hYc6SUWATaJcNMqZlw-VWRoaqwjix07Kb5zfMiPt-en0ttzdP9GjKaCt~Cnro-NotB~IL9T4GyEx1MWAUeApdxfGIoi~qDz0SWZRjPtIKc0Jav4nkv5gRb92aF-d953HbsIZvosAzJu6QCQconfreVmD6DZg__",
          "https://s3-alpha-sig.figma.com/img/61a7/a4c7/a2f5d1da88051f1a906241790370c5a5?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZuL5titRWuzKG3CSx3MVferRMvX4lWBJGrxC0QG6vK0laBqHdcGZPS~LNWNR5KFt5Zuh9xhIO1dh404gKnF~ziIqCV15xstrU7zi9OG6P3eNgHcTTWaRpKpk1Wq0jobWTUTD8soq-yGmhGPm00iixMVI9sqsnBGMRLNzg3YMfGFIVRyfbgwpjJlkyYaniSdUt7IvDv8iUgWbq8FCKiPWoBXYFLtIv8CoHap4siao2rtYxQj51j3pU7voTLE86ZVghXfF9ik~GEUqokwyJpP0JNaDIPDhgA3ykW9zQ4tgUZAIesVSbV3Y2uYiuGfRdJuiWkCZwwPMbFB5wzTiYxtVAg__",
          "https://s3-alpha-sig.figma.com/img/da41/cf31/1904357d578c77334d9c1001f0c1034b?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=lQ5eIZLEmYPn9VFmXIMH8TkRMAj3B99yezDeNLkdiBCFQouvslMUfZnpWa3V4EkVoze4lPGw39mJwlGjRQOYHJrNyfO~eU7KHibxTIxUInIUsynR0UthEzl8Z9FoC5PXlXdGj7juSuOQDWhzZ9045GUDQFPe20qwaA3yEn1sDzEkalsjr4vJ41rYiymfENj4fZihymhK~jZGOClbubLzxxl-I-bhesS~9dCfPmxXLUML~1AUtYguCBwhL0NDrXC4YA-I5IKbsMxnZ~jwGRblheWZ2cq~H8c3ivpGWiyUn6x7aYawrPqqDlMgKW56HU7CrZ9ViTKunX2Vhi1zlI6IiQ__",
        ];
      } else if (pageParam === 1) {
        return [
          "https://s3-alpha-sig.figma.com/img/06b5/8371/b1a6c44bce749fb32d44c141cbbffe72?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=g9Wu5G9SZyomDV7VlyWMHAXK-PgFNT5eu9lTCN3xhYNF27k8FxmU9ih2XGUzPYE5b5NqcjEz-~aw~p9x51865YOSQpyhmo1Vi6IOdqmSUOwGlSpUxMllZ3UKZFbNePmYb4zhfzjn5wDDXxreDDdriTaqgylIHd71Brn8pYxhOepyazcFRlDj10vFVR8pFJmmyOxRRZ4Su6sG8z4ujLzZ5ArLf0-kvNO2xwnwm6klV07k9rGy7S0XqcQcAwXul-6UyjIJxODo3Vpn-~k0xy-k16QjUuXrh1UZUDWazYjooEVXnVPEPmWSS7zv0qZzOTvpm57Fi9loIfLphGjMfKG0qw__",
        ];
      }

      return [];
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages, lastPageParam) => {
      if (lastPage.length === 0) return undefined;
      return lastPageParam + 1;
    },
  });
};

export default usePhraseImageInfiniteQuery;
