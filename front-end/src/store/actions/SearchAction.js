//액션 타입

export const KEYWORD_SAVE = "KEYWORD_SAVE";

export const keywordSave = (keyword) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: KEYWORD_SAVE,
        keyword: keyword,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
