import LoginForm from "../../../features/auth/components/LoginForm";
import AuthLayout from "../layout";

export default function LoginPage() {
  return (
    <AuthLayout>
      <div className="card bg-base-100 w-[50%] shadow-xl p-5 grid grid-cols-1 gap-3">
        <header className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-3xl font-bold  w-[70%] text-center">
            Sistem Pendukung Keputusan Pemilihan Kepala Cabang
          </h1>
          <p>Silakan masukkan email dan kata sandi Anda untuk melanjutkan</p>
        </header>
        <LoginForm />
      </div>
    </AuthLayout>
  );
}
