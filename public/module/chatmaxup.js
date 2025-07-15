(function () {
	addonModules.chatmaxup = true;
	$("#myrank_radio").before(
		`<div id="topchatdiv" style="display: none" onclick="this.style.display = 'none'"></div>`
	);

	this.chatmax = {
		area: 80,
		party: 80,
		guild: 80,
		direct: 80,
	};
	this.F5ChatKobetu = async (bmark, isLogin) => {
		if (!SID) return;
		ajax({
			type: "POST",
			url: "chat_F5User.php",
			data: { marumie: myid, seskey, bmark },
		})
			.then((response) => {
				(async (response) => {
					if (response.error != 1) {
						errorflg_ChatKobetu++;
						if (errorflg_ChatKobetu > ERRORCOUNT) {
							$("#areachat").html(
								"接続が途切れました。更新してください。"
							);
							$("#partychat").html(
								"接続が途切れました。更新してください。"
							);
							return;
						}
						return setTimeout(() => {
							F5ChatKobetu(bmark, 0);
						}, 1000);
					}
					errorflg_ChatKobetu = 0;
					if (bmark >= response.bmark)
						return setTimeout(function () {
							F5ChatKobetu(bmark, 0);
						}, 1000);
					for (let i = 0; i < response.coments.length; i++) {
						const comment = response.coments[i];
						let userid = "",
							ip = "";
						switch (comment.type) {
							case "c":
								userid = comment.source
									.split("UserWindow(")[1]
									.split(")")[0];
								ip = await getUserIp(userid);
								if (musilist.find((n) => n.remote == ip)) break;
								$("#areachat")
									.find(".c_chatwindow")
									.prepend(comment.source);
								$("#areachat")
									.find(".c_chatwindow")
									.find(`table:gt(${chatmax.area - 1})`)
									.remove();
								if (!isLogin) midoku_zentai++;
								break;
							case "p":
								userid = comment.source
									.split("UserWindow(")[1]
									.split(")")[0];
								ip = await getUserIp(userid);
								if (musilist.find((n) => n.remote == ip)) break;
								$("#partychat")
									.find(".c_chatwindow")
									.prepend(comment.source);
								$("#partychat")
									.find(".c_chatwindow")
									.find(`table:gt(${chatmax.party - 1})`)
									.remove();
								if (!isLogin) midoku_pt++;
								break;
							case "S":
								if (!isLogin) {
									if (
										location.href.startsWith("https") &&
										document.visibilityState == "hidden" &&
										now_field &&
										globalThis.addonApp
									) {
										this.ajax(
											"https://ksg-network.tokyo/UserKanri.php",
											{
												method: "post",
												body: {
													origin: "himaque",
													myid,
													seskey,
													tuid: myid,
												},
											}
										).then(n => {
											const notification = new Notification("周回終了", {
												body: `No.${SID} ${n.name}のアカウントの周回が完了しました。`,
												tag: `Meteor (HIMACHATQUEST専用ブラウザ)`,
												silent: true,
												renotify: true,

											});
											notification.addEventListener("show", () => {
												this.notificationSound.muted = false;
												this.notificationSound.play()
											})
										})
									}
									Core();
								}
								break;
							case "B":
								if (!isLogin) BgmPlay(Number(comment.songid));
								break;
							case "P":
								if (!isLogin) MyPartyUpdate();
								break;
							case "V":
								if (!isLogin) PvRoomUpdate();
								break;
							case "G":
								$(".ghpid" + comment.pid).css({
									left: comment.x + "%",
									top: comment.y + "%",
								});
								$(".ghpid" + comment.pid)[
									comment.muki ? "addClass" : "removeClass"
								]("muki_left");
								break;
							case "g":
								if (!isLogin) LoadMyGuildList();
								break;
							case "I":
								if (!isLogin) break;
								switch (comment.func) {
									case "0":
									case 0:
										break;
									case "1":
									case 1:
										porchupdate = !![];
										$("#kabanbtn_count").text(comment.opt1);
										break;
									case "2":
									case 2:
										LoadWeaponBox();
										break;
									case "3":
									case 3:
										LoadSozaiBox();
										break;
									case "4":
									case 4:
										$("#kabanbtn_count").text(comment.opt1);
										break;
								}
								$("#logspace").prepend(comment.mozi);
								$("#logspace")
									.find(`.syslog:gt(${dsflg ? 30 : 80})`)
									.remove();
								break;
							default:
								break;
						}
					}
					if (!isLogin && nowchatshow != 1) {
						$("#midoku_zentai").text(midoku_zentai);
						$("#midoku_zentai")[midoku_zentai ? "show" : "hide"]();
					}
					if (!isLogin && nowchatshow != 2) {
						$("#midoku_pt").text(midoku_pt);
						$("#midoku_pt")[midoku_pt ? "show" : "hide"]();
					}
					setTimeout(() => {
						F5ChatKobetu(response.bmark, 0);
					}, 300);
				})(response);
			})
			.catch(() => {
				errorflg_ChatKobetu++;
				if (errorflg_ChatKobetu > ERRORCOUNT) {
					$("#areachat").html(
						"接続が途切れました。更新してください。"
					);
					$("#partychat").html(
						"接続が途切れました。更新してください。"
					);
					return;
				}
				return setTimeout(() => {
					F5ChatKobetu(bmark, 0);
				}, 1000);
			});
	};
	this.ChatReadGuild = () => {
		ajax({
			type: "post",
			url: ksgurl + "chat_ReadGuild.php",
			data: {
				origin: $ORIGIN,
				myid,
				seskey,
				bmark: bmark_guild,
			},
			success: (response) => {
				if (response.e == 404) return Error404();
				if (response.e == 3) return;
				if (response.e != 1) return alert("サーバエラーK020");
				if (now_guild != response.gid) return;
				const oldbmark = bmark_guild;
				if (bmark_guild < response.bmark)
					bmark_guild = Number(response.bmark);
				else return;
				for (var i = response.msgs.length - 1; i >= 0; i--) {
					var msg = response.msgs[i];
					if ($("#guildchat")[0])
						$("#guildchat")
							.find("#c_chatwindow")
							.prepend(Comevert(msg));
					else {
						if (oldbmark != -1) midoku_guild++;
					}
					if (oldbmark != -1) TopChatBar(msg, 3);
				}
				msgs_guild = response.msgs.concat(msgs_guild);
				$("#guildchat")
					.find(`#c_chatwindow table:gt(${chatmax.guild - 1})`)
					.remove();
				if (msgs_guild.length > chatmax.guild)
					msgs_guild.length = chatmax.guild;
				MidokuCountGuild();
			},
			error: () => {
				alert("なにかしらの不具合K020");
			},
		});
	};
	this.ChatReadKobetu = () => {
		ajax({
			type: "post",
			url: ksgurl + "chat_ReadKobetu.php",
			data: {
				origin: $ORIGIN,
				myid,
				seskey,
				bmark: bmark_kobetu,
			},
			success: (response) => {
				if (response.e == 404) return Error404();
				if (response.e != 1) return alert("サーバエラーct081");
				const oldbmark = bmark_kobetu;
				if (bmark_kobetu < response.bmark)
					bmark_kobetu = Number(response.bmark);
				else return 0;
				for (var i = response.msgs.length - 1; i >= 0; i--) {
					var msg = response.msgs[i];
					let uid = msg.userid;
					if (msg.userid == myid) uid = msg.targetid;
					if (!kL["u" + uid]) KobetuChatCreate(uid, 0, null, 0);
					for (var j = 0; j < kobetuSort.length; j++)
						if (
							kobetuSort[j].uid == uid &&
							kobetuSort[j].zyunban < msg.msgid
						)
							kobetuSort[j].zyunban = msg.msgid;
					kL[`u${uid}`].msgs.unshift(msg);
					$(`#kobetu${uid}`)[0]
						? $(`#kobetu${uid}`)
								.find("#c_chatwindow")
								.prepend(Comevert(msg))
						: kL[`u${uid}`].midoku++;
					if (oldbmark != -1) TopChatBar(msg, 4);
				}
				$(`#c_chatwindow table:gt(${chatmax.direct - 1})`).remove();
				for (var id in kL)
					if (kL[id].msgs.length > chatmax.direct)
						kL[id].msgs.length = chatmax.direct;
				MidokuCounterK();
				KobetuSort();
			},
			error: () => {
				alert("なにかしらの不具合ct081");
			},
		});
	};
	this.ChangeMaxCount = () => {
		chatmax = {
			area: Number($("#chatmax_area").val()),
			party: Number($("#chatmax_party").val()),
			guild: Number($("#chatmax_guild").val()),
			direct: Number($("#chatmax_direct").val()),
		};
		$("#areachat")
			.find(".c_chatwindow")
			.find(`table:gt(${chatmax.area - 1})`)
			.remove();
		$("#partychat")
			.find(".c_chatwindow")
			.find(`table:gt(${chatmax.party - 1})`)
			.remove();
		$("#guildchat")
			.find(`#c_chatwindow table:gt(${chatmax.guild - 1})`)
			.remove();
		if (msgs_guild.length > chatmax.guild)
			msgs_guild.length = chatmax.guild;
		$(`#c_chatwindow table:gt(${chatmax.direct - 1})`).remove();
		for (var id in kL)
			if (kL[id].msgs.length > chatmax.direct)
				kL[id].msgs.length = chatmax.direct;
	};
})();
