const express = require('express');

function cacheControl(options = {}) {
  const {
    maxAge = 0,
    public: isPublic = true,
    noStore = false,
    noCache = false,
    mustRevalidate = false
  } = options;
  const directives = [];
  if (noStore) {
    directives.push('no-store');
  } else {
    directives.push(isPublic ? 'public' : 'private');
    directives.push(`max-age=${Math.floor(maxAge)}`);
    if (noCache) directives.push('no-cache');
    if (mustRevalidate) directives.push('must-revalidate');
  }
  const headerValue = directives.join(', ');
  return (req, res, next) => {
    res.set('Cache-Control', headerValue);
    next();
  };
}

module.exports = cacheControl;