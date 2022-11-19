# Dev guidelines

This document tries to cover most of the guidelines we use when developing this codebase.

1. Naming functions
2. Pagination parameters
3. Naming files
4. Generating the entry point (index.ts)
5. Writing and generating Tests

## Naming functions

Function names for the resources closely match the titles of the API endpoints.

Eg:

- List all teams: `listTeams`
- Update a team: `updateTeam`
- Get a team: `getTeam`

For all list-related endpoints (get all teams, get all users etc.), we name the function as `list<Resource>`.

For all single-resource endpoints (like get a team, get a user etc.), we name the function as `get<Resource>`.

Sometimes, Vercel mixes convention between "get" and "retrieve" or "delete" and "remove". This SDK typically uses the same verbs that the Vercel documentation uses.

## Pagination parameters

Vercel's API uses `limit` and `until` (cursor-based) parameters for pagination parameters and `next/previous` in the pagination response. This SDK uses `limit` and `next/previous` for pagination parameters and internally converts the `next/previous` to `until` when passing it to the underlying API call.

Vercel's API documentation does not cleanly separate pagination parameters: it's listed as part of the query params.

It is our responsibility to make sure that if we find pagination parameters in the query params documentation of any endpoint, we make sure to replace them with our pagination parameters instead.

Example of this can be found in many list-related functions. Here's one from `teams`:

On Vercel:

<img width="500" src="https://i.imgur.com/aMiZvTA.png" />

```ts
export const listTeams = (params?: ListTeamsParams) {
  ...
}

export type ListTeamsParams = {
  since?: number;
} & PaginationParameters;
// PaginationParameters is defined in a utils file that you can use.
```

## Naming files

We generally tend to use one-word names.

Should there be a need to use multi-word names, use kebab-case.

Eg:

```
// OK
some-file-name.ts

// Not OK
someFileName.ts
```

## Generating the entry point (index.ts)

The entry point to the project, `src/index.ts`, is generated automatically via a script.

We do this because it's cumbersome and error-prone to update the `index` file by hand (we might miss exporting all the functions from a resource file).

Everytime we update (more specifically, add or remove) functions from resource files (ie, files that map to the API endpoints/resources of Vercel's REST API), we run this command to update the entry point:

```bash
# ensure that this ./scripts.sh is executable
# chmod +x ./scripts.sh
./scripts.sh --generate-index
```

## Writing and generating Tests

Each resource function must have a corresponding test (or tests).

Test files are Javascript files. You should put them inside the `./tests` folder, and the naming convention is `<resource>.spec.ts`.

```
// eg for a resource file named "teams.ts"
./tests/teams.spec.ts
```

At this time, we don't typically write Javascript test files. Instead, we describe them in a YAML file and a script takes care of generating the actual test/spec file.

As an example, to write a test for the `DNS` resource, this is what we do:

- create a `dns.yml` file in `./tests/defs`
- describe the test in YAML (see `defs.yml` for details)
- once we're done, we run `./scripts.sh --generate-test dns.yml dns.spec.js` to generate `./tests/dns.spec.js`
- run `yarn test dns.spec.js` to run the test

### Test YAML configuration

Every test file starts with this:

```yaml
tests:
```

Each test is described by this:

```yaml
- name: create dns record # the name of the test (required)
  call: createDNSRecord # the actual function to test (required)
  with: '{ domain:"google.com", type:"sometype" }' # the arguments to be passed to the function described in `call` above. this is optional as some functions do not need any arguments. If the argument is a plain string, you can exclude the single quotes. If the argument is an object, then you have to wrap it in single quotes
  expect: # this is the series of assertions to make in this test
    - var: method # allowed vars are "method", "url", "body", and "query"
      value: post
    - var: url
      value: endpointMap.createDNSRecord("google.com") # this gets passed as-is and the test file will take care of evaluating this function
      rule: toEqual # this is optional. If you want to test equality (toEqual) you can skip this. But if you want to test some other rule (eg toContain, toBe, toBeTruthy), you have to specify that in the `rule` field.
    - var: body
      value: '{ type:"sometype" }'
```

Here's another example:

```yaml
- name: delete dns record
  call: deleteDNSRecord
  with: '{ domain:"google.com", recordId:"rec1", teamId:"team1" }'
  expect:
    - var: method
      value: delete
    - var: url
      value: endpointMap.deleteDNSRecord({domain:"google.com",recordId:"rec1"})
      rule: toContain
    - var: query
      value: '{ teamId:"team1" }'
```
