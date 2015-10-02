Chrometana
==============
![Logo](Chrometana/images/logo-128.png)

[![Build Status](https://travis-ci.org/TheoBr/Chrometana.svg)](https://travis-ci.org/TheoBr/Chrometana)

[Link to install on Chrome Web Store](https://chrome.google.com/webstore/detail/kaicbfmipfpfpjmlbpejaoaflfdnabnc)

[Link to the Chrometana blog](http://Chrometana.Theo.li)

INTRODUCTION
------------
With the introduction of Windows 10 to the general public, Bing use is growing rampant. Many aren't using Bing by choice, especially Cortana users. Chrometana aims to force all Bing searches made in Chrome to be redirected to a search engine of the user's choice

VERSION
------------
###v1.2.0 beta
#####New Features
 - Added "Go to (website)" functionality, you can now tell Cortana to go to any website you want by [Claire Pitman](https://github.com/ClairePitman)
 - UI overhaul by [Maayan Kline](https://github.com/mok8) and [Courtney Tambling](http://courtneytambling.com/)
 - Updated Google logo
 - Added custom search engines by [kyleladd](https://github.com/kyleladd)

#####Development
 - TravisCI implemented (obviously by [kyleladd](https://github.com/kyleladd))
 - JSHint added as the preferred linter

###v1.1.2
#####Bug Fixes/Improvements
 - The url replacement has been removed and replaced in favor of a redirect fall-back script by [kyleladd](https://github.com/kyleladd). No more tab permissions!

###v1.1.1
#####Bug Fixes/Improvements
 - Moved from redirects to URL replacement and reload added by [kyleladd](https://github.com/kyleladd)
 - Moved UI assets out of package to lower size. Options.html assets now load off of Chrometana.theo.li

###v1.1.0
#####New Features
 - Major UI overhaul

###v1.0.2
#####Bug Fixes/Improvements
 - Fix for background running issues

###v1.0.1
#####Bug Fixes/Improvements
 - Actually removed welcome.html

###v1.0.0
#####Bug Fixes/Improvements
 - Three search engines are supported, those being Google, Yahoo, and DuckDuckGo.

INSTALLATION
------------
  1. Download the code from here
  2. Navigate chrome to `chrome://extensions`
  3. Check the `Developer mode` toggle
  4. Click on `Load Unpacked Extension...`
  5. Select the folder containing the extension

HOW TO CONTRIBUTE
------------
Want to contribute to Chrometana? Awesome! Feel free to make pull requests directly to the dev branch, or contact Theo with any questions at all at <theo@theobrowne.com>

  1. Install dependencies
  ```
  npm install
  ```
  2.  Run jshint for linting tests
  ```
    node_modules/jshint/bin/jshint --exclude ./node_modules .
  ```

CREDITS
------------
Lead by [Theo Browne](http://www.theo.li)

Original development team [Theo Browne](http://www.theo.li), [Claire Pitman](https://github.com/ClairePitman), and [Maayan Kline](https://github.com/mok8)

Current maintainers [Theo Browne](http://www.theo.li), [Courtney Tambling](http://courtneytambling.com/), and [Kyle Ladd](https://github.com/kyleladd)