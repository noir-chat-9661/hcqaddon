(async () => {
	$("#scene .sitagamen .fulldiv.sw1 .halfbtn:eq(6)").text("ツール・遊び方");
	$("#scene_field .sitagamen .fulldiv.sw1 .halfbtn:eq(7)").text("ツール・遊び方");
	this.SceneTown = () => {
		$(".scene").hide();
		BgmPlay(0x1);
		$("#scene").html(`<div class="uegamen"> <img id="townimg" src="picts/town.png" class="backimgue"/> <div class="scenetitle">初まりの街</div> <div class="mapbtn" onclick="DouzyouEntry()" style="top:40%;left:60%;width:20%;height:20%;">道場</div> <div class="mapbtn" onclick="ShokuanEntry()" style="top:25%;left:80%;width:20%;height:35%;">職業案内所</div> <div class="mapbtn" onclick="MyHouseEntry()" style="top:60%;left:5%;width:18%;height:30%;">自分の家</div> <div class="mapbtn" onclick="SceneYakusho()" style="top:53%;left:24%;width:15%;height:30%;">お役所</div> <div class="mapbtn" onclick="SceneColosseum()" style="top:23%;left:33%;width:30%;height:25%;">コロシアム</div> <div class="mapbtn" onclick="TabMenuQuest()" style="top:55%;left:43%;width:10%;height:10%;">クエスト</div> <div class="mapbtn" onclick="SceneKoubou()" style="top:22%;left:5%;width:20%;height:28%;">武具工房</div> <div class="mapbtn" onclick="SceneMap()" style="top:85%;left:35%;width:25%;height:15%;">冒険する</div> <div class="mapbtn" onclick="GDWindow()" style="top:68%;left:67%;width:15%;height:20%;">ダンジョン</div> <div class="mapbtn" onclick="PremiumShop()" style="top:65%;left:87%;width:10%;height:20%;">プレミアム</div>  </div>  <div class="sitagamen">  <div class="fulldiv sw1">  暫定メニュー<br/> <button onclick="TabMenuParty()" class="halfbtn">パーティ</button> <button onclick="MissionLayer()" class="halfbtn">ミッション</button> <button onclick="TabMenuGuild()" class="halfbtn">ギルド</button> <button onclick="ItemWindow()" class="halfbtn">アイテム</button> <button onclick="TabMenuFriend()" class="halfbtn">フレンド</button> <button onclick="TabMenuSettei()" class="halfbtn">設定・その他</button> <button onclick="AsobikataLayer()" class="halfbtn">ツール・遊び方</button> <button onclick="myclose(this.parentNode.parentNode,'.fulldiv');myopen(this.parentNode.parentNode,'.sw2');" class="halfbtn">ゲーム終了</button> </div> <div class="fulldiv sw2" style="display:none"> ゲームを終了してログイン画面に戻ります<br /> <span class="astyle" onclick="ExitGame();myclose(this.parentNode);myopen(this.parentNode.parentNode,'.sw1');">はい</span> \u3000/\u3000<span class="astyle" onclick="myclose(this.parentNode);myopen(this.parentNode.parentNode,'.sw1');">いいえ</span> </div> </div>`)
		$("#scene").show();
	}
	this.AsobikataLayer = () => {
		if ($("#layer_helplist")[0]) return;
		$("#layerroot").append(
			`<div class="layer" id="layer_helplist" style="background-color:#eef0ff"><div style="text-align:center"><span style="background-color: #eef0ff; padding: 3px;" onclick="changeHelp(0)">補助ツール</span> <span style="background-color: #eefff0; padding: 3px;" onclick="changeHelp(1)">冒険の手引</span></div><div id="menu_tools"><div class="helpul" onclick="Tools(0)">キャラレベル計算機</div><div class="helpul" onclick="Tools(1)">装備レベル計算機(未作成)</div><div class="helpul" onclick="Tools(2)">迫真広告スロット</div></div><div id="menu_help" style="display:none;"><div class="helpul" onclick="Asobikata(1)">1.ステータスの振り方</div> \t\t<div class="helpul" onclick="Asobikata(2)">2.レベルを上げよう[クエスト編]</div> \t\t<div class="helpul" onclick="Asobikata(3)">3.レベルを上げよう[放置編]</div> \t\t<div class="helpul" onclick="Asobikata(4)">4.技を習得する</div> \t\t<div class="helpul" onclick="Asobikata(5)">5.奥義を作成する</div> \t\t<div class="helpul" onclick="Asobikata(6)">6.転職する</div> \t\t<div class="helpul" onclick="Asobikata(7)">7.ギルドに加入する</div> \t\t<div class="helpul" onclick="Asobikata(8)">8.パーティを作ってみる</div> \t\t<div class="helpul" onclick="Asobikata(9)">9.フレンド登録</div> \t\t<div class="helpul" onclick="Asobikata(20)">秘伝の技</div><div class="helpul" onclick="Asobikata(21)">サポートキャラクター設定</div><div class="helpul" onclick="Asobikata(22)">対戦モード</div></div><button class="layerclosebtn" onclick="myremove(this.parentNode)">×</button> </div>`
		);
		FitScrollTop();
	};
	this.changeHelp = (type) => {
		if (type == 0) {
			$("#layer_helplist").css("backgroundColor", "#eef0ff");
			$("#menu_tools").show();
			$("#menu_help").hide();
		} else if (type == 1) {
			$("#layer_helplist").css("backgroundColor", "#eefff0");
			$("#menu_tools").hide();
			$("#menu_help").show();
		}
	};
	const wazadata = await fetch(
		"https://pjeita.top/hcq/chara_calc/data/wazadata.json"
	).then((n) => n.json());
	const wazapoints = [
		[0, 1, 3, 6, 10, 15],
		[0, 2, 6, 12, 20, 30],
		[0, 3, 9, 18, 30, 45],
	];
	const defaultwaza = [2, 10, 18, 25, 29, 43, 46];
	const hidenlist = [
		[
			{ name: "未設定" },
			{ name: "武神" },
			{ name: "勇者の証" },
			{ name: "剛腕ハンター", addstatus: [{ type: "as", value: 5 }] },
		],
		[
			{ name: "未設定" },
			{ name: "魔力強化" },
			{ name: "チアリーダー" },
			{ name: "マジックバリア" },
		],
		[
			{ name: "未設定" },
			{ name: "開祖" },
			{ name: "大僧正" },
			{ name: "怒りの鉄拳" },
			{ name: "異端" },
		],
		[
			{ name: "未設定" },
			{ name: "忍び足", addstatus: [{ type: "ms", value: 3 }] },
			{ name: "縮地" },
			{ name: "常備薬" },
		],
		[
			{ name: "未設定" },
			{ name: "ドーピング" },
			{ name: "勝利の女神" },
			{ name: "スーパーナース" },
		],
		[
			{ name: "未設定" },
			{ name: "百戦錬磨", addstatus: [{ type: "as", value: 3 }] },
			{ name: "軍人" },
			{ name: "ペネトレイト" },
		],
		[
			{ name: "未設定" },
			{ name: "高等召喚士", addstatus: [{ type: "sp", value: 400 }] },
			{ name: "安全祈願" },
			{ name: "一匹狼" },
		],
	];
	const bugudata = [
		{
			name: "木の剣",
			place: 0,
			pow: 30,
			def: 0,
			tec: 0,
			makeable: 0,
			special: 1,
		},
		{
			name: "木の斧",
			place: 1,
			pow: 40,
			def: 0,
			tec: -20,
			makeable: 0,
			special: 1,
		},
		{
			name: "革の手甲",
			place: 2,
			pow: 0,
			def: 30,
			tec: 0,
			makeable: 0,
			special: 1,
		},
		{
			name: "木の杖",
			place: 3,
			pow: 0,
			def: 0,
			tec: 30,
			makeable: 0,
			special: 1,
		},
		{
			name: "鉄の剣",
			place: 4,
			pow: 33,
			def: 2,
			tec: 0,
			makeable: 0,
			special: 0,
		},
		{
			name: "鉄の斧",
			place: 5,
			pow: 44,
			def: 0,
			tec: -25,
			makeable: 0,
			special: 0,
		},
		{
			name: "鉄の手甲",
			place: 6,
			pow: 0,
			def: 33,
			tec: 2,
			makeable: 0,
			special: 0,
		},
		{
			name: "鉄の杖",
			place: 7,
			pow: 2,
			def: 0,
			tec: 33,
			makeable: 0,
			special: 0,
		},
		{
			name: "鋼の剣",
			place: 8,
			pow: 36,
			def: 4,
			tec: 0,
			makeable: 0,
			special: 0,
		},
		{
			name: "鋼の斧",
			place: 9,
			pow: 46,
			def: 0,
			tec: -25,
			makeable: 0,
			special: 0,
		},
		{
			name: "鋼の手甲",
			place: 10,
			pow: 0,
			def: 36,
			tec: 4,
			makeable: 0,
			special: 0,
		},
		{
			name: "鋼の杖",
			place: 11,
			pow: 4,
			def: 0,
			tec: 36,
			makeable: 0,
			special: 0,
		},
		{
			name: "アルミの剣",
			place: 12,
			pow: 39,
			def: 6,
			tec: 0,
			makeable: 0,
			special: 1,
		},
		{
			name: "アルミの斧",
			place: 13,
			pow: 48,
			def: 0,
			tec: -25,
			makeable: 0,
			special: 1,
		},
		{
			name: "アルミの手甲",
			place: 14,
			pow: 0,
			def: 39,
			tec: 6,
			makeable: 0,
			special: 1,
		},
		{
			name: "アルミの杖",
			place: 15,
			pow: 6,
			def: 0,
			tec: 39,
			makeable: 0,
			special: 1,
		},
		{
			name: "銀の剣",
			place: 16,
			pow: 42,
			def: 8,
			tec: 6,
			makeable: 0,
			special: 0,
		},
		{
			name: "銀の斧",
			place: 17,
			pow: 50,
			def: 0,
			tec: -25,
			makeable: 0,
			special: 0,
		},
		{
			name: "銀の手甲",
			place: 18,
			pow: 0,
			def: 42,
			tec: 8,
			makeable: 0,
			special: 0,
		},
		{
			name: "銀の杖",
			place: 19,
			pow: 8,
			def: 0,
			tec: 42,
			makeable: 0,
			special: 0,
		},
		{
			name: "金の剣",
			place: 20,
			pow: 45,
			def: 10,
			tec: 0,
			makeable: 0,
			special: 0,
		},
		{
			name: "金の斧",
			place: 21,
			pow: 52,
			def: 0,
			tec: -20,
			makeable: 0,
			special: 0,
		},
		{
			name: "金の手甲",
			place: 22,
			pow: 0,
			def: 45,
			tec: 10,
			makeable: 0,
			special: 0,
		},
		{
			name: "金の杖",
			place: 23,
			pow: 10,
			def: 0,
			tec: 45,
			makeable: 0,
			special: 0,
		},
		{
			name: "プラチナの剣",
			place: 24,
			pow: 50,
			def: 12,
			tec: 0,
			makeable: 0,
			special: 0,
		},
		{
			name: "プラチナの斧",
			place: 25,
			pow: 55,
			def: 0,
			tec: -20,
			makeable: 0,
			special: 0,
		},
		{
			name: "プラチナの手甲",
			place: 26,
			pow: 0,
			def: 50,
			tec: 12,
			makeable: 0,
			special: 0,
		},
		{
			name: "プラチナの杖",
			place: 27,
			pow: 12,
			def: 0,
			tec: 50,
			makeable: 0,
			special: 0,
		},
		{
			name: "ダイヤモンドの剣",
			place: 28,
			pow: 55,
			def: 15,
			tec: 0,
			makeable: 0,
			special: 1,
		},
		{
			name: "ダイヤモンドの斧",
			place: 29,
			pow: 60,
			def: 0,
			tec: -15,
			makeable: 0,
			special: 1,
		},
		{
			name: "ダイヤモンドの手甲",
			place: 30,
			pow: 0,
			def: 55,
			tec: 15,
			makeable: 0,
			special: 1,
		},
		{
			name: "ダイヤモンドの杖",
			place: 31,
			pow: 15,
			def: 0,
			tec: 55,
			makeable: 0,
			special: 1,
		},
		{
			name: "伝説の剣",
			place: 32,
			pow: 60,
			def: 20,
			tec: 0,
			makeable: 0,
			special: 1,
		},
		{
			name: "伝説の斧",
			place: 33,
			pow: 65,
			def: 0,
			tec: -10,
			makeable: 0,
			special: 1,
		},
		{
			name: "伝説の手甲",
			place: 34,
			pow: 0,
			def: 60,
			tec: 20,
			makeable: 0,
			special: 1,
		},
		{
			name: "伝説の杖",
			place: 35,
			pow: 20,
			def: 0,
			tec: 60,
			makeable: 0,
			special: 1,
		},
		{
			name: "御神木の剣",
			place: 36,
			pow: 20,
			def: 20,
			tec: 20,
			makeable: 0,
			special: 1,
		},
		{
			name: "最強の剣",
			place: 37,
			pow: 30,
			def: 30,
			tec: 30,
			makeable: 0,
			special: 1,
		},
		{
			name: "冒険家セット",
			place: 38,
			pow: 25,
			def: 0,
			tec: -30,
			makeable: 1,
			special: 1,
			addstatus: [
				{ type: "sp", value: 1000 },
				{ type: "def", value: 100 },
			],
		},
		{
			name: "勇者の剣",
			place: 39,
			pow: 25,
			def: 20,
			tec: -5,
			makeable: 1,
			special: 1,
			addstatus: [{ type: "def", value: 100 }],
		},
		{
			name: "魔法の本",
			place: 40,
			pow: 40,
			def: -18,
			tec: 10,
			makeable: 1,
			special: 1,
			addstatus: [
				{ type: "sp", value: 300 },
				{ type: "tec", value: 100 },
			],
		},
		{
			name: "ペットフード",
			place: 41,
			pow: 0,
			def: 25,
			tec: 10,
			makeable: 1,
			special: 1,
			addstatus: [
				{ type: "sp", value: 500 },
				{ type: "def", value: 100 },
			],
		},
		{
			name: "エアエンジン",
			place: 42,
			pow: 30,
			def: -5,
			tec: 10,
			makeable: 1,
			special: 1,
			addstatus: [{ type: "ms", value: 10 }],
		},
		{
			name: "古代神の魔石",
			place: 43,
			pow: 50,
			def: 15,
			tec: 0,
			makeable: 1,
			special: 1,
			addstatus: [{ type: "tec", value: -200 }],
		},
		{
			name: "家宝の手裏剣",
			place: 44,
			pow: 10,
			def: -20,
			tec: 45,
			makeable: 1,
			special: 1,
			addstatus: [
				{ type: "ms", value: 3 },
				{ type: "as", value: 6 },
			],
		},
		{
			name: "天照の後光",
			place: 45,
			pow: 0,
			def: 5,
			tec: 30,
			makeable: 1,
			special: 1,
			addstatus: [
				{ type: "sp", value: -200 },
				{ type: "tec", value: 100 },
			],
		},
		{
			name: "フローラルオーブ",
			place: 46,
			pow: 0,
			def: 0,
			tec: 35,
			makeable: 1,
			special: 1,
			addstatus: [
				{ type: "sp", value: 500 },
				{ type: "tec", value: 100 },
			],
		},
	];
	const leveltext = ["-", "Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ", "Ⅴ"];
	const options = [
		[
			{
				name: "攻撃１",
				addstatus: [{ type: "pow", value: 10 }],
				place: 0,
			},
			{
				name: "攻撃２",
				addstatus: [{ type: "pow", value: 30 }],
				place: 1,
			},
			{
				name: "攻撃３",
				addstatus: [{ type: "pow", value: 60 }],
				place: 2,
			},
			{
				name: "攻撃４",
				addstatus: [{ type: "pow", value: 100 }],
				place: 3,
			},
			{
				name: "攻撃５",
				addstatus: [{ type: "pow", value: 200 }],
				place: 4,
			},
			{
				name: "防御１",
				addstatus: [{ type: "def", value: 10 }],
				place: 5,
			},
			{
				name: "防御２",
				addstatus: [{ type: "def", value: 30 }],
				place: 6,
			},
			{
				name: "防御３",
				addstatus: [{ type: "def", value: 60 }],
				place: 7,
			},
			{
				name: "防御４",
				addstatus: [{ type: "def", value: 100 }],
				place: 8,
			},
			{
				name: "防御５",
				addstatus: [{ type: "def", value: 200 }],
				place: 9,
			},
			{
				name: "技術１",
				addstatus: [{ type: "tec", value: 10 }],
				place: 10,
			},
			{
				name: "技術２",
				addstatus: [{ type: "tec", value: 30 }],
				place: 11,
			},
			{
				name: "技術３",
				addstatus: [{ type: "tec", value: 60 }],
				place: 12,
			},
			{
				name: "技術４",
				addstatus: [{ type: "tec", value: 100 }],
				place: 13,
			},
			{
				name: "技術５",
				addstatus: [{ type: "tec", value: 200 }],
				place: 14,
			},
			{
				name: "最大ＳＰ１",
				addstatus: [{ type: "sp", value: 100 }],
				place: 15,
			},
			{
				name: "最大ＳＰ２",
				addstatus: [{ type: "sp", value: 200 }],
				place: 16,
			},
			{
				name: "最大ＳＰ３",
				addstatus: [{ type: "sp", value: 300 }],
				place: 17,
			},
			{
				name: "最大ＳＰ４",
				addstatus: [{ type: "sp", value: 500 }],
				place: 18,
			},
			{
				name: "最大ＳＰ５",
				addstatus: [{ type: "sp", value: 1000 }],
				place: 19,
			},
			{
				name: "物理抵抗１",
				addstatus: [{ type: "hp", value: 3 }],
				place: 20,
			},
			{
				name: "物理抵抗２",
				addstatus: [{ type: "hp", value: 6 }],
				place: 21,
			},
			{
				name: "物理抵抗３",
				addstatus: [{ type: "hp", value: 12 }],
				place: 22,
			},
			{
				name: "物理抵抗４",
				addstatus: [{ type: "hp", value: 24 }],
				place: 23,
			},
			{
				name: "物理抵抗５",
				addstatus: [{ type: "hp", value: 45 }],
				place: 24,
			},
			{
				name: "魔法抵抗１",
				addstatus: [{ type: "hp", value: 3 }],
				place: 25,
			},
			{
				name: "魔法抵抗２",
				addstatus: [{ type: "hp", value: 6 }],
				place: 26,
			},
			{
				name: "魔法抵抗３",
				addstatus: [{ type: "hp", value: 12 }],
				place: 27,
			},
			{
				name: "魔法抵抗４",
				addstatus: [{ type: "hp", value: 24 }],
				place: 28,
			},
			{
				name: "魔法抵抗５",
				addstatus: [{ type: "hp", value: 45 }],
				place: 29,
			},
			{
				name: "薬学１",
				place: 30,
			},
			{
				name: "薬学２",
				place: 31,
			},
			{
				name: "薬学３",
				place: 32,
			},
			{
				name: "薬学４",
				place: 33,
			},
			{
				name: "薬学５",
				place: 34,
			},
			{
				name: "攻撃速度１",
				addstatus: [{ type: "as", value: 1 }],
				place: 35,
			},
			{
				name: "攻撃速度２",
				addstatus: [{ type: "as", value: 2 }],
				place: 36,
			},
			{
				name: "攻撃速度３",
				addstatus: [{ type: "as", value: 3 }],
				place: 37,
			},
			{
				name: "攻撃速度４",
				addstatus: [{ type: "as", value: 4 }],
				place: 38,
			},
			{
				name: "攻撃速度５",
				addstatus: [{ type: "as", value: 9 }],
				place: 39,
			},
			{
				name: "物理攻撃１",
				place: 40,
			},
			{
				name: "物理攻撃２",
				place: 41,
			},
			{
				name: "物理攻撃３",
				place: 42,
			},
			{
				name: "物理攻撃４",
				place: 43,
			},
			{
				name: "物理攻撃５",
				place: 44,
			},
			{
				name: "魔法攻撃１",
				place: 45,
			},
			{
				name: "魔法攻撃２",
				place: 46,
			},
			{
				name: "魔法攻撃３",
				place: 47,
			},
			{
				name: "魔法攻撃４",
				place: 48,
			},
			{
				name: "魔法攻撃５",
				place: 49,
			},
			{
				name: "ＴＰ獲得１",
				place: 50,
			},
			{
				name: "ＴＰ獲得２",
				place: 51,
			},
			{
				name: "ＴＰ獲得３",
				place: 52,
			},
			{
				name: "ＴＰ獲得４",
				place: 53,
			},
			{
				name: "ＴＰ獲得５",
				place: 54,
			},
			{
				name: "移動１",
				place: 55,
			},
			{
				name: "移動２",
				addstatus: [{ type: "ms", value: 1 }],
				place: 56,
			},
			{
				name: "移動３",
				addstatus: [{ type: "ms", value: 2 }],
				place: 57,
			},
			{
				name: "移動４",
				addstatus: [{ type: "ms", value: 4 }],
				place: 58,
			},
			{
				name: "移動５",
				addstatus: [{ type: "ms", value: 9 }],
				place: 59,
			},
		],
		[
			{
				name: "攻撃１",
				addstatus: [{ type: "pow", value: 10 }],
				place: 0,
			},
			{
				name: "攻撃２",
				addstatus: [{ type: "pow", value: 30 }],
				place: 1,
			},
			{
				name: "攻撃３",
				addstatus: [{ type: "pow", value: 60 }],
				place: 2,
			},
			{
				name: "攻撃４",
				addstatus: [{ type: "pow", value: 100 }],
				place: 3,
			},
			{
				name: "防御１",
				addstatus: [{ type: "def", value: 10 }],
				place: 4,
			},
			{
				name: "防御２",
				addstatus: [{ type: "def", value: 30 }],
				place: 5,
			},
			{
				name: "防御３",
				addstatus: [{ type: "def", value: 60 }],
				place: 6,
			},
			{
				name: "防御４",
				addstatus: [{ type: "def", value: 100 }],
				place: 7,
			},
			{
				name: "技術１",
				addstatus: [{ type: "tec", value: 10 }],
				place: 8,
			},
			{
				name: "技術２",
				addstatus: [{ type: "tec", value: 30 }],
				place: 9,
			},
			{
				name: "技術３",
				addstatus: [{ type: "tec", value: 60 }],
				place: 10,
			},
			{
				name: "技術４",
				addstatus: [{ type: "tec", value: 100 }],
				place: 11,
			},
			{
				name: "最大ＳＰ１",
				addstatus: [{ type: "sp", value: 100 }],
				place: 12,
			},
			{
				name: "最大ＳＰ２",
				addstatus: [{ type: "sp", value: 200 }],
				place: 13,
			},
			{
				name: "最大ＳＰ３",
				addstatus: [{ type: "sp", value: 300 }],
				place: 14,
			},
			{
				name: "最大ＳＰ４",
				addstatus: [{ type: "sp", value: 500 }],
				place: 15,
			},
			{
				name: "物理抵抗１",
				addstatus: [{ type: "hp", value: 3 }],
				place: 16,
			},
			{
				name: "物理抵抗２",
				addstatus: [{ type: "hp", value: 6 }],
				place: 17,
			},
			{
				name: "物理抵抗３",
				addstatus: [{ type: "hp", value: 12 }],
				place: 18,
			},
			{
				name: "物理抵抗４",
				addstatus: [{ type: "hp", value: 24 }],
				place: 19,
			},
			{
				name: "魔法抵抗１",
				addstatus: [{ type: "hp", value: 3 }],
				place: 20,
			},
			{
				name: "魔法抵抗２",
				addstatus: [{ type: "hp", value: 6 }],
				place: 21,
			},
			{
				name: "魔法抵抗３",
				addstatus: [{ type: "hp", value: 12 }],
				place: 22,
			},
			{
				name: "魔法抵抗４",
				addstatus: [{ type: "hp", value: 24 }],
				place: 23,
			},
			{
				name: "薬学１",
				place: 24,
			},
			{
				name: "薬学２",
				place: 25,
			},
			{
				name: "薬学３",
				place: 26,
			},
			{
				name: "薬学４",
				place: 27,
			},
			{
				name: "攻撃速度１",
				addstatus: [{ type: "as", value: 1 }],
				place: 28,
			},
			{
				name: "攻撃速度２",
				addstatus: [{ type: "as", value: 2 }],
				place: 29,
			},
			{
				name: "攻撃速度３",
				addstatus: [{ type: "as", value: 3 }],
				place: 30,
			},
			{
				name: "攻撃速度４",
				addstatus: [{ type: "as", value: 4 }],
				place: 31,
			},
			{
				name: "物理攻撃１",
				place: 32,
			},
			{
				name: "物理攻撃２",
				place: 33,
			},
			{
				name: "物理攻撃３",
				place: 34,
			},
			{
				name: "物理攻撃４",
				place: 35,
			},
			{
				name: "魔法攻撃１",
				place: 36,
			},
			{
				name: "魔法攻撃２",
				place: 37,
			},
			{
				name: "魔法攻撃３",
				place: 38,
			},
			{
				name: "魔法攻撃４",
				place: 39,
			},
		],
	];
	const characalc = {
		q: {},
		showMode: 0,
		charadata: {
			outputCharacterData: true,
			characterName: "",
			characterType: -1,
			hiden: 0,
			remain: -1,
			weapon: -1,
			weaponOption0: -1,
			weaponOption1: -1,
			weaponOption2: -1,
			weaponPow: 0,
			weaponPowPlus: 0,
			weaponDef: 0,
			weaponDefPlus: 0,
			weaponTec: 0,
			weaponTecPlus: 0,
			weaponOption3: -1,
			weaponOption4: -1,
			weaponOption5: -1,
			stars: 0,
			charalevel: 200,
			bonusPow: 0,
			bonusDef: 0,
			bonusTec: 0,
		},
		showAllWeapon: false,
		showAllOption: false,
		setting: (d) => {
			characalc.showMode = 0;
			characalc.newJob = -1;
			characalc.charadata = {
				outputCharacterData: true,
				characterName: "",
				characterType: -1,
				hiden: 0,
				remain: -1,
				weapon: -1,
				weaponOption0: -1,
				weaponOption1: -1,
				weaponOption2: -1,
				weaponPow: 0,
				weaponPowPlus: 0,
				weaponDef: 0,
				weaponDefPlus: 0,
				weaponTec: 0,
				weaponTecPlus: 0,
				weaponOption3: -1,
				weaponOption4: -1,
				weaponOption5: -1,
				stars: 0,
				charalevel: 200,
				bonusPow: 0,
				bonusDef: 0,
				bonusTec: 0,
			};
			characalc.q = $(`#tool_${d}`);
			characalc.q.find("tr").each((i, e) =>
				$(e)
					.find("td")
					.each((j, l) => {
						j != 7 &&
							$(l).on("click", () => characalc.toggleJob(j));
					})
			);
		},
		loadJson: (json) => {
			const { jobPoint, charaData } = json;
			[...Object.keys(charaData)].forEach((n) => {
				if (!["outputCharacterData", "characterName"].includes(n))
					charaData[n] = Number(charaData[n]);
			});
			characalc.charadata = charaData;
			jobPoint.flat().map((n, m) => (wazadata[m].level = Number(n)));
			characalc.updateDisplay(0);
			olert("読み込みました。");
		},
		modeChange: (m) => {
			characalc.q.find(".domspace button").each((i, e) => $(e).off());
			characalc.q.find(".domspace input").each((i, e) => $(e).off());
			characalc.q.find(".domspace select").each((i, e) => $(e).off());
			if (m == 0) {
				characalc.updateDisplay(1);
				characalc.showMode = 2;
			} else if (m == 1) {
				const p = characalc.q.find(".domspace");
				p.html(
					'<h2>読み込み</h2><h3>JSONから読み込む</h3><textarea></textarea><br /><button>読み込み(json)</button><br /><br /><h3>idから読み込む(しづきさんの計算機のid)</h3><input type="text" /><br /><button>読み込み(id)</button>'
				);
				p.find("button:eq(0)").on("click", (e) => {
					characalc.loadJson(JSON.parse(p.find("textarea").val()));
				});
				p.find("button:eq(1)").on("click", (e) => {
					fetch("https://api.pjeita.top/hcqcalc", {
						method: "post",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ id: p.find("input").val() }),
					})
						.then((n) => n.json())
						.then((n) => characalc.loadJson(n.info));
				});
				characalc.showMode = 3;
			}
		},
		toggleJob: (t) => {
			characalc.showMode = 1;
			characalc.q.find(".domspace").html(
				"<table>" +
					wazadata
						.filter((n) => n.jobid == t)
						.map(
							(n) =>
								`<tr wazaid="${n.place}"><td><span class="type${
									n?.type
								}">${n.name}</span> <span class="wazalevel">${
									leveltext[n.level]
								}</span><td><td><button class="wazapointmax">↑</button><button class="wazapointplus">+</button> <span class="wazapoints">${
									wazapoints[n.point][n.level]
								}</span> <button class="wazapointminus">-</button><button class="wazapointreset">↓</button></td></tr>`
						)
						.join("") +
					'</table><br /><button class="wazaallreset">リセット</button>'
			);
			characalc.q.find(".wazapointmax").each((i, e) => {
				const n = e.parentNode.parentNode;
				const p = n.getAttribute("wazaid");
				const d = wazadata[p];
				$(e).on("click", () => {
					d.level = 5;
					$(n).find(".wazalevel").html(leveltext[d.level]);
					$(n).find(".wazapoints").html(wazapoints[d.point][d.level]);
					characalc.updateDisplay(0);
				});
			});
			characalc.q.find(".wazapointplus").each((i, e) => {
				const n = e.parentNode.parentNode;
				const p = n.getAttribute("wazaid");
				const d = wazadata[p];
				$(e).on("click", () => {
					if (d.level < 5) d.level++;
					$(n).find(".wazalevel").html(leveltext[d.level]);
					$(n).find(".wazapoints").html(wazapoints[d.point][d.level]);
					characalc.updateDisplay(0);
				});
			});
			characalc.q.find(".wazapointminus").each((i, e) => {
				const n = e.parentNode.parentNode;
				const p = n.getAttribute("wazaid");
				const d = wazadata[p];
				$(e).on("click", () => {
					if (characalc.charadata.characterType != -1)
						if (
							defaultwaza[characalc.charadata.characterType] ==
								p &&
							d.level == 1
						)
							return olert(
								"デフォルト技のため技のレベルを0にできません。"
							);
					if (d.level > 0) d.level--;
					$(n).find(".wazalevel").html(leveltext[d.level]);
					$(n).find(".wazapoints").html(wazapoints[d.point][d.level]);
					characalc.updateDisplay(0);
				});
			});
			characalc.q.find(".wazapointreset").each((i, e) => {
				const n = e.parentNode.parentNode;
				const p = n.getAttribute("wazaid");
				const d = wazadata[p];
				$(e).on("click", () => {
					d.level =
						characalc.charadata.characterType == -1
							? 0
							: defaultwaza[characalc.charadata.characterType] ==
							  p
							? 1
							: 0;
					$(n).find(".wazalevel").html(leveltext[d.level]);
					$(n).find(".wazapoints").html(wazapoints[d.point][d.level]);
					characalc.updateDisplay(0);
				});
				characalc.q
					.find(".wazaallreset")
					.off()
					.on("click", () => {
						wazadata
							.filter((n) => n.jobid == t)
							.forEach((n, m) => {
								wazadata[n.place].level =
									characalc.charadata.characterType == -1
										? 0
										: defaultwaza[
												characalc.charadata
													.characterType
										  ] == n.place
										? 1
										: 0;
								characalc.q
									.find(".wazalevel")
									.eq(m)
									.html(leveltext[wazadata[n.place].level]);
								characalc.q
									.find(".wazapoints")
									.eq(m)
									.html(
										wazapoints[n.point][
											wazadata[n.place].level
										]
									);
								characalc.updateDisplay(0);
							});
					});
			});
		},
		updateDisplay: (d, c = false) => {
			if (d == 0) {
				characalc.q.find("tr:eq(1) td").each((i, e) => {
					const sum =
						i == 7
							? wazadata
									.map((n) => wazapoints[n.point][n.level])
									.reduce((a, b) => a + b)
							: wazadata
									.filter((n) => n.jobid == i)
									.map((n) => wazapoints[n.point][n.level])
									.reduce((a, b) => a + b);
					$(e).html(sum);
					if (i == 7)
						$(e).css(
							"color",
							sum > characalc.charalevel + 4
								? "#ff0000"
								: "#000000"
						);
				});
			} else if (d == 1) {
				const p = characalc.q.find(".domspace");
				if (characalc.showMode == 2) {
					if (
						characalc.showAllWeapon &&
						p.find(".showallweapon").prop("checked") == false
					) {
						if (characalc.charadata.weapon != -1) {
							if (!bugudata[characalc.charadata.weapon].special)
								p.find(".weapon").val(-1);
						}
					}
					let showAllOptionChanged = false;
					p.find(".showalloption").each((i, e) => {
						if (
							$(e).off().prop("checked") !=
							characalc.showAllOption
						)
							showAllOptionChanged = true;
					});
					if (showAllOptionChanged) {
						if (characalc.showAllOption) {
							if (characalc.charadata.weapon != -1) {
								if (characalc.charadata.weaponOption0 % 5 != 4)
									p.find(".op0").val(-1);
								if (characalc.charadata.weaponOption1 % 5 != 4)
									p.find(".op1").val(-1);
								if (characalc.charadata.weaponOption2 % 5 != 4)
									p.find(".op2").val(-1);
							}
							if (characalc.charadata.weaponOption3 % 4 != 3)
								p.find(".op3").val(-1);
							if (characalc.charadata.weaponOption4 % 4 != 3)
								p.find(".op4").val(-1);
							if (characalc.charadata.weaponOption5 % 4 != 3)
								p.find(".op5").val(-1);
						}
						characalc.showAllOption = !characalc.showAllOption;
					}
					characalc.showAllWeapon = p
						.find(".showallweapon")
						.off()
						.prop("checked");
					characalc.charadata.characterName = p
						.find(".charaname")
						.off()
						.val();
					characalc.charadata.hiden =
						characalc.charadata.characterType !=
							Number(p.find(".charatype").val()) ||
						Number(p.find(".charatype").val()) == -1
							? 0
							: Number(p.find(".hiden").off().val());
					characalc.charadata.characterType = Number(
						p.find(".charatype").off().val()
					);
					characalc.charadata.remain = Number(
						p.find(".remain").off().val()
					);
					characalc.charadata.weaponPow =
						characalc.charadata.weapon != p.find(".weapon").val() ||
						Number(p.find(".weapon").val()) == -1
							? 0
							: Number(p.find(".weaponpow").off().val());
					characalc.charadata.weaponPowPlus =
						Number(p.find(".weapon").val()) == -1 ||
						characalc.charadata.weapon == -1
							? 0
							: Number(p.find(".weaponpowplus").off().val());
					characalc.charadata.weaponDef =
						characalc.charadata.weapon != p.find(".weapon").val() ||
						Number(p.find(".weapon").val()) == -1
							? 0
							: Number(p.find(".weapondef").off().val());
					characalc.charadata.weaponDefPlus =
						Number(p.find(".weapon").val()) == -1 ||
						characalc.charadata.weapon == -1
							? 0
							: Number(p.find(".weapondefplus").off().val());
					characalc.charadata.weaponTec =
						characalc.charadata.weapon != p.find(".weapon").val() ||
						Number(p.find(".weapon").val()) == -1
							? 0
							: Number(p.find(".weapontec").off().val());
					characalc.charadata.weaponTecPlus =
						Number(p.find(".weapon").val()) == -1 ||
						characalc.charadata.weapon == -1
							? 0
							: Number(p.find(".weapontecplus").off().val());
					if (
						characalc.charadata.weapon !=
							Number(p.find(".weapon").val()) &&
						Number(p.find(".weapon").val()) != -1
					) {
						const weapon =
							bugudata[Number(p.find(".weapon").val())];
						characalc.charadata.weaponPow = weapon.pow;
						characalc.charadata.weaponDef = weapon.def;
						characalc.charadata.weaponTec = weapon.tec;
					}
					characalc.charadata.weapon = Number(
						p.find(".weapon").off().val()
					);
					characalc.charadata.weaponOption0 =
						characalc.charadata.weapon == -1
							? -1
							: Number(p.find(".op0").off().val());
					characalc.charadata.weaponOption1 =
						characalc.charadata.weapon == -1
							? -1
							: Number(p.find(".op1").off().val());
					characalc.charadata.weaponOption2 =
						characalc.charadata.weapon == -1
							? -1
							: Number(p.find(".op2").off().val());
					characalc.charadata.weaponOption3 = Number(
						p.find(".op3").off().val()
					);
					characalc.charadata.weaponOption4 = Number(
						p.find(".op4").off().val()
					);
					characalc.charadata.weaponOption5 = Number(
						p.find(".op5").off().val()
					);
					characalc.charadata.stars = Number(
						p.find(".stars").off().val()
					);
					characalc.charadata.charalevel = Number(
						p.find(".charalevel").off().val()
					);
					characalc.charadata.bonusPow = Number(
						p.find(".bonuspow").off().val()
					);
					characalc.charadata.bonusDef = Number(
						p.find(".bonusdef").off().val()
					);
					characalc.charadata.bonusTec = Number(
						p.find(".bonustec").off().val()
					);
				}
				p.html(
					'キャラ名：<input type="text" size="15" maxlength="12" class="charaname" /><br />Lv<input type="text" size="5" class="charalevel" />☆<input type="text" size="3" maxlength="1" class="stars" /><br />キャラタイプ<select class="charatype"><option value="-1" selected>未設定</option><option value="0">溌剌ボーイ</option><option value="1">天才少女</option><option value="2">働くおじさん</option><option value="3">凄腕スタント</option><option value="4">戦うナースさん</option><option value="5">真面目な騎士</option><option value="6">不思議ちゃん</option></select>' +
						(characalc.charadata.characterType != -1
							? '<br />秘伝：<select class="hiden">' +
							  hidenlist[characalc.charadata.characterType].map(
									(n, m) =>
										`<option value="${m}">${n.name}</option>`
							  ) +
							  "</select>"
							: "") +
						'<br />余りポイント：<select class="remain"><option value="-1" selected>キャラタイプと同じ</option><option value="0">戦士</option><option value="1">魔法使い</option><option value="2">僧</option><option value="3">忍者</option><option value="4">メイド</option><option value="5">騎士</option><option value="6">サモナー</option></select><br /><br />武具：<select class="weapon"><option value="-1" selected>未設定</option>' +
						(characalc.showAllWeapon
							? bugudata.map(
									(n) =>
										`<option value="${n.place}">${n.name}</option>`
							  )
							: bugudata
									.filter((n) => n.special)
									.map(
										(n) =>
											`<option value="${n.place}">${n.name}</option>`
									)) +
						'</select> <input class="showallweapon" type="checkbox" />全表示<br />' +
						(characalc.charadata.weapon == -1
							? ""
							: `<select class="op0 option"><option value="-1" selected>なし</option>${
									characalc.showAllOption
										? options[0].map(
												(n) =>
													`<option value="${n.place}">${n.name}</option>`
										  )
										: options[0]
												.filter((n) => n.place % 5 == 4)
												.map(
													(n) =>
														`<option value="${n.place}">${n.name}</option>`
												)
							  }</select> <select class="op1 option"><option value="-1" selected>なし</option>${
									characalc.showAllOption
										? options[0].map(
												(n) =>
													`<option value="${n.place}">${n.name}</option>`
										  )
										: options[0]
												.filter((n) => n.place % 5 == 4)
												.map(
													(n) =>
														`<option value="${n.place}">${n.name}</option>`
												)
							  }</select> <select class="op2 option"><option value="-1" selected>なし</option>${
									characalc.showAllOption
										? options[0].map(
												(n) =>
													`<option value="${n.place}">${n.name}</option>`
										  )
										: options[0]
												.filter((n) => n.place % 5 == 4)
												.map(
													(n) =>
														`<option value="${n.place}">${n.name}</option>`
												)
							  }</select> <input class="showalloption" type="checkbox" />全表示<br />pow<input size="5" maxlength="3" type="text" class="weaponpow"${
									bugudata[characalc.charadata.weapon]
										.makeable
										? ""
										: " readonly"
							  } />+<input size="5" maxlength="2" class="weaponpowplus" type="text" /><br />def<input size="5" maxlength="3" type="text" class="weapondef"${
									bugudata[characalc.charadata.weapon]
										.makeable
										? ""
										: " readonly"
							  } />+<input size="5" maxlength="2" class="weapondefplus" type="text" /><br />tec<input size="5" maxlength="3" type="text" class="weapontec"${
									bugudata[characalc.charadata.weapon]
										.makeable
										? ""
										: " readonly"
							  } />+<input size="5" maxlength="2" class="weapontecplus" type="text" /><br />`) +
						`護石：<select class="op3 option"><option value="-1" selected>なし</option>${
							characalc.showAllOption
								? options[1].map(
										(n) =>
											`<option value="${n.place}">${n.name}</option>`
								  )
								: options[1]
										.filter((n) => n.place % 4 == 3)
										.map(
											(n) =>
												`<option value="${n.place}">${n.name}</option>`
										)
						}</select> <select class="op4 option"><option value="-1" selected>なし</option>${
							characalc.showAllOption
								? options[1].map(
										(n) =>
											`<option value="${n.place}">${n.name}</option>`
								  )
								: options[1]
										.filter((n) => n.place % 4 == 3)
										.map(
											(n) =>
												`<option value="${n.place}">${n.name}</option>`
										)
						}</select> <select class="op5 option"><option value="-1" selected>なし</option>${
							characalc.showAllOption
								? options[1].map(
										(n) =>
											`<option value="${n.place}">${n.name}</option>`
								  )
								: options[1]
										.filter((n) => n.place % 4 == 3)
										.map(
											(n) =>
												`<option value="${n.place}">${n.name}</option>`
										)
						}</select> <input class="showalloption" type="checkbox" />全表示<br /><br />ステータスポイント<br />POW：<input class="bonuspow" maxlength="3" size="3" type="text" /><br />DEF：<input class="bonusdef" maxlength="3" size="3" type="text" /><br />TEC：<input class="bonustec" maxlength="3" size="3" type="text" />`
				);
				const f = () => characalc.updateDisplay(1, true);
				p.find(".charaname")
					.val(characalc.charadata.characterName)
					.on("change", f);
				p.find(".charatype")
					.val(characalc.charadata.characterType)
					.on("change", f);
				if (characalc.charadata.characterType != -1)
					p.find(".hiden")
						.val(characalc.charadata.hiden)
						.on("change", f);
				p.find(".remain")
					.val(characalc.charadata.remain)
					.on("change", f);
				p.find(".weapon")
					.val(characalc.charadata.weapon)
					.on("change", f);
				if (characalc.charadata.weapon != -1) {
					p.find(".op0")
						.val(characalc.charadata.weaponOption0)
						.on("change", f);
					p.find(".op1")
						.val(characalc.charadata.weaponOption1)
						.on("change", f);
					p.find(".op2")
						.val(characalc.charadata.weaponOption2)
						.on("change", f);
					p.find(".weaponpow")
						.val(characalc.charadata.weaponPow)
						.on("change", f);
					p.find(".weaponpowplus")
						.val(characalc.charadata.weaponPowPlus)
						.on("change", f);
					p.find(".weapondef")
						.val(characalc.charadata.weaponDef)
						.on("change", f);
					p.find(".weapondefplus")
						.val(characalc.charadata.weaponDefPlus)
						.on("change", f);
					p.find(".weapontec")
						.val(characalc.charadata.weaponTec)
						.on("change", f);
					p.find(".weapontecplus")
						.val(characalc.charadata.weaponTecPlus)
						.on("change", f);
				}
				p.find(".op3")
					.val(characalc.charadata.weaponOption3)
					.on("change", f);
				p.find(".op4")
					.val(characalc.charadata.weaponOption4)
					.on("change", f);
				p.find(".op5")
					.val(characalc.charadata.weaponOption5)
					.on("change", f);
				p.find(".stars").val(characalc.charadata.stars).on("change", f);
				p.find(".charalevel")
					.val(characalc.charadata.charalevel)
					.on("change", f);
				p.find(".bonuspow")
					.val(characalc.charadata.bonusPow)
					.on("change", f);
				p.find(".bonusdef")
					.val(characalc.charadata.bonusDef)
					.on("change", f);
				p.find(".bonustec")
					.val(characalc.charadata.bonusTec)
					.on("change", f);
				p.find(".showallweapon")
					.prop("checked", characalc.showAllWeapon)
					.on("change", f);
				p.find(".showalloption").each((i, e) =>
					$(e)
						.prop("checked", characalc.showAllOption)
						.on("change", f)
				);
			}
		},
		calc: (id) => {
			const { charadata: c } = characalc;
			const jobPoint = wazadata.reduce((a, b) => {
				if (!a[b.jobid]) a[b.jobid] = [];
				a[b.jobid].push(b.level);
				return a;
			}, []);
			const charaData = {
				...c,
				weaponDummy1: "-1",
				weaponOptionDummy1: "-1",
				weaponOptionDummy2: "-1",
			};
			Object.keys(c).forEach((n) => {
				if (n != "outputCharacterData") charaData[n] = c[n].toString();
			});
			const json = JSON.stringify({
				jobPoint: jobPoint.map((n) => n.map((m) => m.toString())),
				charaData,
			});
			/* 初期ステータス */
			const baseStatus = [
				{
					name: "溌剌ボーイ",
					hp: 120,
					pow: 10,
					def: 10,
					tec: 10,
					as: 10,
					ms: 6,
				},
				{
					name: "天才少女",
					hp: 100,
					pow: 10,
					def: 10,
					tec: 10,
					as: 9,
					ms: 5,
				},
				{
					name: "働くおじさん",
					hp: 110,
					pow: 10,
					def: 10,
					tec: 10,
					as: 12,
					ms: 4,
				},
				{
					name: "凄腕スタント",
					hp: 110,
					pow: 10,
					def: 10,
					tec: 10,
					as: 11,
					ms: 6,
				},
				{
					name: "戦うナースさん",
					hp: 110,
					pow: 10,
					def: 10,
					tec: 10,
					as: 10,
					ms: 5,
				},
				{
					name: "真面目な騎士",
					hp: 120,
					pow: 10,
					def: 10,
					tec: 10,
					as: 11,
					ms: 4,
				},
				{
					name: "不思議ちゃん",
					hp: 110,
					pow: 10,
					def: 10,
					tec: 10,
					as: 10,
					ms: 5,
				},
			];
			/* レベル×キャラタイプ */
			const charaStatus = [
				{ hp: 1.1, pow: 0.4, def: 0.3, tec: 0.1 },
				{ hp: 0.9, pow: 0.5, def: 0.2, tec: 0.4 },
				{ hp: 1.0, pow: 0.3, def: 0.4, tec: 0.3 },
				{ hp: 1.0, pow: 0.3, def: 0.25, tec: 0.45 },
				{ hp: 1.0, pow: 0.35, def: 0.3, tec: 0.3 },
				{ hp: 1.1, pow: 0.3, def: 0.3, tec: 0.24 },
				{ hp: 1.0, pow: 0.25, def: 0.45, tec: 0.3 },
			];
			/* 職業Lv.×職業 */
			const jobStatus = [
				{ hp: 0.1, pow: 0.5, def: 0.3, tec: 0 },
				{ hp: -0.1, pow: 0.6, def: 0.1, tec: 0.3 },
				{ hp: 0, pow: 0.2, def: 0.4, tec: 0.4 },
				{ hp: 0, pow: 0.3, def: 0.1, tec: 0.6 },
				{ hp: 0, pow: 0.3, def: 0.3, tec: 0.4 },
				{ hp: 0, pow: 0.3, def: 0.4, tec: 0.3 },
				{ hp: 0, pow: 0.1, def: 0.55, tec: 0.35 },
			];

			const status =
				c.characterType == -1
					? {
							name: "未設定",
							hp: 0,
							pow: 0,
							def: 0,
							tec: 0,
							as: 0,
							ms: 0,
							sp: 1000,
					  }
					: { ...baseStatus[c.characterType], sp: 1000 };

			const points = jobPoint.map((n, m) =>
				n
					.map(
						(p, q) =>
							wazapoints[
								wazadata.filter((d) => d.jobid == m)[q].point
							][p]
					)
					.reduce((a, b) => a + b)
			);
			if (c.characterType != -1) {
				status.hp += Math.floor(
					charaStatus[c.characterType].hp * c.charalevel
				);
				status.pow += Math.floor(
					charaStatus[c.characterType].pow * c.charalevel
				);
				status.def += Math.floor(
					charaStatus[c.characterType].def * c.charalevel
				);
				status.tec += Math.floor(
					charaStatus[c.characterType].tec * c.charalevel
				);
			}
			const sum = points.reduce((a, b) => a + b);
			if (sum > c.charalevel + 4) {
				return olert(
					`職業ポイントの合計は${c.charalevel + 4}までです。`
				);
			}
			if (c.remain != -1) {
				points[c.remain] += c.charalevel + 4 - sum;
			} else if (c.characterType != -1) {
				points[c.characterType] += c.charalevel + 4 - sum;
			}
			points.map((n, m) => {
				status.hp += Math.floor(jobStatus[m].hp * n);
				status.pow += Math.floor(jobStatus[m].pow * n);
				status.def += Math.floor(jobStatus[m].def * n);
				status.tec += Math.floor(jobStatus[m].tec * n);
			});

			status.pow += c.bonusPow;
			status.def += c.bonusDef;
			status.tec += c.bonusTec;

			if (c.characterType != -1) {
				if (hidenlist[c.characterType][c.hiden].addstatus) {
					hidenlist[c.characterType][c.hiden].addstatus.map(
						(n) => (status[n.type] += n.value)
					);
				}
			}
			if (c.weaponOption3 != -1)
				if (options[0][c.weaponOption3].addstatus)
					options[0][c.weaponOption3].addstatus.map(
						(n) => (status[n.type] += n.value)
					);
			if (c.weaponOption4 != -1)
				if (options[0][c.weaponOption4].addstatus)
					options[0][c.weaponOption4].addstatus.map(
						(n) => (status[n.type] += n.value)
					);
			if (c.weaponOption5 != -1)
				if (options[0][c.weaponOption5].addstatus)
					options[0][c.weaponOption5].addstatus.map(
						(n) => (status[n.type] += n.value)
					);
			if (c.weapon != -1) {
				if (bugudata[c.weapon].addstatus)
					bugudata[c.weapon].addstatus.map(
						(n) => (status[n.type] += n.value)
					);
				if (c.weaponOption0 != -1)
					if (options[0][c.weaponOption0].addstatus)
						options[0][c.weaponOption0].addstatus.map(
							(n) => (status[n.type] += n.value)
						);
				if (c.weaponOption1 != -1)
					if (options[0][c.weaponOption1].addstatus)
						options[0][c.weaponOption1].addstatus.map(
							(n) => (status[n.type] += n.value)
						);
				if (c.weaponOption2 != -1)
					if (options[0][c.weaponOption2].addstatus)
						options[0][c.weaponOption2].addstatus.map(
							(n) => (status[n.type] += n.value)
						);
				status.pow = Math.floor(
					status.pow * ((c.weaponPow + c.weaponPowPlus) / 100 + 1)
				);
				status.def = Math.floor(
					status.def * ((c.weaponDef + c.weaponDefPlus) / 100 + 1)
				);
				status.tec = Math.floor(
					status.tec * ((c.weaponTec + c.weaponTecPlus) / 100 + 1)
				);
			}
			status.hp += Math.floor(status.def / 10);
			if (status.pow < 1) status.pow = 1;
			if (status.def < 1) status.def = 1;
			if (status.tec < 1) status.tec = 1;

			status.pow = Math.floor(status.pow * (1 + c.stars / 10));
			status.def = Math.floor(status.def * (1 + c.stars / 10));
			status.tec = Math.floor(status.tec * (1 + c.stars / 10));

			const p = characalc.q.find(".domspace");
			p.html(
				`<h2>出力</h2><h3>スレ用</h3><textarea readonly></textarea><br /><br /><h3>短縮(レシピのみ)</h3><textarea readonly></textarea><br /><br /><h3>JSON</h3><textarea readonly></textarea><br /><br />${
					id
						? `保存が完了しました。<br />id: ${id}`
						: '<button class="share">共有する</button>'
				}`
			);
			p.find("textarea:eq(0)").html(
				`${c.characterName || RandomName()}\n` +
					`キャラ：${status.name}\n` +
					`秘伝：${
						c.characterType == -1
							? "未設定"
							: hidenlist[c.characterType][c.hiden].name
					}\n` +
					`武具：${
						c.weapon == -1
							? "なし"
							: `${bugudata[c.weapon].name} pow${c.weaponPow}+${
									c.weaponPowPlus
							  } def${c.weaponDef}+${c.weaponDefPlus} tec${
									c.weaponTec
							  }+${c.weaponTecPlus} [${
									c.weaponOption0 == -1
										? "なし"
										: options[0][c.weaponOption0].name
							  }][${
									c.weaponOption1 == -1
										? "なし"
										: options[0][c.weaponOption1].name
							  }][${
									c.weaponOption2 == -1
										? "なし"
										: options[0][c.weaponOption2].name
							  }]`
					}\n` +
					`護石：[${
						c.weaponOption3 == -1
							? "なし"
							: options[0][c.weaponOption3].name
					}][${
						c.weaponOption4 == -1
							? "なし"
							: options[0][c.weaponOption4].name
					}][${
						c.weaponOption5 == -1
							? "なし"
							: options[0][c.weaponOption5].name
					}]}\n` +
					`ボーナス：POW+${c.bonusPow} DEF+${c.bonusDef} TEC+${c.bonusTec}\n` +
					`ステータス(Lv${c.charalevel}${
						c.stars ? `☆${c.stars}` : ""
					})：HP ${status.hp} SP ${status.sp / 5 + 200}(${
						status.sp * 0.15 + 150
					})/${status.sp} POW ${status.pow} DEF ${status.def} TEC ${
						status.tec
					} 攻速 ${status.as} 移動${status.ms}\n` +
					`職lv：戦${wazadata
						.filter((n) => n.jobid == 0)
						.map((n) => wazapoints[n.point][n.level])
						.reduce((a, b) => a + b)}${
						c.remain == 0 ||
						(c.characterType == 0 &&
							c.remain == -1 &&
							c.charalebel + 4 > sum)
							? `(余${c.charalevel + 4 - sum})`
							: ""
					} 魔${wazadata
						.filter((n) => n.jobid == 1)
						.map((n) => wazapoints[n.point][n.level])
						.reduce((a, b) => a + b)}${
						c.remain == 1 ||
						(c.characterType == 1 &&
							c.remain == -1 &&
							c.charalebel + 4 > sum)
							? `(余${c.charalevel + 4 - sum})`
							: ""
					} 僧${wazadata
						.filter((n) => n.jobid == 2)
						.map((n) => wazapoints[n.point][n.level])
						.reduce((a, b) => a + b)}${
						c.remain == 2 ||
						(c.characterType == 2 &&
							c.remain == -1 &&
							c.charalebel + 4 > sum)
							? `(余${c.charalevel + 4 - sum})`
							: ""
					} 忍${wazadata
						.filter((n) => n.jobid == 3)
						.map((n) => wazapoints[n.point][n.level])
						.reduce((a, b) => a + b)}${
						c.remain == 3 ||
						(c.characterType == 3 &&
							c.remain == -1 &&
							c.charalebel + 4 > sum)
							? `(余${c.charalevel + 4 - sum})`
							: ""
					} メ${wazadata
						.filter((n) => n.jobid == 4)
						.map((n) => wazapoints[n.point][n.level])
						.reduce((a, b) => a + b)}${
						c.remain == 4 ||
						(c.characterType == 4 &&
							c.remain == -1 &&
							c.charalebel + 4 > sum)
							? `(余${c.charalevel + 4 - sum})`
							: ""
					} 騎${wazadata
						.filter((n) => n.jobid == 5)
						.map((n) => wazapoints[n.point][n.level])
						.reduce((a, b) => a + b)}${
						c.remain == 5 ||
						(c.characterType == 5 &&
							c.remain == -1 &&
							c.charalebel + 4 > sum)
							? `(余${c.charalevel + 4 - sum})`
							: ""
					} 召${wazadata
						.filter((n) => n.jobid == 6)
						.map((n) => wazapoints[n.point][n.level])
						.reduce((a, b) => a + b)}${
						c.remain == 6 ||
						(c.characterType == 6 &&
							c.remain == -1 &&
							c.charalebel + 4 > sum)
							? `(余${c.charalevel + 4 - sum})`
							: ""
					} 計${wazadata
						.map((n) => wazapoints[n.point][n.level])
						.reduce((a, b) => a + b)}\n` +
					`技lv：${wazadata
						.filter((n) => n.level)
						.map((n) => `${n.name}${n.level}`)
						.join(" ")}` +
					(id ? `\n\n$id: {id}` : "")
			);
			p.find("textarea:eq(1)").html(
				`職lv：戦${wazadata
					.filter((n) => n.jobid == 0)
					.map((n) => wazapoints[n.point][n.level])
					.reduce((a, b) => a + b)}${
					c.remain == 0 ||
					(c.characterType == 0 &&
						c.remain == -1 &&
						c.charalebel + 4 > sum)
						? `(余${c.charalevel + 4 - sum})`
						: ""
				} 魔${wazadata
					.filter((n) => n.jobid == 1)
					.map((n) => wazapoints[n.point][n.level])
					.reduce((a, b) => a + b)}${
					c.remain == 1 ||
					(c.characterType == 1 &&
						c.remain == -1 &&
						c.charalebel + 4 > sum)
						? `(余${c.charalevel + 4 - sum})`
						: ""
				} 僧${wazadata
					.filter((n) => n.jobid == 2)
					.map((n) => wazapoints[n.point][n.level])
					.reduce((a, b) => a + b)}${
					c.remain == 2 ||
					(c.characterType == 2 &&
						c.remain == -1 &&
						c.charalebel + 4 > sum)
						? `(余${c.charalevel + 4 - sum})`
						: ""
				} 忍${wazadata
					.filter((n) => n.jobid == 3)
					.map((n) => wazapoints[n.point][n.level])
					.reduce((a, b) => a + b)}${
					c.remain == 3 ||
					(c.characterType == 3 &&
						c.remain == -1 &&
						c.charalebel + 4 > sum)
						? `(余${c.charalevel + 4 - sum})`
						: ""
				} メ${wazadata
					.filter((n) => n.jobid == 4)
					.map((n) => wazapoints[n.point][n.level])
					.reduce((a, b) => a + b)}${
					c.remain == 4 ||
					(c.characterType == 4 &&
						c.remain == -1 &&
						c.charalebel + 4 > sum)
						? `(余${c.charalevel + 4 - sum})`
						: ""
				} 騎${wazadata
					.filter((n) => n.jobid == 5)
					.map((n) => wazapoints[n.point][n.level])
					.reduce((a, b) => a + b)}${
					c.remain == 5 ||
					(c.characterType == 5 &&
						c.remain == -1 &&
						c.charalebel + 4 > sum)
						? `(余${c.charalevel + 4 - sum})`
						: ""
				} 召${wazadata
					.filter((n) => n.jobid == 6)
					.map((n) => wazapoints[n.point][n.level])
					.reduce((a, b) => a + b)}${
					c.remain == 6 ||
					(c.characterType == 6 &&
						c.remain == -1 &&
						c.charalebel + 4 > sum)
						? `(余${c.charalevel + 4 - sum})`
						: ""
				} 計${wazadata
					.map((n) => wazapoints[n.point][n.level])
					.reduce((a, b) => a + b)}\n` +
					`技lv：${wazadata
						.filter((n) => n.level)
						.map((n) => `${n.short_name}${n.level}`)
						.join(" ")}`
			);
			p.find("textarea:eq(2)").html(json);
			p.find(".share").on("click", () => {
				fetch("https://api.pjeita.top/hcqcalc", {
					method: "put",
					headers: {
						"Content-Type": "application/json",
					},
					body: json,
				})
					.then((n) => n.json())
					.then((n) => characalc.calc(n.id));
			});
		},
	};
	const ad =
		'<iframe src="https://himaquest.com/AdRectangle_nin.html" scrolling="no" style="width:300px;height:250px;border:0px;"></iframe>';
	this.Tools = (type) => {
		let dom = "";
		let d = Date.now();
		let f = [];
		switch (type) {
			case 0:
				dom += `<style>.domspace {margin-bottom: 15%;}.domspace select{appearance:none;color:#000000;padding: 5px;background-color:#ffffff;border-radius:10px;border:0.5px black solid;}.domspace .option{font-size: 0.75rem;}.layer_tools table td {padding: 1.5px;border: 0.5px #000000 solid;border-collapse: collapse;}.layer_tools .domspace table{border: none;}.layer_tools .domspace td{border: none;}</style>`;
				dom += `<table style="height: 5%;width:90%;border:1px #000000 solid; border-collapse: collapse;margin-bottom:10px;"><tr><td>戦</td><td>魔</td><td>僧</td><td>忍</td><td>メ</td><td>騎</td><td>召</td><td>計</td></tr><tr><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr></table><div class="domspace"></div>`;
				$("#layerroot").append(
					`<div id="tool_${d}" class="layer layer_help layer_tools" style="background-color:#eef0ff"><div>${dom}</div><div><div style="position:absolute;width:100%;bottom: 10px;" class="buttonspace"><button>キャラ設定</button> <button>読込</button> <button>出力</button> <button>全てリセット</button></div></div><button class="layerclosebtn" onclick="myremove(this.parentNode)">×</button></div>`
				);
				$(`#tool_${d}`)
					.find(".buttonspace button:eq(0)")
					.on("click", () => characalc.modeChange(0));
				$(`#tool_${d}`)
					.find(".buttonspace button:eq(1)")
					.on("click", () => characalc.modeChange(1));
				$(`#tool_${d}`)
					.find(".buttonspace button:eq(2)")
					.on("click", () => characalc.calc());
				characalc.setting(d);
				break;
			case 1:
				if (!globalThis.isBeta) return olert("現在開発中");
				dom += ``;
				$("#layerroot").append(
					`<div id="tool_${d}" class="layer layer_help layer_tools" style="background-color:#eef0ff"><div>${dom}</div><div><button onclick="layerclose(this)">閉じる</button></div><button class="layerclosebtn" onclick="myremove(this.parentNode)">×</button></div>`
				);
				break;
			case 2:
				dom +=
					"<style>.frame iframe{transform-origin:0 0;-moz-transform-origin:0 0;-webkit-transform-origin:0 0;-o-transform-origin:0 0;-ms-transform-origin:0 0;transform:scale(calc(4/9));-moz-transform:scale(calc(4/9));-webkit-transform:scale(calc(4/9));-o-transform:scale(calc(4/9));-ms-transform:scale(calc(4/9));width: 320px;height: 270px;}.frame{width: calc((100% - 40px) / 3);display:inline-block;}</style>";
				dom +=
					'<div class="frame"><iframe src="./AdRectangle_nin.html"></iframe></div><div class="frame"><iframe src="./AdRectangle_nin.html"></iframe></div><div class="frame"><iframe src="./AdRectangle_nin.html"></iframe></div><br /><button>再抽選</button>';
				$("#layerroot").append(
					`<div id="tool_${d}" class="layer layer_help layer_tools" style="background-color:#eef0ff"><div class="domspace">${dom}</div><br /><div><button onclick="layerclose(this)">閉じる</button></div><button class="layerclosebtn" onclick="myremove(this.parentNode)">×</button></div>`
				);
				$("#layerroot .domspace button").on("click", () => {
					$("#layerroot .domspace iframe").each((i, e) => {
						e.src = "";
						setTimeout(
							() => (e.src = "./AdRectangle_nin.html"),
							1500 + i * 500
						);
					});
				});
		}
	};
})();
