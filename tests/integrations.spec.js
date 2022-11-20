import {beforeAll, test, expect} from '@jest/globals'
import { endpointMap, BASE_URL } from '../src/utils/common'
import {deleteIntegrationConfig, listIntegrationConfigs, listGitNamespaces, listGitRepos, getIntegrationConfig, setVercelToken} from '../src/index'

beforeAll(() => setVercelToken(process.env.VERCEL_TOKEN));

test("delete integration config", async () => {
	const { data, error } = await deleteIntegrationConfig({integrationId:"ig1",teamId:"team1"})
	if (error) console.log(error)
	expect(error).toBe(null)
	expect(data?.method).toEqual("delete")
	expect(data?.url).toContain(BASE_URL + endpointMap.deleteIntegrationConfig("ig1"))
	expect(data?.query).toEqual({teamId:"team1"})
})

test("list integration configs", async () => {
	const { data, error } = await listIntegrationConfigs({view:"view1",teamId:"team1"})
	if (error) console.log(error)
	expect(error).toBe(null)
	expect(data?.method).toEqual("get")
	expect(data?.url).toContain(BASE_URL + endpointMap.listIntegrationConfigs)
	expect(data?.query).toEqual({view:"view1",teamId:"team1"})
})

test("list git namespaces", async () => {
	const { data, error } = await listGitNamespaces({provider:"github"})
	if (error) console.log(error)
	expect(error).toBe(null)
	expect(data?.method).toEqual("get")
	expect(data?.url).toContain(BASE_URL + endpointMap.listGitNamespaces)
	expect(data?.query).toEqual({provider:"github"})
})

test("list git repos", async () => {
	const { data, error } = await listGitRepos({provider:"github", namespaceId:1})
	if (error) console.log(error)
	expect(error).toBe(null)
	expect(data?.method).toEqual("get")
	expect(data?.url).toContain(BASE_URL + endpointMap.listGitRepos)
	expect(data?.query).toEqual({provider:"github",namespaceId:"1"})
})

test("get integration config", async () => {
	const { data, error } = await getIntegrationConfig({integrationId:"ig1"})
	if (error) console.log(error)
	expect(error).toBe(null)
	expect(data?.method).toEqual("get")
	expect(data?.url).toEqual(BASE_URL + endpointMap.getIntegrationConfig("ig1"))
})