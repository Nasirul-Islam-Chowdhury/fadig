/**
 * fetch + JSON parse that survives non-JSON error responses (e.g. Vercel's
 * plain-text FUNCTION_INVOCATION_FAILED page) and surfaces readable errors.
 */
export async function fetchJson(url, options) {
  const res = await fetch(url, options);
  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(
      `Server error (${res.status}): ${text.slice(0, 140).trim() || "empty response"}`,
    );
  }
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}
