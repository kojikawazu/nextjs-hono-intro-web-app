# Next.js プロジェクトのセットアップ

## プロジェクトの作成

```bash
npx create-next-app@latest frontend --typescript
```

## Honoの導入

```bash
npm i hono @hono/node-server
```

## Google Cloud関係のパッケージの導入

```bash
npm i @google-cloud/storage
```

## Prettierの導入

```bash
npm i --save-dev prettier eslint-config-prettier
```

## Redux Toolkitの導入

```bash
npm i @reduxjs/toolkit react-redux
```

## テストの導入

### パッケージのインストール

```bash
# jestテスト
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom ts-jest node-mocks-http\n
npm install -D @types/jest

# e2eテスト
npm install -D @playwright/test
npx playwright install
npx playwright install-deps
```

### 初期設定

### jestテスト

```bash
npx ts-jest config:init
touch jest.setup.ts
```

### e2eテスト

```bash
touch playwright.config.ts
mkdir -p e2e/tests
```

## その他インストール

```bash
npm i classnames axios swiper resend
```
