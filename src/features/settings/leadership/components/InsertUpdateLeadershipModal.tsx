import { ForwardedRef, memo, useActionState, useEffect, useState } from "react";
import Modal from "../../../../shared/components/organisms/Modal";
import Form from "../../../../shared/components/molecules/Form";
import Label from "../../../../shared/components/atoms/Label";
import Input from "../../../../shared/components/atoms/Input";

import { z } from "zod";
import { ZodValidateForm } from "../../../../shared/libs/ZodValidationForm";
import { formatString } from "../../../../shared/utils/stringFormatter";
import Button from "../../../../shared/components/atoms/Button";
import { ILeadershipPayload, ILeadershipTableData } from "../types/leadership";
import useLeaderhip from "../hooks/useLeaderhip";
import localStorageUtils from "../../../../shared/utils/localStorage";

interface IProps {
  id?: number;
  ref: ForwardedRef<HTMLDialogElement>;
  type: "CREATE" | "UPDATE";
  initialData?: ILeadershipTableData | null;
  onSendingStatus: (statusCode: number | undefined) => void;
}

const skillSchema = z.object({
  name: z
    .string()
    .min(5, "Nama keahlian minimal 5 karakter")
    .nonempty("Nama keahlian wajib disi"),
  weight: z
    .number({ invalid_type_error: "Bobot harus berupa angka" })
    .min(1, "Bobot minimal 1")
    .max(100, "Bobot maksimal 100"),
});

interface InitialFormState {
  errors?: { name: string; weight: string };
  payload: ILeadershipPayload;
}

function InsertUpdateLeadershipModal({
  id,
  type,
  initialData,
  onSendingStatus,
  ref,
}: IProps) {
  const [initialSkill, setInitialSkill] =
    useState<ILeadershipTableData | null>();
  const { createLeadership, updateLeadership } = useLeaderhip();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (type === "UPDATE" && initialData) {
      setInitialSkill(initialData);
    }
    if (type === "CREATE") {
      setInitialSkill(null);
    }

    // return () => {
    //   handleResetForm();
    // };
  }, [initialData, type]);

  function ErrorMessageRendered(message: string) {
    return (
      <div className="label">
        <span className="label-text-alt text-error">{message}</span>
      </div>
    );
  }

  async function handleUpdateCriteria(
    _prevState: InitialFormState,
    formData: FormData
  ): Promise<InitialFormState> {
    const name = formData.get("name") as string;
    const weight = formData.get("weight") as string;
    const zodResult = ZodValidateForm(skillSchema, { name, weight: +weight });

    if (!zodResult.success) {
      return {
        errors: zodResult.errors as { name: string; weight: string },
        payload: {
          name,
          weight: +weight,
        },
      };
    }

    const existSkillCriteria =
      localStorageUtils.get<ILeadershipTableData[]>("leadershipCriteria") || [];

    if (type === "CREATE") {
      if (existSkillCriteria && existSkillCriteria.length > 0) {
        const totalWeight = existSkillCriteria.reduce(
          (prev, current) => prev + current.weight,
          0
        );

        if (totalWeight + +weight > 100) {
          return {
            errors: {
              name: "Bobot tidak bisa lebih dari 100",
              weight: "Bobot tidak bisa lebih dari 100",
            },
            payload: { name, weight: +weight },
          };
        }
      }
      setIsLoading(true);
      const result = await createLeadership({ name, weight: +weight });
      setIsLoading(false);
      onSendingStatus(result.status);
    }
    if (type === "UPDATE" && id) {
      const existSkill = existSkillCriteria?.filter((item) => item.id !== id);
      if (existSkill && existSkill.length > 0) {
        const totalWeight = existSkill.reduce(
          (prev, current) => prev + current.weight,
          0
        );

        if (totalWeight + +weight > 100) {
          return {
            errors: {
              name: "Bobot tidak bisa lebih dari 100",
              weight: "Bobot tidak bisa lebih dari 100",
            },
            payload: { name, weight: +weight },
          };
        }
      }

      const result = await updateLeadership({
        id,
        payload: { name, weight: +weight },
      });
      onSendingStatus(result.status);
    }

    return {
      payload: { name, weight: +weight },
    };
  }

  const [formState, formAction, isPending] = useActionState<
    InitialFormState,
    FormData
  >(handleUpdateCriteria, { payload: { name: "", weight: 0 } });

  function handleResetForm(type: "UPDATE" | "CREATE") {
    if (type === "UPDATE") {
      setInitialSkill(initialData);
    }

    if (type === "CREATE") {
      setInitialSkill({
        id: 0,
        name: "",
        weight: 0,
      });
    }
  }

  return (
    <Modal ref={ref}>
      <section className="grid grid-cols-1 gap-4  w-10/12  ">
        <h1 className="text-2xl font-bold text-center">
          {type === "CREATE" ? "Tambah" : "Ubah"} Kriteria
        </h1>

        <Form
          attributes={{
            className: "grid grid-cols-1 gap-5 w-full",
            action: formAction,
          }}
        >
          <div className="grid grid-cols-1 gap-2 w-full">
            <Label
              labelType="form-control"
              leftLabel="Nama Kriteria"
              bottomLeftLabel={ErrorMessageRendered(
                formState.errors?.name as string
              )}
            >
              <Input
                attributes={{
                  type: "text",
                  name: "name",
                  placeholder: "Masukan nama keahlian",
                  className: "input input-bordered w-full ",
                  defaultValue: formatString(
                    initialSkill?.name || "",
                    "capitalize"
                  ),
                }}
              />
            </Label>
            <Label
              labelType="form-control"
              leftLabel="Bobot"
              bottomLeftLabel={ErrorMessageRendered(
                formState.errors?.weight as string
              )}
            >
              <Input
                attributes={{
                  type: "number",
                  name: "weight",
                  placeholder: "Cth:10",
                  className: "input input-bordered w-full ",
                  defaultValue: initialSkill?.weight || "",
                }}
              />
            </Label>
          </div>

          <div className="flex justify-end items-center gap-3">
            <Button
              attributes={{
                type: "reset",
                className: "btn btn-error btn-outline",
                onClick: () => handleResetForm(type),
                disabled: isLoading || isPending,
              }}
            >
              Reset
            </Button>
            <Button
              attributes={{
                type: "submit",
                className: "btn btn-primary",
                disabled: isLoading || isPending,
              }}
            >
              {isLoading || isPending
                ? "Mengirim..."
                : type === "CREATE"
                ? "Tambah"
                : "Simpan"}
            </Button>
          </div>
        </Form>
      </section>
    </Modal>
  );
}

export default memo(InsertUpdateLeadershipModal);
