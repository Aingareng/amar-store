import { ForwardedRef, useActionState } from "react";
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
}

export default function CreateEmployee({ ref }: IProps) {
  const {
    ageAttr,
    experienceAttr,
    formAttr,
    genderManAttr,
    genderWomenAttr,
    inputEmailAttr,
    inputIdentityNumber,
    inputPhoneNumber,
    inputPosition,
    leaderAttr,
    selectAttr,
    submitAttr,
    inputUsernameAttr,
  } = createEmployeeAttributes;
  const { createEmployee } = useEmployees();

  function handleAddEmployee(prevState: unknown, formData: FormData) {
    const data: IEmployeePayload = {
      username: (formData.get("username") as string) || "",
      email: (formData.get("email") as string) || "",
      password: (formData.get("password") as string) || "",
      position: (formData.get("position") as string) || "",
      phone: (formData.get("phone") as string) || "",
      gender: (formData.get("gender") as "male" | "female") || "male",
      experience: formData.get("experience") as string,
      leadership: formData.get("leadership") as string,
      age: formData.get("age") as string,
      education: (formData.get("education") as string) || "",
    };

    const validationErrors = validateEmployeeData(data);

    if (Object.keys(validationErrors.errors).length > 0) {
      console.log("first");
      return {
        errors: validationErrors.errors,
        enteredValue: data,
      };
    }

    createEmployee({
      username: data.username,
      email: data.email,
      password: data.password,
      position: data.position,
      phone: data.phone,
      age: data.age,
      education: data.education,
      experience: data.experience,
      leadership: data.leadership,
      gender: data.gender,
    });

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

  inputUsernameAttr.defaultValue = formState.enteredValue?.username;
  inputEmailAttr.defaultValue = formState.enteredValue?.email;
  inputIdentityNumber.defaultValue = formState.enteredValue?.password;
  inputPhoneNumber.defaultValue = formState.enteredValue?.phone;
  inputPosition.defaultValue = formState.enteredValue?.position;
  leaderAttr.defaultValue = formState.enteredValue?.leadership;
  selectAttr.defaultValue = formState.enteredValue?.education;
  ageAttr.defaultValue = formState.enteredValue?.age;
  experienceAttr.defaultValue = formState.enteredValue?.experience;

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
              <Input attributes={inputUsernameAttr} />
            </Label>
            <Label
              labelType="form-control"
              leftLabel="Alamat Email"
              bottomLeftLabel={ErrorMessageRendered(
                formState.errors?.email as string
              )}
            >
              <Input attributes={inputEmailAttr} />
            </Label>
            <Label
              labelType="form-control"
              leftLabel="Nomor Identitas"
              bottomLeftLabel={ErrorMessageRendered(
                formState.errors?.password as string
              )}
            >
              <Input attributes={inputIdentityNumber} />
            </Label>
            <Label
              labelType="form-control"
              leftLabel="Jabatan"
              bottomLeftLabel={ErrorMessageRendered(
                formState.errors?.position as string
              )}
            >
              <Input attributes={inputPosition} />
            </Label>
            <Label
              labelType="form-control"
              leftLabel="No Handphone"
              bottomLeftLabel={ErrorMessageRendered(
                formState.errors?.phone as string
              )}
            >
              <Input attributes={inputPhoneNumber} />
            </Label>
            <div>
              <p>Jenis Kelamin</p>
              <div className="grid grid-cols-2 gap-2">
                <RadioButton label="Laki-laki">
                  <Input attributes={genderManAttr} />
                </RadioButton>
                <RadioButton label="Perempuan">
                  <Input attributes={genderWomenAttr} />
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
                leftLabel="Plih Jenjang Pendidikan"
                bottomLeftLabel={ErrorMessageRendered(
                  formState.errors?.education as string
                )}
              >
                <Select attr={selectAttr} disableOptionLabel="Pilih satu">
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
                <Input attributes={ageAttr} />
              </Label>
              <Label
                labelType="form-control"
                leftLabel="Lama Bekerja"
                bottomLeftLabel={ErrorMessageRendered(
                  formState.errors?.experience as string
                )}
              >
                <Input attributes={experienceAttr} />
              </Label>
              <Label
                labelType="form-control"
                leftLabel="Jiwa kepemimpinan"
                bottomLeftLabel={ErrorMessageRendered(
                  formState.errors?.leadership as string
                )}
              >
                <Input attributes={leaderAttr} />
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
