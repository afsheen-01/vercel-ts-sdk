# Dev guidelines

This document tries to cover most of the guidelines we use when developing this codebase.

1. Naming functions
2. Pagination parameters
3. Naming files
4. Generating the entry point (index.ts)
5. Tests

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

![Vercel documentation](https://i.imgur.com/aMiZvTA.png)

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

## Tests

Each resource function must have a corresponding test (or tests).

Test files are Javascript files. You should put them inside the `./tests` folder, and the naming convention is `<resource>.spec.ts`.

```
// eg for a resource file named "teams.ts"
./tests/teams.spec.ts
```
