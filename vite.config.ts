
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react-swc';
  import path from 'path';

  export default defineConfig({
    plugins: [react()],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        'sonner@2.0.3': 'sonner',
        'react-resizable-panels@2.1.7': 'react-resizable-panels',
        'react-hook-form@7.55.0': 'react-hook-form',
        'next-themes@0.4.6': 'next-themes',
        'input-otp@1.4.2': 'input-otp',
        'figma:asset/a5fc00399012eeaf62209d6c1238a54dcc136bcf.png': path.resolve(__dirname, './src/assets/a5fc00399012eeaf62209d6c1238a54dcc136bcf.png'),
        'figma:asset/869102067ce8235d121d1e72efdd989be969f734.png': path.resolve(__dirname, './src/assets/869102067ce8235d121d1e72efdd989be969f734.png'),
        'figma:asset/298ca8044759a9db905e0b307ec97ce7f3386940.png': path.resolve(__dirname, './src/assets/298ca8044759a9db905e0b307ec97ce7f3386940.png'),
        'figma:asset/2313c0ef7c72fea9684332541201c7988100c7d8.png': path.resolve(__dirname, './src/assets/2313c0ef7c72fea9684332541201c7988100c7d8.png'),
        'figma:asset/1cacdfafa29eecceb028f649eacdf3b80807891d.png': path.resolve(__dirname, './src/assets/1cacdfafa29eecceb028f649eacdf3b80807891d.png'),
        'class-variance-authority@0.7.1': 'class-variance-authority',
        '@radix-ui/react-tooltip@1.1.8': '@radix-ui/react-tooltip',
        '@radix-ui/react-toggle@1.1.2': '@radix-ui/react-toggle',
        '@radix-ui/react-toggle-group@1.1.2': '@radix-ui/react-toggle-group',
        '@radix-ui/react-tabs@1.1.3': '@radix-ui/react-tabs',
        '@radix-ui/react-switch@1.1.3': '@radix-ui/react-switch',
        '@radix-ui/react-slot@1.1.2': '@radix-ui/react-slot',
        '@radix-ui/react-slider@1.2.3': '@radix-ui/react-slider',
        '@radix-ui/react-separator@1.1.2': '@radix-ui/react-separator',
        '@radix-ui/react-select@2.1.6': '@radix-ui/react-select',
        '@radix-ui/react-scroll-area@1.2.3': '@radix-ui/react-scroll-area',
        '@radix-ui/react-radio-group@1.2.3': '@radix-ui/react-radio-group',
        '@radix-ui/react-progress@1.1.2': '@radix-ui/react-progress',
        '@radix-ui/react-popover@1.1.6': '@radix-ui/react-popover',
        '@radix-ui/react-navigation-menu@1.2.5': '@radix-ui/react-navigation-menu',
        '@radix-ui/react-menubar@1.1.6': '@radix-ui/react-menubar',
        '@radix-ui/react-label@2.1.2': '@radix-ui/react-label',
        '@radix-ui/react-hover-card@1.1.6': '@radix-ui/react-hover-card',
        '@radix-ui/react-dialog@1.1.6': '@radix-ui/react-dialog',
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