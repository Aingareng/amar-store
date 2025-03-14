import { useRef } from "react";
import Form from "../../../../shared/components/molecules/Form";
import Label from "../../../../shared/components/atoms/Label";
import Input from "../../../../shared/components/atoms/Input";
import Button from "../../../../shared/components/atoms/Button";
import { Icon } from "@iconify/react/dist/iconify.js";

interface IProps {
  onSearch: (input: string) => void;
}

export default function CriteriaFilter({ onSearch }: IProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);
  function handleSearch() {
    onSearch(searchInputRef.current?.value || "");
  }
  function handleReset() {
    searchInputRef.current!.value = "";
    onSearch("");
  }

  return (
    <Form
      attributes={{
        action: handleSearch,
        className: "flex gap-2 items-end",
      }}
    >
      <Label
        labelType="form-control"
        leftLabel="Cari Kriteria"
        className="w-full max-w-xs"
      >
        <Input
          ref={searchInputRef}
          attributes={{
            className: "input input-bordered w-full max-w-xs",
            defaultValue: searchInputRef.current?.value,
            placeholder: "Cth: Nama kriteria, No.Kriteria, Jenis",
          }}
        />
      </Label>
      <div className="flex gap-1">
        <Button
          attributes={{
            type: "submit",
            className: "btn btn-primary btn-square",
          }}
        >
          <Icon
            icon="material-symbols:search-rounded"
            width="24"
            height="24"
            className="text-white"
          />
        </Button>
        <Button
          attributes={{
            type: "reset",
            onClick: handleReset,
            className: "btn btn-primary btn-outline btn-square",
          }}
        >
          <Icon icon="material-symbols:refresh" width="24" height="24" />
        </Button>
      </div>
    </Form>
  );
}
