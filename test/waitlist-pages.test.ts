import { test } from 'node:test';
import assert from 'node:assert/strict';
import { AD_CAPACITY, ADS, FIRST_AD, GENERIC_WAITLIST, adBySlug } from '../src/lib/waitlist-pages.ts';

test('the template holds one approved ad and no empty slots', () => {
	assert.ok(ADS.length >= 1 && ADS.length <= AD_CAPACITY);
	assert.equal(AD_CAPACITY, 5);
	assert.equal(ADS.length, 1);
	assert.equal(ADS[0], FIRST_AD);
	assert.equal(adBySlug('first-ad'), FIRST_AD);
	assert.equal(adBySlug('second-ad'), undefined);
	for (const ad of ADS) {
		assert.ok(ad.kicker.length > 0);
		assert.ok(ad.headline.length > 0);
		assert.ok(ad.family.length > 0);
		assert.ok(ad.still.src.length > 0);
		assert.equal(ad.indexed, false);
	}
	assert.equal(GENERIC_WAITLIST.indexed, true);
	assert.equal(
		GENERIC_WAITLIST.invitationLine,
		"We'll email you when an invitation is ready."
	);
});
