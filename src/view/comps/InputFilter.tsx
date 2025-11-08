import { Select, MenuItem, SelectChangeEvent } from "@/com/ui/comps";
import { isEmpty, isNullOrEmptyList } from "@/com/validation";

type Props = {
  label: string;
  options: string[];
  values: string;
  setValues: (values: string) => void;
};

export function InputFilter({
  label,
  options,
  values,
  setValues,
}: Readonly<Props>) {
  function handleChange(event: SelectChangeEvent<string[]>) {
    const value = event.target.value as string[];

    setValues(value.toString());
  }

  function getValues(): string[] {
    if (isEmpty(values)) return [];

    return values.split(",");
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

        return selected.join(", ");
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
