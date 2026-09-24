import { test } from 'node:test';
import assert from 'node:assert/strict';
import { acceptCampaignSrc } from '../src/lib/waitlist-source.ts';
import {
	AD_CAPACITY,
	ADS,
	DOG_DRILL,
	FIRST_AD,
	GENERIC_WAITLIST,
	adBySlug
} from '../src/lib/waitlist-pages.ts';

test('the template holds the approved ads and no empty slots', () => {
	assert.ok(ADS.length >= 1 && ADS.length <= AD_CAPACITY);
	assert.equal(AD_CAPACITY, 5);
	assert.deepEqual(
		ADS.map((ad) => ad.id),
		['first-ad', 'dog-drill']
	);
	assert.equal(adBySlug('first-ad'), FIRST_AD);
	assert.equal(adBySlug('dog-drill'), DOG_DRILL);
	assert.equal(DOG_DRILL.headlineItalic, true);
	assert.equal(adBySlug('zebra'), undefined);
	assert.equal(acceptCampaignSrc('x-dog-drill'), 'x-dog-drill');
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
