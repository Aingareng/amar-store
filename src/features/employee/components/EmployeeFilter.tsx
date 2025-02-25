import Input from "../../../shared/components/atoms/Input";
import Form from "../../../shared/components/molecules/Form";
import Button from "../../../shared/components/atoms/Button";
import { Icon } from "@iconify/react";
import Label from "../../../shared/components/atoms/Label";
import EmployeeFilterAttributes from "../types/EmployeeFilterAttributes";
import { useRef } from "react";

interface IProps {
  onSearch: (input: string) => void;
}

export default function EmployeeFilter({ onSearch }: IProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { buttAttr, buttResetAttr, formAttr, searchAttr } =
    EmployeeFilterAttributes;

  formAttr.action = handleSearch;
  searchAttr.defaultValue = searchInputRef.current?.value;
  buttResetAttr.onClick = handleReset;

  function handleSearch() {
    onSearch(searchInputRef.current?.value || "");
  }
  function handleReset() {
    searchInputRef.current!.value = "";
    onSearch("");
  }

  return (
    <Form attributes={formAttr}>
      <Label
        labelType="form-control"
        leftLabel="Cari Pegawai"
        className="w-full max-w-xs"
      >
        <Input ref={searchInputRef} attributes={searchAttr} />
      </Label>
      <div className="flex gap-1">
        <Button attributes={buttAttr}>
          <Icon
            icon="material-symbols:search-rounded"
            width="24"
            height="24"
            className="text-white"
          />
        </Button>
        <Button attributes={buttResetAttr}>
          <Icon icon="material-symbols:refresh" width="24" height="24" />
        </Button>
      </div>
    </Form>
  );
}
