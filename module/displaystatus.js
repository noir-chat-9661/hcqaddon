(function () {
  addonModules.displaystatus = true;
  $("#chattypebar").before(
    `<div id="chatmode" style="width:auto; height: 36px; background-color: #999999; color: #ffffff;"><div class="chattypebar_btn" style="width: 50%; border: 0.2px solid #ffffff;">チャット<span class="midokusuu" style="background"></span></div><div class="chattypebar_btn" style="width: 50%; border: 0.2px solid #ffffff;">フィールド</div></div>`
  );
  $("#itemuistyle").after(
    "<style>#field_status {background-color: #aaffaa; background-clip: border-box;background-attachment: scroll; background-image: none; padding: 3px; min-height: 400px;text-align:center;}#field_status .fieldchara {margin-top: 10px; margin-bottom: 10px;}#field_status h2 {font-size: 1.5rem;}#field_status h3 {font-size: 1.2rem;}#field_status .status_hpbar, #field_status .status_spbar {overflow: hidden; position: relative; height: 18px; width: 80%; display: inline-block; background-color: #cccccc;}#field_status .status_nowhp {height: 100%; background-color: #55ff55; left: 0; top: 0; position: absolute;}#field_status .status_nowsp {height: 100%; background-color: #ffff55; left: 0; top: 0; position: absolute;}#field_status .status_hptext, #field_status .status_sptext{position: absolute; left: 50%; transform: translateX(-50%); text-align: center;}</style>"
  );
  $("#partychat").after(
    '<div id="field_status" style="display: none"><p>戦闘が発生していません。</p></div>'
  );
  const fieldStatus = $("#field_status");
  let ct = 0;
  const gI = (i) => document.getElementById(i);
  const chatMode = (mode) => {
    if (mode == 0) {
      $("#chattypebar").show();
      if (fieldStatus.css("display") == "none") return;
      fieldStatus.hide();
      ChatType(ct);
    } else if (mode == 1) {
      if (fieldStatus.css("display") != "none") return;
      fieldStatus.show();
      ct =
        gI("areachat").style.display !== "none"
          ? 1
          : gI("partychat").style.display !== "none"
          ? 2
          : gI("guildchat")?.style
          ? 3
          : gI("musilist")?.style
          ? 6
          : 4;
      $("#chattypebar").hide();
      $("#areachat").hide();
      $("#partychat").hide();
      $("#chatdiv").empty().hide();
    }
  };
  $("#chatmode .chattypebar_btn:eq(0)").on("click", () => chatMode(0));
  $("#chatmode .chattypebar_btn:eq(1)").on("click", () => chatMode(1));
  this.F5fild = (field, channel) => {
    if (errorflg_fild > ERRORCOUNT) return 0;
    rate_fild++;
    if (rate_fild > 99999) rate_fild = 1;
    if (now_field == 0 || field != now_field)
      return fieldStatus.html("<p>戦闘が発生していません。</p>");
    if (now_channel == 0 || channel != now_channel)
      return fieldStatus.html("<p>戦闘が発生していません。</p>");
    if (ecoflg == 2) {
      $("#ecoimgdiv2").show();
      $("#fildgamen").empty();
      setTimeout(() => {
        F5fild(field, channel);
      }, 500);
      fieldStatus.html("<p>超エコモードになっているため表示できません。</p>");
      return;
    } else {
      $("#ecoimgdiv2").hide();
    }
    if (ecoflg == 1) {
      fieldStatus.html("<p>エコモードになっているため表示できません。</p>");
      $("#ecoimgdiv").show();
    } else {
      $("#ecoimgdiv").hide();
    }
    let daterate_old = datarate;
    $.ajax({
      type: "POST",
      url: "./F5field.php",
      data: {
        marumie: SID,
        seskey,
        datarate,
        rate_fild,
        field: now_field,
        channel: now_channel,
        ecoflg,
        dsflg: dsflgspecial,
      },
      success: function (response) {
        if (response.error == 400)
          return setTimeout(() => {
            F5fild(field, channel);
          }, 800);
        if (response.error == 100)
          return setTimeout(() => {
            F5fild(field, channel);
          }, 400);
        if (response.error != 1) {
          errorflg_fild++;
          if (errorflg_fild > ERRORCOUNT)
            return alert("サーバとの同期に失敗しました001");
          return setTimeout(() => {
            F5fild(field, channel);
          }, 400);
        }
        if (rate_fild != response.rate) return;
        if (response.datarate <= datarate)
          return setTimeout(() => {
            F5fild(field, channel);
          }, 400);
        datarate = Number(response.datarate);
        if (datarate >= 99999998) datarate = 0;
        if (field != 4 && now_stage < response.stage) {
          now_stage = response.stage;
          HaikeiMove(now_stage);
        }
        if (!response.task)
          return setTimeout(() => {
            F5fild(field, channel);
          }, 400);
        if (effectflg) $("#effectgamen").empty();
        for (let i = 0; i < response.task.length; i++)
          DataSplit(response.task[i]);
        $("#fildgamen").html(response.fildsource);
        const teams = ["team_a", "team_b"];
        const teamdoms = [[], []];
        if ($("#fildgamen .object").length && !ecoflg) {
          if (now_field == 3 && SID != 16762) {
            fieldStatus.html("<p>ミッションでは使用させm…できません(迫真)</p>");
          } else {
            fieldStatus.html(
              '<div id="fieldstatus_friend"><h2>味方</h2><div class="objects"></div></div><br /><br /><div id="fieldstatus_enemy"><h2>敵</h2><div class="objects"></div></div>'
            );
            $("#fildgamen .object").each((i, e) => {
              const hpbar = $(e).find(".obj_hpbar:eq(0)");
              if (!hpbar[0]) return;
              const id = Number(
                $(e)
                  .find(".objclick:eq(0)")
                  ?.attr?.("onclick")
                  ?.split?.("(")?.[1]
                  ?.split?.(",")?.[0]
              );
              if (id == NaN) return;
              const hp = hpbar.attr("style").split(":")[1];
              const sp = $(e)
                .find(".obj_spbar:eq(0)")
                .attr("style")
                .split(":")[1];
              const dom = `<div class="fieldchara"><span class="charaname">${$(
                e
              )
                .find(".obj_name:eq(0)")
                .text()}</span> x:${
                $(e).attr("style").split(":")[1].split("%")[0]
              } y:${
                $(e).attr("style").split(":")[2].split("%")[0]
              }<br />HP:<div class="status_hpbar"><div class="status_nowhp" style="width:${hp}"></div><span class="status_hptext">${hp}</span></div><br />SP:<div class="status_spbar"><div class="status_nowsp" style="width:${sp}"></div><span class="status_sptext">${sp}</span></div></div>`;
              teamdoms[
                e.classList.contains(teams[response.myteam]) ? 0 : 1
              ].push({ id, dom });
            });
            const sorted = teamdoms.map((n) =>
              n.toSorted((a, b) => a.id - b.id).map((n) => n.dom)
            );
            $("#fieldstatus_friend").append(sorted[0].join(""));
            $("#fieldstatus_enemy").append(sorted[1].join(""));
          }
        }
        sp = response["sp"];
        MyTeam(response.myteam);
        $("#lv_now").text(response.lv);
        $("#fieldinfo_petname").html(response.petname);
        $("#hp_now").text(response.hp);
        $("#sp_now").text(response.sp);
        $("#tp_now").text(response.tp);
        $("#nowexp").text(response.nowexp);
        $("#hp_max").text(response["hp_max"]);
        $("#sp_max").text(response["sp_max"]);
        $("#next_exp").text(response["next_exp"]);
        $("#gvdaicount").text(response.gvdaicount);
        $("#hpbar_nokori").css("width", response.nokorihp);
        $("#spbar_nokori").css("width", response.nokorisp);
        $("#expbar_nokori").css("width", response.nokoriexp);
        if (response.quizbonus > 0) {
          $("#quizbonustime").text(response.quizbonus);
        } else {
          $("#quizbonustime").text("");
        }
        if (
          now_field == 1 ||
          now_field == 2 ||
          now_field == 5 ||
          now_field == 6 ||
          now_field == 7
        ) {
          if (response.gvdaicount > 0 && response.gvdaicount <= 5)
            TabMenuGvChara();
          if (response.gvdaicount == 0) {
            $("usertec").hide();
            wait_TabMenuGvChara = 0;
          }
        }
        if (now_field == 4) {
          $("#nowex").text(`スコア ${response.nowexp}`);
          $("#nextexp").text(`目標 ${response.nextexp}`);
          $("#expbar_nokori").css("width", response.nokoriexp);
        }
        if (daterate_old != 0) {
          if (response.droptxt != "") myLog(response.droptxt);
        }
        errorflg_fild = 0;
        setTimeout(() => {
          F5fild(field, channel);
        }, 200);
      },
      error: function (_0x59d54e) {
        errorflg_fild++;
        if (errorflg_fild > ERRORCOUNT) return;
        return setTimeout(function () {
          F5fild(field, channel);
        }, 500);
      },
    });
  };
  if (!Array.prototype?.toSorted || 1) {
    Array.prototype.toSorted = function (f) {
      this.sort(f);
      return this;
    };
  }
})();
