(function () {
	const version = "5.7.0";
	const isMaintainance = false;
	if (this.addonApp) {
		if (isMaintainance) {
			document.title += `+Addon ※現在使用できません。`;
			return;
		} else {
			document.title += `+Addon ver.${version}`;
		}
	} else if (this.addonVersion !== version) {
		$("#addonwindow").show();
		let text = "";
		if (isMaintainance && !this?.isBeta) {
			return fetch("https://addon.pjeita.top/info/patch.json", {
				cache: "no-store",
			})
				.then((n) => n.json())
				.then((n) => {
					const data = n.at(-1);
					$(`#${addonWindowId} .sourcespace:eq(0)`).html(
						`現在、ver${
							data.version
						}への更新作業(メンテナンス)を行っているため、アドオンの読み込みができません。<br /><br />また、更新の情報は以下の通りです。<br />終了時間<br />${
							data.expires
						}<br /><br />内容<br /><ul><li>${data.contents.join(
							"</li><li>"
						)}</li></ul><br /><br /><small>迫真広告支援スペース(広告)</small><br />${AdBanner()}`
					);
				});
		} else {
			$(`#${addonWindowId} .sourcespace:eq(0)`).html(
				`${this?.isBeta ? "【β版】" : ""}${
					this.addonVersion ? "更新" : "起動"
				}しました。` +
					`<br /><small>迫真広告支援スペース(広告)</small><br />${AdRectangle()}<br />${AdBanner()}`
			);
			this.addonVersion = version;
		}
	} else {
		$("#addonwindow").show();
		return $(`#${addonWindowId} .sourcespace:eq(0)`).html(
			"すでに起動済です。"
		);
	}

	this.notificationSound = new Audio(
		"https://files.pjeita.top/meteor_notification.mp3"
	);
	this.notificationSound.muted = true;
	this.notificationSound.volume = 0.5;
	this.notificationSound.addEventListener("ended", () => {
		this.notificationSound.muted = false;
	});

	this.random = (a, b) => {
		let n, m;
		if (a < b) {
			(n = a), (m = b);
		} else {
			(m = a), (n = b);
		}
		return Math.floor(Math.random() * (m + 1 - n)) + n;
	};
	this.ajax = async (a, b = null) => {
		let url, data;
		if (b == null) {
			data = a;
			url = a?.url;
		} else {
			url = a;
			data = b;
		}
		return await new Promise((resolve, reject) => {
			$.ajax({
				type: data?.method ?? data?.type ?? "post",
				url,
				data: data?.body ?? data?.data ?? "",
				success: data?.success ?? (() => {}),
				error: data?.error ?? (() => {}),
			})
				.done(resolve)
				.fail(reject);
		});
	};

	$("#kariquiz").css({ top: "44px", height: "calc(100% - 44px)" });

	//SceneMyHouse
	//_0x3fdf()[1038] = "<img src='picts/scene_myroom.png' class='scenehaikeiimg' /> \t\t<div class='uegamen'>\t \t \t<div style='position:absolute;top:10%;bottom:3%;left:5%;right:5%;background-color:#FFFFFF;overflow:hidden;'>\t\t \t \t<div class='myroom_supportdiv'>\t\t \t \t\t<div style='font-size:11px'>SUPPORT CHARACTOR</div>\t\t \t \t\t<div class='supportdeletebtn' onclick='SupportPetDelete(1)'>×</div>\t\t \t \t\t<div class='supportdeletebtn' onclick='SupportPetDelete(2)'>×</div>\t\t \t \t\t<div class='supportdeletebtn' onclick='SupportPetDelete(3)'>×</div>\t\t \t \t\t<div style='clear:both'></div>\t\t \t \t\t<div id='supportpetdiv1' class='supportpetdiv'>取得中</div>\t\t \t \t\t<div id='supportpetdiv2' class='supportpetdiv'></div>\t\t \t \t\t<div id='supportpetdiv3' class='supportpetdiv'></div>\t\t \t \t\t<div style='clear:both'></div>\t\t \t \t\t<button onclick='SupportPetChange(1)' class='supportchengebtn'>変更</button>\t\t \t \t\t<button onclick='SupportPetChange(2)' class='supportchengebtn'>変更</button>\t\t \t \t\t<button onclick='SupportPetChange(3)' class='supportchengebtn'>変更</button>\t\t \t \t</div>\t\t \t \t<div style='clear:both'>[<small>友P</small> <b class='astyle' id='tomop' onclick='SupportLogMore()'>?</b>/<small>1000</small>]</div>\t \t \t\t<div id='supportscorespace'>取得中...</div>\t \t \t</div>\t \t \t<div class='scenetitle'>自分の家</div>\t \t</div> \t\t<div class='sitagamen' style='background-color:transparent'> \t\t\t<button onclick='PetStatusEntry()' class='halfbtn'>ステータス (extend)</button> \t\t\t<button onclick='ItemWindow()' class='halfbtn'>アイテムBOX</button> \t\t\t<button onclick='SceneCharactorChange()' class='halfbtn'>キャラクター変更</button> \t\t\t<button onclick='PetNameDiv()' class='halfbtn'>キャラの名前変更</button> \t\t\t<button onclick='UserWindow(";
	$("#areachat .c_formdiv:eq(0)").html(
		"<nobr>" +
			$("#areachat .c_formdiv:eq(0)").html().split(/\t+/).join(" ") +
			' <input type="checkbox" style="width:unset;" id="isshout" onchange="shoutmode(this)" /></nobr>'
	);

	document.onpaste = function (e) {
		const item = e.clipboardData.items[0];
		const formData = new FormData();
		const blob = item.getAsFile();
		if (e.target.id == "c_inputtext") {
			if (!["image/gif", "image/jpeg", "image/png"].includes(item.type)) {
				if (
					item.type.startsWith("image") ||
					item.type.startsWith("video")
				)
					olert(
						"対応していない形式です。\npng jpeg gifの3つのみ対応しています。)"
					);
				return;
			}
			if (blob.size > 64000000)
				return olert("ファイルサイズが大きすぎます。");
			if (!confirm("クリップボードの画像を送信しますか。")) return;
			formData.append("nerai", String(now_guild));
			formData.append("seskey", seskey);
			formData.append("myid", String(myid));
			formData.append(
				"puri",
				blob,
				item.name || `image.${item.type.split("/")[1]}`
			);
			formData.append("ftype", "photosubmii");
			fetch("https://ksg-network.tokyo/UploadGuild.php", {
				method: "post",
				body: formData,
			});
		} else if (e.target.className == "c_inputtext") {
			if (!["image/gif", "image/jpeg", "image/png"].includes(item.type)) {
				if (
					item.type.startsWith("image") ||
					item.type.startsWith("video")
				)
					olert(
						"対応していない形式です。\npng jpeg gifの3つのみ対応しています。"
					);
				return;
			}
			if (e.target.parentNode.parentNode.className !== "c_kobetudiv")
				return olert(
					"画像送信はギルドチャットまたは個別チャットのみ可能です。"
				);
			if (blob.size > 64000000)
				return olert("ファイルサイズが大きすぎます。");
			if (!confirm("クリップボードの画像を送信しますか。")) return;
			const target = e.target.parentNode.parentNode.id.slice(6);
			formData.append("nerai", target);
			formData.append("seskey", seskey);
			formData.append("myid", String(myid));
			formData.append(
				"puri",
				blob,
				item.name || `image.${item.type.split("/")[1]}`
			);
			formData.append("ftype", "photosubmii");
			fetch("https://ksg-network.tokyo/UploadKobetu.php", {
				method: "post",
				body: formData,
			});
		} else if (e.target.className == "kakikomi_naiyou") {
			if (!["image/gif", "image/jpeg", "image/png"].includes(item.type)) {
				if (
					item.type.startsWith("image") ||
					item.type.startsWith("video")
				)
					olert(
						"対応していない形式です。\npng jpeg gifの3つのみ対応しています。)"
					);
				return;
			}
			if (blob.size > 64000000)
				return olert("ファイルサイズが大きすぎます。");
			NewTemp(e.target.parentNode.getElementsByTagName("div")[0]);
			$(`#newtemp${ntmpcount}`).hide();
			formData.append("origin", "himaque");
			formData.append("myid", String(myid));
			formData.append("seskey", seskey);
			formData.append("ntmpid", String(ntmpcount));
			formData.append(
				"puri",
				blob,
				item.name || `image.${item.type.split("/")[1]}`
			);
			formData.append("ftype", "newsubmi");
			fetch("https://ksg-network.tokyo/UploadPhoto.php", {
				method: "post",
				body: formData,
			});
		}
	};
	this.shoutmode = function (d) {
		$("#areachat .c_inputtext:eq(0)").css({
			backgroundColor: d.checked ? "#aaff88" : "#ffffff",
		});
	};
	this.HatugenArea = async function () {
		if (addonModules.multilinechat) {
			let monkuArray = $("#areachat .c_inputtext")
				.val()
				.split("\n")
				.reverse();
			for (let i = 0; i < monkuArray.length; i++) {
				let monku = monkuArray[i];
				if (monku.length == 0)
					return olert(
						`空のメッセージは送信できません。(※${
							monkuArray.length - i
						}行目)`
					);
				if (monku.length > 140)
					return olert(
						`140文字以下にしてください。(※${
							monkuArray.length - i
						}行目)`
					);
			}
			if (monkuArray.length > 10)
				return olert("同時送信可能数の上限は10です。");
			for (let i = 0; i < monkuArray.length; i++) {
				let monku = monkuArray[i];
				await fetch("./chat_HatugenArea.php", {
					method: "post",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
					body: new URLSearchParams({
						marumie: SID,
						seskey,
						monku: $("#isshout").prop("checked")
							? `shout!${monku}`
							: monku,
					}),
				})
					.then((n) => n.json())
					.then((response) => {
						if (response.error == 404) return Error404();
						if (response.error != 1)
							return alert("サーバエラー0030");
					})
					.catch(() => {
						alert("なにかしらの不具合3285");
					});
			}
			$("#areachat .c_inputtext").focus().val("");
		} else {
			let monku = $("#areachat .c_inputtext").val();
			if (monku == "") return;
			if ($("#isshout").prop("checked")) monku = "shout!" + monku;

			if (monku.length > 150)
				return olert("送信可能上限は150文字(shout!を含む)です。");
			$("#areachat .c_inputtext").val("");
			ajax({
				type: "POST",
				url: "chat_HatugenArea.php",
				data: {
					marumie: myid,
					seskey,
					monku,
				},
				success: (res) => {
					if (res.error == 404) return Error404();
					if (res.error != 1) return alert("サーバーエラー0030");
				},
				error: () => {
					return alert("なにかしらの不具合3285");
				},
			});
		}
	};
	this.ScenePetStatus = () => {
		$(".scene").hide();
		$("#scene").html(
			"<img src='picts/scene_myroom.png' class='scenehaikeiimg' /> \t <div class='uegamen'> \t \t<div class='hanyoudiv' style='background-color:#FAFAFA;'>\t \t \t<div class='petstatus_imgdiv'>\t\t\t\t<div class='objimgbasediv'>\t\t\t\t\t<img src='' id='petstatus_buguimg' class='objectimg' />\t\t\t\t\t<img src='' id='petstatus_objimg' class='objectimg' />\t\t\t\t</div>\t\t\t</div> \t\t\t<div style='text-align:center'> \t\t\t\t<span id='petstatus_name'></span>\u3000 \t\t\t\t<small>lv</small><span id='petstatus_lv'></span> \t\t\t</div> \t\t\t<div style='margin-left:8%'>\t \t\t\tHP\u3000<span id='petstatus_hp'></span><br/> \t\t\t\t<span style='display:none'>SP\u3000<span id='petstatus_sp'></span><br/></span> \t\t\t\tPOW\u3000<span id='petstatus_pow'></span><br/> \t\t\t\tDEF\u3000<span id='petstatus_def'></span><br/> \t\t\t\tTEC\u3000<span id='petstatus_tec'></span><br/> \t\t\t</div> \t\t\t<div style='font-size:10px;color:#AAAAAA;margin:20px 10px 0px 0px;text-align:right;'>※表記がおかしい場合、装備品を変更してください</div> \t\t</div> \t </div> \t <div class='sitagamen'> \t \t\t<div style='text-align:center'> \t \t\t\tステータスを割り振ります<br /> \t \t\t\tボーナスポイント\u3000<span id='petstatus_bonuspoint'></span> \t \t\t</div> \t \t\t<div style='margin-left:15%'>\t \t\t\tPOW\u3000<span id='petstatus_userpow'></span>+<span id='petstatus_bonuspow' style='display:none'></span><input type='text' size='3' maxlength='3' value='0' id='pointinputpow' onchange='PointInputPow(this)' /><nobr><button onclick='PointAddPow(1)'>+1</button><button onclick='PointAddPow(10)'>+10</button><button onclick='PointAddPow(nokoripoint)'>MAX</button><button onclick='PointSubPow()'>R</button></nobr><br/> \t\t\t\tDEF\u3000<span id='petstatus_userdef'></span>+<span id='petstatus_bonusdef' style='display:none'></span><input type='text' size='3' maxlength='3' value='0' id='pointinputdef' onchange='PointInputDef(this)' /><nobr><button onclick='PointAddDef(1)'>+1</button><button onclick='PointAddDef(10)'>+10</button><button onclick='PointAddDef(nokoripoint)'>MAX</button><button onclick='PointSubDef()'>R</button></nobr><br/> \t\t\t\tTEC\u3000<span id='petstatus_usertec'></span>+<span id='petstatus_bonustec' style='display:none'></span><input type='text' size='3' maxlength='3' value='0' id='pointinputtec' onchange='PointInputTec(this)' /><nobr><button onclick='PointAddTec(1)'>+1</button><button onclick='PointAddTec(10)'>+10</button><button onclick='PointAddTec(nokoripoint)'>MAX</button><button onclick='PointSubTec()'>R</button></nobr><br/> \t\t\t\t<button onclick='SendUserPoint()'>保存！</button> \t\t\t\t<br><span style='color:#FF0000'>やりなおしの種 <span id='petstatus_yarinaosi'></span>個</span> \t\t\t\t<button onclick='PetStatusReset()'>ステータス再振り</button> \t\t\t</div> \t\t\t<button onclick='MyHouseEntry()' class='exitbtn'>戻る</button> \t </div>"
		);
		$("#scene").show();
	};
	this.PointAddPow = (point) => {
		if (point > nokoripoint) return alert("これ以上振ることはできません。");
		nokoripoint -= point;
		bonus_pow += point;
		$("#petstatus_bonuspow").text(bonus_pow);
		$("#petstatus_bonuspoint").text(nokoripoint);
		$("#pointinputpow").val(bonus_pow);
	};
	this.PointAddDef = (point) => {
		if (point > nokoripoint) return alert("これ以上振ることはできません。");
		nokoripoint -= point;
		bonus_def += point;
		$("#petstatus_bonusdef").text(bonus_def);
		$("#petstatus_bonuspoint").text(nokoripoint);
		$("#pointinputdef").val(bonus_def);
	};
	this.PointAddTec = (point) => {
		if (point > nokoripoint) return alert("これ以上振ることはできません。");
		nokoripoint -= point;
		bonus_tec += point;
		$("#petstatus_bonustec").text(bonus_tec);
		$("#petstatus_bonuspoint").text(nokoripoint);
		$("#pointinputtec").val(bonus_tec);
	};
	this.PointInputPow = (element) => {
		if (!Number.isSafeInteger(Number(element.value)))
			return (element.value = bonus_pow);
		const v = Number(element.value);
		if (v < 0) return (element.value = 0), PointInputPow(element);
		const dx = v - bonus_pow;
		if (dx > nokoripoint) {
			element.value = bonus_pow + nokoripoint;
			return PointInputPow(element);
		}
		bonus_pow = v;
		nokoripoint -= dx;
		$("#petstatus_bonuspow").text(bonus_pow);
		$("#petstatus_bonuspoint").text(nokoripoint);
	};
	this.PointInputDef = (element) => {
		if (!Number.isSafeInteger(Number(element.value)))
			return (element.value = bonus_def);
		const v = Number(element.value);
		if (v < 0) return (element.value = 0), PointInputDef(element);
		const dx = v - bonus_def;
		if (dx > nokoripoint) {
			element.value = bonus_def + nokoripoint;
			return PointInputDef(element);
		}
		bonus_def = v;
		nokoripoint -= dx;
		$("#petstatus_bonusdef").text(bonus_def);
		$("#petstatus_bonuspoint").text(nokoripoint);
	};
	this.PointInputTec = (element) => {
		if (!Number.isSafeInteger(Number(element.value)))
			return (element.value = bonus_tec);
		const v = Number(element.value);
		if (v < 0) return (element.value = 0), PointInputTec(element);
		const dx = v - bonus_tec;
		if (dx > nokoripoint) {
			element.value = bonus_tec + nokoripoint;
			return PointInputTec(element);
		}
		bonus_tec = v;
		nokoripoint -= dx;
		$("#petstatus_bonustec").text(bonus_tec);
		$("#petstatus_bonuspoint").text(nokoripoint);
	};
	this.PointSubPow = () => {
		nokoripoint += bonus_pow;
		bonus_pow = 0;
		$("#petstatus_bonuspow").text(bonus_pow);
		$("#petstatus_bonuspoint").text(nokoripoint);
		$("#pointinputpow").val(0);
	};
	this.PointSubDef = () => {
		nokoripoint += bonus_def;
		bonus_def = 0;
		$("#petstatus_bonusdef").text(bonus_def);
		$("#petstatus_bonuspoint").text(nokoripoint);
		$("#pointinputdef").val(0);
	};
	this.PointSubTec = () => {
		nokoripoint += bonus_tec;
		bonus_tec = 0;
		$("#petstatus_bonustec").text(bonus_tec);
		$("#petstatus_bonuspoint").text(nokoripoint);
		$("#pointinputtec").val(0);
	};
	this.WeaponKazi = (element) => {
		$("#itemwindow").remove();
		const e = $(element).closest(".weaponul");
		const itemid = Number(e.find(".data_itemid").text());
		$("#kazi_itemid").text(itemid);
		$("#kazi_name").html(e.find(".weaponul_name:first").clone());
		$("#kazi_source").text("取得中...");
		ajax({
			type: "POST",
			url: "item_KaziSelect.php",
			data: { marumie: myid, seskey, itemid },
			success: function (d) {
				if (d.error != 0x1) return alert("サーバエラ-7214"), 0;
				$("#kazi_source").html(d.source);
				const s = $(".kazidiv1:eq(0)");
				const t = s.html();
				globalThis.smith = {
					start: {
						pow: Number(t.split("+")[1].split("\u3000")[0]),
						def: Number(t.split("+")[3].split("\u3000")[0]),
						tec: Number(t.split("+")[5].split("\u3000")[0]),
					},
					default: {
						pow: Number(t.split("+")[0].split("\u3000")[1]),
						def: Number(t.split("+")[2].split("\u3000")[1]),
						tec: Number(t.split("+")[4].split("\u3000")[1]),
					},
					kaji: {
						pow: 0,
						def: 0,
						tec: 0,
						get sum() {
							return this.pow + this.def + this.tec;
						},
					},
					get kaji_amari() {
						return (
							99 -
							(this.start.pow +
								this.start.def +
								this.start.tec +
								this.kaji.pow +
								this.kaji.def +
								this.kaji.tec)
						);
					},
					m: "",
				};
				s.find("div:eq(0)").html(
					`<nobr>pow ${smith.default.pow}+${smith.start.pow} <button onclick="KaziAdd('r', 'pow')">R</button><button onclick="KaziAdd(-10, 'pow')">-10</button><button onclick="KaziAdd(-1, 'pow')">-1</button> <span class="kazi_addpow">0</span> <button onclick="KaziAdd(1, 'pow')">+1</button><button onclick="KaziAdd(10, 'pow')">+10</button><button onclick="KaziAdd('m', 'pow')">MAX</button></nobr>`
				);
				s.find("div:eq(1)").html(
					`<nobr>def ${smith.default.def}+${smith.start.def} <button onclick="KaziAdd('r', 'def')">R</button><button onclick="KaziAdd(-10, 'def')">-10</button><button onclick="KaziAdd(-1, 'def')">-1</button> <span class="kazi_adddef">0</span> <button onclick="KaziAdd(1, 'def')">+1</button><button onclick="KaziAdd(10, 'def')">+10</button><button onclick="KaziAdd('m', 'def')">MAX</button></nobr>`
				);
				s.find("div:eq(2)").html(
					`<nobr>tec ${smith.default.tec}+${smith.start.tec} <button onclick="KaziAdd('r', 'tec')">R</button><button onclick="KaziAdd(-10, 'tec')">-10</button><button onclick="KaziAdd(-1, 'tec')">-1</button> <span class="kazi_addtec">0</span> <button onclick="KaziAdd(1, 'tec')">+1</button><button onclick="KaziAdd(10, 'tec')">+10</button><button onclick="KaziAdd('m', 'tec')">MAX</button></nobr>`
				);
			},
			error: function () {
				alert("なにかしらの不具合7214");
			},
		});
	};
	this.WeaponGousei2 = async (element) => {
		e = $(element).closest(".weaponul")
		itemid = Number(e.find(".data_itemid").text())
		$("#gousei2itemid").text(itemid)
		$("#gousei2name").html(e.find(".weaponul_name:first").clone())
		myremove("#itemwindow");

		const weapon = weapondata.find(n => n.itemid == itemid);
		if (weapon.okini == 1) {
			$("#gousei2name").append(`<span class="gousei_alert1"><br />※この武具はお気に入りに指定されています <button onclick="RemoveWeaponStar(${itemid})">解除する</button></span>`)
		}
		const { nowpid, pets } = await ajax({
			type: "POST",
			url: "myhouse_CharactorList2.php",
			data: { marumie: myid, seskey },
		})
		charadata = pets.sort((a, b) => a.sort - b.sort);
		now_chara = nowpid;
		const c = charadata.filter(n => n.soubi == itemid || n.omamori1 == itemid)
		if (c.length) {
			$("#gousei2name").append(`<span class="gousei_alert2"><br />※この武具は以下のキャラで装備中です<div>${c.map(n => `${n.name} <span id='weaponremove_${n.pid}'><button onclick="RemoveWeapon(${n.pid}, ${itemid})">装備を外す</button></span></div>`).join("<br />")}</span>`)
		}
	}

	this.RemoveWeaponStar = (itemid) => {
		ajax({
			type: "POST",
			url: "item_WeaponOkini.php",
			data: { marumie: SID, seskey, itemid, okini: 0 },
			success: () => {
				weapondata.find(n => n.itemid == itemid).okini = 0;
				$("#gousei2name .gousei_alert1").html("<br />お気に入りを解除しました");
			}
		})
	}

	let waitflg_RemoveWeapon = 0
	this.RemoveWeapon = async (charaid, weaponid) => {
		if (waitflg_RemoveWeapon) return;
		waitflg_RemoveWeapon = 1;
		const c = now_chara;
		const itemtype = weapondata.find(n => n.itemid == weaponid).type;
		if (c != charaid) await ajax({
			type: "POST",
			url: "myhouse_CharactorChange.php",
			data: { marumie: myid, seskey, targetid: charaid }
		})
		await ajax({
			type: "POST",
			url: "item_WeaponKaizyo.php",
			data: { marumie: myid, seskey, itemtype }
		})
		if (c != charaid) await ajax({
			type: "POST",
			url: "myhouse_CharactorChange.php",
			data: { marumie: myid, seskey, targetid: c }
		})
		charadata.find(n => n.pid == charaid)[itemtype == 1 ? "soubi" : "omamori1"] = 0;
		waitflg_RemoveWeapon = 0;
		$("#weaponremove_" + charaid).html("装備を外しました");

		if (!charadata.filter(n => n.soubi == itemid || n.omamori1 == itemid).length) {
			$("#gousei2name .gousei_alert2").html("<br />装備中状態を解除しました");
		}
	}

	this.CharaSortWindow = () => {
		$("#charasortwindow").remove;
		$("#layerroot").append(`
			<div class="layer" id="charasortwindow">
				<style>
					#charasortwindow .sourcespace {
						overflow-y: auto;
						max-height: 500pxy
					}
					.ui-state-highlight {
						height: 20px;
						border: 1px dashed #8888ff;
						background-color: #ccddff;
					}
					.mycharasortul {
						background-color: #eeeeff;
						margin: 0;
						padding: 0;
						font-size: 18px;
					}
					.mycharasorthandle {
						cursor: move;
						width: 20px;
						text-align: center;
						margin-left: 5px;
						margin-right: 5px;
					}
				</style>
				<div class="sourcespace">
					<div style="text-align:center">
						キャラクターを並び替えます<br />
						<button onclick="CharaSortEnd()">保存する</button>
					</div>
					<div id="mycharasortul_top"></div>
					<ul id="mycharasortul">
						${charadata.map(n => 
							`<li class="mycharasortul">
								<span class="mycharasorthandle">≡</span>
								<span class="ctag t${n.tag}">${n.tag}</span>
								<img class="kaoicon" src="charactor/${n.charaid}kao.png">
								<span class="mycharactorul_name">${n.name}</span>
								<span style="font-size:10px">lv</span>
								<span class="mycharactorul_lv">${n.lv}${n.kyouka != 0 ? `☆${n.kyouka}` : ""}</span>
								<input type="hidden" class="pid" value="${n.pid}">
							</li>`).join("")
						}
					</ul>
					<div id="mycharasortul_bottom"></div>
				</div>
				<button class="layerclosebtn" onclick="myremove(this.parentNode)">×</button>
			</div>
		`)
		$("#mycharasortul").sortable({
			axis: "y",
			placeholder: "ui-state-highlight",
			handle: ".mycharasorthandle",
			opacity: 0.8,
			tolerance: "pointer",
		});
		$("#mycharasortul").disableSelection();
	}

	const sizai = {
		モンスターコイン: 0,
		下級マテリアル: 0.1,
		中級マテリアル: 0.2,
		上級マテリアル: 0.3,
		妖気マテリアル: 0.4,
		伝説マテリアル: 0.5,
		黄金マテリアル: 0.6,
		木の剣: 2,
		木の杖: 2.1,
		木の斧: 2.2,
		革の手甲: 2.3,
		土の護石: 3,
		鉄の剣: 3.1,
		鉄の杖: 3.2,
		鉄の斧: 3.3,
		鉄の手甲: 3.4,
		鋼の剣: 4,
		鋼の杖: 4.1,
		鋼の斧: 4.2,
		鋼の手甲: 4.3,
		アルミの剣: 5,
		アルミの杖: 5.1,
		アルミの斧: 5.2,
		アルミの手甲: 5.3,
		銀の剣: 6,
		銀の杖: 6.1,
		銀の斧: 6.2,
		銀の手甲: 6.3,
		金の剣: 7,
		金の杖: 7.1,
		金の斧: 7.2,
		金の手甲: 7.3,
		プラチナの剣: 8,
		プラチナの杖: 8.1,
		プラチナの斧: 8.2,
		プラチナの手甲: 8.3,
		ダイヤモンドの剣: 9,
		ダイヤモンドの杖: 9.1,
		ダイヤモンドの斧: 9.2,
		ダイヤモンドの手甲: 9.3,
		御神木の剣: 10,
		最強の剣: 10.1,
		伝説の剣: 10.2,
		伝説の杖: 10.3,
		伝説の斧: 10.4,
		伝説の手甲: 10.5,
	};
	this.LoadPorch = () => {
		if (porchupdate == ![]) return 0;
		porchupdate = ![];
		globalThis.SortType = 1;
		$("#porchbox").html("<p>取得中…</p>");
		ajax({
			type: "post",
			url: "item_LoadPorch.php",
			data: { marumie: myid, seskey, dsflg },
			success: (result) => {
				porchupdate = 1;
				if (result.error != 1) return alert("サーバーエラ-7202"), 0;
				$("#porchbox").html(
					`並び替え <button onclick='SortPorch(0)'>入手順</button> <button onclick='SortPorch(1)'>資材順</button><br /><b>カバン内アイテム数：<span id="nowitemcount"></span><br />獲得可能資材：<span id="getablesizai"></span>個</b><br />${result.source}`
				);
				$("#kabanbtn_count").text(result.porchcount);
				$("#porchbox .porchul").each((i, n) => {
					const e = $(n);
					const basedata = {
						name: e.find(".porchul_name").html(),
						id: Number(
							e
								.html()
								.split("PorchSuteru(")[1]
								.split(", this)")[0]
						),
						op: [
							...n.getElementsByClassName("porchul_optiondiv"),
						].map(
							(m) =>
								m.innerHTML.split("<small class")[0] ||
								'<span class="kuro">---</span>'
						),
					};
					e.html(
						`<span class="porchul_name itemmei">${
							basedata.name
						}</span> <span class="porchul_optionspan optionmei">${basedata.op.join(
							" "
						)}</span> <button onclick="DumpPorch(${
							basedata.id
						}, this)">×</button>`
					);
				});
				SortPorch(1);
			},
			error: () => {
				porchupdate = 1;
				alert("なにかしらの不具合7202");
			},
		});
	};
	this.DumpPorch = async (id, dom) => {
		PorchSuteru(id, dom);
		for (; wait_PorchSuteru; ) {
			await new Promise((r) => setTimeout(r, 200));
		}
		SortPorch(SortType);
	};
	this.SortPorch = (type) => {
		SortType = type;
		const array = [...$("#porchbox")[0].getElementsByClassName("porchul")];
		const array2 = array
			.map((n) => {
				return {
					name: $(n).find(".porchul_name").html(),
					id: Number(
						n.innerHTML.split("DumpPorch(")[1].split(", this)")[0]
					),
					dom: n.innerHTML,
				};
			})
			.map((n) => {
				n.sizai = n.name.startsWith("モンスターコイン")
					? 0
					: sizai[n.name];
				return n;
			});
		array2
			.sort((a, b) => a[type ? "sizai" : "id"] - b[type ? "sizai" : "id"])
			.map((n, m) => (array[m].innerHTML = n.dom));
		$("#getablesizai").html(
			array2.map((n) => Math.floor(n.sizai)).reduce((a, b) => a + b, 0)
		);
		$("#nowitemcount").html(array2.length);
	};
	const porchmenu_height = 155;
	this.ScenePorchResult = async () => {
		globalThis.PorchSortMode = 1;
		porchmax = 0;
		$(".scene").hide();
		$("#scene").html(
			`<img class='scenehaikeiimg' src='picts/heiyanokaidou.png' /><div class='porchresultdiv'>${AdBanner()}\t \t <div style='text-align:center;'>\t \t \t<div style='font-size:14px;'>お持ち帰りするアイテムを選択できます</div>\t \t \t<span id='porchresult_many'>0</span>／<span id='porchresult_max'>30</span>\t \t </div> \t\t <div id='porchresultlist' style='height:220px;overflow:scroll;'></div> \t\t <div id='porchresult_bot'></div> \t </div>`
		);
		$("#scene").show();
		for (; !porchmax; ) {
			await new Promise((r) => setTimeout(r, 50));
		}
		const array = [
			...document
				.getElementById("porchresultlist")
				.getElementsByClassName("porchul2"),
		];
		const array2 = array
			.map((n) => ({
				name: $(n)
					.find(".porchul2_name")
					.html()
					.split(/\s<small\sclass\=\"kuro\">\d+<\/small>/)
					.join(""),
				id: Number(
					n.innerHTML
						.split("PorchResultSuteru(")[1]
						.split(", this)")[0]
				),
				dom: n.innerHTML
					.split("PorchResultSuteru(")
					.join("PorchResultDump(")
					.split("PorchResultSutenai(")
					.join("PorchResultDumpCancel("),
			}))
			.map((n) => {
				n.sizai = sizai[n.name];
				return n;
			})
			.sort((a, b) => a.sizai - b.sizai);
		array2.map((n, m) => (array[m].innerHTML = n.dom));
		const addElement = document.createElement("div");
		addElement.style.textAlign = "center";
		addElement.innerHTML = `<button onclick="SortPorchResult(0)">入手順</button> <button onclick="SortPorchResult(1)">資材順</button><br />獲得可能資材：<span id="getablesizai2"></span>個`;
		$("#porchresultlist").before(addElement);
		$("#getablesizai2").html(
			array2
				.filter((n) => !suterumono.includes(n.id))
				.map((n) => Math.floor(n.sizai))
				.reduce((a, b) => a + b, 0)
		);
	};
	this.SortPorchResult = (type) => {
		PorchSortMode = type;
		const array = [
			...document
				.getElementById("porchresultlist")
				.getElementsByClassName("porchul2"),
		];
		const array2 = array
			.map((n) => ({
				name: $(n)
					.find(".porchul2_name")
					.html()
					.split(/\s<small\sclass\=\"kuro\">\d+<\/small>/)
					.join(""),
				id: Number(
					n.innerHTML.split("PorchResultDump(")[1].split(", this)")[0]
				),
				dom: n.innerHTML,
			}))
			.map((n) => {
				n.sizai = sizai[n.name];
				return n;
			})
			.sort(
				(a, b) => a[type ? "sizai" : "id"] - b[type ? "sizai" : "id"]
			);
		array2.map((n, m) => (array[m].innerHTML = n.dom));
		$("#getablesizai2").html(
			array2
				.filter((n) => !suterumono.includes(n.id))
				.map((n) => Math.floor(n.sizai))
				.reduce((a, b) => a + b, 0)
		);
	};
	this.PorchResultDump = (id, dom) => {
		PorchResultSuteru(id, dom);
		SortPorchResult(PorchSortMode);
	};
	this.PorchResultDumpCancel = (id, dom) => {
		PorchResultSutenai(id, dom);
		SortPorchResult(PorchSortMode);
	};
	this.KaziAddZero = () => ["pow", "def", "tec"].map((n) => KaziAdd("r", n));
	this.KaziAdd = (count, type) => {
		const cn = `.kazi_add${type}:eq(0)`;
		const t = "これ以上の強化は行えません";
		if (count === "m") {
			if (smith.m === type) {
				smith.kaji[type] += smith.kaji_amari;
				$(cn).text(smith.kaji[type]);
				$(".kazi_addsum").text(smith.kaji.sum);
				$(".kazi_paygold").text(smith.kaji.sum * 50000);
				$(".kazi_paysizai").text(smith.kaji.sum * 300);
			} else {
				smith.m = type;
				ajax({
					type: "POST",
					url: "item_GoldsUpdate.php",
					data: { marumie: SID, seskey: SKEY },
					success: (r) => {
						if (r.error != 1) {
							return alert("サーバエラ-5001");
						}
						now_gold = r.gold;
						now_sizai = r.sizai;
						$("#kazi_gold").text(r.gold);
						$("#kazi_sizai").text(r.sizai);
						const able1 = Math.floor(
							(now_gold - smith.kaji.sum * 50000) / 50000
						);
						const able2 = Math.floor(
							(now_sizai - smith.kaji.sum * 300) / 300
						);
						const able3 = able1 > able2 ? able2 : able1;
						const able =
							able3 > smith.kaji_amari ? smith.kaji_amari : able3;
						if (smith.kaji_amari == 0) return olert(t);
						if (able <= 0) {
							smith.kaji[type] += smith.kaji_amari;
						} else {
							smith.kaji[type] = able;
						}
						$(cn).text(smith.kaji[type]);
						$(".kazi_addsum").text(smith.kaji.sum);
						$(".kazi_paygold").text(smith.kaji.sum * 50000);
						$(".kazi_paysizai").text(smith.kaji.sum * 300);
					},
					error: (e) => {
						alert("なにかしらの不具合5001");
					},
				});
			}
			return;
		}
		smith.m = "";
		if (count === "r") {
			smith.kaji[type] = 0;
		} else if (count === -10) {
			smith.kaji[type] =
				smith.kaji[type] < 10 ? 0 : smith.kaji[type] - 10;
		} else if (count === -1) {
			smith.kaji[type] = smith.kaji[type] ? smith.kaji[type] - 1 : 0;
		} else if (count === 1) {
			if (smith.kaji_amari === 0) return olert(t);
			smith.kaji[type] += 1;
		} else if (count === 10) {
			if (smith.kaji_amari === 0) return olert(t);
			smith.kaji[type] =
				smith.kaji_amari < 10
					? smith.kaji[type] + smith.kaji_amari
					: smith.kaji[type] + 10;
		}
		$(cn).text(smith.kaji[type]);
		$(".kazi_addsum").text(smith.kaji.sum);
		$(".kazi_paygold").text(smith.kaji.sum * 50000);
		$(".kazi_paysizai").text(smith.kaji.sum * 300);
		return;
	};
	this.Ougi = (ougiid) => {
		if (ougibtnSP[ougiid] == 0) return RadioLog("未設定です");
		if (wait_Ougi) return;
		wait_Ougi = 1;
		RadioLog(`奥義発動[${Math.floor(Math.random() * 0x3e7)}]`);
		$(`#ougibtn${ougiid}`).addClass("tusinchu");
		ajax({
			type: "post",
			url: "kari_Ougi.php",
			data: { marumie: SID, seskey: SKEY, ougiid },
			success: (result) => {
				$(`#ougibtn${ougiid}`).removeClass("tusinchu");
				wait_Ougi = 0;
				if (result.error == 101) {
					if (
						cnf_ougi == 0 ||
						(cnf_ougi == 1 && [1, 2, 5, 6, 7].includes(now_field))
					)
						RadioLog("奥義予約");
					return;
				}
				if (result.error == 99) return RadioLog("SPが足りません");
				if (result.error != 1) return alert("サーバーエラ-8218");
				if (result.quizn) {
					quizid = Number(result.quizn);
					$("#kariquiz").html(result.quizsss);
					$("#kariquiz").show();
				}
				if (Number(result.porchcount) > 0)
					$("#kabanbtn_count").text(result.porchcount);
			},
			error: () => {
				wait_Ougi = 0;
				alert("なにかしらの不具合5885");
			},
		});
	};
	this.Toiawase = () => {
		$("#toiawaseform").remove();
		Layer(
			`<div style='text-align:center;padding-top:20px;'><div id='toiawasedescription' style='color:red;font-weight:bold;'>※送信前に必ず内容を確認すること</div><div id='toiawasedescription' style='color:red;font-weight:bold;'>※不具合報告をする際はアドオンを使っていない状態でも不具合が発生するか確認してください。<br />アドオンやMeteorに関するお問い合わせは<a href="https://pjeita.top/form/" target="_blank">こちら</a>から。</div><textarea style='width:80%;height:150px;' id='toiawasetext'></textarea><br /><button id='sendtoiawasebtn' onclick='SendToiawase()'>送信</button><br /></div>`,
			null,
			"toiawaseform",
			null
		);
	};
	this.SendToiawase = () => {
		const naiyou = $("#toiawasetext").val();
		if (!naiyou) return alert("内容を入力してください。");
		const formData = new FormData();
		formData.append("naiyou", naiyou);
		formData.append("spam", Math.floor(Math.random() * 9999) + 1);
		formData.append("user", myid);
		formData.append("key", seskey);
		fetch("./contact/toiawasend.php", {
			method: "post",
			body: formData,
		});
		$("#toiawasetext").readOnly = true;
		$("#sendtoiawasebtn")
			.html("ok")
			.removeAttr("onclick")
			.one("click", (e) =>
				myremove(e.target.parentNode.parentNode.parentNode)
			);
		$("#toiawasedescription").css("color", "black").html("送信完了");
	};
	this.TabMenuSettei = () => {
		$("#layer_settei").remove();
		$("#layerroot").append(
			//長すぎてVSCodeが文字列認識しないので分割(迫真)
			"<div class='layer' style='background-color:#EEEEEE;text-align:center;' id='layer_settei'> \t<button class='widebtn' onclick='Toiawase()'>お問い合わせ</button><br />\t<br />\t" +
				"<div style='text-align:center'>画面サイズ<br />\t\t<a href='javascript:void(0);' class='astyle' onclick='GamenSize(1)'>縦長</a>\u3000\t\t<a href='javascript:void(0);' class='astyle' onclick='GamenSize(2)'>横長</a>\u3000\t\t<a href='javascript:void(0);' class='astyle' onclick='GamenSize(3)'>PC</a>\t</div> \t<div style='margin-top:20px;'> \t\t奥義予約 <label><input type='radio' name='radio_cnfougi' value='0' onclick='SetteiOugiYoyaku(0)'/>有効</label> \t\t<label><input type='radio' name='radio_cnfougi' value='1' onclick='SetteiOugiYoyaku(1)'/>対戦のみ</label> \t\t<label><input type='radio' name='radio_cnfougi' value='2' onclick='SetteiOugiYoyaku(2)'/>無効</label> \t</div> \t<div style='margin-top:10px;'> \t\t行動切替 <label><input type='radio' name='radio_cnfact' value='0' onclick='SetteiActRendou(0)' />有効</label> \t\t<label><input type='radio' name='radio_cnfact' value='1' onclick='SetteiActRendou(1)' />対戦のみ</label> \t\t<label><input type='radio' name='radio_cnfact' value='2' onclick='SetteiActRendou(2)'/>無効</label> \t</div> \t<div style='margin-top:20px;'> \t\t" +
				"<label><input id='checkbox_masume' type='checkbox'  onclick='CheckboxMasume()'>座標表示</label> \t</div> \t<div id='effmodediv' style='margin-top:10px;'> \t\tエフェクト<label><input type='radio' class='effmode_radio' name='radioeffect' value='0' onclick='CheckboxEffect()' />通常</label> \t\t<label><input type='radio' class='effmode_radio' name='radioeffect' value='1' onclick='CheckboxEffect()' />簡易</label> \t\t<label><input type='radio' class='effmode_radio' name='radioeffect' value='2' onclick='CheckboxEffect()' />無し</label> \t</div>\t<div style='margin-top:10px'>\t<label><input id='checkbox_bgm' type='checkbox'  onclick='CheckboxBGM()'>BGM</label> \t<label><input id='checkbox_oto' type='checkbox'  onclick='CheckboxOTO()'>効果音</label>\t<br>\t<small>※モバイル端末ではうまく再生されないかも。</small></div> \t<div id='ecomodediv' style='margin-top:10px;'> \t\tエコモード<label><input type='radio' class='ecomode_radio' name='radioecomode' value='0' onclick='CheckboxEco()' />OFF</label> \t\t<label><input type='radio' class='ecomode_radio' name='radioecomode' value='1' onclick='CheckboxEco()' />ON</label> \t\t<label><input type='radio' class='ecomode_radio' name='radioecomode' value='2' onclick='CheckboxEco()' />最大</label> \t</div> \t<div style='margin-top:5px;'></div> \t" +
				"<button class='widebtn' onclick='AddonSetting()'>拡張アドオン設定</button><br /><div style='margin-top:10px;'></div> \t" +
				"<a href='javascript:void(0);' class='astyle' onclick='LogClear()' >ログ消去(3DS用)</a>\u3000 \t<span id='3dsmodecheck' onclick='DSKaizyo();layerclose(this);'></span> \t<br /><br /> \t<button class='layerclosebtn' onclick='myremove(this.parentNode)'>×</button> </div>"
		);
		$(`[name=radio_cnfougi]:eq(${cnf_ougi})`).prop("checked", true);
		$(`[name=radio_cnfact]:eq(${cnf_act})`).prop("checked", true);
		$(`.effmode_radio:eq(${effectflg})`).prop("checked", true);
		$(`.ecomode_radio:eq(${ecoflg})`).prop("checked", true);
		$("#checkbox_masume").prop("checked", !!masumeflg);
		$("#checkbox_bgm").prop("checked", !!bgmflg);
		$("#checkbox_oto").prop("checked", !!otoflg);
		$("#3dsmodecheck").html(
			dsflgspecial ? "3DSモード解除" : "3DSモード起動"
		);
	};
	this.AddonSetting = () => {
		let dom = '<h2 style="font-size: 1.2rem">アドオン設定</h2><br />';
		dom += addonModules.multilinechat
			? "<p>複数行チャットアドオン：読み込み済</p>"
			: "<p>複数行チャットアドオン：<button onclick=\"fetch('https://addon.pjeita.top/module/multilinechat.js', {cache: 'no-store'}).then((n) => n.text()).then((n) => {eval(n);AddonSetting()})\">読み込む</button></p>";
		dom += addonModules.chatmaxup
			? '<p>チャット表示上限数変更アドオン：読み込み済<br /><small>エリアチャット・全体チャット：<input id="chatmax_area" type="number" style="height: 20px; width: 50px; vertical-align: sub; margin-top: 10px;" onchange="ChangeMaxCount()" oninput="this.value = String(this.value).split(\'.\').join(\'\').split(\'-\').join(\'\')" /><br />PTチャット：<input id="chatmax_party" type="number" style="height: 20px; width: 50px; vertical-align: sub; margin-top: 10px;" onchange="ChangeMaxCount()" oninput="this.value = String(this.value).split(\'.\').join(\'\').split(\'-\').join(\'\')" /><br />ギルドチャット：<input id="chatmax_guild" type="number" style="height: 20px; width: 50px; vertical-align: sub; margin-top: 10px;" onchange="ChangeMaxCount()" oninput="this.value = String(this.value).split(\'.\').join(\'\').split(\'-\').join(\'\')" /><br />個別チャット：<input id="chatmax_direct" type="number" style="height: 20px; width: 50px; vertical-align: sub; margin-top: 10px;" onchange="ChangeMaxCount()" oninput="this.value = String(this.value).split(\'.\').join(\'\').split(\'-\').join(\'\')" /></small></p>'
			: "<p>チャット表示上限数変更アドオン：<button onclick=\"fetch('https://addon.pjeita.top/module/chatmaxup.js', {cache: 'no-store'}).then((n) => n.text()).then((n) => {eval(n);AddonSetting()})\">読み込む</button></p>";
		dom += addonModules.displaystatus
			? `<p>ステータス別枠表示アドオン：読み込み済</p>`
			: "<p>ステータス別枠表示アドオン：<button onclick=\"fetch('https://addon.pjeita.top/module/displaystatus.js', {cache: 'no-store'}).then((n) => n.text()).then((n) => {eval(n);AddonSetting()})\">読み込む</button></p>";
		dom += addonModules.morepresets
			? `<p>拡張プリセットアドオン：読み込み済</p>`
			: "<p>拡張プリセットアドオン：<button onclick=\"fetch('https://addon.pjeita.top/module/morepresets.js', {cache: 'no-store'}).then((n) => n.text()).then((n) => {eval(n);AddonSetting()})\">読み込む</button></p>";
		dom += addonModules.morefilter
			? `<p>拡張フィルターアドオン：読み込み済</p>`
			: "<p>拡張フィルターアドオン：<button onclick=\"fetch('https://addon.pjeita.top/module/morefilter.js', {cache: 'no-store'}).then((n) => n.text()).then((n) => {eval(n);AddonSetting()})\">読み込む</button></p>";
		dom += '<br /><button onclick="TabMenuSettei()">戻る</button>';

		$("#layer_settei").html(dom);

		if (addonModules.chatmaxup) {
			$("#chatmax_area").val(chatmax.area);
			$("#chatmax_party").val(chatmax.party);
			$("#chatmax_guild").val(chatmax.guild);
			$("#chatmax_direct").val(chatmax.direct);
		}
	};
	this.PageNation = (page, functionName, target) => {
		$a = page - 2;
		if ($a <= 1) $a = 1;
		$b = page + 3;
		if ($b <= 6) $b = 6;
		$pagenation = "<div class='pagenation'>";
		for (; $a <= $b; $a++) {
			$pagenation += `<a class='page${
				$a == page ? " now" : ""
			}' href='javascript:void(0)' onclick='${functionName}(this, ${$a}${
				target ? `, ${target}` : ""
			});'>${$a}</a>`;
		}
		$pagenation += `</div>`;
		return $pagenation;
	};
	fetch("https://addon.pjeita.top/module/menu.js", { cache: "no-store" })
		.then((n) => n.text())
		.then(eval);

	let weaponshow = true;
	let stoneshow = true;
	let rentalshow = true;

	this.ItemWindow = () => {
		weaponshow = true;
		stoneshow = true;
		rentalshow = true;
		$("#itemuistyle").text(".itemui_normal{display:block;}"), ItemLayer();
	};
	this.ItemWindowGousei = () => {
		weaponshow = true;
		stoneshow = true;
		rentalshow = false;
		$("#itemuistyle").text(".itemui_gousei{display:block;}"), ItemLayer();
	};
	this.ItemWindowEnchant = () => {
		weaponshow = true;
		stoneshow = true;
		rentalshow = false;
		$("#itemuistyle").text(".itemui_enchant{display:block;}"), ItemLayer();
	};
	this.ItemWindowOPKaizyo = () => {
		weaponshow = true;
		stoneshow = true;
		rentalshow = false;
		$("#itemuistyle").text(".itemui_opkaizyo{display:block;}"), ItemLayer();
	};
	this.ItemWindowKazi = () => {
		weaponshow = true;
		stoneshow = false;
		rentalshow = false;
		$("#itemuistyle").text(".itemui_kazi{display:block;}"), ItemLayer();
	};
	this.ItemWindowKaizou = () => {
		weaponshow = true;
		stoneshow = true;
		rentalshow = false;
		$("#itemuistyle").text(".itemui_kaizou{display:block;}"), ItemLayer();
	};
	this.ItemWindowUtinaosi = () => {
		weaponshow = true;
		stoneshow = true;
		rentalshow = false;
		$("#itemuistyle").text(".itemui_utinaosi{display:block;}"), ItemLayer();
	};

	this.filterOption = {
		rental: "all",
		range_min: 0,
		range_max: 99,
		star: "all",
		name: "all",
		op: "all",
	}
	this.ItemHtml = (page, filterOptions = this.filterOption) => {
		if (!page) page = 0;
		let nextpage = page + 1,
			dom = "";
		$("#weaponbox").html("Now loadgin");
		this.filterOption = filterOptions;
		for (let i = page * 20, j = 0; i < weapondata.length; i++, j++) {
			if (dsflg && j >= 20) break;
			const weapon = weapondata[i];
			let {
				itemid,
				item,
				type,
				tag,
				hp,
				pow,
				plus_pow,
				def,
				plus_def,
				tec,
				plus_tec,
				rental,
				slot1,
				slot2,
				slot3,
				okini,
				kaizou,
				utime,
			} = weapon;
			let typeclass = type == 1 ? "typebugu" : "typegoseki";
			const name = ItemName(item);
			if ((item_hyouzi == 1 || !stoneshow) && type != 1) continue;
			if ((item_hyouzi == 2 || !weaponshow) && type != 2) continue;
			if (item_nowtag != 0 && item_nowtag != 10 && item_nowtag != tag)
				continue;
			if (item_nowtag == 10 && tag) continue;
			hp = Number(hp) - 100;
			pow = Number(pow) - 100;
			plus_pow = Number(plus_pow);
			def = Number(def) - 100;
			plus_def = Number(plus_def);
			tec = Number(tec) - 100;
			plus_tec = Number(plus_tec);
			kaizou = Number(kaizou);
			rental = Number(rental);
			if (rental && !rentalshow) continue;
			const plussum = plus_pow + plus_def + plus_tec;
			if (filterOption) {
				if (filterOption.rental == "no" && rental) continue;
				if (filterOption.rental == "yes" && !rental) continue;
				if (
					filterOption.range_min > plussum ||
					filterOption.range_max < plussum
				)
					continue;
				if (filterOption.star == "yes" && okini == 0) continue;
				if (filterOption.star == "no" && okini == 1) continue;
				if (item_hyouzi != 2 && filterOption.name != "all" && filterOption.name != item)
					continue;
				if (filterOption.op1 != "all" && (Number(filterOption.op1) > Number(slot1) || Number(filterOption.op1) + 4 < Number(slot1) || (filterOption.op1 == "0" && slot1 != 0)))
					continue;
				if (filterOption.op2 != "all" && (Number(filterOption.op2) > Number(slot2) || Number(filterOption.op2) + 4 < Number(slot2) || (filterOption.op2 == "0" && slot2 != 0)))
					continue;
				if (filterOption.op3 != "all" && (Number(filterOption.op3) > Number(slot3) || Number(filterOption.op3) + 4 < Number(slot3) || (filterOption.op3 == "0" && slot3 != 0)))
					continue;
			}
			$option1 = OptionName(slot1);
			$option2 = OptionName(slot2);
			$option3 = OptionName(slot3);
			$powsss =
				pow + plus_pow
					? `<small>pow${
							pow < 0 ? "" : "+"
					  }</small>${pow}+${plus_pow}`
					: "";
			$defsss =
				def + plus_def
					? `<small>def${
							def < 0 ? "" : "+"
					  }</small>${def}+${plus_def}`
					: "";
			$tecsss =
				tec + plus_tec
					? `<small>tec${
							tec < 0 ? "" : "+"
					  }</small>${tec}+${plus_tec}`
					: "";
			$sssplussum = plussum ? `+${plussum}` : "";

			$okinisss = `<img src="picts/okini${okini}.png" class="weaponul_okini" onclick="WeaponOkini(${itemid}, ${
				okini ? 0 : 1
			}, this);event.stopPropagation();" />`;

			($soubisss = `<button onclick="WeaponSoubi(${itemid}, this)">装備する</button>`),
				($emark = '<b style="color:#000000">E　</b>');
			$bunkaisss = "";
			$bunkaibtnS = "";
			if (soubi_now == itemid)
				$soubisss =
					'<button onclick="WeaponKaizyo(1)">装備を外す</button>';
			else if (omamori1_now == itemid)
				$soubisss =
					'<button onclick="WeaponKaizyo(2)">装備を外す</button>';
			else {
				$emark = "";
				$bunkaisss = `<button class="itemui_bunkaibtn" onclick="WeaponBunkai(${itemid}, this);">分解</button>`;
				$bunkaibtnS = `<a href="javascript:void(0);" class="itemui_bunkaibtns" onclick="event.stopPropagation();CheckBunkai(this)">分解<span style="display:none" class="data_itemidopen">${itemid}</span></a>`;
			}
			$kmark = kaizou
				? `<span class="kaizoumark"><img src="picts/kaizou.png" style="height: 100%;width: 100%;" /><div class="kaizoumozi">${kaizou}</div></span>`
				: "";
			$rentalsss = rental
				? '<span class="rentalmark">レンタル</span> '
				: "";
			$kazisss =
				type == 1 && !rental && plussum < 99
					? '<button onclick="WeaponKazi(this)">強化する</button>'
					: `${
							plussum == 99 ? "最大強化のため、これ以上" : ""
					  }強化できません`;

			if (!dsflg) {
				let tagdom = `<select onchange="TagChange(${itemid}, this)" class="weapontag_select"><option value=0>--</option>`;
				for (let k = 1; k < item_tag.length - 1; k++) {
					tagdom += `<option value=${k}${
						k == tag ? " selected" : ""
					}>${item_tag[k].name}</option>`;
				}
				tagdom += "</select>";
				dom +=
					'<div class="weaponul ' +
					typeclass +
					`"><div class="weaponul_close" onclick="weaponulOpen(this);myclose(this.parentNode, '.itemui_bunkaidiv');myopen(this.parentNode, '.itemui_bunkaibtn');"><div class="weaponul_tagspace" onclick="event.stopPropagation();"><span class="button" onclick="WeaponUe(` +
					itemid +
					',this)">↑</span>' +
					tagdom +
					"</div>" +
					$okinisss +
					'<span class="weaponul_name itemmei">' +
					$emark +
					$rentalsss +
					$kmark +
					name +
					'<span class="weaponul_plus">' +
					$sssplussum +
					'</span> <span class="weaponul_option optionmei">' +
					$option1 +
					$option2 +
					$option3 +
					"</span></span>" +
					$bunkaibtnS +
					'</div><div class="weaponul_open" onclick="weaponulClose(this)" style="display:none"><div><span class="astyle" style="font-size:13px" onclick="ItemShousai(' +
					itemid +
					', this.parentNode);event.stopPropagation();myclose(this);">詳細</span><span class="weaponul_status">　' +
					[$powsss, $defsss, $tecsss].join(" ") +
					'</span></div><div class="itemui_normal" onclick="event.stopPropagation();">' +
					$soubisss +
					$bunkaisss +
					'</div><div class="itemui_gousei"><button onclick="WeaponGousei1(this)">合成ベースにする</button><button onclick="WeaponGousei2(this)">合成素材にする</button></div><div class="itemui_enchant"><button onclick="WeaponEnchant(this)">錬成する</button></div><div class="itemui_opkaizyo"><button onclick="WeaponOPKaizyo(this)">オプション解除</button></div><div class="itemui_kaizou"><button onclick="WeaponKaizou(this)">改造する</button></div><div class="itemui_utinaosi"><button onclick="WeaponUtinaosi(this)">打ち直し</button></div><div class="itemui_kazi">' +
					$kazisss +
					'</div></div><span style="display:none" class="data_itemid">' +
					itemid +
					"</span></div>";
			} else
				dom +=
					'<div class="weaponul ' +
					typeclass +
					'"><span class="weaponul_tagspace" onclick="event.stopPropagation();"><span class="button" onclick="WeaponUe("' +
					itemid +
					',this)">↑</span></span>' +
					$okinisss +
					'<span class="weaponul_name_ itemmei">' +
					$emark +
					$rentalsss +
					$kmark +
					name +
					'<span lass="weaponul_plus">' +
					$sssplussum +
					'</span><span class="weaponul_optionspan sptionmei">' +
					$option1 +
					$option2 +
					$option3 +
					'</span></span><div><span class="weaponul_status">' +
					$powsss +
					$defsss +
					$tecsss +
					'</span></div><div class="itemui_normal" onclick="event.stopPropagation();">' +
					$soubisss +
					$bunkaisss +
					'</div><span style="display:none" class="data_itemid">' +
					itemid +
					'</span><div class="itemui_gousei"><button onclick="WeaponGousei1(this)">合成ベースにする</button><button onclick="WeaponGousei2(this)">合成素材にする</button></div><div class="itemui_enchant"><button onclick="WeaponEnchant(this)">錬成する</button></div><div class="itemui_opkaizyo"><button onclick="WeaponOPKaizyo(this)">オプション解除</button></div><div class="itemui_kaizou"><button onclick="WeaponKaizou(this)">改造する</button></div><div class="itemui_utinaosi"><button onclick="WeaponUtinaosi(this)">打ち直し</button></div><div class="itemui_kazi">' +
					$kazisss +
					"</div></div>";
		}
		if (!dsflg)
			dom +=
				'<div class="weaponul" style="text-align:center;font-size:20px;" onclick="WeaponBunkaiAll()"><a href="javascript:void(0);" style="text-decoration:none;color:#000000;">まとめて分解する</a></div>';
		else {
			if (nextpage * 20 <= weapondata.length)
				dom +=
					'<div class="weaponul" style="text-align:center;font-size:20px;" onclick="ItemHtml(' +
					nextpage +
					')"> 次の20件</div>';
		}
		$("#weaponbox").html(dom);
		let dom2 = "";
		if (!dsflg)
			for (var i = 0; i < sozaidata.length; i++) {
				$sozai = sozaidata[i];
				$itemid = Number($sozai.item);
				$name = ItemName($itemid);
				$setumei = ItemSetumei($itemid);
				$many = Number($sozai.many);
				$price = $sozai.price;
				dom2 +=
					'<div class="sozaiul" onclick="sozaiulToggle(this)"><div class="sozaiul_name itemmei">' +
					$name +
					'　<small class="kuro">x' +
					$many +
					'</small></div><div class="sozaiul_toggle" style="display:none"><div class="sozaiul_setumei">' +
					$setumei +
					'</div><small style="margin-left:30px;">単価 </small><span class="sozaiul_price">' +
					$price +
					`</span>Gold<button class="sozaiul_sellbtn" onclick="myopen(this.parentNode, '.sozaiul_selldiv');myclose(this)">売る</button><div class="sozaiul_selldiv" style="display:none" onclick="event.stopPropagation()"><span style="font-size:8px;color:#999999;">売る個数を入力してください</span><button onclick="SozaiSetMany(this.parentNode, ` +
					$many +
					')">All</button><br /><input type="text" class="selldiv_many" size="6" /><button class="urimasu" onclick="SozaiSell(this.parentNode, ' +
					$itemid +
					", " +
					$many +
					');" style="padding:1px 4px;">決定</button><span class="urimasita" style="display:none">売りました</span></div></div></div>';
			}
		else dom2 = "3DSでは表示できません";
		$("#sozaibox").html(dom2);
	};

	//不具合対応パッチ(確実に動くもの)
	this.MidokuCountMusi = () => {
		midoku_musi = 0;
	};
	this.ExitGame = () =>
		ajax({
			type: "POST",
			url: "top_ExitGame.php",
			data: { marumie: myid, seskey },
			success: (response) => {
				if (response.error != 1) return alert("不具合0006");
			},
			error: () => {
				alert("エラー処理0006");
			},
		}).then((n) => {
			$("#loginformpass").val("");
			PageChangeLogin();
			now_field = 0;
			now_channel = 0;
			SID = 0;
			myid = 0;
			SKEY = 0;
			seskey = 0;
			myguildid = 0;
			myparty = 0;
			mypttype = 0;
			colosss = "";
			AutoLoginKaizyo();
			BgmStop();
		});

	//不具合対応パッチ
	const userCache = {};
	this.getUserIp = async (tuid) => {
		if (userCache[tuid]) return userCache[tuid];
		const { remote } = await fetch(
			"https://ksg-network.tokyo/UserKanri.php",
			{
				method: "post",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: new URLSearchParams({
					myid,
					seskey,
					tuid,
					origin: "himaque",
				}).toString(),
			}
		).then((n) => n.json());
		userCache[tuid] = remote;
		setTimeout(() => {
			delete userCache[tuid];
		}, 300000);
		return remote;
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
									.find(`table:gt(${dsflg ? 30 : 80})`)
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
									.find(`table:gt(${dsflg ? 30 : 80})`)
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
										).then((n) => {
											const notification =
												new Notification("周回終了", {
													body: `No.${SID} ${n.name}のアカウントの周回が完了しました。`,
													tag: `Meteor (HIMACHATQUEST専用ブラウザ)`,
													silent: true,
													renotify: true,
												});
											notification.addEventListener(
												"show",
												() => {
													this.notificationSound.muted = false;
													this.notificationSound.play();
												}
											);
										});
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
						$("#midoku_pt").text(midoku_pt)[
							midoku_pt ? "show" : "hide"
						];
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
	this.Core = () => {
		DosFriendListUpdate = 0;
		ajax({
			type: "POST",
			url: "Core2.php",
			data: { marumie: SID, seskey },
			success: function (response) {
				if (response.error == 404) return Error404();
				if (response.error != 1) {
					errorflg_Core++;
					if (errorflg_Core > ERRORCOUNT)
						return alert("サーバエラー:CORE02");
					return setTimeout(function () {
						Core();
					}, 1000);
				}
				now_mission = Number(response.now_mission);
				now_field = 0;
				now_channel = 0;
				now_scene = Number(response.scene);
				errorflg_Core = 0;
				vsmode = 0;
				if (!response.mylog) $("#logspace").prepend(response.mylog);
				myparty = response.myparty;
				mypttype = response.pttype;
				if (myparty != 0) MyPartyUpdate(), PartyIn();
				else PartyOut();
				$("#areaname").html(response["areaname"]), TabMenuClose();
				switch (response.scene) {
					case "9":
					case 9:
						suterumono = [];
						globalThis.PorchSortMode = 1;
						porchmax = 0;
						$(".scene").hide();
						porchmany = Number(response.many);
						porchmax = Number(response.max);
						$("#scene").html(
							`<img class='scenehaikeiimg' src='picts/heiyanokaidou.png' /><div class='porchresultdiv'>${AdBanner()}\t \t <div style='text-align:center;'>\t \t \t<div style='font-size:14px;'>お持ち帰りするアイテムを選択できます</div>\t \t \t<span id='porchresult_many'>${porchmany}</span>／<span id='porchresult_max'>${porchmax}</span>\t \t </div> \t\t <div id='porchresultlist' style='height:${porchmenu_height}px;overflow:scroll;'>${
								response.source
							}</div> \t\t <div id='porchresult_bot'>${
								response.bot
							}</div> \t </div>`
						);
						$("#scene").show();

						const array = [
							...document
								.getElementById("porchresultlist")
								.getElementsByClassName("porchul2"),
						];
						const array2 = array
							.map((n) => ({
								name: $(n)
									.find(".porchul2_name")
									.html()
									.split(
										/\s<small\sclass\=\"kuro\">\d+<\/small>/
									)
									.join(""),
								id: Number(
									n.innerHTML
										.split("PorchResultSuteru(")[1]
										.split(", this)")[0]
								),
								dom: n.innerHTML
									.split("PorchResultSuteru(")
									.join("PorchResultDump(")
									.split("PorchResultSutenai(")
									.join("PorchResultDumpCancel("),
							}))
							.map((n) => {
								n.sizai = sizai[n.name];
								return n;
							})
							.sort((a, b) => a.sizai - b.sizai);
						array2.map((n, m) => (array[m].innerHTML = n.dom));
						const addElement = document.createElement("div");
						addElement.style.textAlign = "center";
						addElement.innerHTML = `<button onclick="SortPorchResult(0)">入手順</button> <button onclick="SortPorchResult(1)">資材順</button><br />獲得可能資材：<span id="getablesizai2"></span>個`;
						$("#porchresultlist").before(addElement);
						$("#getablesizai2").html(
							array2
								.filter((n) => !suterumono.includes(n.id))
								.map((n) => Math.floor(n.sizai))
								.reduce((a, b) => a + b, 0)
						);

						break;
					case "10":
					case 10:
						porchupdate = !![];
						SetFieldImg(
							response.haikei,
							response.imgsize,
							Number(response.stage)
						);
						SceneField(0);
						now_field = Number(response.field);
						now_channel = Number(
							"channel" in response
								? response.areaname
										.split(
											"<span style='color:#AAAAAA'>ch"
										)[1]
										.split("</span>")[0]
								: 0
						);
						F5fild(now_field, now_channel);
						if (bgmflg == 1) BgmPlay(now_field == 26 ? 26 : 2);
						break;
					case "20":
					case 20:
						if ($coloreturn) SceneColosseum(), BgmPlay(1);
						else SceneTown();
						if (myparty != 0) TabMenuParty();
						myquest = Number(response.myquest);
						if (now_mission < 1) MissionLayer();
						break;
					case "30":
					case 30:
					case "103":
					case 103:
						porchupdate = !![];
						SetFieldImg(
							response.haikei,
							response.imgsize,
							Number(response.stage)
						);
						SceneField(0);
						now_field = Number(response.field);
						now_channel = Number(
							"channel" in response
								? response.areaname
										.split(
											"<span style='color:#AAAAAA'>ch"
										)[1]
										.split("</span>")[0]
								: 0
						);
						F5fild(now_field, now_channel);
						if (response.scene == 30) BgmPlay(response.bgm);
						break;
					case "31":
					case 31:
						SceneTxt(response.source);
						break;
					case "101":
					case 101:
					case "102":
					case 102:
					case "105":
					case 105:
					case "106":
					case 106:
					case "107":
					case 107:
						SetFieldImg(response.haikei, response.imgsize, 0);
						SceneField(0);
						now_field = Number(response.field);
						now_channel = Number(
							"channel" in response
								? response.areaname
										.split(
											"<span style='color:#AAAAAA'>ch"
										)[1]
										.split("</span>")[0]
								: 0
						);
						F5fild(now_field, now_channel);
						vsmode = 1;
						charasibori_job = 0;
						charasibori_lv = 200;
						charasibori_s = response.scene == 106 ? 1 : 0;
						charasibori_w = response.scene == 107 ? 1 : 0;
						LoadGvCharactor();
						if (response.scene == 105) BgmPlay(5);
						else BgmPlay(3);
						break;
					case "104":
					case 104:
						SetFieldImg(response.haikei, response.imgsize, 0);
						SceneField(0);
						now_field = Number(response.field);
						now_channel = Number(
							"channel" in response
								? response.areaname
										.split(
											"<span style='color:#AAAAAA'>ch"
										)[1]
										.split("</span>")[0]
								: 0
						);
						F5fild(now_field, now_channel);
						BgmPlay(4);
						break;
					case "201":
					case 201:
						alert("チュートリアル開始"), SceneTown();
						break;
					default:
						now_field = 0;
						now_channel = 0;
						SceneTown();
						break;
				}
				$("body").after(response.areasession);
			},
			error: function () {
				errorflg_Core++;
				if (errorflg_Core > ERRORCOUNT)
					return alert("なにかしらの不具合02");
				return setTimeout(function () {
					Core();
				}, 200);
			},
		});
	};

	this.WeaponBunkaiAll = async () =>  {
		let count = 0
		const bunkaiarray = [[]]
		$("#weaponbox")
			.find(".bunkaichecked")
			.each(function () {
				const id = Number($(this).children(".data_itemidopen").text())
				if (weapondata.find((n) => n.itemid == id)?.okini == 1) return;
				if (bunkaiarray[bunkaiarray.length - 1].length > 500) bunkaiarray.push([]);
				bunkaiarray[bunkaiarray.length - 1].push(id);
				count++;
			});
		if (!count) return alert("アイテムが選択されていません");
		if (wait_WeaponBunkai) return;
		wait_WeaponBunkai = 1
		for (let i = 0; i < bunkaiarray.length; i++) {
			await ajax({
				type: "POST",
				url: "item_WeaponBunkaiAll.php",
				data: { marumie: SID, seskey, bunkaiarray: bunkaiarray[i] },
				success: function (response) {
					wait_WeaponBunkai = 0;
					if (response.error == 99) return alert(response.log);
					if (response.error == 2) return olert(response.str);
					if (response.error != 1) return alert("サーバエラ-7011A");
					$("#logspace").prepend(response.log)
				},
				error: function (_0x2cf3d0) {
					wait_WeaponBunkai = 0;
					alert("なにかしらの不具合7011A");
				},
			});
			await new Promise(r => setTimeout(r, 1500));
		}
		LoadWeaponBox();
	}
}).call();
