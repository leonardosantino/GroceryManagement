import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { isEmpty, isNullOrEmptyList } from "@/com/validation";

const names = ["Pizza", "Refrigerante", "Hamburguer"];

type Props = {
  categories: string;
  onChange: (categories: string) => void;
};

export function CategoryFilter({ categories, onChange }: Readonly<Props>) {
  function handleChange(event: SelectChangeEvent<string[]>) {
    const value = event.target.value as string[];

    onChange(value.toString());
  }

  function getCategoriesList(): string[] {
    if (isEmpty(categories)) return [];

    return categories.split(",");
  }

  return (
    <FormControl sx={{ width: 125 }}>
      <Select
        size="small"
        multiple
        displayEmpty
        value={getCategoriesList()}
        onChange={handleChange}
        renderValue={(selected) => {
          if (isNullOrEmptyList(selected)) return <>Categoria</>;

          return selected.join(", ");
        }}
        inputProps={{ "aria-label": "Without label" }}
      >
        {names.map((name) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
