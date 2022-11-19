import {beforeAll, test, expect} from '@jest/globals'
import { endpointMap, BASE_URL } from '../src/utils/common'
import {createDNSRecord, deleteDNSRecord, listDNSRecords, setVercelToken} from '../src/index'

beforeAll(() => setVercelToken(process.env.VERCEL_TOKEN));

test("create dns record", async () => {
	const { data, error } = await createDNSRecord({ domain:"google.com", type:"sometype" })
	if (error) console.log(error)
	expect(error).toBe(null)
	expect(data?.method).toEqual("post")
	expect(data?.url).toEqual(BASE_URL + endpointMap.createDNSRecord("google.com"))
	expect(data?.body).toEqual(JSON.stringify({ type:"sometype" }))
})

test("create dns record (with teamId param)", async () => {
	const { data, error } = await createDNSRecord({ domain:"google.com", type:"sometype", teamId:"team1" })
	if (error) console.log(error)
	expect(error).toBe(null)
	expect(data?.method).toEqual("post")
	expect(data?.url).toContain(BASE_URL + endpointMap.createDNSRecord("google.com"))
	expect(data?.query).toEqual({ teamId:"team1" })
	expect(data?.body).toEqual(JSON.stringify({ type:"sometype" }))
})

test("delete dns record", async () => {
	const { data, error } = await deleteDNSRecord({ domain:"google.com", recordId:"rec1", teamId:"team1" })
	if (error) console.log(error)
	expect(error).toBe(null)
	expect(data?.method).toEqual("delete")
	expect(data?.url).toContain(BASE_URL + endpointMap.deleteDNSRecord({domain:"google.com",recordId:"rec1"}))
	expect(data?.query).toEqual({ teamId:"team1" })
})

test("list dns records", async () => {
	const { data, error } = await listDNSRecords({ domain:"google.com" })
	if (error) console.log(error)
	expect(error).toBe(null)
	expect(data?.method).toEqual("get")
	expect(data?.url).toEqual(BASE_URL + endpointMap.listDNSRecords("google.com"))
})

test("list dns records (with query params)", async () => {
	const { data, error } = await listDNSRecords({ domain:"google.com",teamId:"team1",next:100 })
	if (error) console.log(error)
	expect(error).toBe(null)
	expect(data?.method).toEqual("get")
	expect(data?.url).toContain(BASE_URL + endpointMap.listDNSRecords("google.com"))
	expect(data?.query).toEqual({teamId:"team1",until:"100"})
})