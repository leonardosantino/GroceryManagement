import { Select, MenuItem, SelectChangeEvent } from "@/com/ui/comps";
import { isEmptyList, isNullOrEmptyList } from "@/com/validation";

type Props = {
  label: string;
  options: string[];
  values: string[];
  setValues: (values: string[]) => void;
};

export function InputFilter({
  label,
  options,
  values,
  setValues,
}: Readonly<Props>) {
  function handleChange(event: SelectChangeEvent<string[]>) {
    const value = event.target.value as string[];

    setValues(value);
  }

  function getValues(): string[] {
    if (isEmptyList(values)) return [];

    return values;
  }

  return (
    <Select
      variant={"standard"}
      size="small"
      multiple
      displayEmpty
      value={getValues()}
      onChange={handleChange}
      renderValue={(selected) => {
        if (isNullOrEmptyList(selected)) return <>{label}</>;

        return selected;
      }}
      sx={{ width: 125 }}
    >
      {options.map((it) => (
        <MenuItem key={it} value={it}>
          {it}
        </MenuItem>
      ))}
    </Select>
  );
}
