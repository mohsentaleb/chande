const got = require('got');

describe('tgju.org API availability', () => {
    let tgjuPayload = {};

    beforeAll(async () => {
        tgjuPayload = await got('http://call2.tgju.org/ajax.json', { json: true });
    });

    test('Data fetches successfully from tgju.org and have the `current` key.', () => {
        expect(tgjuPayload.body).toHaveProperty('current');
    });

    test('Data has all the keys from our supported currencies.', () => {
        expect(tgjuPayload.body.current).toHaveProperty('price_dollar_rl', 'price_eur', 'price_try', 'price_aed', 'price_gbp', 'price_sek');
    });
});