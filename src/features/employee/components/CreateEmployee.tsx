import { ForwardedRef, useState, ChangeEvent, useActionState } from "react";
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

interface IProps {
  ref: ForwardedRef<HTMLDialogElement>;
  onShowToast: (status: boolean) => void;
}

export default function CreateEmployee({ ref, onShowToast }: IProps) {
  const { createEmployee } = useEmployees();

  // State untuk form inputs
  const [formData, setFormData] = useState<IEmployeePayload>({
    username: "",
    email: "",
    password: "",
    position: "",
    phone: "",
    gender: "male",
    experience: "",
    leadership: "",
    age: "",
    education: "",
  });

  // Handler untuk input text
  function handleTextInputChange(
    field: keyof IEmployeePayload,
    event: ChangeEvent<HTMLInputElement>
  ) {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  }

  // Handler untuk select
  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    setFormData((prev) => ({
      ...prev,
      education: event.target.value,
    }));
  }

  // Handler untuk radio button
  function handleGenderChange(event: ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({
      ...prev,
      gender: event.target.value as "male" | "female",
    }));
  }

  async function handleAddEmployee(prevState: unknown, _: FormData) {
    const validationErrors = validateEmployeeData(formData);

    if (Object.keys(validationErrors.errors).length > 0) {
      return {
        errors: validationErrors.errors,
        enteredValue: formData,
      };
    }

    const response = await createEmployee(formData);

    if (response.status !== 400 && response.status !== 500) {
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

  const { formAttr, submitAttr } = createEmployeeAttributes;
  formAttr.action = formAction;

  return (
    <Modal ref={ref}>
      <div className="grid grid-cols-1 gap-5 ">
        <h3 className="text-center text-xl">Tambah Pegawai</h3>
        <Form attributes={formAttr}>
          <main className="grid grid-cols-2 gap-2">
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

          {/* Keahlian */}
          <div className="flex w-full flex-col">
            <div className="divider divider-start">Keahlian</div>
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
                    name: "education",
                    className: "select select-bordered",
                    value: formData.education,
                    onChange: handleSelectChange,
                  }}
                >
                  <option disabled value="">
                    Pilih Satu
                  </option>
                  <option value="s1">S1</option>
                  <option value="s2">S2</option>
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
                    name: "age",
                    className: "input input-bordered w-full",
                    value: formData.age,
                    onChange: (e) => handleTextInputChange("age", e),
                  }}
                />
              </Label>
              <Label
                labelType="form-control"
                leftLabel="Lama Bekerja"
                bottomLeftLabel={ErrorMessageRendered(
                  formState.errors?.experience as string
                )}
              >
                <Input
                  attributes={{
                    type: "date",
                    name: "experience",
                    className: "input input-bordered w-full",
                    value: formData.experience,
                    onChange: (e) => handleTextInputChange("experience", e),
                  }}
                />
              </Label>
              <Label
                labelType="form-control"
                leftLabel="Jiwa Kepemimpinan"
                bottomLeftLabel={ErrorMessageRendered(
                  formState.errors?.leadership as string
                )}
              >
                <Input
                  attributes={{
                    type: "text",
                    name: "leadership",
                    className: "input input-bordered w-full",
                    min: 0,
                    value: formData.leadership,
                    onChange: (e) => handleTextInputChange("leadership", e),
                  }}
                />
              </Label>
            </div>
          </div>

          {/* Action */}
          <footer className="flex justify-end gap-2 mt-3">
            <Button attributes={{ className: "btn btn-outline btn-error" }}>
              Batal
            </Button>
            <Button attributes={submitAttr}>Tambah</Button>
          </footer>
        </Form>
      </div>
    </Modal>
  );
}
