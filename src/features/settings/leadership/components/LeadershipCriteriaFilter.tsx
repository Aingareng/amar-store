import { ChangeEvent, useState } from "react";
import TableFilter, {
  FilterValues,
} from "../../../../shared/components/organisms/TableFilter";

interface IProps {
  filterResults: (result: FilterValues) => void;
}

export default function LeadershipCriteriaFilter({ filterResults }: IProps) {
  const [enteredValues, setEnteredValues] = useState<FilterValues>({
    search: "",
  });

  function handleSubmitFilter(filterValue: FilterValues) {
    filterResults(filterValue);
  }

  function handleResetFilter() {
    const reset: FilterValues = {
      endDate: "",
      search: "",
      select: "",
      startDate: "",
    };
    filterResults(reset);
    setEnteredValues(reset);
  }

  return (
    <TableFilter
      onSubmit={handleSubmitFilter}
      onReset={handleResetFilter}
      className="grid grid-cols-[310px_310px_1fr] items-end gap-2"
      searchInput={{
        useSearchInput: true,
        label: "Cari Kriteria",
        placeholder: "Masukan nama kriteria",
        value: enteredValues.search || "",
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          setEnteredValues((prev) => {
            return {
              ...prev,
              search: event.target.value,
            };
          });
        },
      }}
    />
  );
}
