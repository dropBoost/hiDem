import LogoutButton from "@/app/componenti/buttonLogout"
import LoginForm from "../components/formLogin"

export default function Login() {

  return (
    <div className="flex flex-col items-center justify-center overflow-x-auto">
    <LoginForm/>
    <LogoutButton/>
    </div>
  )
}
