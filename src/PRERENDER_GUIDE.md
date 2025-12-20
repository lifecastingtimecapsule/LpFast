# プリレンダリング（SSG）実装ガイド

## 現状のSEO対策

現在、amoréttoのLPは**CSR（クライアントサイドレンダリング）**で動作しています。
以下のSEO対策を実施済み：

- ✅ `index.html`に包括的なメタデータ設定
- ✅ 構造化データ（LocalBusiness）実装
- ✅ 各ページで`react-helmet-async`によるメタデータ動的更新
- ✅ `sitemap.xml`と`robots.txt`の最適化
- ✅ SEOキーワード（立体手形、産後ギフト等）の自然な配置

## プリレンダリング（SSG）の必要性

### 現在の課題
CSR環境では、検索エンジンのクローラーが初回アクセス時に**空のHTML（`<div id="root"></div>`のみ）**を受け取ります。
Google botは最終的にJavaScriptを実行してコンテンツを取得しますが、以下の問題があります：

1. **インデックス遅延**: JavaScript実行まで時間がかかる
2. **SNSシェア問題**: Facebook、TwitterなどのOGP取得がうまくいかない場合がある
3. **初回表示速度**: ユーザー体験（UX）にも影響

### SSGのメリット
ビルド時にHTMLを事前生成することで：

- ✨ **即座にコンテンツ配信**: クローラーが初回アクセスで完全なHTMLを取得
- ✨ **高速表示**: JavaScriptのロード前にコンテンツが表示される
- ✨ **SNS最適化**: OGP情報が確実に取得される
- ✨ **SEO効果**: インデックス速度と品質が大幅に向上

## 実装オプション

### オプション1: Vite + プリレンダリングプラグイン（推奨・中程度の難易度）

現在のVite環境を維持しつつ、プリレンダリングを実現：

#### 必要なパッケージ
```bash
npm install -D vite-plugin-ssr
# または
npm install -D vite-plugin-prerender
```

#### 設定例（vite.config.ts）
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import prerender from 'vite-plugin-prerender';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    prerender({
      // プリレンダリング対象のルート
      routes: [
        '/',
        '/about',
        '/plan-gallery',
        '/school',
        '/access'
      ],
      // レンダリング設定
      renderer: '@prerenderer/renderer-puppeteer',
      renderAfterDocumentEvent: 'render-event',
      postProcess(renderedRoute) {
        // メタタグの最適化処理
        renderedRoute.html = renderedRoute.html
          .replace(/<title>.*?<\/title>/, renderedRoute.route === '/' 
            ? '<title>amorétto | LifeCasting® Studio - 愛知・豊川の立体手形アート</title>'
            : renderedRoute.html.match(/<title>.*?<\/title>/)[0]
          );
        return renderedRoute;
      }
    })
  ]
});
```

#### App.tsxの修正
```typescript
// レンダリング完了イベントを発火
useEffect(() => {
  if (typeof window !== 'undefined') {
    document.dispatchEvent(new Event('render-event'));
  }
}, []);
```

### オプション2: Next.js/Astroへの移行（推奨・本格的）

最も確実で将来性のある方法：

#### Next.js（フルスタックReactフレームワーク）
- **メリット**: 
  - App RouterでSSG/SSR/ISRを柔軟に選択可能
  - 画像最適化、ルーティング、SEO機能が標準装備
  - Reactコンポーネントをほぼそのまま移行可能
  
- **移行手順**:
  ```bash
  npx create-next-app@latest amoretto-next
  # 既存のコンポーネントを /app ディレクトリに移行
  # 各ページでメタデータをexport
  ```

- **メタデータ設定例**:
  ```typescript
  // app/page.tsx
  export const metadata = {
    title: 'amorétto | LifeCasting® Studio',
    description: '愛知・豊川のLifeCasting®専門スタジオ...',
    openGraph: {
      title: 'amorétto | LifeCasting® Studio',
      description: '...',
      images: ['/og-image.jpg'],
    },
  };
  ```

#### Astro（コンテンツ重視のフレームワーク）
- **メリット**:
  - デフォルトでゼロJavaScript（必要な部分のみReactを使用可能）
  - 超高速な表示速度
  - マーケティングサイトに最適
  
- **移行手順**:
  ```bash
  npm create astro@latest amoretto-astro
  # Reactインテグレーション追加
  npx astro add react
  ```

### オプション3: 手動プリレンダリング（一時的な対応）

開発環境で各ページのHTMLスナップショットを手動生成：

#### 手順
1. ローカルで開発サーバーを起動: `npm run dev`
2. 各ルートにアクセスし、ブラウザの「ページのソースを表示」
3. レンダリング後のHTMLを取得
4. 各ルート用のHTMLファイルを作成:
   ```
   dist/
   ├── index.html (ホーム)
   ├── about/index.html
   ├── plan-gallery/index.html
   ├── school/index.html
   └── access/index.html
   ```

**注意**: この方法は一時的な対応であり、コンテンツ更新のたびに手動で再生成が必要です。

## 推奨実装パス

### フェーズ1: 即座に実施可能（現在）
- ✅ `sitemap.xml`の全ルート追加（完了）
- ✅ `robots.txt`最適化（完了）
- ✅ 各ページの`react-helmet-async`メタデータ強化
- ✅ 構造化データ（BreadcrumbList、Product等）の各ページ追加

### フェーズ2: 短期対応（1-2週間）
- 🔄 **Vite + vite-plugin-prerender**の導入
- 各ルートのHTMLプリレンダリング
- ビルドプロセスの自動化

### フェーズ3: 中長期対応（1-3ヶ月）
- 🚀 **Next.js App Router**への完全移行
- SSG + ISR（Incremental Static Regeneration）で常に最新コンテンツ
- 画像最適化、パフォーマンス向上
- ブログ機能追加（コンテンツマーケティング）

## 現在できること（Figma Make環境）

Figma Make環境では、package.jsonやビルド設定の変更が制限されているため、以下を実施：

### 1. メタデータの完全最適化
各ページのHelmetコンポーネントで、ページ固有の詳細なメタデータを設定。

### 2. 構造化データの拡充
- BreadcrumbList（パンくずリスト）
- Product（各プラン情報）
- FAQPage（よくある質問）
- Course（スクール情報）

### 3. セマンティックHTML強化
適切なHTML5タグ（article、section、nav等）を使用し、クローラーがコンテンツ構造を理解しやすくする。

### 4. 内部リンク最適化
関連ページへの適切な内部リンクで、クローラビリティを向上。

## デプロイ時の推奨事項

### Vercel/Netlify等にデプロイする場合
1. **リダイレクト設定**で全ルートを`index.html`にフォールバック
   ```
   # _redirects (Netlify)
   /*    /index.html   200
   ```

2. **ヘッダー設定**でキャッシュ最適化
   ```
   # _headers (Netlify)
   /assets/*
     Cache-Control: public, max-age=31536000, immutable
   ```

3. **Prerendering有効化**（Netlifyの場合）
   ```toml
   # netlify.toml
   [build]
     publish = "dist"
     
   [[plugins]]
     package = "@netlify/plugin-gatsby"
   ```

## まとめ

現状のCSR環境でも十分なSEO対策は可能ですが、**本格的なSEO効果を得るにはSSGの導入が不可欠**です。

### アクションアイテム
- [ ] フェーズ1の残タスク完了（構造化データ拡充）
- [ ] vite-plugin-prerenderの導入検討・テスト
- [ ] Next.js移行の計画策定
- [ ] コンテンツマーケティング戦略（ブログ等）の検討

ご不明点があればお気軽にご相談ください。
