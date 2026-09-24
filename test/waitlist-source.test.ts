import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
	acceptCampaignSrc,
	CORP_HOME_SOURCE,
	CORP_WAITLIST_SOURCE,
	resolveCampaignSource,
	signupBody
} from '../src/lib/waitlist-source.ts';

const EMAIL = 'reader@example.com';
const TOKEN = 'turnstile-token';

function bodyFor(urlSrc: string | null, stored: string | null = null): string {
	const source = resolveCampaignSource(urlSrc, stored);
	return signupBody(EMAIL, TOKEN, source);
}

test('a valid src is the signup source', () => {
	const body = bodyFor('x-illuminated-reading');
	assert.equal(JSON.parse(body).source, 'x-illuminated-reading');
	assert.equal(acceptCampaignSrc('x-illuminated-reading'), 'x-illuminated-reading');
});

test('an absent src becomes corp_home', () => {
	const body = bodyFor(null);
	assert.equal(JSON.parse(body).source, CORP_HOME_SOURCE);
});

test('an absent src on /waitlist becomes corp_waitlist', () => {
	const source = resolveCampaignSource(null, null, CORP_WAITLIST_SOURCE);
	const body = signupBody(EMAIL, TOKEN, source);
	assert.equal(JSON.parse(body).source, CORP_WAITLIST_SOURCE);
});

test('a rejected src on /waitlist is not stored as the source', () => {
	const bad = 'FB-Anthem';
	const source = resolveCampaignSource(bad, null, CORP_WAITLIST_SOURCE);
	const body = signupBody(EMAIL, TOKEN, source);
	assert.equal(JSON.parse(body).source, CORP_WAITLIST_SOURCE);
	assert.equal(body.includes(bad), false);
	assert.equal(acceptCampaignSrc(bad), null);
});

for (const bad of ['X-illuminated-reading', 'fb.anthem', 'ig_cvc', 'a'.repeat(51)]) {
	test(`malformed src ${JSON.stringify(bad)} is dropped`, () => {
		const body = bodyFor(bad);
		assert.equal(JSON.parse(body).source, CORP_HOME_SOURCE);
		assert.equal(body.includes(bad), false);
		assert.equal(acceptCampaignSrc(bad), null);
	});
}

test('a kept src is what submit reads after the query is gone', () => {
	const body = bodyFor(null, 'fb-anthem');
	assert.equal(JSON.parse(body).source, 'fb-anthem');
});

test('a bad query does not replace a kept src', () => {
	const bad = 'FB-Anthem';
	const body = bodyFor(bad, 'ig-cvc');
	assert.equal(JSON.parse(body).source, 'ig-cvc');
	assert.equal(body.includes(bad), false);
	assert.equal(acceptCampaignSrc(bad), null);
});
