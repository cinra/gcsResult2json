<style lang="scss" scoped>
  p {
    margin: 0;
  }

  .l-demo {
    width: 800px;
    margin: auto;
    padding: 30px 0;

    input {
      -webkit-appearance: none;
      height: 30px;
      border: 1px solid #e8e8e8;
      font-size: 14px;
      padding: 10px;
      box-shadow: 0 0 0 1px rgba(230,230,230,.2);
      box-sizing: border-box;
      outline: none;
    }

    button {
      border: none;
      width: 60px;
      height: 30px;
      color: #fff;
      font-size: 14px;
      background: #333;
      cursor: pointer;
      outline: none;
    }
  }

  .form {
    margin-bottom: 60px;

    p {
      margin-bottom: 10px;
    }

    input {
      width: 400px;
    }
  }

  .result {
    padding: 30px;
    color: #333;
    font-size: 14px;
    line-height: 1.4;
    background: #fdfdfd;
    border-top: 1px solid #efefef;
  }

  .config {
    display: flex;
    font-size: 14px;
    margin-bottom: 30px;

    p {
      margin-bottom: 5px;
    }

    input {
      width: 300px;
    }
  }

  .config__child {
    margin-right: 20px;
  }
</style>

<template>
  <div class="l-demo">
    <h1>GCS API - DEMO</h1>
    <div class="config">
      <div class="config__child">
        <p>API キー</p>
        <input type="text" v-model="config.API_KEY">
      </div>
      <div class="config__child">
        <p>検索エンジン ID</p>
        <input type="text" v-model="config.CX">
      </div>
    </div>
    <form class="form" action="" ref="form">
      <p>検索で返り値が下部エリアとコンソールログに出力されます。</p>
      <input type="text" name="search" v-model="searchWord" placeholder="検索ワードを入力してください">
      <button @click="onSerachHandler">検索</button>
    </form>

    <div class="result" v-if="searchResult" v-html="searchResult"></div>

    <!--gcse:search></gcse:search-->
  </div>
</template>

<script>

  export default {
    name: 'page-top',
    data: () => {
      return {
        ENDPOINT: "https://www.googleapis.com/customsearch/v1",
        // API_KEY: "<Google Custom Search API Key>",
        // CX: "<Search Engine ID>",
        config: {
          'API_KEY': '',
          'CX': ''
        },
        searchResult: '',
        searchWord: '',
        wordLimit: 30,
        continuityFlg: false,
        searchCount: 0,
        reSearchLimitTime: 10000,
        reSearchLimitCount: 5,
        stateMessage: {
          0: '30文字以上の検索はできません',
          1: '短時間に連続しての検索はできません',
          2: '検索結果が取得できませんでした。APIキー、検索エンジンIDの設定をご確認ください。'
        }
      }
    },
    created: function() {
      // (function() {
      //   var cx = '017678554559610921629:426fdgxcele';
      //   var gcse = document.createElement('script');
      //   gcse.type = 'text/javascript';
      //   gcse.async = true;
      //   gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
      //   var s = document.getElementsByTagName('script')[0];
      //   s.parentNode.insertBefore(gcse, s);
      // })();
    },
    mounted: function() {
    },
    methods: {
      onSerachHandler(e) {
        e.preventDefault();

        // word limit
        if(this.searchWord.length >= this.wordLimit) {
          console.warn(this.stateMessage[0]);
          this.searchResult = this.stateMessage[0];
          return;
        }

        if(!this.continuityFlg) {
          this.continuityFlg = true;
          var limit = setTimeout(()=>{ this.continuityFlg = false; this.reSearchLimitCount = 0; }, this.reSearchLimitTime);
        }

        this.searchCount = this.searchCount + 1;
        if(this.searchCount > this.reSearchLimitCount) {
          console.warn(this.stateMessage[1]);
          this.searchResult = this.stateMessage[1];
          return;
        }

        const q = {
          key: this.config.API_KEY,
          cx: this.config.CX,
          q: this.searchWord
        };

        this.$http.get(this.ENDPOINT, { params: q }, {})
          .then(responce => {
            console.log('返り値');
            console.log(responce);

            console.log('情報');
            console.log(responce.body.searchInformation || null);

            console.log('検索結果');
            console.log(JSON.stringify(responce.body.items, null, '\t'));
            this.searchResult = JSON.stringify(responce.body.items, null, '<br>');
          }, response => {
            console.warn(this.stateMessage[2]);
            this.searchResult = this.stateMessage[2];
          })
      }
    }
  }
</script>
