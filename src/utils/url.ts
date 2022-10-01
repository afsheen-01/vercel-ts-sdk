export const constructQueryString = (
  url: string,
  query?: { [key: string]: string | number | boolean }
) => {
  if (!query) {
    return url;
  }
  const kvPairs = Object.entries(query);
  const params = kvPairs
    .map((value) => `${value[0]}=${encodeURIComponent(value[1])}`)
    .join("&");
  return `${url}?${params}`;
};

// constructQueryString(url, { param1: "something", param2: something })
// constructQueryString(url, { param1: "something" });
// constructQueryString(url, null);
// // constructQueryString(url, {});

// newURL = `${url}?param1=${param1}&param2=${param2}`[
//     [
//         ("param1=${param1}", "param2=${param2}")
// ];
