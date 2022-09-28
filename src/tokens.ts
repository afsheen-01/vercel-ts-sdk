import fetch from "node-fetch";
import { config, endpointMap } from "./common";

export const getUserTokens = () => {
  const url = endpointMap.userTokens;
  return fetch(url, {
    method: "get",
    headers: {
      ...config,
    },
  });
};

/* 
ideally, we should be able to generate a complete typed function by using a YAML definition like this...

```yaml
path: /v5/user/tokens
type: get
requestSchema: none
responseSchema:
    tokens: array Tokens
    testingToken: {}
    pagination: Pagination
```
*/
