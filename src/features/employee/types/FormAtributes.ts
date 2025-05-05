const inputUsernameAttr: React.InputHTMLAttributes<HTMLInputElement> = {
  type: "text",
  name: "username",
  className: "input input-bordered w-full",
  placeholder: "Masukan Nama Lengkap",
};
const inputEmailAttr: React.InputHTMLAttributes<HTMLInputElement> = {
  type: "email",
  name: "email",
  className: "input input-bordered border-neutral w-full",
  placeholder: "Cth: John@example.com",
};

const inputIdentityNumber: React.InputHTMLAttributes<HTMLInputElement> = {
  type: "password",
  name: "password",
  className: "input input-bordered border-neutral w-full",
  placeholder: "Masukan NIP",
};
const inputPosition: React.InputHTMLAttributes<HTMLInputElement> = {
  type: "text",
  name: "position",
  className: "input input-bordered border-neutral w-full",
  placeholder: "Cth: Manager",
};
const inputPhoneNumber: React.InputHTMLAttributes<HTMLInputElement> = {
  type: "text",
  name: "phone",
  className: "input input-bordered border-neutral w-full",
  placeholder: "Cth: 08xxxxxxx",
};
const genderManAttr: React.InputHTMLAttributes<HTMLInputElement> = {
  type: "radio",
  name: "gender",
  className: "radio ml-2 radio-primary",
  defaultChecked: true,
  value: "male",
};
const genderWomenAttr: React.InputHTMLAttributes<HTMLInputElement> = {
  type: "radio",
  name: "gender",
  className: "radio ml-2 radio-primary",
  value: "female",
};
const formAttr: React.FormHTMLAttributes<HTMLFormElement> = {
  className: "grid grid-cols-1 gap-2",
};
const submitAttr: React.ButtonHTMLAttributes<HTMLButtonElement> = {
  type: "submit",
  className: "btn btn-primary w-max",
};
const selectAttr: React.SelectHTMLAttributes<HTMLSelectElement> = {
  name: "education",
  className: "select select-bordered border-neutral",
};
const ageAttr: React.InputHTMLAttributes<HTMLInputElement> = {
  type: "number",
  name: "age",
  className: "input border-none w-full",
};

const experienceAttr: React.InputHTMLAttributes<HTMLInputElement> = {
  type: "number",
  name: "experience",
  className: "input border-none w-full",
};
const leaderAttr: React.InputHTMLAttributes<HTMLInputElement> = {
  type: "number",
  name: "leadership",
  className: "input input-bordered border-neutral w-full",
  min: 0,
};

const inputSkillAttr: React.InputHTMLAttributes<HTMLInputElement> = {
  type: "number",
  name: "username",
  className: "input input-bordered border-neutral w-full",
  placeholder: "Masukan Nama Lengkap",
  min: 0,
};

const createEmployeeAttributes = {
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
};
export const detailEmployeeAttributes = {
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
};

export default createEmployeeAttributes;
