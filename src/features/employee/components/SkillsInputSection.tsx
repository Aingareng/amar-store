import { ChangeEvent, useEffect, useState } from "react";
import Checkbox from "../../../shared/components/molecules/Checkbox";
import {
  // checkBoxInputAttibutes,
  getCheckBoxAttributes,
} from "../../../types/inputAttributes";

interface IProps {
  onSkillCountChange: (count: number) => void;
}

export default function SkillsInputSection({ onSkillCountChange }: IProps) {
  const [enteredValue, setEnteredValue] = useState<Record<string, boolean>>();

  const msWordInput = {
    ...getCheckBoxAttributes({
      name: "ms_word",
      className: "checkbox checkbox-primary checkbox-xs ml-2",
      onChange: (event) => handleSkillChange(event),
    }),
  };

  const msExcelInput = {
    ...getCheckBoxAttributes({
      name: "ms_excel",
      className: "checkbox checkbox-primary checkbox-xs ml-2",
      onChange: (event) => handleSkillChange(event),
    }),
  };

  const msPowerPointInput = {
    ...getCheckBoxAttributes({
      name: "ms_powerpoint",
      className: "checkbox checkbox-primary checkbox-xs ml-2",
      onChange: (event) => handleSkillChange(event),
    }),
  };
  const msAcessInput = {
    ...getCheckBoxAttributes({
      name: "ms_access",
      className: "checkbox checkbox-primary checkbox-xs ml-2",
      onChange: (event) => handleSkillChange(event),
    }),
  };

  // Handler untuk checkbox
  function handleSkillChange(event: ChangeEvent<HTMLInputElement>) {
    setEnteredValue((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.checked,
      };
    });
  }
  const countTrue = Object.entries(enteredValue ?? {}).filter(
    ([, value]) => value === true
  ).length;

  useEffect(() => {
    onSkillCountChange(countTrue);
  }, [countTrue, onSkillCountChange]);

  return (
    <div className="grid grid-cols-1 col-span-2 ">
      <p className="text-[0.875rem]">Keahlian</p>
      <section className="grid grid-cols-2 gap-1">
        <Checkbox label="Microsoft Word" inputAttr={msWordInput} />
        <Checkbox label="Microsoft Excel" inputAttr={msExcelInput} />
        <Checkbox label="Microsoft PowerPoint" inputAttr={msPowerPointInput} />
        <Checkbox label="Microsoft Access" inputAttr={msAcessInput} />
      </section>
    </div>
  );
}
