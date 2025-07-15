(async function () {
	addonModules.morepresets = true;

	if (!this.addonApp) {
		this.getPresetData = async () => {
			return JSON.parse(localStorage.getItem("presets"));
		};
		this.setPresetData = (d, preset) => {
			localStorage.setItem("presets", JSON.stringify(d));
			presets = d;
		}
		this.presets = (await getPresetData()) || {
			version: 3,
			data: {
				ougi: [],
			},
		};
	}

	const randomUUID = () => URL.createObjectURL(new Blob()).slice(-36);

	let shiftPressed = false;
	$(document).on("keydown", (e) => {
		if (e.key === "Shift") {
			shiftPressed = true;
		}
	});
	$(document).on("keyup", (e) => {
		if (e.key === "Shift") {
			shiftPressed = false;
		}
	});

	this.SceneOugiPreset = (reload = false) => {
		if (reload) {
			DouzyouOugiMode();
		}
		if ($("#ougipreset").length) {
			myremove("#ougipreset");
		}
		if (presets.version != 3) {
			presets.data.ougi = presets.data.ougi.map((preset) => {
				const list = preset.list;
				const last = list.pop();
				list.splice(4, 0, last);
				preset.updateTimestamp = Date.now();
				return preset;
			});
			presets.version = 3;
			setPresetData(presets);
			return $("#layerroot").append(
				`<div id="ougipreset" class="layer">
					<style>
						#ougipreset {
							background-color: #ffdd88;
						}
					</style>
					<button class="layerclosebtn" onclick="myremove('#ougipreset')" id="ougipresetclosebtn">×</button>
					<div class="sourcespace">
						<h1>プリセットのバージョンが古いため、更新しました</h1>
						<button onclick="SceneOugiPreset()">OK</button>
					</div>
				</div>`
			);
		}
		if (presets.data.ougi.length == 0) {
			$("#layerroot").append(
				`<div id="ougipreset" class="layer">
					<style>
						#ougipreset {
							background-color: #ffdd88;
						}
						#ougipreset button {
							margin: 3px;
						}
						#ougipreset .sourcespace {
							user-select: none;
						}
					</style>
					<button class="layerclosebtn" onclick="myremove('#ougipreset')" id="ougipresetclosebtn">×</button>
					<div class="sourcespace">
						<h1>プリセットがありません</h1>
						<br />
						${window.addonApp ? '<button onclick="updatePreset()">更新</button>' : ""}
						<button onclick="exportPreset()">現在の編成を保存</button>
						<button onclick="sharePresetMode()">共有</button>
					</div>
				</div>`
			);
			return;
		} else {
			$("#layerroot").append(
				`<div id="ougipreset" class="layer">
					<button class="layerclosebtn" onclick="myremove('#ougipreset')" id="ougipresetclosebtn">×</button>
					<style>
						#ougipreset {
							background-color: #ffdd88;
						}
						#ougipreset button {
							margin: 3px;
						}
						.preset {
							background-color: #ffffff;
							border: 1px solid #000000;
							padding: 3px;
							margin: 3px;
						}
						.presetname {
							display: inline-block;
							width: calc(100% - 150px);
							overflow: hidden;
						}
						.presetname input {
							width: calc(100% - 50px);
						}
						.presetname a {
							text-decoration: none;
						}
						.presetbtn {
							display: inline-block;
							width: 100px;
							text-align: right;
						}
						#ougipresetlist {
							max-height: 80%;
						}
						#ougipreset .sourcespace {
							user-select: none;
						}
						.presetbtn a {
							margin-left: 5px;
							text-decoration: none;
							color: #000000;
						}
						.ui-state-highlight {
							height: 1.5em;
							line-height: 1.2em;
							background-color: #ffcc88;
							border: 1px solid #000000;
						}
						.presetmovehandle {
							cursor: move;
							margin-right: 5px;
						}
					</style>
					<div class="sourcespace">
						<h1>プリセット</h1>
						<input type="text" id="presetname" placeholder="プリセット名検索" oninput="searchPreset(this)" />
						<div id="ougipresetlist">
							${presets.data.ougi
								.map((preset, index) => {
									return `<div class="preset">
										<span class="presetmovehandle">≡</span>
										<input type="hidden" class="presetid" value="${preset.id}" />
										<span class="presetname">${preset.name}</span>
										<span class="presetbtn">
											<a href="javascript:void(0)" onclick="namePreset('${preset.id}')">✏️</a>
											<a href="javascript:void(0)" onclick="deletePreset('${preset.id}')">🗑️</a>
											<a href="javascript:void(0)" onclick="importPresetMenu('${preset.id}')">📥</a>
										</span>
									</div>`;
								})
								.join("")}
						</div>
						<br />
						${window.addonApp ? '<button onclick="updatePreset()">更新</button>' : ""}
						<button onclick="exportPreset()">現在の編成を保存</button>
						<button onclick="sharePresetMode()">共有</button>
					</div>
				</div>`
			);
		}
		$("#ougipresetlist").sortable({
			axis: "y",
			handle: ".presetmovehandle",
			placeholder: "ui-state-highlight",
			opacity: 0.8,
			tolerance: "pointer",
			stop: (e, ui) => {
				const newOrder = $("#ougipresetlist .preset")
					.map((i, e) => $(e).find(".presetid").val())
					.get();
				presets.data.ougi = newOrder.map((id) => presets.data.ougi.find((p) => p.id == id));
				setPresetData(presets);
			},
		});
	};

	this.updatePreset = async () => {
		this.presets = await getPresetData();
		this.SceneOugiPreset();
	};

	this.searchPreset = (input) => {
		const value = input.value.toLowerCase();
		$("#ougipresetlist .preset").each((i, e) => {
			const name = $(e).find(".presetname").text().toLowerCase();
			if (name.includes(value)) {
				$(e).show();
			} else {
				$(e).hide();
			}
		});
	};

	const ids = [1, 2, 3, 4, 15, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
	this.importPresetMenu = async (id) => {
		const index = presets.data.ougi.findIndex((p) => p.id == id);
		const preset = presets.data.ougi[index];
		const select = (id) => `<select class="ougiidselect">
			<option value="0">変更しない</option>
			${presets.data.ougi[index].list
				.map(
					(ougi, ougiid) =>
						`<option value="${ougiid + 1}" ${
							id == ougiid + 1 ? "selected" : ""
						}>${ougi.n}</option>`
				)
				.join("")}
			</select>`;
		$("#ougipreset .sourcespace").html(
			`<h1>読み込む奥義を選択してください。</h1>
			<div id="ougipresetlist">
				奥義１→${select(1)}<br />
				奥義２→${select(2)}<br />
				奥義３→${select(3)}<br />
				奥義４→${select(4)}<br />
				奥義５→${select(5)}<br />
				奥義６→${select(6)}<br />
				奥義７→${select(7)}<br />
				奥義８→${select(8)}<br />
				奥義９→${select(9)}<br />
				奥義10→${select(10)}<br />
				奥義11→${select(11)}<br />
				奥義12→${select(12)}<br />
				奥義13→${select(13)}<br />
				奥義14→${select(14)}<br />
				奥義15→${select(15)}<br />
			</div>
			<button onclick="importPreset('${preset.id}')">読み込み</button>
			<div id="ownwaza" style="display:none"></div>`
		);
	};
	this.importPreset = async (id) => {
		const index = presets.data.ougi.findIndex((p) => p.id == id);
		const check =
			shiftPressed || confirm("このプリセットを読み込みますか？");
		if (check) {
			$("#ougipresetclosebtn").hide();
			await ajax("douzyou_WazaList.php", {
				type: "POST",
				data: {
					marumie: myid,
					seskey,
				},
			}).then((r) => $("#ownwaza").html(r.source));
			const ownwaza = $(".wazalist_wazaid")
				.map((i, e) => $(e).val())
				.get();
			let c = 0;
			const i = $("#ougipresetlist .ougiidselect")
				.map((x, element) => {
					if ($(element).val() == 0) {
						return { ougimei: "", ougiPalette: [] };
					} else {
						const v = Number($(element).val());
						const d = presets.data.ougi[index]?.list?.[v - 1];
						if (d) {
							return {
								ougimei: d.n,
								ougiPalette: d.p,
							};
						} else {
							return { ougimei: "", ougiPalette: [] };
						}
					}
				})
				.get();
			$("#ougipreset .sourcespace").html(
				`<h1>プリセットを読み込み中...</h1>
				<div id="ougipreset_progress">0/${
					i.filter((n) => n.ougiPalette.length).length
				}</div>`
			);
			const error = [];
			for (let ougiid = 0; ougiid < 15; ougiid++) {
				const { ougimei, ougiPalette } = i[ougiid];
				if (!ougiPalette.length) {
					continue;
				}
				await new Promise((r) => setTimeout(r, 500));
				if (
					ougiPalette.filter((n) => n && !ownwaza.includes(n)).length
				) {
					error.push(ougimei);
					continue;
				}
				const response = await ajax("douzyou_OugiUpdate.php", {
					type: "POST",
					data: {
						marumie: myid,
						seskey,
						ougiid: ids[ougiid],
						ougimei,
						ougiPalette,
					},
				});
				if (response.error == 2) {
					ougiid--;
					await new Promise((r) => setTimeout(r, 1000));
					continue;
				}
				if (response.error != 1) {
					return alert("プリセットの読み込みに失敗しました");
				} else {
					c++;
					$("#ougipreset_progress").html(
						`${c}/${i.filter((n) => n.ougiPalette.length).length}`
					);
				}
			}
			$("#ougipreset .sourcespace").html(
				`<h1>プリセットを読み込みました</h1>
				${
					error.length
						? `<h2>以下の奥義は技が足りないため読み込めませんでした</h2><div>${error.join(
								"・"
						  )}</div>`
						: ""
				}
				<button onclick="SceneOugiPreset(true)">戻る</button>`
			);
		}
	};

	this.deletePreset = (id) => {
		const index = presets.data.ougi.findIndex((p) => p.id == id);
		const check = shiftPressed || confirm("このプリセットを削除しますか？");
		if (check) {
			$("#ougipresetclosebtn").hide();
			presets.data.ougi.splice(index, 1);
			setPresetData(presets);
			if (shiftPressed) return SceneOugiPreset();
			$("#ougipreset .sourcespace").html(
				`<h1>プリセットを削除しました</h1>
				<button onclick="SceneOugiPreset()">戻る</button>`
			);
		}
	};
	this.namePreset = (id) => {
		const index = presets.data.ougi.findIndex((p) => p.id == id);
		if ($(`#ougipreset .sourcespace .presetname:eq(${index}) .presetnameinput`).length) return cancelPresetName(id);
		const preset = presets.data.ougi[index];
		$(`#ougipreset .sourcespace .presetname:eq(${index})`).html(
			`<input type="text" class="presetnameinput" value="${preset.name}" />
			<a href="javascript: void(0)" onclick="setPresetName('${preset.id}')">✔</a>
			<a href="javascript: void(0)" onclick="cancelPresetName('${preset.id}')">❌️</a>`
		)
	};
	this.cancelPresetName = (id) => {
		const index = presets.data.ougi.findIndex((p) => p.id == id);
		$(`#ougipreset .sourcespace .presetname:eq(${index})`).html(presets.data.ougi[index].name);
	}
	this.setPresetName = (id) => {
		const index = presets.data.ougi.findIndex((p) => p.id == id);
		const name = $(`#ougipreset .sourcespace .presetname:eq(${index}) .presetnameinput`).val().trim();
		if (name) {
			$("#ougipresetclosebtn").hide();
			presets.data.ougi[index].name = name;
			setPresetData(presets);
			$("#ougipreset .sourcespace").html(
				`<h1>プリセットの名前を変更しました</h1>
				<button onclick="SceneOugiPreset()">戻る</button>`
			);
		}
	};
	this.exportPreset = async () => {
		const check =
			shiftPressed || confirm("現在の編成をプリセットに登録しますか？");
		if (check) {
			$("#ougipresetclosebtn").hide();
			$("#ougipreset .sourcespace").html(
				`<h1>プリセットを登録中...</h1>
				<div id="ougipreset_progress">0/15</div>`
			);
			const list = [];
			for (let i = 0; i < 15; i++) {
				await new Promise((r) => setTimeout(r, 500));
				const response = await ajax("douzyou_OugiEdit.php", {
					type: "POST",
					data: {
						marumie: myid,
						seskey,
						ougiid: ids[i],
					},
				});
				if (response.error == 2) {
					i--;
					await new Promise((r) => setTimeout(r, 1000));
					continue;
				}
				if (response.error != 1) {
					return alert("プリセットの登録に失敗しました");
				} else {
					list.push({
						p: response.ougidata.map((n) => n.wazaid || ""),
						n: response.ougimei,
					});
					$("#ougipreset_progress").html(`${i + 1}/15`);
				}
			}
			const { name } = await ajax("myhouse_NowStatus.php", {
				type: "POST",
				data: {
					marumie: myid,
					seskey,
				},
			})
			presets.data.ougi.push({
				id: randomUUID(),
				updateTimestamp: Date.now(),
				name: name + "のプリセット",
				list,
			});
			setPresetData(presets);
			$("#ougipreset .sourcespace").html(
				`<h1>プリセットを登録しました</h1>
				<button onclick="SceneOugiPreset()">戻る</button>`
			);
		}
	};

	this.sharePresetMode = () => {
		$("#ougipreset .sourcespace").html(
			`<h1>モード選択</h1><br />
			<button onclick="sharePresetMenu('import')">インポート</button>
			<button onclick="sharePresetMenu('export')">エクスポート</button><br /><br />
			<button onclick="SceneOugiPreset()">戻る</button>`
		);
	}

	this.sharePresetMenu = (type) => {
		if (type == "import") {
			$("#ougipreset .sourcespace").html(
				`<h1>共有されたプリセットを読み込む</h1><br />
				<input type="file" id="sharefile" accept=".json" />
				<button onclick="sharePreset('import', 'file')">読み込み</button><br />
				<p>または</p>
				<input id="sharecode" autocomplete="off" placeholder="コードを入力">
				<button onclick="sharePreset('import', 'code')">読み込み</button><br />
				<button onclick="sharePresetMode()">戻る</button>`
			);
		} else if (type == "export") {
			$("#ougipreset .sourcespace").html(
				`<h1>共有するプリセットを選択してください</h1><br />
				<div id="ougipresetlist">
					${presets.data.ougi
						.map((preset) => {
							return `<p><label><input type="checkbox" value="${preset.id}" /> ${preset.name}</label></p>`;
						})
						.join("")
					}
				</div>
				<br />
				<button onclick="sharePreset('export', 'file')">ファイル形式で共有</button><br />
				<select id="shareexpires">
					<option value=0>無期限</option>
					<option value=1>30分</option>
					<option value=2>1時間</option>
					<option value=3>6時間</option>
					<option value=4>12時間</option>
					<option value=5>24時間</option>
					<option value=6>7日</option>
					<option value=7>30日</option>
				</select>
				<button onclick="sharePreset('export', 'code')">コードで共有</button><br /><br />
				<button onclick="sharePresetMode()">戻る</button>`
			);
		}
	};

	this.sharePreset = async (mode, type) => {
		if (mode == "import") {
			if (type == "file") {
				const file = $("#sharefile")[0].files[0];
				if (!file) {
					alert("ファイルを選択してください");
					return;
				}
				const reader = new FileReader();
				reader.onload = async (e) => {
					const data = JSON.parse(e.target.result);
					data.forEach((preset) => {
						if (
							presets.data.ougi.find((p) => p.id == preset.id)
						) {
							const index = presets.data.ougi.findIndex(
								(p) => p.id == preset.id
							);
							if (
								presets.data.ougi[index].updateTimestamp <
								preset.updateTimestamp
							) {
								presets.data.ougi[index] = preset;
							}
						} else {
							presets.data.ougi.push(preset);
						}
					});
					setPresetData(presets);
					$("#ougipreset .sourcespace").html(
						`<h1>プリセットを読み込みました</h1><br />
						<button onclick="SceneOugiPreset()">戻る</button>`
					);
				};
				reader.readAsText(file);
			} else if (type == "code") {
				const id = $("#sharecode").val();
				if (!id) {
					alert("コードを入力してください");
					return;
				}
				if (id.length != 32) {
					alert("コードが不正です");
					return;
				}
				const response = await fetch("https://api.pjeita.top/preset", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						type: "ougi",
						id
					}),
				}).then((r) => r.json());
				if (response.error) {
					alert("プリセットの読み込みに失敗しました");
					return;
				} else {
					response.data.forEach((preset) => {
						if (
							presets.data.ougi.find((p) => p.id == preset.id)
						) {
							const index = presets.data.ougi.findIndex(
								(p) => p.id == preset.id
							);
							if (
								presets.data.ougi[index].updateTimestamp <
								preset.updateTimestamp
							) {
								presets.data.ougi[index] = preset;
							}
						} else {
							presets.data.ougi.push(preset);
						}
					})
					setPresetData(presets);
					$("#ougipreset .sourcespace").html(
						`<h1>プリセットを読み込みました</h1><br />
						<button onclick="SceneOugiPreset()">戻る</button>`
					);
				}
			}
		} else if (mode == "export") {
			const selected = $("#ougipresetlist input:checked")
				.map((i, e) => $(e).val())
				.get();
			if (selected.length == 0) {
				alert("プリセットを選択してください");
				return;
			}
			const data = presets.data.ougi.filter((preset) =>
				selected.includes(preset.id)
			);
			if (type == "file") {
				const blob = new Blob([JSON.stringify(data)], {
					type: "application/json",
				});
				const url = URL.createObjectURL(blob);
				$("#ougipreset .sourcespace").html(
					`<h1>プリセットを共有しました</h1><br />
					<a href="${url}" download="preset.json">ダウンロード</a><br /><br />
					<button onclick="SceneOugiPreset()">戻る</button>`
				);
			} else if (type == "code") {
				const expires = Number($("#shareexpires").val());
				const response = await fetch("https://api.pjeita.top/preset", {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						type: "ougi",
						data,
						myid,
						expires
					}),
				}).then((r) => r.json());
				if (response.error) {
					alert("プリセットの共有に失敗しました");
					return;
				} else {
					const {id, expires} = response;
					$("#ougipreset .sourcespace").html(
						`<h1>プリセットを共有しました</h1><br />
						<p>コード: <input id="sharecode" value="${id}" readonly></p>
						<p>有効期限: ${expires ? new Date(expires).toLocaleString("ja") : "無し"}</p><br />
						<a href="javascript:void(0)" onclick="copyShareCode(this)">コピー</a><br /><br /><br />
						<button onclick="SceneOugiPreset()">戻る</button>`
					);
				}
			}
		}
	}

	let t = null
	this.copyShareCode = (e) => {
		document.getElementById("sharecode").select();
  		document.execCommand("copy");
		getSelection().empty();
		$(e).html("コピー完了");
		const tn = t;
		t = setTimeout(() => {
			if (t == tn) $(e).html("コピー");
		}
		, 1500);
	}

	this.SceneOugilist = () => {
		$(".scene").hide();
		const dom = `<img src="picts/scene_douzyou.png" class="scenehaikeiimg" />
			<div class="onegamen">
				<div class="hanyoudiv" style="background-color:#fadfa0;">
					<div>奥義の作成ができます</div>
					<div id="ougilistbtnspace">
						<div class="ougilistbtn">１<div class="sw1" onclick="myopen('#ougilistbtnspace', '.sw1');myclose(this);myclose('.ougilistdiv');myopen('#ougilist1');" style="display:none">１</div></div>
						<div class="ougilistbtn">２<div class="sw1" onclick="myopen('#ougilistbtnspace', '.sw1');myclose(this);myclose('.ougilistdiv');myopen('#ougilist2');">２</div></div>
						<div class="ougilistbtn">３<div class="sw1" onclick="myopen('#ougilistbtnspace', '.sw1');myclose(this);myclose('.ougilistdiv');myopen('#ougilist3');">３</div></div>
						<div class="ougilistbtn">４<div class="sw1" onclick="myopen('#ougilistbtnspace', '.sw1');myclose(this);myclose('.ougilistdiv');myopen('#ougilist4');">４</div></div>
						<div class="ougilistbtn">５<div class="sw1" onclick="myopen('#ougilistbtnspace', '.sw1');myclose(this);myclose('.ougilistdiv');myopen('#ougilist15');">５</div></div>
						<div class="ougilistbtn">６<div class="sw1" onclick="myopen('#ougilistbtnspace', '.sw1');myclose(this);myclose('.ougilistdiv');myopen('#ougilist5');">６</div></div>
						<div class="ougilistbtn">７<div class="sw1" onclick="myopen('#ougilistbtnspace', '.sw1');myclose(this);myclose('.ougilistdiv');myopen('#ougilist6');">７</div></div>
						<div class="ougilistbtn">８<div class="sw1" onclick="myopen('#ougilistbtnspace', '.sw1');myclose(this);myclose('.ougilistdiv');myopen('#ougilist7');">８</div></div>
						<div class="ougilistbtn">９<div class="sw1" onclick="myopen('#ougilistbtnspace', '.sw1');myclose(this);myclose('.ougilistdiv');myopen('#ougilist8');">９</div></div>
						<div class="ougilistbtn">10<div class="sw1" onclick="myopen('#ougilistbtnspace', '.sw1');myclose(this);myclose('.ougilistdiv');myopen('#ougilist9');">10</div></div>
						<div class="ougilistbtn">11<div class="sw1" onclick="myopen('#ougilistbtnspace', '.sw1');myclose(this);myclose('.ougilistdiv');myopen('#ougilist10');">11</div></div>
						<div class="ougilistbtn">12<div class="sw1" onclick="myopen('#ougilistbtnspace', '.sw1');myclose(this);myclose('.ougilistdiv');myopen('#ougilist11');">12</div></div>
						<div class="ougilistbtn">13<div class="sw1" onclick="myopen('#ougilistbtnspace', '.sw1');myclose(this);myclose('.ougilistdiv');myopen('#ougilist12');">13</div></div>
						<div class="ougilistbtn">14<div class="sw1" onclick="myopen('#ougilistbtnspace', '.sw1');myclose(this);myclose('.ougilistdiv');myopen('#ougilist13');">14</div></div>
						<div class="ougilistbtn">15<div class="sw1" onclick="myopen('#ougilistbtnspace', '.sw1');myclose(this);myclose('.ougilistdiv');myopen('#ougilist14');">15</div></div>

						<div class="clear"></div>
					</div>
					<div id="ougilist">Now loadgin</div>
					<button id="ougipresetbtn" style="margin-top">プリセット読み込み/登録</button> <button onclick="DouzyouEntry()" class="exitbtn">戻る</button>
				</div>
			</div>`;
		$("#scene").html(dom).css("display", "block");
		$("#ougipresetbtn")
			.removeAttr("id")
			.css({
				position: "absolute",
				bottom: "4px",
			})
			.on("click", SceneOugiPreset);
	};
})();
