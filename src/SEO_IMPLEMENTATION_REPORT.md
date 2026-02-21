# SEO対策実装完了レポート

## 📊 実施済みSEO対策（2025年12月20日）

### 1. ✅ 全ページのメタデータ最適化

#### ホームページ（/）
- タイトル: "amorétto | LifeCasting® Studio - 愛知・豊川の立体手形アート"
- 説明文: 立体手形、産後ギフト、90秒型取り、美術教員免許を自然に盛り込み
- 構造化データ:
  - LocalBusiness（営業時間、住所、料金帯含む）
  - BreadcrumbList

#### Plan & Galleryページ（/plan-gallery）
- タイトル: "Plan & Gallery | amorétto - 立体手形プラン・産後ギフト"
- 構造化データ:
  - Product × 2（amorétto Collection、Premium Foto Collection）
  - BreadcrumbList
  - 価格情報、在庫状況含む

#### Schoolページ（/school）
- タイトル: "School | amorétto - LifeCasting®認定講座"
- 構造化データ:
  - EducationalOrganization
  - Course（認定講座情報）
  - BreadcrumbList

#### Accessページ（/access）
- タイトル: "Access | amorétto - 店舗情報・アクセス"
- 構造化データ:
  - Place（地図情報含む）
  - FAQPage（Q&A 3件）
  - BreadcrumbList

#### Aboutページ（/about）
- タイトル: "About | amorétto - 私たちの想い"
- 構造化データ:
  - AboutPage
  - Organization
  - BreadcrumbList

### 2. ✅ サイトマップ・ロボット最適化

#### sitemap.xml
- 全5ページを記載（/, /about, /plan-gallery, /school, /access）
- 最終更新日: 2025-12-20
- 優先度と更新頻度を適切に設定

#### robots.txt
- 全ページクロール許可
- サイトマップURLを明記
- クロール速度制御を追加

### 3. ✅ 構造化データ（JSON-LD）実装

合計10種類の構造化データを実装：
1. LocalBusiness（ビジネス情報）
2. BreadcrumbList（全ページ）
3. Product × 2（商品情報）
4. EducationalOrganization（教育機関）
5. Course（講座情報）
6. Place（場所情報）
7. FAQPage（よくある質問）
8. AboutPage（会社情報）

### 4. ✅ SEOキーワード戦略

自然な形で以下を各ページに配置：
- **一次キーワード**: 立体手形、立体足型、LifeCasting®
- **二次キーワード**: 産後ギフト、出産祝い、赤ちゃん、愛知、豊川
- **ロングテール**: 90秒型取り、美術教員免許、認定講座、特許素材

---

## 🚀 プリレンダリング（SSG）実装ロードマップ

### 現状の制約
- Figma Make環境では、npm installやビルド設定変更が制限される
- CSR（クライアントサイドレンダリング）のため、初回HTMLは空

### 解決策：段階的アプローチ

---

## 📅 フェーズ1: 即座実施（完了✅）

### 実施内容
- [x] 全ページのHelmetメタデータ最適化
- [x] 構造化データ（JSON-LD）実装
- [x] sitemap.xml、robots.txt更新
- [x] Canonical URL設定
- [x] Open Graph、Twitter Card設定

### 効果
- Googleクローラーは最終的にJavaScriptを実行してコンテンツを取得可能
- SNSシェア時のOGP情報は取得される（但し、実行タイミングに依存）
- 構造化データによるリッチリザルト表示の可能性

---

## 📅 フェーズ2: 短期対応（推奨・1-2週間）

### オプションA: Vite + vite-plugin-prerender

#### 1. パッケージインストール
```bash
npm install -D vite-plugin-prerender
npm install -D @prerenderer/renderer-puppeteer
```

#### 2. vite.config.tsを作成/更新
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { prerender } from 'vite-plugin-prerender';

export default defineConfig({
  plugins: [
    react(),
    prerender({
      routes: [
        '/',
        '/about',
        '/plan-gallery',
        '/school',
        '/access'
      ],
      renderer: '@prerenderer/renderer-puppeteer',
      rendererOptions: {
        maxConcurrentRoutes: 1,
        renderAfterTime: 5000,
      },
      postProcess(renderedRoute) {
        // HTMLの後処理（オプション）
        renderedRoute.html = renderedRoute.html
          .replace(/data-reactroot/g, '')
          .replace(/data-reactid/g, '');
        
        return renderedRoute;
      },
    }),
  ],
  build: {
    outDir: 'dist',
  },
});
```

#### 3. App.tsxに完了イベント追加
```typescript
useEffect(() => {
  // プリレンダリング完了を通知
  if (typeof window !== 'undefined') {
    setTimeout(() => {
      document.dispatchEvent(new Event('render-complete'));
    }, 100);
  }
}, []);
```

#### 4. ビルド実行
```bash
npm run build
```

#### 結果
`dist/`フォルダ内に各ルート用のHTMLが生成される：
```
dist/
├── index.html              ← 完全なコンテンツ入り
├── about/
│   └── index.html          ← 完全なコンテンツ入り
├── plan-gallery/
│   └── index.html          ← 完全なコンテンツ入り
├── school/
│   └── index.html
└── access/
    └── index.html
