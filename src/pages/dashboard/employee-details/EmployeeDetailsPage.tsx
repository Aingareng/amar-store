import { useParams } from "react-router-dom";
import { dummyData } from "../../../shared/utils/dummy";
import Whatsapp from "../../../shared/icons/Whatsapp";
import Label from "../../../shared/components/atoms/Label";
import Input from "../../../shared/components/atoms/Input";
import RadioButton from "../../../shared/components/molecules/RadioButton";
import Form from "../../../shared/components/molecules/Form";
import createEmployeeAttributes from "../../../features/employee/types/FormAtributes";
import Select from "../../../shared/components/atoms/Select";
import Button from "../../../shared/components/atoms/Button";

export default function EmployeeDetails() {
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
  const { slug } = useParams<{ slug: string }>();

  const employee = dummyData.find((item) => item.id === +slug!);
  return (
    <>
      <main className="grid grid-cols-1 gap-3 bg-base-100 p-4 rounded-2xl shadow">
        <section className="flex items-center gap-2">
          {/* Avatar */}
          <div className="avatar placeholder">
            <div className="bg-primary text-neutral-content w-16 rounded-full">
              <span className="text-2xl">A</span>
            </div>
          </div>
          {/* Name and phone number */}
          <div>
            <h5>{employee?.nama}</h5>
            <div className="text-sm opacity-50 flex items-center text-success">
              <Whatsapp /> <span className="text-xs">{employee?.no_wa}</span>
            </div>
          </div>
        </section>

        <section>
          <h4 className="font-bold">Ubah Data Pegawai</h4>
          <div>
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
                  <div className="flex items-center justify-start gap-2 w ">
                    <RadioButton
                      label="Laki-laki"
                      attributes={{ className: "w-[15%]" }}
                    >
                      <Input attributes={genderManAttr} />
                    </RadioButton>
                    <RadioButton
                      label="Perempuan"
                      attributes={{ className: "w-[15%]" }}
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
                <Button attributes={submitAttr}>Simpan</Button>
              </footer>
            </Form>
          </div>
        </section>
      </main>
    </>
  );
}
