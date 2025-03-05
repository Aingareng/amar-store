import React, { useActionState, useState } from "react";
import Form from "../../../shared/components/molecules/Form";
import Label from "../../../shared/components/atoms/Label";
import Input from "../../../shared/components/atoms/Input";
import Button from "../../../shared/components/atoms/Button";
import { validateLoginForm } from "../utils/validation";
import useAuth from "../hooks/useAuth";
import { ILoginResponse } from "../api/login";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { postLogin } = useAuth();
  const navigate = useNavigate();

  const inputEmailAttr: React.InputHTMLAttributes<HTMLInputElement> = {
    type: "email",
    name: "email",
    className: "input input-bordered w-full",
    placeholder: "Cth: John@example.com",
  };
  const inputIdentityNumber: React.InputHTMLAttributes<HTMLInputElement> = {
    type: "password",
    name: "password",
    className: "input input-bordered w-full",
    placeholder: "Masukan NIP",
  };

  const loginButtonAttr: React.ButtonHTMLAttributes<HTMLButtonElement> = {
    type: "submit",
    className: "btn btn-outline btn-primary w-full",
  };

  const formAttr: React.FormHTMLAttributes<HTMLFormElement> = {
    className: "grid grid-cols-1 gap-5",
  };

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const validationErrors = validateLoginForm(
      formData.email,
      formData.password
    );

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      const response = (await postLogin({
        email: formData.email,
        password: formData.password,
      })) as ILoginResponse;

      if (response) {
        if (response.status === 201 || response.status === 200) {
          navigate("/");
        } else if (response.status === 404) {
          setErrors({
            email: "email atau password tidak cocok",
            password: "email atau password tidak cocok",
          });
        } else if (response.status === 400) {
          setErrors({
            email: "Akun tidak ditemukan",
            password: "Akun tidak ditemukan",
          });
        }
      }
    }
  };

  inputEmailAttr.value = formData.email;
  inputEmailAttr.onChange = (e) => handleChange(e);
  inputIdentityNumber.value = formData.password;
  inputIdentityNumber.onChange = (e) => handleChange(e);

  const [, formAction] = useActionState(handleSubmit, null);

  formAttr.action = formAction;

  return (
    <Form attributes={formAttr}>
      <Label
        labelType="form-control"
        leftLabel="Alamat Email"
        bottomLeftLabel={<p className="text-red-500 text-sm">{errors.email}</p>}
      >
        <Input attributes={inputEmailAttr} />
      </Label>
      <Label
        labelType="form-control"
        leftLabel="Nomor Identitas"
        bottomLeftLabel={
          <p className="text-red-500 text-sm">{errors.password}</p>
        }
      >
        <Input attributes={inputIdentityNumber} />
      </Label>

      <Button attributes={loginButtonAttr}>Masuk</Button>
    </Form>
  );
};

export default LoginForm;
