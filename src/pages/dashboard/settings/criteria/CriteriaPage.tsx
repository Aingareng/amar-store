import Form from "../../../../shared/components/molecules/Form";
import createEmployeeAttributes from "../../../../features/employee/types/FormAtributes";
import Label from "../../../../shared/components/atoms/Label";
import Input from "../../../../shared/components/atoms/Input";
import criteriaPageAttributes from "../../../../features/settings/criteria/types/criteriaPageAttributes";
import Button from "../../../../shared/components/atoms/Button";
import { ChangeEvent, useActionState, useEffect, useState } from "react";
// import { FormState } from '../../../../types/formState';
import { ICriteriaData } from "../../../../features/settings/criteria/types/criteria";
import useCriteria from "../../../../features/settings/criteria/hooks/useCriteria";
import Toast from "../../../../shared/components/molecules/Toast";
import Alert from "../../../../shared/components/atoms/Alert";
import validateFormInput from "../../../../features/settings/criteria/utils/validateFormInput";

export default function CriteriaPage() {
  const { formAttr, submitAttr } = createEmployeeAttributes;
  formAttr.className =
    "grid grid-cols-1 gap-3 bg-base-100 p-4 rounded-2xl shadow";
  const {
    inputAgeAttr,
    inputEducationAtrr,
    inputExperienceAttr,
    inputLeaderAttr,
    inputSkillAttr,
  } = criteriaPageAttributes;

  const { criterias, isFetched, updateCriteria } = useCriteria();
  const [toastStatus, setToastStatus] = useState(false);
  const [rankOrder, setRankOrder] = useState({
    skill: 1,
    education: 2,
    experience: 3,
    age: 4,
    leader: 5,
  });

  useEffect(() => {
    if (isFetched && criterias.length > 0) {
      setRankOrder((prev) => {
        return {
          ...prev,
          skill: criterias[0].rank_order || 0,
          education: criterias[1].rank_order || 0,
          experience: criterias[2].rank_order || 0,
          age: criterias[3].rank_order || 0,
          leader: criterias[4].rank_order || 0,
        };
      });
    }
  }, [criterias, isFetched]);

  async function handleSubmitCriteria(prevState: unknown, formData: FormData) {
    const skill = Number(formData.get("skill-score")) || 0;
    const education = Number(formData.get("education-score")) || 0;
    const experience = Number(formData.get("experience-score")) || 0;
    const age = Number(formData.get("age-score")) || 0;
    const leadership = Number(formData.get("leader-score")) || 0;
    const rankOrder = { skill, education, experience, age, leadership };

    const validationResult = validateFormInput(rankOrder);

    if (!validationResult.isValid) {
      return {
        error: validationResult.errors,
        enteredValue: formData,
      };
    }

    const payload: ICriteriaData[] = [
      {
        id: criterias[0].id,
        name: criterias[0].name,
        rank_order: skill,
      },
      {
        id: criterias[1].id,
        name: criterias[1].name,
        rank_order: education,
      },
      {
        id: criterias[2].id,
        name: criterias[2].name,
        rank_order: experience,
      },
      {
        id: criterias[3].id,
        name: criterias[3].name,
        rank_order: age,
      },
      {
        id: criterias[4].id,
        name: criterias[4].name,
        rank_order: leadership,
      },
    ];

    const response = await updateCriteria({ data: payload });
    if (response.status != 400 && response.status != 500) {
      setToastStatus(true);

      setTimeout(() => {
        setToastStatus(false);
      }, 2000);
    }
    return {
      enteredValue: {
        skill,
        education,
        experience,
        age,
        leadership,
      },
    };
  }
  function handleChangeEnteredValue(
    identifer: string,
    event: ChangeEvent<HTMLInputElement>
  ) {
    setRankOrder((prev) => {
      return {
        ...prev,
        [identifer]: event.target.value,
      };
    });
  }

  const [formState, formAction] = useActionState(handleSubmitCriteria, null);
  formAttr.action = formAction;

  inputAgeAttr.value = rankOrder.age;
  inputAgeAttr.onChange = (e) => handleChangeEnteredValue("age", e);

  inputEducationAtrr.value = rankOrder.education;
  inputEducationAtrr.onChange = (e) => handleChangeEnteredValue("education", e);

  inputExperienceAttr.value = rankOrder.experience;
  inputExperienceAttr.onChange = (e) =>
    handleChangeEnteredValue("experience", e);

  inputSkillAttr.value = rankOrder.skill;
  inputSkillAttr.onChange = (e) => handleChangeEnteredValue("skill", e);

  inputLeaderAttr.value = rankOrder.leader;
  inputLeaderAttr.onChange = (e) => handleChangeEnteredValue("leader", e);

  return (
    <>
      <section className="grid grid-cols-1 gap-5">
        {toastStatus && (
          <Toast>
            <Alert>
              <span>Berhasil mengubah Kriteria</span>
            </Alert>
          </Toast>
        )}

        <header className=" flex justify-between items-center">
          <h1 className="text-3xl font-bold">Pegaturan Peringkat Kriteria</h1>
        </header>

        <Form attributes={formAttr}>
          <main className="grid grid-cols-2 gap-2">
            <Label labelType="form-control" leftLabel="Peringkat Keahlian">
              <Input attributes={inputSkillAttr} />
            </Label>

            <Label
              labelType="form-control"
              leftLabel="Peringkat Jenjang Pendidikan"
            >
              <Input attributes={inputEducationAtrr} />
            </Label>

            <Label
              labelType="form-control"
              leftLabel="Peringkat Pengalaman Kerja"
            >
              <Input attributes={inputExperienceAttr} />
            </Label>

            <Label labelType="form-control" leftLabel="Peringkat Umur">
              <Input attributes={inputAgeAttr} />
            </Label>

            <Label labelType="form-control" leftLabel="Peringkat Kepemimpinan">
              <Input attributes={inputLeaderAttr} />
            </Label>
          </main>

          {formState && formState.error && (
            <div>
              <div className="label grid-cols-1 grid gap-1">
                {formState.error.map((message) => (
                  <span key={message} className="label-text-alt text-error">
                    {message}
                  </span>
                ))}
              </div>
            </div>
          )}

          <footer className="flex justify-end gap-2 mt-3">
            <Button attributes={submitAttr}>Simpan</Button>
          </footer>
        </Form>
      </section>
    </>
  );
}
