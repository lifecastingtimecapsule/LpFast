import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  // src/public フォルダを公開用として認識させる設定
  publicDir: 'src/public',

  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      'sonner@2.0.3': 'sonner',
      'react-resizable-panels@2.1.7': 'react-resizable-panels',
      'react-hook-form@7.55.0': 'react-hook-form',
      'next-themes@0.4.6': 'next-themes',
      'input-otp@1.4.2': 'input-otp',
      
      // ▼▼▼ 画像の設定（ここを修正しました） ▼▼▼
      
      // 1. ロゴとファビコン（これらは PNG のまま！）
      // 左側(キー)も右側(パス)も .png です
      'figma:asset/a5fc00399012eeaf62209d6c1238a54dcc136bcf.png': path.resolve(__dirname, './src/assets/a5fc00399012eeaf62209d6c1238a54dcc136bcf.png'),
      'figma:asset/7df12076a8e03cdc25a631eac63c68bcb45432b0.png': path.resolve(__dirname, './src/assets/7df12076a8e03cdc25a631eac63c68bcb45432b0.png'),

      // 2. その他の写真画像（これらは JPG に変更！）
      // 左側(キー)も右側(パス)も .jpg に書き換えました
      'figma:asset/d3aa16a948f66f2158eb7316e75d2a1c2732968e.jpg': path.resolve(__dirname, './src/assets/d3aa16a948f66f2158eb7316e75d2a1c2732968e.jpg'),
      'figma:asset/b249142c3b0afcc8d91208afed6a8e291cdb4144.jpg': path.resolve(__dirname, './src/assets/b249142c3b0afcc8d91208afed6a8e291cdb4144.jpg'),
      'figma:asset/a0354f462dd60a54ee83d6d005b657d7607d28c2.jpg': path.resolve(__dirname, './src/assets/a0354f462dd60a54ee83d6d005b657d7607d28c2.jpg'),
      'figma:asset/9a3380d762d79add87cdd15a8bdf00ca60691e39.jpg': path.resolve(__dirname, './src/assets/9a3380d762d79add87cdd15a8bdf00ca60691e39.jpg'),
      'figma:asset/96363315c6e81ea319cebace631d308b4c40d1f7.jpg': path.resolve(__dirname, './src/assets/96363315c6e81ea319cebace631d308b4c40d1f7.jpg'),
      'figma:asset/92a2101c1f75310484352570d56526aa7857c259.jpg': path.resolve(__dirname, './src/assets/92a2101c1f75310484352570d56526aa7857c259.jpg'),
      'figma:asset/88d78594627298de202a95b666ce87d1601717bf.jpg': path.resolve(__dirname, './src/assets/88d78594627298de202a95b666ce87d1601717bf.jpg'),
      'figma:asset/869102067ce8235d121d1e72efdd989be969f734.jpg': path.resolve(__dirname, './src/assets/869102067ce8235d121d1e72efdd989be969f734.jpg'),
      'figma:asset/64ecf4b89ba86abb64e7b70055c5a78e62299b8b.jpg': path.resolve(__dirname, './src/assets/64ecf4b89ba86abb64e7b70055c5a78e62299b8b.jpg'),
      'figma:asset/4f29fd2cd0dcbbe2868733df8ea47200f371e7a2.jpg': path.resolve(__dirname, './src/assets/4f29fd2cd0dcbbe2868733df8ea47200f371e7a2.jpg'),
      'figma:asset/49bf243a67012d811aa34bfe11f3d464e8fc5388.jpg': path.resolve(__dirname, './src/assets/49bf243a67012d811aa34bfe11f3d464e8fc5388.jpg'),
      'figma:asset/298ca8044759a9db905e0b307ec97ce7f3386940.jpg': path.resolve(__dirname, './src/assets/298ca8044759a9db905e0b307ec97ce7f3386940.jpg'),
      'figma:asset/2313c0ef7c72fea9684332541201c7988100c7d8.jpg': path.resolve(__dirname, './src/assets/2313c0ef7c72fea9684332541201c7988100c7d8.jpg'),
      'figma:asset/1dcb22b059fada42ca8857edd6c73aa35756f226.jpg': path.resolve(__dirname, './src/assets/1dcb22b059fada42ca8857edd6c73aa35756f226.jpg'),
      'figma:asset/1cacdfafa29eecceb028f649eacdf3b80807891d.jpg': path.resolve(__dirname, './src/assets/1cacdfafa29eecceb028f649eacdf3b80807891d.jpg'),
      'figma:asset/1b1cb659ea81541dabf0f51e56339db5d8c92811.jpg': path.resolve(__dirname, './src/assets/1b1cb659ea81541dabf0f51e56339db5d8c92811.jpg'),
      'figma:asset/1986fa6511a700ac3e4eeb46a728feea3d8ff040.jpg': path.resolve(__dirname, './src/assets/1986fa6511a700ac3e4eeb46a728feea3d8ff040.jpg'),
      
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    outDir: 'build',
  },
  server: {
    port: 3000,
    open: true,
  },
});
