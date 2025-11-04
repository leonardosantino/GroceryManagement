import { Select, MenuItem, SelectChangeEvent } from "@/com/ui/comps";
import { isEmpty, isNullOrEmptyList } from "@/com/validation";

const names = ["Pizza", "Refrigerante", "Hamburguer"];

type Props = {
  label: string;
  values: string;
  setValues: (values: string) => void;
};

export function FilterInput({ label, values, setValues }: Readonly<Props>) {
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
      {names.map((name) => (
        <MenuItem key={name} value={name}>
          {name}
        </MenuItem>
      ))}
    </Select>
  );
}
