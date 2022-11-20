import {beforeAll, test, expect} from '@jest/globals'
import { endpointMap, BASE_URL } from '../src/utils/common'
import {checkDomainAvailability, checkDomainPrice, getDomainInfo, getDomainConfig, listDomains, purchaseDomain, registerOrTransferDomain, removeDomain, setVercelToken} from '../src/index'

beforeAll(() => setVercelToken(process.env.VERCEL_TOKEN));

test("check domain availability", async () => {
	const { data, error } = await checkDomainAvailability({name:"domain"})
	if (error) console.log(error)
	expect(error).toBe(null)
	expect(data?.method).toEqual("get")
	expect(data?.url).toContain(BASE_URL + endpointMap.checkDomainAvailability)
	expect(data?.query).toEqual({name:"domain"})
})

test("check domain price", async () => {
	const { data, error } = await checkDomainPrice({name:"domain"})
	if (error) console.log(error)
	expect(error).toBe(null)
	expect(data?.method).toEqual("get")
	expect(data?.url).toContain(BASE_URL + endpointMap.checkDomainPrice)
	expect(data?.query).toEqual({name:"domain"})
})

test("get domain info", async () => {
	const { data, error } = await getDomainInfo({domain:"domain",teamId:"team1"})
	if (error) console.log(error)
	expect(error).toBe(null)
	expect(data?.method).toEqual("get")
	expect(data?.url).toContain(BASE_URL + endpointMap.getDomainInfo("domain"))
	expect(data?.query).toEqual({teamId:"team1"})
})

test("get domain config", async () => {
	const { data, error } = await getDomainConfig({domain:"domain",teamId:"team1"})
	if (error) console.log(error)
	expect(error).toBe(null)
	expect(data?.method).toEqual("get")
	expect(data?.url).toContain(BASE_URL + endpointMap.getDomainConfig("domain"))
	expect(data?.query).toEqual({teamId:"team1"})
})

test("list domains (no params)", async () => {
	const { data, error } = await listDomains()
	if (error) console.log(error)
	expect(error).toBe(null)
	expect(data?.method).toEqual("get")
	expect(data?.url).toEqual(BASE_URL + endpointMap.listDomains)
})

test("list domains (with params)", async () => {
	const { data, error } = await listDomains({teamId:"team1",since:1000})
	if (error) console.log(error)
	expect(error).toBe(null)
	expect(data?.method).toEqual("get")
	expect(data?.url).toContain(BASE_URL + endpointMap.listDomains)
	expect(data?.query).toEqual({teamId:"team1",since:"1000"})
})

test("list domains (with pagination params)", async () => {
	const { data, error } = await listDomains({teamId:"team1",next:1000})
	if (error) console.log(error)
	expect(error).toBe(null)
	expect(data?.method).toEqual("get")
	expect(data?.url).toContain(BASE_URL + endpointMap.listDomains)
	expect(data?.query).toEqual({teamId:"team1",until:"1000"})
})

test("purchase domain", async () => {
	const { data, error } = await purchaseDomain({name:"google.com",renew:true,expectedPrice:9.99})
	if (error) console.log(error)
	expect(error).toBe(null)
	expect(data?.method).toEqual("post")
	expect(data?.url).toEqual(BASE_URL + endpointMap.purchaseDomain)
	expect(data?.body).toEqual(JSON.stringify({name:"google.com",renew:true,expectedPrice:9.99}))
})

test("purchase domain", async () => {
	const { data, error } = await purchaseDomain({teamId:"team1",name:"google.com",renew:true,expectedPrice:9.99})
	if (error) console.log(error)
	expect(error).toBe(null)
	expect(data?.method).toEqual("post")
	expect(data?.url).toContain(BASE_URL + endpointMap.purchaseDomain)
	expect(data?.body).toEqual(JSON.stringify({name:"google.com",renew:true,expectedPrice:9.99}))
	expect(data?.query).toEqual({teamId:"team1"})
})

test("register or transfer domain", async () => {
	const { data, error } = await registerOrTransferDomain()
	if (error) console.log(error)
	expect(error).toBe(null)
	expect(data?.method).toEqual("post")
	expect(data?.url).toEqual(BASE_URL + endpointMap.registerOrTransferDomain)
})

test("register or transfer domain (with teamId)", async () => {
	const { data, error } = await registerOrTransferDomain({teamId:"team1"})
	if (error) console.log(error)
	expect(error).toBe(null)
	expect(data?.method).toEqual("post")
	expect(data?.url).toContain(BASE_URL + endpointMap.registerOrTransferDomain)
	expect(data?.query).toEqual({teamId:"team1"})
})

test("remove domain", async () => {
	const { data, error } = await removeDomain({domain:"google.com",teamId:"team1"})
	if (error) console.log(error)
	expect(error).toBe(null)
	expect(data?.method).toEqual("delete")
	expect(data?.url).toContain(BASE_URL + endpointMap.removeDomain("google.com"))
	expect(data?.query).toEqual({teamId:"team1"})
})