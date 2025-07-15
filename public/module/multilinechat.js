(function () {
	addonModules.multilinechat = true;
	[...document.getElementsByClassName("c_inputtext")].map(
		(n) => 
			(n.outerHTML =
				`<textarea class="c_inputtext" style="width: 70%;resize: none;" onkeydown="if (event.key == 'Enter' && event.ctrlKey) $(event.target.parentNode).find('button').click()"></textarea>`)
	);
	if (nowchatshow == 3) document.getElementById("c_inputtext").outerHTML =
		'<textarea id="c_inputtext" style="width: 70%;resize: none;"></textarea>';
	this.KL = {};
	this.oldGDChat = ""
	this.ChatType = (type) => {
		$("#chatspace").removeClass();
		$("#chatdiv").show();
		$(".chattypediv").hide();
		if (!now_guild) oldGDChat = ""
		else if (nowchatshow == 3 && $("#c_inputtext")[0]) oldGDChat = document.getElementById("c_inputtext").value;
		if (nowchatshow == 4 && nowkobetushow) {
			this.KL[nowkobetushow] = document
				.getElementById(`kobetu${this.nowkobetushow}`)
				.getElementsByClassName("c_inputtext")[0].value;
		}
		nowkobetushow = 0;
		switch (type) {
			case -1:
				$("#chatdiv").html(
					"<div class='f5errordiv'><button onclick='KsgF5saikai()'>再接続KSG</button><p>通信環境の良い所で押してください。</p></div>"
				);
				break;
			case 1:
				$("#chatdiv").hide();
				$("#chatdiv").empty();
				$("#areachat").find(".c_pushmenu").hide();
				$("#areachat").show();
				midoku_zentai = 0;
				MidokuCountZentai();
				break;
			case 2:
				$("#chatdiv").hide();
				$("#chatdiv").empty();
				$("#partychat").find(".c_pushmenu").hide();
				$("#partychat").show();
				midoku_pt = 0;
				MidokuCountPT();
				break;
			case 3:
				if (ksgF5error > KSGERRORLIM) return ChatType(-1);
				$("#chatspace").addClass("guild");
				document.getElementById("chatdiv").innerHTML = now_guild
					? `<div id='guildchat'><div class='gname'>${now_gname}</div> <div class='c_formdiv'><textarea onkeydown='if (event.key == "Enter" && event.ctrlKey) HatugenGuild()' id='c_inputtext' style='width: 70%;resize: none;'></textarea><button class='formbtn' onclick='HatugenGuild()'>発言</button><img class='iconphoto' src='img/icon/iconphoto.png' alt='画像投稿' onclick='swtoggle(this.parentNode,1);PhotoFormClear( this.parentNode );'/><div id='c_photoform' class='sw1' style='display:none'>    <form target='siyoudesu' method='POST' action='${ksgurl}UploadGuild.php' enctype='multipart/form-data'>     <input type='hidden' name='nerai' value='${now_guild}' />     <input type='hidden' name='seskey' value='${seskey}' />     <input type='hidden' name='myid' value='${myid}' />     <input type='file' name='puri'/>     <input type='hidden' name='ftype' value='photosubmii'/>     <input type='submit' value='画像を送信'/>    </form>    <small>利用できる画像はjpg,png,gifで約64MB以内です</small></div> </div> <div id='c_chatwindow' class='c_chatwindow'>${msgs_guild
							.map(Comevert)
							.join("")}</div> </div>`
					: "<div id='guildchat'>ギルドにログインしてください。</div>";
				midoku_guild = 0;
				MidokuCountGuild();
				if (now_guild) document.getElementById("c_inputtext").value = oldGDChat;
				break;
			case 4:
				if (ksgF5error > KSGERRORLIM) return ChatType(-1);
				$("#chatspace").addClass("kobetu");
				document.getElementById(
					"chatdiv"
				).innerHTML = `<div id='kobetuitiran'><div class='kobetuul'>${kobetuSort
					.map((n) => ({ uid: n.uid, ...kL[`u${n.uid}`] }))
					.filter((n) => n.msgs?.length)
					.map(
						(n) =>
							`<div class='kobetuli' onclick='KobetuChatShow(${
								n.uid
							})'> <span class='name'>${
								n.name
							}</span> <span class='uid'>${
								n.uid
							}</span> <span class='midokusuu'>${
								n.midoku
							}</span> <p class='lastmsg'>${
								n.msgs[0].type == 7
									? `画像を${
											n.msgs[0].userid == n.uid
												? "受信"
												: "送信"
									  }しました`
									: n.msgs[0].mozi
							}</p> </div>`
					).join("")}</div></div>`;
				break;
			case 6:
				if (ksgF5error > KSGERRORLIM) return ChatType(-1);
				$("#chatspace").addClass("musi");
				document.getElementById(
					"chatdiv"
				).innerHTML = `<div id='musilist'><div class='musiul'>${musilist.map(
					(n) =>
						`<div class='musili'> <div class='name'>${n.name}</div> <small>ユーザID:</small><span class='tuid'>${n.tuid}</span> &emsp;<small>IP:</small><span class='remote'>${n.remote}</span> <button onclick='MusiKaizyo(${n.tuid},this)'>解除</button> </div>`
				).join("")}</div></div>`;
				midoku_musi = 0;
				MidokuCountMusi();
				break;
		}
		nowchatshow = type;
	};
	this.KobetuChatShow = (uid) => {
		if (uid == myid) return olert("自分と話すことはできません");
		if ($(`#kobetu${uid}`)[0]) return 0x0;
		KobetuChatCreate(uid, 1, null, 0);
		document.getElementById(
			"chatdiv"
		).innerHTML = `<div class='c_kobetudiv' id='kobetu${uid}'><b class='c_kobetuname' onclick='UserWindow(${uid})'>${
			kL[`u${uid}`].name
		}</b><span class='uid'>${uid}</span><br /><div class='c_formdiv'><textarea onkeydown='if (event.key == "Enter" && event.ctrlKey) HatugenKobetu(${uid})' class='c_inputtext' style='width: 70%;resize: none;'></textarea><button onclick='HatugenKobetu(${uid})'>発言</button><img class='iconphoto' src='img/icon/iconphoto.png' alt='画像投稿' onclick='swtoggle(this.parentNode,1);PhotoFormClear( this.parentNode );'/><div id='c_photoform' class='sw1' style='display:none'>    <form target='siyoudesu' method='POST' action='${ksgurl}UploadKobetu.php' enctype='multipart/form-data'>     <input type='hidden' name='nerai' value='${uid}' />     <input type='hidden' name='seskey' value='${seskey}' />     <input type='hidden' name='myid' value='${myid}' />     <input type='file' name='puri'/>     <input type='hidden' name='ftype' value='photosubmii'/>     <input type='submit' value='画像を送信'/>    </form>    <small>利用できる画像はjpg,png,gifで約64MB以内です</small></div><div><div id='c_chatwindow' class='c_chatwindow'>${kL[
			`u${uid}`
		].msgs
			.map(Comevert)
			.join("")}</div></div>`;
		nowkobetushow = uid;
		document
			.getElementById(`kobetu${uid}`)
			.getElementsByClassName("c_inputtext")[0].value = KL[uid] || "";
		kL[`u${uid}`].midoku = 0;
		MidokuCounterK();
		if (kL[`u${uid}`].name == null) GetKobetuNameNode(uid);
		else $(`#kobetu${uid}`).find("c_kobetuname").text(kL[`u${uid}`].name);
	};
	this.HatugenParty = async () => {
		if (myparty == 0x0)
			return myLog('パーティに入っていません。'), $("#partychat").find(".c_inputtext").focus().val('');
		let monkuArray = $('#partychat').find(".c_inputtext").val().split("\n").reverse();
		for (let i = 0; i < monkuArray.length; i++){
			let monku = monkuArray[i]
			if (monku.length == 0)
				return olert(`空のメッセージは送信できません。(※${monkuArray.length - i}行目)`);
			if (monku.length > 150)
				return olert(`150文字以下にしてください。(※${monkuArray.length - i}行目)`);
		}
		if (monkuArray.length > 10) return olert("同時送信可能数の上限は10です。")
		for (let i = 0; i < monkuArray.length; i++) {
			let monku = monkuArray[i]
			await fetch("./chat_HatugenParty.php", {
				method: "post",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: new URLSearchParams({
					marumie: SID,
					seskey,
					monku
				}),
			})
				.then((n) => n.json())
				.then((response) => {
					if (response.error == 404)
						return Error404();
					if (response.error != 1)
						return alert("サーバエラー0023");
				})
				.catch(() => {
					alert("なにかしらの不具合0023");
				});
		}
		$('#partychat').find(".c_inputtext").focus().val('')
	}
	this.HatugenGuild = async () => {
		let monkuArray = $("#guildchat").find("#c_inputtext").val().split("\n").reverse();
		for (let i = 0; i < monkuArray.length; i++){
			let monku = monkuArray[i]
			if (monku.length == 0)
				return olert(`空のメッセージは送信できません。(※${monkuArray.length - i}行目)`);
			if (monku.length > 150)
				return olert(`150文字以下にしてください。(※${monkuArray.length - i}行目)`);
		}
		if (monkuArray.length > 10) return olert("同時送信可能数の上限は10です。")
		for (let i = 0; i < monkuArray.length; i++) {
			let monku = monkuArray[i]
			await fetch(`${ksgurl}chat_HatugenGuild.php`, {
				method: "post",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: new URLSearchParams({
					'origin': $ORIGIN,
					myid,
					seskey,
					monku
				}),
			})
				.then((n) => n.json())
				.then((response) => {
					if (response.e == 404)
						return Error404();
					if (response.e != 1)
						return alert("サーバエラーK0604");
				})
				.catch(() => {
					alert("なにかしらの不具合K0604");
				});
		};
		ChatReadGuild();
		$("#c_inputtext").val('')
	}
	this.HatugenKobetu = async (target) => {
		let monkuArray = $(`#kobetu${target}`).find(".c_inputtext").val().split("\n").reverse();
		for (let i = 0; i < monkuArray.length; i++){
			let monku = monkuArray[i]
			if (monku.length == 0)
				return alert(`空のメッセージは送信できません。(※${monkuArray.length - i}行目)`);
			if (monku.length > 150)
				return alert(`150文字以下にしてください。(※${monkuArray.length - i}行目)`);
		}
		if (monkuArray.length > 10) return alert("同時送信可能数の上限は10です。")
		for (let i = 0; i < monkuArray.length; i++) {
			let monku = monkuArray[i]
			await fetch(`${ksgurl}chat_HatugenKobetu.php`, {
				method: "post",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: new URLSearchParams({
					'origin': $ORIGIN,
					myid,
					seskey,
					monku,
					target
				}),
			})
				.then((n) => n.json())
				.then((response) => {
					if (response.e == 404)
						return Error404();
					if (response.e != 1)
						return alert("サーバエラーK0604");
				})
				.catch(() => {
					alert("なにかしらの不具合K0604");
				});
		};
		ChatReadKobetu();
		$(`#kobetu${target}`).find(".c_inputtext").focus().val('')
	}
}).call();
