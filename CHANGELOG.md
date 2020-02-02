## Changelog

### v3.0.0

It's been awhile guys. Sorry for the long time between updates. Wanted to leave this in a better state

##### New features

- Rewrote the entire front end. Should fix all the current bugs with saving settings (and introduce some new ones too)
- Chrometana now lives in a popout under the extension button. I don't think Chrometana needs a full page, this is nicer

##### Development

- Yanked out TravisCI
- Rewrote frontend with Preact and custom hooks for storage

### v2.0.1

##### New features

- Logo updated

### v2.0.0 beta 2

##### New features

- Ability to choose between "all searches" and "only Cortana searches" for redirection
- UI overhaul complete

##### Bug fixes

- CSS bug causing buttons to disappear fixed by [kyleladd](https://github.com/kyleladd)

### v2.0.0 beta 1

##### New Features

- Added "Go to (website)" functionality, you can now tell Cortana to go to any website you want by [Claire Pitman](https://github.com/ClairePitman)
- UI overhaul by [Maayan Kline](https://github.com/mok8) and [Courtney Tambling](http://courtneytambling.com/)
- Updated Google logo
- Added custom search engines by [kyleladd](https://github.com/kyleladd)

##### Development

- TravisCI implemented (obviously by [kyleladd](https://github.com/kyleladd))
- JSHint added as the preferred linter

##### Known Issues

- "Go To (website)" toggle is broken, always on
- Clearing the "Custom Search Engine" field can be annoying at best

### v1.1.2

##### Bug Fixes/Improvements

- The url replacement has been removed and replaced in favor of a redirect fall-back script by [kyleladd](https://github.com/kyleladd). No more tab permissions!

### v1.1.1

##### Bug Fixes/Improvements

- Moved from redirects to URL replacement and reload added by [kyleladd](https://github.com/kyleladd)
- Moved UI assets out of package to lower size. Options.html assets now load off of Chrometana.theo.li

### v1.1.0

##### New Features

- Major UI overhaul

### v1.0.2

##### Bug Fixes/Improvements

- Fix for background running issues

### v1.0.1

##### Bug Fixes/Improvements

- Actually removed welcome.html

### v1.0.0

##### Bug Fixes/Improvements

- Three search engines are supported, those being Google, Yahoo, and DuckDuckGo.
