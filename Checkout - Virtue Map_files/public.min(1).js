"use strict";var wffnFunnel={isSetUpCached:function(){var n=(new Date).getTime()/1e3;return 10<parseInt(n-parseInt(window.wffnPublicVars.setup_time))},setUpFunnel:function(){this.init()},init:function(){var n,i,e,t;this.isSetUpCached()?(console.log("cached setup found"),n=new XMLHttpRequest,i=this,n.open("POST",window.wffnfunnelVars.ajaxUrl+"?action=wffn_maybe_setup_funnel",!0),n.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),n.onreadystatechange=function(){var n,e,t;this.readyState===XMLHttpRequest.DONE&&200===this.status&&(n=JSON.parse(this.response),Object.hasOwnProperty.call(n,"hash")&&"undefined"!=typeof Cookies&&(Cookies.set("wffn_si",n.hash,{path:"/"}),e=n.hash,t=n.current_step.id,i.HandleAnalytics(e,t,"fired"),i.maybeHandleEcommEvents()),Object.hasOwnProperty.call(n,"next_link")&&(window.wffnPublicVars.next_link=n.next_link))},e=encodeURIComponent,t=Object.keys(window.wffnfunnelEnvironment).map(function(n){return e(n)+"="+e(window.wffnfunnelEnvironment[n])}).join("&"),n.send(t)):Object.hasOwnProperty.call(window.wffnfunnelData,"hash")&&"undefined"!=typeof Cookies&&(Cookies.set("wffn_si",window.wffnfunnelData.hash,{path:"/"}),this.HandleAnalytics(window.wffnfunnelData.hash,window.wffnfunnelData.current_step.id),this.maybeHandleEcommEvents())},analyticsAlready:function(n,e){if(void 0!==Cookies.get("wffn_ay_"+n)&&""!==Cookies.get("wffn_ay_"+n)){n=JSON.parse(Cookies.get("wffn_ay_"+n));if(Array.isArray(n)&&0<=jQuery.inArray(parseInt(e),n))return!0}return!1},maybeHandleEcommEvents:function(){var n,e;"undefined"!=typeof wffnEvents&&((n=new XMLHttpRequest).open("POST",window.wffnfunnelVars.ajaxUrl+"?action=wffn_tracking_events",!0),e="",e="data="+JSON.stringify(wffnEvents),n.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),n.send(e))},getAnalyticsData:function(n){return void 0!==Cookies.get("wffn_ay_"+n)&&""!==Cookies.get("wffn_ay_"+n)?JSON.parse(Cookies.get("wffn_ay_"+n)):[]},HandleAnalytics:function(n,e){var t,i;void 0!==window.wffnPublicVars.is_preview&&"1"==window.wffnPublicVars.is_preview||"onload"===(2<arguments.length&&void 0!==arguments[2]?arguments[2]:"onload")&&""===window.wffnfunnelData.support_track||void 0!==n&&void 0!==e&&!0!==this.analyticsAlready(n,e)&&((t=new XMLHttpRequest).open("POST",window.wffnfunnelVars.ajaxUrl+"?action=wffn_frontend_analytics",!0),i="","undefined"!=typeof wffnEvents&&(i="data="+JSON.stringify(wffnEvents)),t.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),t.send(i),(i=this.getAnalyticsData(n)).push(parseInt(e)),Cookies.set("wffn_ay_"+n,JSON.stringify(i),{path:"/"}))}};window.wffnPublicVars=window.wffnfunnelData,function(n){n(window).on("load",function(){wffnFunnel.setUpFunnel()}),n(document).on("click",'a[href*="wffn-next-link=yes"]',function(n){n.preventDefault(),void 0===window.wffnPublicVars.is_preview||"1"!=window.wffnPublicVars.is_preview?""!==window.wffnPublicVars.next_link&&(window.location.href=window.wffnPublicVars.next_link):n.stopPropagation()}),n(document).ready(function(n){n=n('a[href*="wffn-next-link=yes"]');0<n.length&&void 0!==window.wffnPublicVars.next_link&&""!==window.wffnPublicVars.next_link&&(n.addClass("wffn-next-step-link"),n.attr("href",window.wffnPublicVars.next_link))}),n(document.body).on("updated_checkout",function(){void 0!==window.wffnPublicVars.current_step.id&&void 0!==window.wffnPublicVars.hash&&wffnFunnel.HandleAnalytics(window.wffnPublicVars.hash,window.wffnPublicVars.current_step.id,"fired")})}(jQuery);