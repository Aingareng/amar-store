const inputSkillAttr: React.InputHTMLAttributes<HTMLInputElement> = {
  type: "number",
  name: "skill-score",
  className: "input input-bordered w-full",
  min: 0,
};
const inputEducationAtrr: React.InputHTMLAttributes<HTMLInputElement> = {
  type: "number",
  name: "education-score",
  className: "input input-bordered w-full",
  min: 0,
};
const inputExperienceAttr: React.InputHTMLAttributes<HTMLInputElement> = {
  type: "number",
  name: "experience-score",
  className: "input input-bordered w-full",
  min: 0,
};

const inputAgeAttr: React.InputHTMLAttributes<HTMLInputElement> = {
  type: "number",
  name: "age-score",
  className: "input input-bordered w-full",
  min: 0,
};

const inputLeaderAttr: React.InputHTMLAttributes<HTMLInputElement> = {
  type: "number",
  name: "leader-score",
  className: "input input-bordered w-full",
  min: 0,
};

const criteriaPageAttributes = {
  inputSkillAttr,
  inputAgeAttr,
  inputEducationAtrr,
  inputExperienceAttr,
  inputLeaderAttr,
};

export default criteriaPageAttributes;
