import Image from "next/image";
import PlayGround from "@/components/PlayGround";
import Interface from "@/components/Interface";
import { Noto_Sans } from 'next/font/google';
 
// If loading a variable font, you don't need to specify the font weight
const notoSans = Noto_Sans({ 
  weight: ['400', '500', '700'],
  style: ['normal'],
  subsets: ['latin'], 
})


export default function Home() {
  return (
    <main className={notoSans.className}>
      <Interface />
      <PlayGround />
    </main>
  );
}