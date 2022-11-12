/* eslint-disable camelcase */
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
        ]
      : [
          B_win_by_Submission,
          B_win_by_KO_TKO,
          B_win_by_Decision_Split,
          B_win_by_Decision_Majority,
          B_win_by_TKO_Doctor_Stoppage,
          B_wins,
          B_losses,
        ];
  };
}

// eslint-disable-next-line import/prefer-default-export
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
