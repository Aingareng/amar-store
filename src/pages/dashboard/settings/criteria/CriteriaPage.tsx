import Form from "../../../../shared/components/molecules/Form";
import createEmployeeAttributes from "../../../../features/employee/types/FormAtributes";
import Label from "../../../../shared/components/atoms/Label";
import Input from "../../../../shared/components/atoms/Input";
import criteriaPageAttributes from "../../../../features/settings/criteria/types/criteriaPageAttributes";
import Button from "../../../../shared/components/atoms/Button";
import { ChangeEvent, useActionState, useEffect, useState } from "react";
// import { FormState } from "../../../../types/formState";
import { ICriteriaData } from "../../../../features/settings/criteria/types/criteria";
import useCriteria from "../../../../features/settings/criteria/hooks/useCriteria";
import Toast from "../../../../shared/components/molecules/Toast";
import Alert from "../../../../shared/components/atoms/Alert";

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
  const [criteria, setCriteria] = useState({
    skill: 0,
    education: 0,
    experience: 0,
    age: 0,
    leader: 0,
  });

  useEffect(() => {
    if (isFetched && criterias.length > 0) {
      setCriteria((prev) => {
        return {
          ...prev,
          skill: criterias[0].point || 0,
          education: criterias[1].point || 0,
          experience: criterias[2].point || 0,
          age: criterias[3].point || 0,
          leader: criterias[4].point || 0,
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

    const payload: ICriteriaData[] = [
      {
        id: criterias[0].id,
        name: criterias[0].name,
        point: skill,
      },
      {
        id: criterias[1].id,
        name: criterias[1].name,
        point: education,
      },
      {
        id: criterias[2].id,
        name: criterias[2].name,
        point: experience,
      },
      {
        id: criterias[3].id,
        name: criterias[3].name,
        point: age,
      },
      {
        id: criterias[4].id,
        name: criterias[4].name,
        point: leadership,
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
    setCriteria((prev) => {
      return {
        ...prev,
        [identifer]: event.target.value,
      };
    });
  }

  const [formState, formAction] = useActionState(handleSubmitCriteria, null);
  formAttr.action = formAction;

  inputAgeAttr.value = criteria.age;
  inputAgeAttr.onChange = (e) => handleChangeEnteredValue("age", e);

  inputEducationAtrr.value = criteria.education;
  inputEducationAtrr.onChange = (e) => handleChangeEnteredValue("education", e);

  inputExperienceAttr.value = criteria.experience;
  inputExperienceAttr.onChange = (e) =>
    handleChangeEnteredValue("experience", e);

  inputSkillAttr.value = criteria.skill;
  inputSkillAttr.onChange = (e) => handleChangeEnteredValue("skill", e);

  inputLeaderAttr.value = criteria.leader;
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
          <h1 className="text-3xl font-bold">Pegaturan Kriteria</h1>
        </header>

        <Form attributes={formAttr}>
          <main>
            <Label labelType="form-control" leftLabel="Skor Keahlian">
              <Input attributes={inputSkillAttr} />
            </Label>

            <Label labelType="form-control" leftLabel="Skor Jenjang Pendidikan">
              <Input attributes={inputEducationAtrr} />
            </Label>

            <Label labelType="form-control" leftLabel="Skor Pengalaman Kerja">
              <Input attributes={inputExperienceAttr} />
            </Label>

            <Label labelType="form-control" leftLabel="Skor Umur">
              <Input attributes={inputAgeAttr} />
            </Label>

            <Label labelType="form-control" leftLabel="Skor Kepemimpinan">
              <Input attributes={inputLeaderAttr} />
            </Label>
          </main>

          <footer className="flex justify-end gap-2 mt-3">
            {/* <Button
              attributes={{
                className: "btn btn-outline btn-error",
                type: "reset",
              }}
            >
              Batal
            </Button> */}
            <Button attributes={submitAttr}>Simpan</Button>
          </footer>
        </Form>
      </section>
    </>
  );
}
