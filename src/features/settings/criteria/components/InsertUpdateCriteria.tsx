import {
  ChangeEvent,
  ForwardedRef,
  useState,
  useActionState,
  useEffect,
  memo,
} from "react";
import Modal from "../../../../shared/components/organisms/Modal";
import Form from "../../../../shared/components/molecules/Form";
import Label from "../../../../shared/components/atoms/Label";
import Input from "../../../../shared/components/atoms/Input";
import Select from "../../../../shared/components/atoms/Select";
import Button from "../../../../shared/components/atoms/Button";
import {
  ICriteriaData,
  ICriteriaDatas,
  ICriteriaPayload,
} from "../types/criteria";
import { validateCriteriaForm } from "../utils/validateFormInput";
import useCriteria from "../hooks/useCriteria";
import { validateCriteriaDuplicates } from "../utils/validateCriteriaDuplicates";

interface IProps {
  ref: ForwardedRef<HTMLDialogElement>;
  modalType: "UPDATE" | "CREATE";
  onShowToast: (status: boolean) => void;
  defaultValue?: ICriteriaData;
  dataFromTable?: ICriteriaData[];
}

function InsertUpdateCriteria({
  ref,
  modalType,
  defaultValue,
  onShowToast,
  dataFromTable,
}: IProps) {
  const titleModalContent = modalType === "CREATE" ? "Tambah" : "Edit";
  const [formData, setFormData] = useState<ICriteriaDatas>();

  const { createCriteria, updateCriteria } = useCriteria();

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
  async function handleInsertUpdateCriteria() {
    const data: ICriteriaPayload = {
      name: formData?.name || "",
      code: formData?.code || "",
      rank_order: formData?.rank_order as number,
      type: formData?.type as "benefit" | "cost",
    };
    const validationErrors = validateCriteriaForm(data);

    if (Object.keys(validationErrors.errors).length > 0) {
      return {
        errors: validationErrors.errors,
        enteredValue: formData,
      };
    }

    // Validasi duplikasi menggunakan utility function
    const duplicateErrors = validateCriteriaDuplicates({
      existingCriterias: dataFromTable as ICriteriaData[],
      currentData: data,
      modalType,
      defaultValue: defaultValue,
    });

    if (Object.keys(duplicateErrors).length > 0) {
      return {
        errors: duplicateErrors,
        enteredValue: {
          ...formData,
          code: formData?.code,
          name: formData?.name,
        },
      };
    }

    if (modalType === "UPDATE") {
      const payload = {
        name: formData?.name || "",
        type: formData?.type as "benefit" | "cost",
        rank_order: formData?.rank_order as number,
        code: formData?.code,
      };
      await updateCriteria({
        id: defaultValue?.id as number,
        payload: {
          code: payload.code as string,
          name: payload.name,
          type: payload.type,
          rank_order: payload.rank_order,
        },
      });
    }
    if (modalType === "CREATE") {
      await createCriteria({
        code: formData?.code || "",
        name: formData?.name || "",
        type: formData?.type as "benefit" | "cost",
        rank_order: formData?.rank_order as number,
      });
      handleResetForm("CREATE");
    }
    onShowToast(true);
    setTimeout(() => {
      onShowToast(false);
    }, 2000);
    return { errors: null };
  }

  function handleResetForm(modalType: "UPDATE" | "CREATE") {
    if (modalType === "CREATE") {
      setFormData({
        name: "",
        code: "",
        rank_order: 0,
        type: "",
      });
    }
    if (modalType === "UPDATE") {
      setFormData({
        ...defaultValue,
      });
    }
  }

  const [formState, formAction] = useActionState(handleInsertUpdateCriteria, {
    errors: null,
  });

  useEffect(() => {
    if (modalType === "UPDATE") {
      setFormData(defaultValue);
    }
    if (modalType === "CREATE") {
      handleResetForm("CREATE");
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
                formState.errors?.code && (
                  <p className="text-red-500 text-sm">
                    {formState.errors?.code}
                  </p>
                )
              }
            >
              <Input
                attributes={{
                  type: "text",
                  name: "code",
                  className: "input input-bordered w-full max-w-xs",
                  placeholder: "Cth: K1",
                  value: formData?.code || "",
                  onChange: (e) => handleInputTextChange(e),
                }}
              />
            </Label>
            <Label
              labelType="form-control"
              leftLabel="Nama Kriteria"
              bottomLeftLabel={
                formState.errors?.name && (
                  <p className="text-red-500 text-sm">
                    {formState.errors?.name}
                  </p>
                )
              }
            >
              <Input
                attributes={{
                  type: "text",
                  name: "name",
                  className: "input input-bordered w-full max-w-xs",
                  placeholder: "Masukan nama kriteria",
                  value: formData?.name || "",
                  onChange: (e) => handleInputTextChange(e),
                }}
              />
            </Label>

            <Label
              labelType="form-control"
              leftLabel="Jenis Kriteria"
              bottomLeftLabel={
                formState.errors?.type && (
                  <p className="text-red-500 text-sm">
                    {formState.errors?.type}
                  </p>
                )
              }
            >
              <Select
                attr={{
                  className: "select select-bordered w-full max-w-xs",
                  name: "type",
                  value: formData?.type || "",
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
                formState.errors?.rank_order && (
                  <p className="text-red-500 text-sm">
                    {formState.errors?.rank_order}
                  </p>
                )
              }
            >
              <Input
                attributes={{
                  type: "number",
                  name: "rank_order",
                  className: "input input-bordered w-full max-w-xs",
                  placeholder: "Masukan prioritas kriteria",
                  value: formData?.rank_order || "",
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
                onClick: () => handleResetForm(modalType),
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

export default memo(InsertUpdateCriteria);
