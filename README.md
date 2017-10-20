# gcsResult2json

## Description

Google Custom Search API を叩き、結果をjsonで取得するだけのモック。

## DEMO

https://cinra.github.io/gcsResult2json/

## Development

- Node.js >= 6.11.0
- gulp
- npm

```sh
$ cd ./src && npm i
```

## Localhost

現状は組み込んでいないので、
npm_moduleの、`http-server` などで対応。

```
$ http-server

Starting up http-server, serving ./
Available on:
  http://127.0.0.1:8080
  http://169.254.79.241:8080
  http://192.168.99.1:8080
  http://192.168.1.85:8080
Hit CTRL-C to stop the server
```

## Googleアカウント側の設定

### API Keyの取得

[API Dashboard](https://console.cloud.google.com/projectselector/apis/api/customsearch.googleapis.com/overview)

Google Custom Search APIの管理画面が開きます。
プロジェクトが未指定の場合は選択を促されるので、プロジェクトを選択した後「Custom Search API」を有効化してください。

### 認証情報の設定

認証情報メニューに移り、「キーの制限」を「HTTP リファラー （ウェブサイト）」として、
受け入れるリファラーを設定します。

同時に、「APIキー」欄の文字列を分かりやすい場所にコピーしてください。

例

```
*.local:8080/*
```

### Custom Search Engine IDの作成

[https://www.google.com/cse/](https://www.google.com/cse/)

「検索エンジンの編集」の「Add」から、新たに作成します。
検索するサイト、言語、エンジン名を入力して、「作成」を押します。

作成後、検索エンジンの「検索エンジンID」をコピーします。

### ソース設定

https://github.com/cinra/gcsResult2json/blob/master/src/vue/views/page-top.vue#L39-L40

API_KEYに、APIキーを、
CXに、検索エンジンIDを入力。