import {
  ChangeEvent,
  ForwardedRef,
  useState,
  useActionState,
  useEffect,
} from "react";
import Modal from "../../../../shared/components/organisms/Modal";
import Form from "../../../../shared/components/molecules/Form";
import Label from "../../../../shared/components/atoms/Label";
import Input from "../../../../shared/components/atoms/Input";
import Select from "../../../../shared/components/atoms/Select";
import Button from "../../../../shared/components/atoms/Button";
import { ICriteriaDatas } from "../types/criteria";
import { validateCriteriaForm } from "../utils/validateFormInput";

interface IProps {
  ref: ForwardedRef<HTMLDialogElement>;
  modalType: "UPDATE" | "CREATE";
  id?: number;
  defaultValue?: ICriteriaDatas;
}

export default function InsertUpdateCriteria({
  ref,
  modalType,
  defaultValue,
}: IProps) {
  const titleModalContent = modalType === "CREATE" ? "Tambah" : "Edit";
  const [formData, setFormData] = useState<ICriteriaDatas>();

  function handleInputTextChange(event: ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  }

  function handleSelectInputChange(event: ChangeEvent<HTMLSelectElement>) {
    setFormData((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  }
  function handleInsertUpdateCriteria() {
    const data: ICriteriaDatas = {
      criteria_name: formData?.criteria_name,
      criteria_code: formData?.criteria_code,
      criteria_priority: formData?.criteria_priority,
      criteria_type: formData?.criteria_type,
    };
    const validationErrors = validateCriteriaForm(data);

    if (Object.keys(validationErrors.errors).length > 0) {
      return {
        errors: validationErrors.errors,
        enteredValue: formData,
      };
    }

    if (modalType === "UPDATE") {
      console.log("UPDATED");
    }
    if (modalType === "CREATE") {
      console.log("CREATED");
    }

    return { errors: null };
  }

  function handleResetForm() {
    setFormData({
      criteria_name: "",
      criteria_code: "",
      criteria_priority: 0,
      criteria_type: "",
    });
  }

  const [formState, formAction] = useActionState(handleInsertUpdateCriteria, {
    errors: null,
  });

  useEffect(() => {
    if (modalType === "UPDATE") {
      setFormData(defaultValue);
    }
  }, [defaultValue, modalType]);

  return (
    <Modal ref={ref}>
      <section className="grid grid-cols-1 gap-5">
        <h1 className="text-2xl font-semibold text-center">
          {titleModalContent} Kriteria
        </h1>
        <Form
          attributes={{
            className: "grid grid-cols-1 gap-5",
            action: formAction,
          }}
        >
          <div className="grid grid-cols-2 gap-2">
            <Label
              labelType="form-control"
              leftLabel="Kode Kriteria"
              bottomLeftLabel={
                formState.errors?.criteria_code && (
                  <p className="text-red-500 text-sm">
                    {formState.errors?.criteria_code}
                  </p>
                )
              }
            >
              <Input
                attributes={{
                  type: "text",
                  name: "criteria_code",
                  className: "input input-bordered w-full max-w-xs",
                  placeholder: "Cth: K1",
                  value: formData?.criteria_code || "",
                  onChange: (e) => handleInputTextChange(e),
                }}
              />
            </Label>
            <Label
              labelType="form-control"
              leftLabel="Nama Kriteria"
              bottomLeftLabel={
                formState.errors?.criteria_name && (
                  <p className="text-red-500 text-sm">
                    {formState.errors?.criteria_name}
                  </p>
                )
              }
            >
              <Input
                attributes={{
                  type: "text",
                  name: "criteria_name",
                  className: "input input-bordered w-full max-w-xs",
                  placeholder: "Masukan nama kriteria",
                  value: formData?.criteria_name || "",
                  onChange: (e) => handleInputTextChange(e),
                }}
              />
            </Label>

            <Label
              labelType="form-control"
              leftLabel="Jenis Kriteria"
              bottomLeftLabel={
                formState.errors?.criteria_type && (
                  <p className="text-red-500 text-sm">
                    {formState.errors?.criteria_type}
                  </p>
                )
              }
            >
              <Select
                attr={{
                  className: "select select-bordered w-full max-w-xs",
                  defaultValue: "",
                  name: "criteria_type",
                  value: formData?.criteria_type,
                  onChange: (e) => handleSelectInputChange(e),
                }}
              >
                <option disabled value="">
                  Pilih Kriteria
                </option>
                <option value="benefit">Benefit</option>
                <option value="cost">Cost</option>
              </Select>
            </Label>

            <Label
              labelType="form-control"
              leftLabel="Tingkat Prioritas"
              bottomLeftLabel={
                formState.errors?.criteria_priority && (
                  <p className="text-red-500 text-sm">
                    {formState.errors?.criteria_priority}
                  </p>
                )
              }
            >
              <Input
                attributes={{
                  type: "number",
                  name: "criteria_priority",
                  className: "input input-bordered w-full max-w-xs",
                  placeholder: "Masukan prioritas kriteria",
                  value: formData?.criteria_priority || "",
                  onChange: (e) => handleInputTextChange(e),
                }}
              />
            </Label>
          </div>

          <div className="flex justify-end items-center gap-3">
            <Button
              attributes={{
                type: "reset",
                className: "btn btn-error btn-outline",
                onClick: handleResetForm,
              }}
            >
              Reset
            </Button>
            <Button
              attributes={{
                type: "submit",
                className: "btn btn-primary",
              }}
            >
              {modalType === "CREATE" ? "Tambah" : "Simpan"}
            </Button>
          </div>
        </Form>
      </section>
    </Modal>
  );
}
