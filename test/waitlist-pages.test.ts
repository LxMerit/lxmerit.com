import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ADS, FIRST_AD, GENERIC_WAITLIST } from '../src/lib/waitlist-pages.ts';

test('one ad entry, and the generic page stays indexed', () => {
	assert.equal(ADS.length, 1);
	assert.equal(ADS[0], FIRST_AD);
	assert.equal(FIRST_AD.path, '/lp/first-ad');
	assert.equal(FIRST_AD.indexed, false);
	assert.equal(GENERIC_WAITLIST.indexed, true);
	assert.equal(
		GENERIC_WAITLIST.invitationLine,
		"We'll email you when an invitation is ready."
	);
});
