import { useParams } from "react-router-dom";
import Whatsapp from "../../../shared/icons/Whatsapp";
import Label from "../../../shared/components/atoms/Label";
import Input from "../../../shared/components/atoms/Input";
import RadioButton from "../../../shared/components/molecules/RadioButton";
import Form from "../../../shared/components/molecules/Form";
import { detailEmployeeAttributes } from "../../../features/employee/types/FormAtributes";
import Select from "../../../shared/components/atoms/Select";
import Button from "../../../shared/components/atoms/Button";
import useEmployees from "../../../features/employee/hooks/useEmployee";
import { ChangeEvent, useActionState, useEffect, useState } from "react";
import { validateEmployeeData } from "../../../features/employee/utils/editEmployeeValidation";
import Toast from "../../../shared/components/molecules/Toast";
import Alert from "../../../shared/components/atoms/Alert";
import getInitials from "../../../shared/utils/initialString";
import Loading from "../../../shared/components/atoms/Loading";

export default function EmployeeDetails() {
  const [isLoading, setIsLoading] = useState(false);

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
    inputSkillAttr,
  } = detailEmployeeAttributes;
  const { slug } = useParams<{ slug: string }>();
  const [toastStatus, setToastStatus] = useState(false);
  const { employees, isFetched, editEmployee, isFetching, isPending } =
    useEmployees({
      id: slug,
    });
  const [initialValue, setInitialValue] = useState({
    k3: "",
    k2: "",
    email: "",
    k4: "",
    gender: "",
    k5: "",
    password: "",
    phone: "",
    position: "",
    k1: "",
  });

  const employee = employees[0] || initialValue;

  useEffect(() => {
    if (isFetched) {
      setInitialValue((prevState) => {
        const updatedEmployee = {
          ...prevState,
          k3: employee.k3.toString(),
          k4: employee.k4.toString(),
          gender: employee.isMale ? "male" : "female",
          email: employee.email,
          k2: employee.k2,
          k5: employee.k5,
          password: employee.password,
          phone: employee.phone,
          position: employee.position,
          k1: employee.k1,
        };

        return updatedEmployee;
      });
    }
  }, [isFetched, employee, employees]);

  inputEmailAttr.value = initialValue.email;
  inputEmailAttr.onChange = (event: ChangeEvent<HTMLInputElement>) =>
    handleTextInputChange("email", event);

  inputSkillAttr.value = initialValue.k1;
  inputSkillAttr.onChange = (event: ChangeEvent<HTMLInputElement>) =>
    handleTextInputChange("k1", event);

  inputPhoneNumber.value = initialValue.phone;
  inputPhoneNumber.onChange = (e) => handleTextInputChange("phone", e);

  inputIdentityNumber.value = initialValue.password;
  inputIdentityNumber.onChange = (e) => handleTextInputChange("password", e);

  inputPosition.value = initialValue.position;
  inputPosition.onChange = (e) => handleTextInputChange("position", e);

  ageAttr.value = initialValue.k3;
  // String(initialValue.age);

  ageAttr.onChange = (e) => handleTextInputChange("k3", e);

  experienceAttr.value = initialValue.k4;
  // toISOString().split("T")[0];
  experienceAttr.onChange = (e) => handleTextInputChange("experience", e);

  leaderAttr.value = initialValue.k5;
  leaderAttr.onChange = (e) => handleTextInputChange("k5", e);

  selectAttr.value = initialValue.k4;
  selectAttr.onChange = (event: ChangeEvent<HTMLSelectElement>) =>
    handleSelectChange("k4", event);

  genderManAttr.value = initialValue.gender;
  genderManAttr.onChange = () => handleGenderChange("male");
  genderWomenAttr.checked = initialValue.gender === "male";

  genderWomenAttr.value = initialValue.gender;
  genderWomenAttr.onChange = () => handleGenderChange("female");
  genderWomenAttr.checked = initialValue.gender === "female";

  // formAttr.action =

  function handleTextInputChange(
    identifier: string,
    event: ChangeEvent<HTMLInputElement>
  ) {
    const value = event.target.value;

    setInitialValue((prevState) => {
      return {
        ...prevState,
        [identifier]: value,
      };
    });
  }

  function handleSelectChange(
    identifier: string,
    event: ChangeEvent<HTMLSelectElement>
  ) {
    setInitialValue((prevState) => {
      return {
        ...prevState,
        [identifier]: event.target.value,
      };
    });
  }

  function handleGenderChange(event: "male" | "female") {
    setInitialValue((prev) => ({
      ...prev,
      gender: event as "male" | "female",
    }));
  }

  async function handleUpdateEmployee() {
    const data = {
      ...initialValue,
      k3: String(initialValue.k3),
      k4: String(initialValue.k4),
      gender: initialValue.gender as "male" | "female",
      k2: String(initialValue.k2),
      k5: String(initialValue.k5),
      k1: String(initialValue.k1),
    };
    const validationErrors = validateEmployeeData(data);

    if (Object.keys(validationErrors.errors).length > 0) {
      return {
        errors: validationErrors.errors,
        enteredValue: initialValue,
      };
    }

    const payload = {
      id: slug as string,
      employeeData: {
        ...initialValue,
        k4: initialValue.k4,
        k3: initialValue.k3,
        gender: initialValue.gender as "male" | "female",
        k2: String(initialValue.k2),
        k5: String(initialValue.k5),
        k1: String(initialValue.k1),
      },
    };

    setIsLoading(true);
    const response = await editEmployee(payload);
    setIsLoading(false);

    if (response.status !== 400 && response.status !== 500) {
      setToastStatus(true);
      setTimeout(() => {
        setToastStatus(false);
      }, 3000);
    }

    return { errors: null };
  }

  const [formState, formAction] = useActionState(handleUpdateEmployee, {
    errors: null,
  });

  formAttr.action = formAction;

  function ErrorMessageRendered(message: string) {
    return (
      <div className="label">
        <span className="label-text-alt text-error">{message}</span>
      </div>
    );
  }

  if (isFetching || isPending) {
    <Loading loadingType="loading-bars" />;
  }

  return (
    <>
      {toastStatus && (
        <Toast>
          <Alert>
            <span>Berhasil mengubah Staff</span>
          </Alert>
        </Toast>
      )}
      <main className="grid grid-cols-1 gap-3 bg-base-100 p-4 rounded-2xl shadow">
        <section className="flex items-center gap-2">
          {/* Avatar */}
          <div className="avatar placeholder">
            <div className="bg-primary text-neutral-content w-16 rounded-full">
              <span className="text-2xl">{getInitials(employee.username)}</span>
            </div>
          </div>
          {/* Name and phone number */}
          <div>
            <h5>{employee.username}</h5>
            <div className="text-sm opacity-50 flex items-center text-success">
              <Whatsapp /> <span className="text-xs">{employee.phone}</span>
            </div>
          </div>
        </section>

        <section>
          <h4 className="font-bold">Ubah Data Pegawai</h4>
          <div>
            <Form attributes={formAttr}>
              <main className="grid grid-cols-2 gap-2">
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
                  <div className="flex items-center justify-start gap-2 w ">
                    <RadioButton
                      label="Laki-laki"
                      attributes={{ className: "" }}
                    >
                      <Input attributes={genderManAttr} />
                    </RadioButton>
                    <RadioButton
                      label="Perempuan"
                      attributes={{ className: "" }}
                    >
                      <Input attributes={genderWomenAttr} />
                    </RadioButton>
                  </div>
                </div>
              </main>

              {/* Keahlian */}
              <div className="flex w-full flex-col">
                <h5 className="divider divider-start font-bold">
                  Informasi Lainya
                </h5>
                <div className="grid grid-cols-2 gap-2">
                  <Label
                    labelType="form-control"
                    leftLabel="Keahlian"
                    bottomLeftLabel={ErrorMessageRendered(
                      formState.errors?.k1 as string
                    )}
                  >
                    <Input attributes={inputSkillAttr} />
                  </Label>
                  <Label
                    labelType="form-control"
                    leftLabel="Pilih Jenjang Pendidikan"
                    bottomLeftLabel={ErrorMessageRendered(
                      formState.errors?.k2 as string
                    )}
                  >
                    <Select attr={selectAttr}>
                      <option value="" disabled>
                        Pilih Satu
                      </option>
                      <option value="2">SMA/SMK</option>
                      <option value="3">D3</option>
                      <option value="4">S1</option>
                      <option value="5">S2</option>
                    </Select>
                  </Label>

                  <Label
                    labelType="form-control"
                    leftLabel="Umur"
                    bottomLeftLabel={ErrorMessageRendered(
                      formState.errors?.k3 as string
                    )}
                  >
                    <div className="flex w-full gap-3 border border-neutral items-center overflow-hidden  rounded-xl">
                      <Input attributes={ageAttr} />
                      <span className="px-2">Tahun</span>
                    </div>
                  </Label>

                  <Label
                    labelType="form-control"
                    leftLabel="Lama Bekerja"
                    bottomLeftLabel={ErrorMessageRendered(
                      formState.errors?.k4 as string
                    )}
                  >
                    <div className="flex w-full gap-3 border border-neutral items-center overflow-hidden  rounded-xl">
                      <Input attributes={experienceAttr} />
                      <span className="px-2">Tahun</span>
                    </div>
                  </Label>
                  <Label
                    labelType="form-control"
                    leftLabel="Jiwa kepemimpinan"
                    bottomLeftLabel={ErrorMessageRendered(
                      formState.errors?.k5 as string
                    )}
                  >
                    <Input attributes={leaderAttr} />
                  </Label>
                </div>
              </div>

              {/* Action */}
              <footer className="flex justify-end gap-2 mt-3">
                <Button attributes={{ ...submitAttr, disabled: isLoading }}>
                  {isLoading ? "Mengirim..." : "Simpan"}
                </Button>
              </footer>
            </Form>
          </div>
        </section>
      </main>
    </>
  );
}
