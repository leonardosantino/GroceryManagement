import { Select, MenuItem, SelectChangeEvent } from "@/com/ui/comps";
import { isNullOrEmpty } from "@/com/validation";

type Props = {
  label: string;
  options: string[];
  value?: string;
  setValue: (value: string) => void;
};

export function InputSelect({
  label,
  options,
  value,
  setValue,
}: Readonly<Props>) {
  function handleChange(event: SelectChangeEvent) {
    const value = event.target.value;

    setValue(value);
  }

  return (
    <Select
      variant={"standard"}
      size="small"
      displayEmpty
      value={value}
      onChange={handleChange}
      renderValue={(selected) => {
        if (isNullOrEmpty(selected)) return <>{label}</>;

        return selected;
      }}
      sx={{ width: 150 }}
    >
      {options.map((it) => (
        <MenuItem key={it} value={it}>
          {it}
        </MenuItem>
      ))}
    </Select>
  );
}
