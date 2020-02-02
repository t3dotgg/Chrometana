import { h } from "preact";
import { useState } from "preact/hooks";
import "./app.scss";

const App = () => {
  const [page, setPage] = useState(0);
  return (
    <div id="app-root">
      {page === 0 && (
        <div>
          <SearchSelector />
          <button
            className="additional-settings pure-button"
            onClick={() => setPage(1)}
          >
            Additional Settings
          </button>
        </div>
      )}
      {page === 1 && (
        <div>
          <AdditionalSettings />
          <button
            className="additional-settings pure-button"
            onClick={() => setPage(0)}
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
};

const CustomEngineSelect = () => {
  const [isCustomEngineChecked, setUseCustomEngine] = useChromeStorage(
    "use_custom_engine",
    false
  );
  const [customEngine, setCustomEngine] = useChromeStorage("custom_engine", "");

  return (
    <div>
      <input
        type="checkbox"
        id="custom"
        name="Custom Search Engine"
        checked={isCustomEngineChecked}
        onChange={e => setUseCustomEngine(e.target.checked)}
      />
      <label for="custom">Custom Search Engine</label>
      {isCustomEngineChecked && (
        <div>
          <input
            type="text"
            id="custom-engine-url"
            name="Custom Engine URL"
            defaultValue={customEngine}
            onChange={e => setCustomEngine(e.target.value)}
          />
          <label for="custom-engine-url">Custom Engine URL</label>
        </div>
      )}
    </div>
  );
};

const OtherSettings = () => {
  const [openWebsite, setOpenWebsite] = useChromeStorage(
    "enable_open_website",
    false
  );
  const [excludeSettings, setExcludeSettings] = useChromeStorage(
    "exclude_settings_app",
    true
  );
  const [cortanaOnly, setCortanaOnly] = useChromeStorage("cortana_only", true);

  return (
    <div className="flex-column">
      <div>
        <input
          type="checkbox"
          id="open-website-command"
          name="Open Website"
          checked={openWebsite}
          onChange={e => setOpenWebsite(e.target.checked)}
        />
        <label for="open-website-command">Enable "open website" command</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="exclude-settings"
          name="Exclude Settings"
          checked={excludeSettings}
          onChange={e => setExcludeSettings(e.target.checked)}
        />
        <label for="exclude-settings">
          Exclude searches made by the Settings app
        </label>
      </div>
      <div>
        <input
          type="checkbox"
          id="cortana-only"
          name="Cortana Only"
          checked={cortanaOnly}
          onChange={e => setCortanaOnly(e.target.checked)}
        />
        <label for="cortana-only">Only redirect Cortana searches</label>
      </div>
    </div>
  );
};

const AdditionalSettings = () => {
  return (
    <div className="flex-column">
      <h2>Additional Settings</h2>
      <OtherSettings />
      <CustomEngineSelect />
    </div>
  );
};

const SearchSelector = () => {
  const [engine, setEngine] = useChromeStorage("search_engine", null);

  return (
    <div id="app-root">
      <h2>Select your preferred search engine</h2>
      <div className="search-select-popout">
        <div>
          <img
            src="images/google.png"
            onClick={() => setEngine("Google.com")}
            alt="Select Google as your default search"
            className={`search-option${
              engine === "Google.com" ? " search-option--selected" : ""
            }`}
          />
        </div>
        <div>
          <img
            src="images/duckDuckGo.png"
            onClick={() => setEngine("DuckDuckGo.com")}
            alt="Select DuckDuckGo as your default search"
            className={`search-option${
              engine === "DuckDuckGo.com" ? " search-option--selected" : ""
            }`}
          />
        </div>
        <div>
          <img
            src="images/yahoo.png"
            onClick={() => setEngine("Yahoo.com")}
            alt="Select Yahoo as your default search"
            className={`search-option${
              engine === "Yahoo.com" ? " search-option--selected" : ""
            }`}
          />
        </div>
      </div>
    </div>
  );
};

const useChromeStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    chrome.storage.sync.get([key], result => {
      if (result && result[key] !== undefined) {
        setStoredValue(result[key]);
      } else {
        chrome.storage.sync.set({ [key]: initialValue }, () => {});
      }
    });
    return initialValue;
  });

  const setValue = value => {
    const newVal = value instanceof Function ? value(storedValue) : value;
    setStoredValue(newVal);
    chrome.storage.sync.set({ [key]: newVal }, () => {});
  };

  return [storedValue, setValue];
};

export default App;
