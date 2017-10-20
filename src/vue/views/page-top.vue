<style lang="scss">
  .l-demo {
    width: 800px;
    margin: auto;
    padding: 30px 0;
  }

  .form {
    margin-bottom: 60px;
  }

  .result {
    border-top: 1px solid #efefef;
    padding: 30px 0;
  }
</style>

<template>
  <div class="l-demo">
    <form class="form" action="" ref="form">
      <input type="text" name="search" v-model="search_word" placeholder="検索ワード">
      <button @click="onSerachHandler">検索</button>
    </form>

    <div class="result" v-if="search_result" v-html="search_result"></div>

    <!--gcse:search></gcse:search-->
    <!--div class="test" v-html="test()"></div-->
  </div>
</template>

<script>

  export default {
    name: 'page-top',
    data: () => {
      return {
        ENDPOINT: "https://www.googleapis.com/customsearch/v1",
        API_KEY: "AIzaSyDSwEbXe24EiOdDIKltzXSTAP-sYJMMviE",
        CX: "017678554559610921629:426fdgxcele",
        search_result: "",
        search_word: ""
      }
    },
    created: function() {
      (function() {
        var cx = '017678554559610921629:426fdgxcele';
        var gcse = document.createElement('script');
        gcse.type = 'text/javascript';
        gcse.async = true;
        gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(gcse, s);
      })();
    },
    mounted: function() {
    },
    methods: {
      // test() {
      //   var test = [
      //     { 'displayLink': 'www.cinra.net', 'htmlTitle' : '『メディア芸術祭』受賞作品展を<b>速報</b>レポート アートや漫画など150点超 ...' }, { 'displayLink': 'www.cinra.net', 'htmlTitle' : '『メディア芸術祭』受賞作品展を<b>速報</b>レポート アートや漫画など150点超 ...' } ];

      //   console.log(JSON.stringify(test,null,'\t'));
      //   return JSON.stringify(test,null,'<br>');
      // },
      onSerachHandler(e) {
        e.preventDefault();

        const q = {
          key: this.API_KEY,
          cx: this.CX,
          q: this.search_word
        };

        this.$http.get(this.ENDPOINT, { params: q }, {})
          .then(responce => {

            console.log('返り値');
            console.log(responce);

            console.log('情報');
            console.log(responce.body.searchInformation || null);

            console.log('検索結果');
            console.log(JSON.stringify(responce.body.items, null, '\t'));
            this.search_result = JSON.stringify(responce.body.items, null, '<br>');
          })
      }
    }
  }
</script>
