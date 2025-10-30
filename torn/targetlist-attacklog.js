// ==UserScript==
// @name         TargetList Attacklog
// @namespace    namespace
// @version      1.0.0
// @description  Add a targets button to the attacklogs
// @author       estensia
// @match        https://www.torn.com/loader.php?sid=attackLog*
// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// @grant        GM_xmlhttpRequest
// @connect      api.torn.com
// ==/UserScript==

(function() {
    'use strict';

    var targetsIcon = document.querySelector("a[href='/page.php?sid=list&type=targets'] svg");

    var topPageLinksList = document.querySelector('#top-page-links-list');

    var link = document.createElement('a');
    link.href = 'page.php?sid=list&type=targets';
    link.classList = ['view-faction t-clear h c-pointer  line-h24 right last'];

    var linkIcon = document.createElement('span');
    linkIcon.classList = ['icon-wrap svg-icon-wrap'];
    linkIcon.appendChild(targetsIcon.cloneNode(true));

    var linkText = document.createElement('span');
    linkText.appendChild(document.createTextNode("Targets"));

    link.appendChild(linkIcon);
    link.appendChild(linkText);

    topPageLinksList.appendChild(link)
})();
