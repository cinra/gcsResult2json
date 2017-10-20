import vue from 'Vue'
import vuex from 'Vuex'
import VueResource from 'vue-resource'
import * as types from './mutation-types'


/**
 * Settings
 */
vue.use(vuex);
vue.use(VueResource)

// vue.http.interceptors.push((request, next) => {
//   request.headers.set('X-WP-Nonce', window.WP_API_Settings.nonce);
//   next();
// });

/**
 * Vuex
 */
const state = {
  language: 'ja',
  head: {
    title: "<site-title>",
    meta: {
      "description": "",
      "og:description": "",
      "og:title": "",
      "og:type": "article",
      "og:image": `${ location.origin }/assets/themes/<theme-name>/img/og.png`,
      "og:site_name": "",
      "og:url": `${ location.origin }/`,
      "fb:app_id": "",
      "twitter:card": "summary_large_image",
      "twitter:image": `${ location.origin }/assets/themes/<theme-name>/img/og.png`
    }
  }
};

const getters = {
  getMeta: state => (updateMetaObj) => {
    const _defaultSet = Object.assign({}, state.head.meta);
    const _updated = Object.assign(_defaultSet, updateMetaObj);
    let _result = [];

    Object.keys(_updated).forEach((k) => {
      var _item = {};
      if(k.match(/^og:/) || k.match(/^fb:/)) {
        _item['property'] = k;
      } else {
        _item['name'] = k;
      }
      _item['content'] = _updated[k];
      _item['id'] = k.replace(':', '-');

      _result.push(_item);
    });

    return _result;
  },
  getCookie: state => (name) => {
    var result = null;

    var cookieName = name + '=';
    var allcookies = document.cookie;

    var position = allcookies.indexOf( cookieName );
    if( position != -1 ) {
        var startIndex = position + cookieName.length;

        var endIndex = allcookies.indexOf( ';', startIndex );
        if( endIndex == -1 ) {
            endIndex = allcookies.length;
        }

        result = decodeURIComponent(
            allcookies.substring( startIndex, endIndex ) );
    }
    return result;
  },
  getFormatDate: state => (date, format) => {
    const _tmp = typeof date === 'string' ? date : String(_tmp);
    const _date = new Date(_tmp);


    if (!format) format = 'YYYY-MM-DD hh:mm:ss.SSS';
    format = format.replace(/YYYY/g, _date.getFullYear());
    format = format.replace(/MMM/g, (['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][_date.getMonth()]));
    format = format.replace(/MM/g, ('0' + (_date.getMonth() + 1)).slice(-2));
    format = format.replace(/DD/g, ('0' + _date.getDate()).slice(-2));
    format = format.replace(/hh/g, ('0' + _date.getHours()).slice(-2));
    format = format.replace(/mm/g, ('0' + _date.getMinutes()).slice(-2));
    format = format.replace(/ss/g, ('0' + _date.getSeconds()).slice(-2));
    if (format.match(/S/g)) {
      var milliSeconds = ('00' + _date.getMilliseconds()).slice(-3);
      var length = format.match(/S/g).length;
      for (var i = 0; i < length; i++) format = format.replace(/S/, milliSeconds.substring(i, i + 1));
    }
    return format;
  }
};

const actions = {
};

const mutations = {
  // [types.UPDATE_SCROLL_TOP](state, num) {
  //   state.scrollTop = num;
  // }
};

export const store = new vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
