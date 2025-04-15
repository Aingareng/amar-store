import { ChangeEvent, useEffect, useState } from "react";
import Label from "../../../shared/components/atoms/Label";
import Input from "../../../shared/components/atoms/Input";
import Button from "../../../shared/components/atoms/Button";
import { Icon } from "@iconify/react/dist/iconify.js";

interface IProps {
  onSendSkill: (skills: string[]) => void;
}

export default function MultipleSkillInput({ onSendSkill }: IProps) {
  const [fieldSkill, setFieldSkill] = useState([1]);
  const [enteredValue, setEnteredValue] = useState<string[]>([]);

  function handleTextInputChange(
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    const value = event.target.value;

    setEnteredValue((prev) => {
      const newValues = [...prev];
      newValues[index] = value; // Simpan hanya nilai input
      return newValues;
    });
  }

  function handleAddField() {
    setFieldSkill((prev) => [...prev, prev.length + 1]);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      const filteredValues = enteredValue.filter((value) => value !== "");
      onSendSkill([...filteredValues]);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [enteredValue, onSendSkill]);

  return (
    <>
      {fieldSkill.map((item, index) => (
        <Label
          key={item}
          labelType="form-control"
          // leftLabel={`Keahlian ${item}`}
        >
          <Input
            attributes={{
              type: "text",
              className: "input input-bordered w-full",
              placeholder: "Masukan Skill",
              value: enteredValue[index] || "",
              onChange: (e) => handleTextInputChange(e, index),
            }}
          />
        </Label>
      ))}
      <Button
        attributes={{
          type: "button",
          className: "btn btn-primary btn-outline btn-sm w-full mt-3",
          onClick: handleAddField,
        }}
      >
        <Icon icon="material-symbols:add-2-rounded" width="24" height="24" />
        Tambah
      </Button>
    </>
  );
}
