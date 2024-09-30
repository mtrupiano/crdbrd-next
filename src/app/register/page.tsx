import RegisterForm from "./RegisterForm.server";

export default async function RegisterPage() {
  return (
    // TODO: apply styling/layout
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "100px",
      }}
    >
      <RegisterForm />
    </div>
  );
}