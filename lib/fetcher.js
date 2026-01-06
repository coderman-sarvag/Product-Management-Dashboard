export const fetcher = (url) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Fetch failed");
    return res.json();
  });
