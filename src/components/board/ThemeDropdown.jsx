import { useTheme } from '@context';

export default function ThemeDropdown() {
  const { theme, setTheme, themes } = useTheme();

  return (
    <select
      className="select select-bordered select-sm max-w-xs"
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
      aria-label="Choose theme"
    >
      {themes.map((th) => (
        <option key={th} value={th}>
          {th.charAt(0).toUpperCase() + th.slice(1)}
        </option>
      ))}
    </select>
  );
}
