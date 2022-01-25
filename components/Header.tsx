import { FormEvent, useState } from "react"
import { useRouter } from "next/router"
import css from "styled-jsx/css"
import { IoLogoGithub } from "react-icons/io"

const HeaderCss = css`
  .header-wrapper {
    padding: 14px 14px;
    background-color: #24292e;
    line-height: 0;
    display: flex;
    align-items: center;
  }

  .header-search-form input {
    margin: 0px 16px;
    background-color: hsla(0, 0%, 100%, 0.125);
    width: 300px;
    height: 28px;
    border: none;
    border-radius: 5px;
    outline: none;
    color: white;
    padding: 0px 12px;
    font-size: 14px;
    font-weight: bold;
  }

  .header-navigations a {
    color: white;
    margin-right: 16px;
    font-size: 14px;
    font-weight: bold;
    text-decoration: none;
  }
`

export default function Header() {
  const router = useRouter()
  const [userName, setUserName] = useState("")

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    void router.push(`/users/${userName}`)
    setUserName("")
  }

  return (
    <div>
      <div className="header-wrapper">
        <IoLogoGithub color="white" size={36} />
        <form className="header-search-form" onSubmit={onSubmit}>
          <input value={userName} onChange={(e) => setUserName(e.target.value)} />
        </form>
        <nav className="header-navigations">
          <a href="https://github.com/pulls">Pull requests</a>
          <a href="https://github.com/issues">Issues</a>
          <a href="https://github.com/marketplace">Marketplace</a>
          <a href="https://github.com/explore">Explore</a>
        </nav>
      </div>
      <style jsx>{HeaderCss}</style>
    </div>
  )
}
