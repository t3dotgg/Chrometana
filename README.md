# Chrometana

![Logo](images/logo-128.png)

[Link to install on Chrome Web Store](https://chrome.google.com/webstore/detail/kaicbfmipfpfpjmlbpejaoaflfdnabnc)
(Microsoft Edge link coming soon, for now just install through the Chrome store)

[Link to the Chrometana blog](http://Chrometana.Theo.li)

Cortana always goes to Bing. I don't like Bing. This lets you redirect Cortana to other places.

Open to contributions, just file a PR!

## Changelog

[Changelog](CHANGELOG.md)

## Dev setup

1. Install dependencies

```
npm install
```

2.  Build the front-end

```
  npm run build
```

3. Navigate chrome to `chrome://extensions`
4. Check the `Developer mode` toggle
5. Click on `Load Unpacked Extension...`
6. Select the `dist` directory

Remember to re-run `npm run build` after making changes!

## Credits

Created and maintained by [Theo Browne](http://www.t3.gg)

Previous contributors include: [Claire Pitman](https://github.com/ClairePitman), [Gray Tambling](https://github.com/the-graytest), [Kyle Ladd](https://github.com/kyleladd), and [Maayan Kline](https://github.com/mok8)

Logo designed by [Preston Locke](https://github.com/Preston12321)

A lot of code taken from https://github.com/drewctate/preact-chrome-extension-starter
