import { ChangeEvent, useEffect, useState } from "react";
import Checkbox from "../../../shared/components/molecules/Checkbox";
import // checkBoxInputAttibutes,
// getCheckBoxAttributes,
"../../../types/inputAttributes";
import { ISkillTableData } from "../../settings/skill/types/skill";
import { formatString } from "../../../shared/utils/stringFormatter";
import { ILeadershipTableData } from "../../settings/leadership/types/leadership";

interface IProps {
  onSkillCountChange: (count: number, type: "k1" | "k5") => void;
  criterias: ISkillTableData[] | ILeadershipTableData[];
  label?: string;
  type: "k1" | "k5";
}

export default function SkillsInputSection({
  criterias,
  onSkillCountChange,
  label = "Label",
  type,
}: IProps) {
  const [enteredValue, setEnteredValue] = useState<Record<string, boolean>>({});

  // Handler untuk checkbox
  function handleSkillChange(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.name) return;
    setEnteredValue((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.checked,
      };
    });
  }
  useEffect(() => {
    const totalWeight = criterias.reduce((acc, item) => {
      const nameKey = formatString(item.name, "lowercase");
      if (enteredValue[nameKey]) {
        return acc + item.weight;
      }
      return acc;
    }, 0);

    onSkillCountChange(totalWeight, type);
  }, [enteredValue, criterias, onSkillCountChange, type]);

  return (
    <div className="grid grid-cols-1 col-span-2 ">
      <h3 className="text-[0.875rem] divider divider-start">{label}</h3>
      <section className="grid grid-cols-2 gap-1">
        {criterias.map((checkboxContent) => (
          <Checkbox
            key={checkboxContent.id}
            label={formatString(checkboxContent.name, "capitalize")}
            inputAttr={{
              "aria-label": `checkbox ${checkboxContent.name}`,
              name: formatString(checkboxContent.name, "lowercase"),
              className: "checkbox checkbox-primary",
              value: checkboxContent.weight,
              onChange: (event) => handleSkillChange(event),
            }}
          />
        ))}
      </section>
    </div>
  );
}
