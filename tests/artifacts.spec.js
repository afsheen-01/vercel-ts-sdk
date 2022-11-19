import {beforeAll, test, expect} from '@jest/globals'
import { endpointMap, BASE_URL } from '../src/utils/common'
import {checkArtifactExists, downloadCacheArtifact, getRemoteCachingStatus, recordCacheUsageEvent, uploadCacheArtifact, setVercelToken} from '../src/index'

beforeAll(() => setVercelToken(process.env.VERCEL_TOKEN));

test("check if artifact exists", async () => {
	const { data, error } = await checkArtifactExists({hash:"abcd",teamId:"team1"})
	if (error) console.log(error)
	expect(error).toBe(null)
	expect(data?.method).toEqual("head")
	expect(data?.url).toContain(BASE_URL + endpointMap.checkArtifactExists("abcd"))
	expect(data?.query).toEqual({teamId:"team1"})
})

test("download cache artifact", async () => {
	const { data, error } = await downloadCacheArtifact({hash:"abcd",teamId:"team1",artifactClientInteractive:1})
	if (error) console.log(error)
	expect(error).toBe(null)
	expect(data?.method).toEqual("get")
	expect(data?.url).toContain(BASE_URL + endpointMap.downloadCacheArtifact("abcd"))
	expect(data?.query).toEqual({teamId:"team1"})
	expect(data?.headers).toHaveProperty("x-artifact-client-interactive")
	expect(data?.headers["x-artifact-client-interactive"]).toEqual("1")
})

test("get remote caching status", async () => {
	const { data, error } = await getRemoteCachingStatus({teamId:"team1"})
	if (error) console.log(error)
	expect(error).toBe(null)
	expect(data?.method).toEqual("get")
	expect(data?.url).toContain(BASE_URL + endpointMap.getRemoteCachingStatus)
	expect(data?.query).toEqual({teamId:"team1"})
})

test("record cache usage event", async () => {
	const { data, error } = await recordCacheUsageEvent({teamId:"team1",artifactClientInteractive:1,event:"HIT",hash:"abcd",sessionId:"session1",source:"LOCAL",duration:123})
	if (error) console.log(error)
	expect(error).toBe(null)
	expect(data?.method).toEqual("post")
	expect(data?.url).toContain(BASE_URL + endpointMap.recordCacheUsageEvent)
	expect(data?.query).toEqual({teamId:"team1"})
	expect(data?.headers).toHaveProperty("x-artifact-client-interactive")
	expect(data?.headers["x-artifact-client-interactive"]).toEqual("1")
	expect(data?.body).toEqual(JSON.stringify({event:"HIT",hash:"abcd",sessionId:"session1",source:"LOCAL",duration:123}))
})

test("upload cache artifact", async () => {
	const { data, error } = await uploadCacheArtifact({hash:"abcd",teamId:"team1",artifactClientInteractive:1,artifactDuration:1000})
	if (error) console.log(error)
	expect(error).toBe(null)
	expect(data?.method).toEqual("put")
	expect(data?.url).toContain(BASE_URL + endpointMap.uploadCacheArtifact("abcd"))
	expect(data?.query).toEqual({teamId:"team1"})
	expect(data?.headers["x-artifact-client-interactive"]).toEqual("1")
	expect(data?.headers["x-artifact-duration"]).toEqual("1000")
})