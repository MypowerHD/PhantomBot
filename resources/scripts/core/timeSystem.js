!function(){function e(e){if(m){if(!$.isModv3(e.getSender().toLowerCase(),e.getTags()))return!1}else if(!$.isAdmin(e.getSender().toLowerCase()))return!1;return!0}function t(e){var t=new java.text.SimpleDateFormat(e);return t.setTimeZone(java.util.TimeZone.getTimeZone($.inidb.exists("settings","timezone")?$.inidb.get("settings","timezone"):"GMT")),t.format(new java.util.Date)}function i(e,t){var i=e.getFullYear(),s=e.getMonth()+1,r=e.getDate(),n=e.getHours(),o=e.getMinutes();return t?n+":"+o:r+"-"+s+"-"+i+" "+n+":"+o}function s(e,t){var i=Math.floor,s=e/3600,r=s%1*60;return t?i(s)+"hrs ":e>=60?(i(s)+"hrs "+i(~~r)+"min ").replace(/^0hrs/,""):i(r%1*60)+"sec"}function r(e){return $.inidb.exists("time",e)?$.inidb.get("time",e):0}function n(e){return $.getTimeString($.getUserTime(e))}var o=$.inidb.exists("timeSettings","timeLevel")?$.getIniDbBoolean("timeSettings","timeLevel"):!1,a=$.inidb.exists("timeSettings","keepTimeWhenOffline")?$.getIniDbBoolean("timeSettings","keepTimeWhenOffline"):!1,m=$.inidb.exists("timeSettings","modTimePermToggle")?$.getIniDbBoolean("timeSettings","modTimePermToggle"):!1,g=$.inidb.exists("timeSettings","timePromoteHours")?parseInt($.inidb.get("timeSettings","timePromoteHours")):50,l=6;$.bind("command",function(t){var i,s,r=t.getSender().toLowerCase(),n=$.username.resolve(r),u=t.getCommand(),d=t.getArgs(),f=d[0];if(u.equalsIgnoreCase("time"))if(e(t)&&f){if(i=d[1],s=parseInt(d[2]),f.equalsIgnoreCase("add")){if(!i||isNaN(s))return void $.say($.whisperPrefix(r)+$.lang.get("timesystem.add.usage"));if(i=i.toLowerCase(),0>s)return void $.say($.whisperPrefix(r)+$.lang.get("timesystem.add.error.negative"));$.user.isKnown(i)?($.inidb.incr("time",i,s),$.say($.whisperPrefix(r)+$.lang.get("timesystem.add.success",$.getTimeString(s),$.username.resolve(i),$.getUserTimeString(i)))):$.say($.whisperPrefix(r)+$.lang.get("common.user.404",$.username.resolve(i)))}if(f.equalsIgnoreCase("take")){if(!i||isNaN(s))return void $.say($.whisperPrefix(r)+$.lang.get("timesystem.take.usage"));if($.user.isKnown(r)&&$.say($.whisperPrefix(r)+$.lang.get("common.user.404",n)),s>$.getUserTime(r))return void $.say($.whisperPrefix(r)+$.lang.get("timesystem.take.error.toomuch",n));$.inidb.decr("time",i,s),$.say($.whisperPrefix(r)+$.lang.get("timesystem.take.success",$.getTimeString(s),$.username.resolve(i),$.getUserTimeString(r)))}if(f.equalsIgnoreCase("set")){if(!i||isNaN(s))return void $.say($.whisperPrefix(r)+$.lang.get("timesystem.settime.usage"));if(0>s)return void $.say($.whisperPrefix(r)+$.lang.get("timesystem.settime.error.negative"));$.user.isKnown(i.toLowerCase())?($.inidb.set("time",i,s),$.say($.whisperPrefix(r)+$.lang.get("timesystem.settime.success",$.username.resolve(i),$.getUserTimeString(i.toLowerCase())))):$.say($.whisperPrefix(r)+$.lang.get("common.user.404",i))}if(f.equalsIgnoreCase("promotehours")){if(isNaN(i))return void $.say($.whisperPrefix(r)+$.lang.get("timesystem.set.promotehours.usage"));if(0>i)return void $.say($.whisperPrefix(r)+$.lang.get("timesystem.set.promotehours.error.negative",$.getGroupNameById(l).toLowerCase()));$.inidb.set("settings","timePromoteHours",d[1]),g=parseInt($.inidb.get("settings","timePromoteHours")),$.say($.whisperPrefix(r)+$.lang.get("timesystem.set.promotehours.success",$.getGroupNameById(l).toLowerCase(),g))}f.equalsIgnoreCase("autolevel")&&(o=!o,$.setIniDbBoolean("timeSettings","timeLevel",o),o?$.say($.whisperPrefix(r)+$.lang.get("timesystem.autolevel.enabled",$.getGroupNameById(l).toLowerCase(),g)):$.say($.whisperPrefix(r)+$.lang.get("timesystem.autolevel.disabled",$.getGroupNameById(l).toLowerCase(),g))),(f.equalsIgnoreCase("offline")||f.equalsIgnoreCase("offlinetime"))&&(a=!a,$.setIniDbBoolean("timeSettings","keepTimeWhenOffline",a),a?$.say($.whisperPrefix(r)+$.lang.get("timesystem.offlinetime.enabled")):$.say($.whisperPrefix(r)+$.lang.get("timesystem.offlinetime.disabled"))),f.equalsIgnoreCase("modpermtoggle")&&(m=!m,$.setIniDbBoolean("timeSettings","modTimePermToggle",m),$.say($.whisperPrefix(r)+$.lang.get("timesystem.modpermtoggle.success",m?"Moderator":"Administrator"))),f.equalsIgnoreCase("help")&&$.say($.whisperPrefix(r)+$.lang.get("timesystem.help"))}else $.say($.whisperPrefix(r)+$.lang.get("timesystem.get.other",$.resolveRank(r),$.getUserTimeString(r)));if(u.equalsIgnoreCase("streamertime")&&$.say($.whisperPrefix(r)+$.lang.get("timesystem.streamertime",(new Date).toLocaleString("en-GB",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0}),$.username.resolve($.ownerName))),u.equalsIgnoreCase("timezone")){var y;if(!f)return void $.say($.whisperPrefix(r)+$.lang.get("timesystem.set.timezone.usage",$.inidb.exists("settings","timezone")?$.inidb.get("settings","timezone"):"GMT"));if(y=java.util.TimeZone.getTimeZone(f),y.getID().equals("GMT")&&!f.equals("GMT"))return void $.say($.whisperPrefix(r)+$.lang.get("timesystem.set.timezone.invalid",f));$.say($.whisperPrefix(r)+$.lang.get("timesystem.set.timezone.success",y.getID(),y.observesDaylightTime())),$.inidb.set("settings","timezone",y.getID())}}),setInterval(function(){var e;if($.bot.isModuleEnabled("./core/timeSystem.js")){if($.isOnline($.channelName)||a)for(e in $.users)$.inidb.incr("time",$.users[e][0].toLowerCase(),61);if(o)for(e in $.users){var t=$.users[e][0].toLowerCase();!$.isMod(t)&&$.inidb.exists("time",t)&&Math.floor(parseInt($.inidb.get("time",t))/3600)>=g&&parseInt($.getUserGroupId(t))>l&&($.setUserGroupById(t,l),$.say($.whisperPrefix(t)+$.lang.get("timesystem.autolevel.promoted",$.username.resolve(t),$.getGroupNameById(l).toLowerCase(),g)))}}},6e4),$.bind("initReady",function(){$.bot.isModuleEnabled("./core/timeSystem.js")&&($.registerChatCommand("./core/timeSystem.js","time"),$.registerChatCommand("./core/timeSystem.js","streamertime"),$.registerChatCommand("./core/timeSystem.js","timezone",1))}),$.dateToString=i,$.getTimeString=s,$.getUserTime=r,$.getUserTimeString=n,$.getCurLocalTimeString=t}();
