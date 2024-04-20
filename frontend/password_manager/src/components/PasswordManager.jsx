import { useEffect } from "react"

const PasswordManager = () => {

  let token= localStorage.getItem("token")

  useEffect(()=>{
    if(!token){
      window.location.href="/login"
    }
  },[])

  return (
    <div>PasswordManager</div>
  )
}

export default PasswordManager