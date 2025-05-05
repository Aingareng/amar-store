import {
  ForwardedRef,
  useState,
  ChangeEvent,
  useActionState,
  useCallback,
  // useCallback,
} from "react";
import Modal from "../../../shared/components/organisms/Modal";
import Form from "../../../shared/components/molecules/Form";
import Label from "../../../shared/components/atoms/Label";
import Input from "../../../shared/components/atoms/Input";
import Button from "../../../shared/components/atoms/Button";
import Select from "../../../shared/components/atoms/Select";
import RadioButton from "../../../shared/components/molecules/RadioButton";
import createEmployeeAttributes from "../types/FormAtributes";
import useEmployees from "../hooks/useEmployee";
import { validateEmployeeData } from "../utils/createEmployeeValidation";
import { IEmployeePayload } from "../types/employees";
import { calculateAge } from "../../../shared/utils/calculateAge";
import { calculateExperience } from "../../../shared/utils/calculateExperience";
// import MultipleSkillInput from "./MultipleSkillInput";
import useSkillCriteria from "../../settings/skill/hooks/useSkillCriteria";
import SkillsInputSection from "./SkillsInputSection";
import useLeaderhip from "../../settings/leadership/hooks/useLeaderhip";

interface IProps {
  ref: ForwardedRef<HTMLDialogElement>;
  onShowToast: (status: boolean) => void;
  onClose: () => void;
}

