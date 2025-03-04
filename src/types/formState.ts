export type FormState = {
  enteredValue: {
    skill: FormDataEntryValue | null;
    education: FormDataEntryValue | null;
    experience: FormDataEntryValue | null;
    age: FormDataEntryValue | null;
    leader: FormDataEntryValue | null;
  };
} | null;
