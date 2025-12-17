export function getQueryParam(params, key) {
  return params?.get?.(key) || "";
}


