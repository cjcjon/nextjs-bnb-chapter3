import { useState } from "react"
import type { NextPage } from "next"
import Link from "next/link"

const Home: NextPage = () => {
  const [userName, setUserName] = useState("")

  return (
    <div>
      <label htmlFor="user-name">User name</label>
      <input
        id="user-name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <p>{userName} 깃허브 검색하기</p>
      <Link href={`/users/${userName}`}>
        <a>검색하기</a>
      </Link>
    </div>
  )
}

export default Home
