/* eslint-disable camelcase */
function parseToFloat(str) {
  return Number.parseFloat(str === '' ? '0' : str);
}

function mapFunction(fighterName) {
  return function a(e) {
    const {
      R_fighter,
      R_win_by_Submission,
      R_win_by_KO_TKO,
      R_win_by_Decision_Split,
      R_win_by_Decision_Majority,
      R_win_by_TKO_Doctor_Stoppage,
      R_wins,
      R_losses,
      B_win_by_Submission,
      B_win_by_KO_TKO,
      B_win_by_Decision_Split,
      B_win_by_Decision_Majority,
      B_win_by_TKO_Doctor_Stoppage,
      B_wins,
      B_losses,

      R_avg_HEAD_att,
      R_avg_BODY_att,

      B_avg_HEAD_att,
      B_avg_BODY_att,

      R_avg_LEG_att,
      B_avg_LEG_att,
    } = e;
    return R_fighter === fighterName
      ? [
          R_win_by_Submission,
          R_win_by_KO_TKO,
          R_win_by_Decision_Split,
          R_win_by_Decision_Majority,
          R_win_by_TKO_Doctor_Stoppage,
          R_wins,
          R_losses,
          R_avg_HEAD_att,
          R_avg_BODY_att,
          R_avg_LEG_att,
          R_avg_LEG_att,
        ]
      : [
          B_win_by_Submission,
          B_win_by_KO_TKO,
          B_win_by_Decision_Split,
          B_win_by_Decision_Majority,
          B_win_by_TKO_Doctor_Stoppage,
          B_wins,
          B_losses,
          B_avg_HEAD_att,
          B_avg_BODY_att,
          B_avg_LEG_att,
        ];
  };
}

function getFightersDammageStats(fighterName) {
  return function mapper(e) {
    const {
      R_fighter,
      R_avg_HEAD_att,
      R_avg_BODY_att,

      B_avg_HEAD_att,
      B_avg_BODY_att,

      R_avg_LEG_att,
      B_avg_LEG_att,

      R_avg_CLINCH_att,
      B_avg_CLINCH_att,

      B_avg_GROUND_att,
      R_avg_GROUND_att,

      R_avg_SIG_STR_att,
      B_avg_SIG_STR_att,

      R_avg_SUB_ATT,
      B_avg_SUB_ATT,
    } = e;

    return {
      head:
        R_fighter === fighterName
          ? parseToFloat(R_avg_HEAD_att)
          : parseToFloat(B_avg_HEAD_att),
      body:
        R_fighter === fighterName
          ? parseToFloat(R_avg_BODY_att)
          : parseToFloat(B_avg_BODY_att),
      leg:
        R_fighter === fighterName
          ? parseToFloat(R_avg_LEG_att)
          : parseToFloat(B_avg_LEG_att),
      clinch:
        R_fighter === fighterName
          ? parseToFloat(R_avg_CLINCH_att)
          : parseToFloat(B_avg_CLINCH_att),
      ground:
        R_fighter === fighterName
          ? parseToFloat(R_avg_GROUND_att)
          : parseToFloat(B_avg_GROUND_att),
      standing:
        R_fighter === fighterName
          ? parseToFloat(R_avg_SIG_STR_att)
          : parseToFloat(B_avg_SIG_STR_att),
      submition:
        R_fighter === fighterName
          ? parseToFloat(R_avg_SUB_ATT)
          : parseToFloat(B_avg_SUB_ATT),
    };
  };
}

export function getWinsAndLosses(data, fighterName) {
  const [
    win_by_Submission,
    win_by_KO_TKO,
    win_by_Decision_Split,
    win_by_Decision_Majority,
    win_by_TKO_Doctor_Stoppage,
    wins,
    losses,
  ] = data
    .map(mapFunction(fighterName))
    .reduce(
      (prev, curent) => prev.map((v, i) => (v > curent[i] ? v : curent[i])),
      [0, 0, 0, 0, 0, 0, 0]
    );
  return {
    win_by_Submission,
    win_by_KO_TKO,
    win_by_Decision_Split,
    win_by_Decision_Majority,
    win_by_TKO_Doctor_Stoppage,
    wins,
    losses,
  };
}

export function getFighterStats(data, fighterName) {
  const tmp = data.map(getFightersDammageStats(fighterName));

  return tmp.reduce((prev, cur) => {
    const keys = Object.keys(cur);
    const result = { ...cur };

    // eslint-disable-next-line no-restricted-syntax
    for (const key of keys) {
      result[key] =
        Number.parseFloat(result[key]) + Number.parseFloat(prev[key]);
    }
    return result;
  });
}
