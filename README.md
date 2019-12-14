# SpaMemo

> a simple memo application for smartphone.

## Description/本アプリについて
スマートフォンブラウザ向けのシンプルなメモ帳アプリケーションです。
Webブラウザ上で動作し、スマートフォン(iOS,Android)であればホーム画面へ追加することでアプリのように使うことができます。
PWAによりホーム画面へ追加後はオフライン環境でも利用可能です。
メモデータは端末内に保存されます。(IndexedDB)

## Disclaimer/免責事項
1. 本アプリを使用したことによる一切の損害について、開発者は責任を負いません。
2. 本アプリについてあらゆる利用、ソース改変、再配布を許可します。

## Build Setup/インストール手順

``` bash
# 必要なモジュールのインストール
$ npm run install
(or $ npm install )

# ローカルPC上での開発環境起動
$ npm run dev

# 本番サーバー上でのビルド&サーバー起動
$ npm run build
$ npm run start

# 静的ファイルへの書き出し
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
