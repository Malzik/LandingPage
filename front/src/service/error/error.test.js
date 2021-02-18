import { toastAxiosError } from './error';

describe('Error management module', () => {
  describe('toastAxiosError', () => {
    test('must contains base text', () => {
      expect.assertions(1);

      expect(
        toastAxiosError('base')({
          config: {
            method: 'get',
          },
          response: {
            status: 501,
            statusText: 'Error Text',
          },
          request: {
            responseURL: 'http://localhost/api/blah',
          },
        })
      ).toEqual(expect.stringContaining('base'));
    });

    test('must contains base text', () => {
      expect.assertions(1);

      expect(
        toastAxiosError('base')({
          config: {
            method: 'get',
          },
          response: {
            status: 501,
            statusText: 'Error Text',
            responseText: 'Response Text',
          },
          request: {
            responseURL: 'http://localhost/api/blah',
          },
        })
      ).toEqual(expect.stringContaining('Response Text'));
    });

    test('must tell specific if 500', () => {
      expect.assertions(1);

      expect(
        toastAxiosError('base')({
          config: {
            method: 'get',
          },
          response: {
            status: 500,
            statusText: 'Error Text',
          },
          request: {
            responseURL: 'http://localhost/api/blah',
          },
        })
      ).toEqual(expect.stringContaining('Impossible de contacter'));
    });

    test('must tell specific if 520', () => {
      expect.assertions(1);

      expect(
        toastAxiosError('base')({
          config: {
            method: 'get',
          },
          response: {
            status: 520,
            statusText: 'Error Text',
          },
          request: {
            responseURL: 'http://localhost/api/blah',
          },
        })
      ).toEqual(expect.stringContaining('Erreur remontée'));
    });

    test('can accept other errors types', () => {
      expect.assertions(1);

      expect(toastAxiosError('base')('other error type')).toEqual(
        expect.stringContaining('other error type')
      );
    });
  });
});
