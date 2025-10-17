export const extractErrorMessage = (error: any): string => {
  const status = error.response?.status;
  const data = error.response?.data;

  if (!data) {
    // ネットワークエラーやサーバー応答なし
    if (!error.response) return "サーバーに接続できませんでした。";
    // ステータスが500系なら固定メッセージ
    if (status >= 500 && status < 600)
      return "サーバーで問題が発生しました。時間を置いて再度お試しください。";
    // それ以外はとりあえずerror.message
    return error.message || "不明なエラーが発生しました。";
  }

  if (typeof data === "string") return data;

  return (
    data.detail ||
    data.non_field_errors?.[0] ||
    Object.values(data)[0]?.[0] ||
    error.message ||
    "エラーが発生しました。"
  );
};
