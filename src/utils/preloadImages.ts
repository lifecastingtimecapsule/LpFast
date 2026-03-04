/**
 * LP で使用する画像をバックグラウンドでプリロードし、表示を軽くする。
 * App マウント時に 1 回だけ実行する。
 */
import logo from "@/assets/a5fc00399012eeaf62209d6c1238a54dcc136bcf.png";
import hero from "@/assets/61182aee64f023c22f643d006af7762c37e5d671.png";
import plasterArt from "@/assets/49bf243a67012d811aa34bfe11f3d464e8fc5388.png";
import img1 from "@/assets/a0354f462dd60a54ee83d6d005b657d7607d28c2.png";
import img2 from "@/assets/1dcb22b059fada42ca8857edd6c73aa35756f226.png";
import img3 from "@/assets/1cacdfafa29eecceb028f649eacdf3b80807891d.png";
import imgStaff3 from "@/assets/4f29fd2cd0dcbbe2868733df8ea47200f371e7a2.png";
import imgHands from "@/assets/9a3380d762d79add87cdd15a8bdf00ca60691e39.png";
import imgBasic from "@/assets/869102067ce8235d121d1e72efdd989be969f734.png";
import imgWithPhoto from "@/assets/1986fa6511a700ac3e4eeb46a728feea3d8ff040.png";
import imgGallery0 from "@/assets/96363315c6e81ea319cebace631d308b4c40d1f7.png";
import imgGallery1 from "@/assets/b249142c3b0afcc8d91208afed6a8e291cdb4144.png";
import imgGallery2 from "@/assets/d3aa16a948f66f2158eb7316e75d2a1c2732968e.png";
import imgGallery3 from "@/assets/92a2101c1f75310484352570d56526aa7857c259.png";

const lpImageUrls: string[] = [
  logo,
  hero,
  plasterArt,
  img1,
  img2,
  img3,
  imgStaff3,
  imgHands,
  imgBasic,
  imgWithPhoto,
  imgGallery0,
  imgGallery1,
  imgGallery2,
  imgGallery3,
];

export function preloadLpImages(): void {
  lpImageUrls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
}