```

### オプションB: react-snap（シンプル）

#### 1. パッケージインストール
```bash
npm install -D react-snap
```

#### 2. package.jsonに追加
```json
{
  "scripts": {
    "build": "vite build",
    "postbuild": "react-snap"
  },
  "reactSnap": {
    "include": [
      "/",
      "/about",
      "/plan-gallery",
      "/school",
      "/access"
    ],
    "puppeteerArgs": [
      "--no-sandbox",
      "--disable-setuid-sandbox"
    ],
    "minifyHtml": {
      "collapseWhitespace": true,
      "removeComments": true
    }
  }
}
```

#### 3. ビルド実行
```bash
npm run build  # 自動的にpostbuildでreact-snapが実行される
```

---

## 📅 フェーズ3: 中長期対応（最強・1-3ヶ月）

### Next.js App Routerへの完全移行

#### メリット
- ✨ **SSG/SSR/ISRを柔軟に選択可能**
- ✨ **自動画像最適化**（Next.js Image）
- ✨ **ルーティングとメタデータが統合**
- ✨ **パフォーマンス最適化が標準装備**
- ✨ **将来的な拡張性（API Routes、Middleware等）**

#### 移行手順

##### 1. 新規Next.jsプロジェクト作成
```bash
npx create-next-app@latest amoretto-next
# App Router を選択
# TypeScript を選択
# Tailwind CSS を選択
```

##### 2. ディレクトリ構造
```
amoretto-next/
├── app/
│   ├── layout.tsx            ← 全ページ共通レイアウト
│   ├── page.tsx              ← ホームページ
│   ├── about/
│   │   └── page.tsx
│   ├── plan-gallery/
│   │   └── page.tsx
│   ├── school/
│   │   └── page.tsx
│   └── access/
│       └── page.tsx
├── components/               ← 既存コンポーネント移行
├── public/                   ← 画像・アセット
└── styles/
    └── globals.css
```

##### 3. メタデータ設定（例: app/page.tsx）
```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'amorétto | LifeCasting® Studio - 愛知・豊川の立体手形アート',
  description: '愛知・豊川のLifeCasting®専門スタジオ...',
  keywords: ['立体手形', '産後ギフト', '愛知', '豊川'],
  openGraph: {
    title: 'amorétto | LifeCasting® Studio',
    description: '愛知・豊川のLifeCasting®専門スタジオ...',
    images: ['/og-image.jpg'],
    url: 'https://lifecastingstudio-amoretto.com/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'amorétto | LifeCasting® Studio',
    description: '愛知・豊川の立体手形アート専門スタジオ',
    images: ['/og-image.jpg'],
  },
};

export default function Home() {
  return (
    <>
      {/* ページコンテンツ */}
    </>
  );
}
```

##### 4. 構造化データの統合
```typescript
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "amorétto",
              // ... 構造化データ
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

##### 5. 画像最適化
```typescript
import Image from 'next/image';

<Image
  src="/hero-image.jpg"
  alt="立体手形アート"
  width={1920}
  height={1080}
  priority
/>
```

##### 6. ビルドとデプロイ
```bash
npm run build    # 自動的にSSG実行
npm run start    # プロダクションサーバー起動

# または Vercel にデプロイ
vercel --prod
```

#### 移行チェックリスト
- [ ] 全ページコンポーネント移行
- [ ] ルーティング動作確認
- [ ] メタデータ設定
- [ ] 構造化データ実装
- [ ] 画像最適化（Next.js Image）
- [ ] フォームとAPI統合
- [ ] 404ページ作成
- [ ] sitemap.xml自動生成設定
- [ ] robots.txt設定
- [ ] パフォーマンステスト（Lighthouse）

---

## 🔍 SEO効果測定

### Google Search Consoleで確認すべき指標

1. **インデックスカバレッジ**
   - 全5ページが正常にインデックスされているか

2. **ページエクスペリエンス**
   - Core Web Vitals（LCP、FID、CLS）
   - モバイルユーザビリティ

3. **検索パフォーマンス**
   - 表示回数、クリック数、CTR、平均掲載順位
   - クエリ: 「立体手形 愛知」「産後ギフト 豊川」等

4. **リッチリザルト**
   - 構造化データが正しく認識されているか
   - リッチリザルトテストツールで確認

### 推奨ツール

- [Google Search Console](https://search.google.com/search-console)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Rich Results Test](https://search.google.com/test/rich-results)
- [Schema Markup Validator](https://validator.schema.org/)

---

## 📝 まとめ

### 現在の状態（フェーズ1完了）
✅ CSR環境下で可能な最大限のSEO対策を実施
✅ 構造化データ、メタデータ、サイトマップを完全最適化
✅ Googleクローラーは最終的にコンテンツを取得可能

### 次のステップ（推奨順）
1. **フェーズ2（1-2週間）**: vite-plugin-prerenderでHTMLプリレンダリング
2. **フェーズ3（1-3ヶ月）**: Next.js App Routerへ完全移行

### 最終目標
- 初回アクセス時に完全なHTMLコンテンツを配信
- Core Web Vitalsで高評価を獲得
- 「立体手形 愛知」「産後ギフト 豊川」で上位表示
- 月間検索流入数を測定し、継続的に改善

---

**作成日**: 2025年12月20日  
**実装者**: Figma Make AI Assistant  
**対象サイト**: amorétto (https://lifecastingstudio-amoretto.com/)
