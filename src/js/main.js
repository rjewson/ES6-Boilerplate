import $ from 'jquery';
import MobileDetect from 'mobile-detect';
global.jQuery = $;
var selectric = require("selectric");
const jsStandard = 'ECMAScript 6'
const handsUp = String.fromCodePoint(0xD83D, 0xDE4C);

$(function(){
    var md = new MobileDetect(window.navigator.userAgent);
    console.log(`Using ${jsStandard} ${handsUp},  is-mobile:${md.mobile()}`)
    if(!md.mobile()){// execute if desktop
        $('select').selectric();
    }
});
