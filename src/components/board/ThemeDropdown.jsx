import { useTheme } from '@context';

export default function ThemeDropdown() {
  const { theme, setTheme, themes } = useTheme();
  const selectId = 'theme-select';

  return (
    <div>
      <label htmlFor={selectId} className="sr-only">
        Choose theme
      </label>
      <select
        id={selectId}
        name="theme-select"
        className="select select-bordered  max-w-xs bg-base-100 text-base-content"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        aria-label="Choose theme"
        title="Choose theme"
      >
        {themes.map((th) => (
          <option key={th} value={th}>
            {th.charAt(0).toUpperCase() + th.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
