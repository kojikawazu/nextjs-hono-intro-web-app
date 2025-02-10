# 自己紹介用のWebアプリケーション(リニューアル)

## Summary

- 私の自己紹介サイトをリニューアルしました。

- 以下が解消されました。
    - Compute Engine → Cloud Runによりコスト削減
    - Let’s Encrypt → Cloudflareによりセキュリティ強化
    - CloudFunctions →　Honoによりバックエンド非公開の解消
    - Mailjet →　Resendによりメール送信方法の統一化

## Site

以下URLで公開しています。

[該当サイト](https://introtechkk.com/)

## Tech Stack

[![Next.js](https://img.shields.io/badge/-Next.js-000000?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Hono](https://img.shields.io/badge/-Hono-000000?style=flat-square&logo=hono)](https://hono.dev/)
[![Prettier](https://img.shields.io/badge/-Prettier-F7B93E?style=flat-square&logo=prettier&logoColor=white)](https://prettier.io/)
[![Resend](https://img.shields.io/badge/-Resend-FF6B6B?style=flat-square&logo=resend&logoColor=white)](https://resend.com/)
[![Cloudflare](https://img.shields.io/badge/-Cloudflare-F38020?style=flat-square&logo=cloudflare&logoColor=white)](https://www.cloudflare.com/)
[![Google Cloud Run](https://img.shields.io/badge/-Google%20Cloud%20Run-4285F4?style=flat-square&logo=google-cloud&logoColor=white)](https://cloud.google.com/run)
[![Google Cloud Storage](https://img.shields.io/badge/-Google%20Cloud%20Storage-4285F4?style=flat-square&logo=google-cloud&logoColor=white)](https://cloud.google.com/storage)
[![Google Cloud Artifact Registry](https://img.shields.io/badge/-Google%20Cloud%20Artifact%20Registry-4285F4?style=flat-square&logo=google-cloud&logoColor=white)](https://cloud.google.com/artifact-registry)
[![Docker](https://img.shields.io/badge/-Docker-2496ED?style=flat-square&logo=docker&logoColor=white)](https://www.docker.com/)
[![Terraform](https://img.shields.io/badge/-Terraform-000000?style=flat-square&logo=terraform&logoColor=white)](https://www.terraform.io/)
[![GitHub Actions](https://img.shields.io/badge/-GitHub%20Actions-2088FF?style=flat-square&logo=github-actions&logoColor=white)](https://github.com/features/actions)
[![Figma](https://img.shields.io/badge/-Figma-F24E1E?style=flat-square&logo=figma&logoColor=white)](https://www.figma.com/)

## Architecture

![Architecture](./architecture/architecture.drawio.png)

## Environment

環境変数は以下ファイルを参照してください。

[Environment](./manuals/environments.md)

## Archived

アーカイブ用リポジトリは以下になります。
※非公開分は未記載。

[Web側リポジトリ](https://github.com/kojikawazu/archived-next-ts-intro-web-app)
