import { ForwardedRef } from "react";
import Modal from "../../../shared/components/organisms/Modal";
import Form from "../../../shared/components/molecules/Form";
import Label from "../../../shared/components/atoms/Label";
import Input from "../../../shared/components/atoms/Input";
import Button from "../../../shared/components/atoms/Button";
import Select from "../../../shared/components/atoms/Select";
import RadioButton from "../../../shared/components/molecules/RadioButton";
import createEmployeeAttributes from "../types/FormAtributes";

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
  } = createEmployeeAttributes;

  return (
    <Modal ref={ref}>
      <div className="grid grid-cols-1 gap-5 ">
        <h3 className="text-center text-xl">Tambah Pegawai</h3>
        <Form attributes={formAttr}>
          <main className="grid grid-cols-2 gap-2">
            <Label labelType="form-control" leftLabel="Alamat Email">
              <Input attributes={inputEmailAttr} />
            </Label>
            <Label labelType="form-control" leftLabel="Nomor Identitas">
              <Input attributes={inputIdentityNumber} />
            </Label>
            <Label labelType="form-control" leftLabel="Jabatan">
              <Input attributes={inputPosition} />
            </Label>
            <Label labelType="form-control" leftLabel="No Handphone">
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
              >
                <Select attr={selectAttr} disableOptionLabel="Pilih satu">
                  <option value="s1">S1</option>
                  <option value="s2">S2</option>
                </Select>
              </Label>
              <Label labelType="form-control" leftLabel="Umur">
                <Input attributes={ageAttr} />
              </Label>
              <Label labelType="form-control" leftLabel="Lama Bekerja">
                <Input attributes={experienceAttr} />
              </Label>
              <Label labelType="form-control" leftLabel="Jiwa kepemimpinan">
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
