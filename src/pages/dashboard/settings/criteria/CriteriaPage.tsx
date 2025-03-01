import Form from "../../../../shared/components/molecules/Form";
import createEmployeeAttributes from "../../../../features/employee/types/FormAtributes";
import Label from "../../../../shared/components/atoms/Label";
import Input from "../../../../shared/components/atoms/Input";
import criteriaPageAttributes from "../../../../features/settings/criteria/types/criteriaPageAttributes";
import Button from "../../../../shared/components/atoms/Button";

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
  return (
    <>
      <section className="grid grid-cols-1 gap-5">
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
            <Button attributes={{ className: "btn btn-outline btn-error" }}>
              Batal
            </Button>
            <Button attributes={submitAttr}>Simpan</Button>
          </footer>
        </Form>
      </section>
    </>
  );
}
