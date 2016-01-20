(function(){var e={raffleActive:false,keyWord:"",time:0,forFollowers:false,cost:0,users:[],winner:"",raffleMaster:$.ownerName,raffleTimerId:-1,startTime:0};function r(r){var s=true;if(startTime==0){e.startTime=$.systemTime();s=false}if(!$.isDirectory("./addons/raffleSystem")){$.mkDir("./addons/raffleSystem")}$.writeToFile(r,"./addons/raffleSystem/raffle_"+$.logging.getLogDateString(startTime)+"_"+$.logging.getLogTimeString(startTime)+".txt",s)}function s(s,a,f,i,l){if(raffleActive){$.say($.whisperPrefix(l)+$.lang.get("rafflesystem.start.error.alreadyrunning"));return}$.registerChatCommand("./systems/raffleSystem.js",s,7);e.keyWord=s;if(l){e.raffleMaster=l}if(a){e.forFollowers=a}if(!isNaN(f)&&f>0){e.raffleTimerId=setTimeout(function(){t()},f*1e3)}if(!isNaN(i)&&i>0){e.cost=i}e.raffleActive=true;$.say(n(l));r("New Raffle: "+(l?"By "+l:"")+(s?", Keyword !"+s:"")+(a?", followers only":"")+(f?", Run time "+f+"seconds":"")+(i?", Cost "+i+" "+$.pointNameMultiple:""))}function t(){if(!raffleActive){$.say($.whisperPrefix(e.raffleMaster)+$.lang.get("rafflesystem.close.error.notrunning"));return}if(raffleTimerId>-1){clearTimeout(raffleTimerId);e.raffleTimerId=-1}r("Raffle ended");a();e.raffleActive=false;e.startTime=0}function a(s){e.winner=$.randElement(e.users);if(s){if(e.users.length==0){$.say($.lang.get("rafflesystem.redraw.error.noentries"));return}$.say($.lang.get("rafflesystem.redraw.success",$.username.resolve(winner)));r("Redraw winner: "+winner)}else{if(e.users.length==0){$.say($.lang.get("rafflesystem.close.success.noentries"));return}$.say($.lang.get("rafflesystem.close.success",$.username.resolve(winner)));r("Winner: "+winner)}}function f(s){if(raffleActive){if(s==$.channelName){$.say($.whisperPrefix(s)+$.lang.get("rafflesystem.enter.error.iscaster"));return}if($.list.contains(e.users,s)){$.say($.whisperPrefix(s)+$.lang.get("rafflesystem.enter.error.alreadyentered"));return}if(e.forFollowers){if(!$.user.isFollower(s)){$.say($.whisperPrefix(s)+$.lang.get("rafflesystem.enter.error.notfollows"));return}}if(e.cost>0){if(e.cost>$.getUserPoints(s)){$.say($.whisperPrefix(s)+$.lang.get("rafflesystem.enter.error.needpoints"));return}}e.users.push(s);r("Join: "+s);$.say($.whisperPrefix(s)+$.lang.get("rafflesystem.enter.success"))}else{$.say($.whisperPrefix(s)+$.lang.get("rafflesystem.enter.error.notrunning"))}}function n(r){if(e.raffleActive){return $.lang.get("rafflesystem.enter.notkeyword",e.keyWord)}else{return $.whisperPrefix(r)+$.lang.get("rafflesystem.enter.error.notrunning")}}function i(r,s,t){var a=true;if(!r||r==""){a=false}if(s&&isNaN(parseInt(s))){a=false}if(t&&isNaN(parseInt(t))){a=false}if(a){return true}$.say($.whisperPrefix(e.raffleMaster)+$.lang.get("rafflesystem.start.usage"));return false}$.bind("command",function(r){var l=r.getSender().toLowerCase(),o=r.getCommand(),g=r.getArgs(),m,u;if(o.equalsIgnoreCase("raffle")){if(g.length==0){$.say(n(l));return}m=g[0];u=(r.getArguments()+"").replace(m,"").trim();if(m){if(!$.isModv3(l,r.getTags())){$.say($.whisperPrefix(l)+$.modMsg);return}if(m.equalsIgnoreCase("start")){var y=u.indexOf("-follow")>-1,c=u.match(/-k\s([a-z]+)/i),d=u.match(/-t\s([0-9]+)/i),w=u.match(/-c\s([0-9]+)/i);c=c?c[1]:"";d=d?d[1]:"";w=w?w[1]:"";if(i(c.toString(),parseInt(d),parseInt(w))){s(c.toString(),y,parseInt(d),parseInt(w),$.username.resolve(l))}}if(m.equalsIgnoreCase("close")){t()}if(m.equalsIgnoreCase("redraw")){if(!e.raffleActive){a(true)}else{$.say($.whisperPrefix(l)+"You can't repick a winner during a raffle!")}}}}if(o.equalsIgnoreCase(c)){f(l)}});$.bind("initReady",function(){if($.bot.isModuleEnabled("./systems/raffleSystem.js")){$.registerChatCommand("./systems/raffleSystem.js","raffle",2)}})})();