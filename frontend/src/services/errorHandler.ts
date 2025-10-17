export const extractErrorMessage = (error: any): string => {
  const data = error.response?.data;

  if (!data) return error.message || "サーバーに接続できませんでした。";

  if (typeof data === "string") return data;

  return (
    data.detail ||
    data.non_field_errors?.[0] ||
    Object.values(data)[0]?.[0] ||
    error.message ||
    "エラーが発生しました。"
  );
};