export default function CreateEmployee({ ref, onShowToast, onClose }: IProps) {
  const { createEmployee } = useEmployees();
  const { skillCriterias } = useSkillCriteria();
  const { criterias } = useLeaderhip();
  const [isLoading, setIsLoading] = useState(false);

  // State untuk form inputs
  const [formData, setFormData] = useState<IEmployeePayload>({
    username: "",
    email: "",
    password: "",
    position: "",
    phone: "",
    gender: "male",
    k4: "",
    k5: "",
    k3: "",
    k1: "",
    k2: "",
  });

  // Handler untuk input text
  function handleTextInputChange(
    field: keyof IEmployeePayload,
    event: ChangeEvent<HTMLInputElement>
  ) {
    const { value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  // Handler untuk select
  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    setFormData((prev) => ({
      ...prev,
      k2: event.target.value,
    }));
  }

  // Handler untuk radio button
  function handleGenderChange(event: ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({
      ...prev,
      gender: event.target.value as "male" | "female",
    }));
  }

  const handleSkillSelected = useCallback(
    (count: number, type: "k1" | "k5") => {
      if (type === "k1") {
        setFormData((prev) => ({
          ...prev,
          k1: count.toString(),
          // String(count * 7.5),
        }));
      }

      if (type === "k5") {
        setFormData((prev) => ({
          ...prev,
          k5: count.toString(),
          // String(count * 7.5),
        }));
      }
    },
    []
  );

  async function handleAddEmployee() {
    const validationErrors = validateEmployeeData(formData);

    if (Object.keys(validationErrors.errors).length > 0) {
      return {
        errors: validationErrors.errors,
        enteredValue: formData,
      };
    }

    const payload: IEmployeePayload = {
      ...formData,
      k4: String(calculateExperience(formData.k4)),
      k3: String(calculateAge(formData.k3)),
    };
    setIsLoading(true);
    const response = await createEmployee(payload);
    setIsLoading(false);

    if (response.status !== 400 && response.status !== 500) {
      handleResetForm();
      onShowToast(true);
      setTimeout(() => {
        onShowToast(false);
      }, 3000);
    }

    return { errors: null };
  }

  const [formState, formAction] = useActionState(handleAddEmployee, {
    errors: null,
  });

  function ErrorMessageRendered(message: string) {
    return (
      <div className="label">
        <span className="label-text-alt text-error">{message}</span>
      </div>
    );
  }

  function handleResetForm() {
    setFormData({
      k3: "",
      k2: "",
      email: "",
      k4: "",
      gender: "male",
      k5: "",
      password: "",
      phone: "",
      position: "",
      username: "",
      k1: "",
    });
  }

  function handleCancel() {
    handleResetForm();
    onClose();
  }

  // const handleMultipleSkillInput = useCallback((skills: string[]) => {
  //   const totalSkillValue = skills
  //     .map(() => 1 * 10)
  //     .reduce((acc, curr) => acc + curr, 0);

  //   setFormData((prev) => ({
  //     ...prev,
  //     k1: String(totalSkillValue),
  //   }));
  // }, []);

  const { formAttr, submitAttr } = createEmployeeAttributes;
  formAttr.action = formAction;

  return (
    <Modal ref={ref} width="w-11/12 max-w-5xl">
      <div className="grid grid-cols-1 gap-5 ">
        <h3 className="text-center text-2xl font-bold">Tambah Pegawai</h3>
        <Form attributes={formAttr}>
          <main className="grid grid-cols-4 gap-2">
            <Label
              labelType="form-control"
              leftLabel="Nama Lengkap"
              bottomLeftLabel={ErrorMessageRendered(
                formState.errors?.username as string
              )}
            >
              <Input
                attributes={{
                  type: "text",
                  name: "username",
                  className: "input input-bordered w-full",
                  placeholder: "Masukan Nama Lengkap",
                  value: formData.username,
                  onChange: (e) => handleTextInputChange("username", e),
                }}
              />
            </Label>
            <Label
              labelType="form-control"
              leftLabel="Alamat Email"
              bottomLeftLabel={ErrorMessageRendered(
                formState.errors?.email as string
              )}
            >
              <Input
                attributes={{
                  type: "email",
                  name: "email",
                  className: "input input-bordered w-full",
                  placeholder: "Cth: John@example.com",
                  value: formData.email,
                  onChange: (e) => handleTextInputChange("email", e),
                }}
              />
            </Label>
            <Label
              labelType="form-control"
              leftLabel="Nomor Identitas"
              bottomLeftLabel={ErrorMessageRendered(
                formState.errors?.password as string
              )}
            >
              <Input
                attributes={{
                  type: "password",
                  name: "password",
                  className: "input input-bordered w-full",
                  placeholder: "Masukan NIP",
                  value: formData.password,
                  onChange: (e) => handleTextInputChange("password", e),
                }}
              />
            </Label>
            <Label
              labelType="form-control"
              leftLabel="Jabatan"
              bottomLeftLabel={ErrorMessageRendered(
                formState.errors?.position as string
              )}
            >
              <Input
                attributes={{
                  type: "text",
                  name: "position",
                  className: "input input-bordered w-full",
                  placeholder: "Cth: Manager",
                  value: formData.position,
                  onChange: (e) => handleTextInputChange("position", e),
                }}
              />
            </Label>
            <Label
              labelType="form-control"
              leftLabel="No Handphone"
              bottomLeftLabel={ErrorMessageRendered(
                formState.errors?.phone as string
              )}
            >
              <Input
                attributes={{
                  type: "text",
                  name: "phone",
                  className: "input input-bordered w-full",
                  placeholder: "Cth: 08xxxxxxx",
                  value: formData.phone,
                  onChange: (e) => handleTextInputChange("phone", e),
                }}
              />
            </Label>
            <div>
              <p>Jenis Kelamin</p>
              <div className="grid grid-cols-2 gap-2">
                <RadioButton label="Laki-laki">
                  <Input
                    attributes={{
                      type: "radio",
                      name: "gender",
                      className: "radio radio-primary",
                      value: "male",
                      checked: formData.gender === "male",
                      onChange: handleGenderChange,
                    }}
                  />
                </RadioButton>
                <RadioButton label="Perempuan">
                  <Input
                    attributes={{
                      type: "radio",
                      name: "gender",
                      className: "radio radio-primary",
                      value: "female",
                      checked: formData.gender === "female",
                      onChange: handleGenderChange,
                    }}
                  />
                </RadioButton>
              </div>
            </div>
          </main>

          {/* Kriteria */}
          <div className="flex w-full flex-col">
            <h2 className="divider divider-start text-xl font-semibold">
              Kriteria
            </h2>
            <div className="grid grid-cols-2 gap-2">
              <Label
                labelType="form-control"
                leftLabel="Pilih Jenjang Pendidikan"
                bottomLeftLabel={ErrorMessageRendered(
                  formState.errors?.education as string
                )}
              >
                <Select
                  attr={{
                    name: "k2",
                    className: "select select-bordered",
                    value: formData.k2,
                    onChange: handleSelectChange,
                  }}
                >
                  <option disabled value="">
                    Pilih Satu
                  </option>
                  <option value="2">SMA/SMK</option>
                  <option value="3">D3</option>
                  <option value="4">S1</option>
                </Select>
              </Label>
              <Label
                labelType="form-control"
                leftLabel="Umur"
                bottomLeftLabel={ErrorMessageRendered(
                  formState.errors?.age as string
                )}
              >
                <Input
                  attributes={{
                    type: "date",
                    name: "k3",
                    className: "input input-bordered w-full",
                    value: formData.k3,
                    onChange: (e) => handleTextInputChange("k3", e),
                  }}
                />
              </Label>
              <Label
                labelType="form-control"
                leftLabel="Mulai Bekerja"
                bottomLeftLabel={ErrorMessageRendered(
                  formState.errors?.experience as string
                )}
              >
                <Input
                  attributes={{
                    type: "date",
                    name: "k4",
                    className: "input input-bordered w-full",
                    value: formData.k4,
                    onChange: (e) => handleTextInputChange("k4", e),
                  }}
                />
              </Label>
              {/* <Label
                labelType="form-control"
                leftLabel="Jiwa Kepemimpinan"
                bottomLeftLabel={ErrorMessageRendered(
                  formState.errors?.leadership as string
                )}
              >
                <Input
                  attributes={{
                    type: "number",
                    name: "k5",
                    className: "input input-bordered w-full",
                    min: 0,
                    value: formData.k5,
                    placeholder: "Cth : 10",
                    onChange: (e) => handleTextInputChange("k5", e),
                  }}
                />
              </Label> */}

              <SkillsInputSection
                type="k1"
                label="Keahlian"
                onSkillCountChange={handleSkillSelected}
                criterias={skillCriterias?.data || []}
              />

              <SkillsInputSection
                type="k5"
                label="Jiwa Kepemimpinan"
                onSkillCountChange={handleSkillSelected}
                criterias={criterias?.data || []}
              />
            </div>
          </div>

          {/* <div>
            <h4 className="text-md">Keahlian</h4>
            <MultipleSkillInput onSendSkill={handleMultipleSkillInput} />
          </div> */}

          {/* Action */}
          <footer className="flex justify-end gap-2 mt-3">
            <Button
              attributes={{
                className: "btn btn-outline btn-error",
                type: "button",
                onClick: handleCancel,
              }}
            >
              Batal
            </Button>
            <Button attributes={{ ...submitAttr, disabled: isLoading }}>
              {isLoading ? "Mengirim..." : "Tambahkan"}
            </Button>
          </footer>
        </Form>
      </div>
    </Modal>
  );
}
