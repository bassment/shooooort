import shortid from 'shortid';

import { GET_SHORTEN_ENDPOINT, POST_SHORTEN_ENDPOINT } from '../../config/endpoints';

export const postLink = (link) => {
  const body = {
    url: link,
    shortcode: shortid.generate(),
  };

  return fetch(POST_SHORTEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};

export const getLinkStats = (shortcode) => {
  return fetch(`${GET_SHORTEN_ENDPOINT}/${shortcode}/stats`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};

