import {beforeAll, test, expect} from '@jest/globals'
import { endpointMap } from '../src/utils/common'
import {createNewCheck, getCheck, setVercelToken} from '../src/index'

beforeAll(() => setVercelToken(process.env.VERCEL_TOKEN));

test("create new check", async () => {
	const { data, error } = await createNewCheck({deploymentId: "dep1", teamId:"team1", name:"check-name"})
	if (error) console.log(error)
	expect(error).toBe(null)
	expect(data?.method).toEqual("post")
	expect(data?.url).toContain(endpointMap.createNewCheck("dep1"))
	expect(data?.query).toEqual({teamId:"team1"})
})

test("get check details", async () => {
	const { data, error } = await getCheck({deploymentId: "dep1", teamId:"team1", checkId:"check1"})
	if (error) console.log(error)
	expect(error).toBe(null)
	expect(data?.method).toEqual("get")
	expect(data?.url).toContain(endpointMap.getCheck({deploymentId:"dep1",checkId:"check1"}))
	expect(data?.query).toEqual({teamId:"team1"})
})