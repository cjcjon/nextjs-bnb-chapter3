import css from "styled-jsx/css"
import Profile from "../../components/Profile"
import Repositories from "../../components/Repositories"
import type { GetServerSideProps } from "next"
import type { ParsedUrlQuery } from "querystring"

const style = css`
  .user-contents-wrapper {
    display: flex;
    padding: 20px;
  }
`

interface Props {
  user?: {
    login: string
    name: string
    bio?: string
    avatar_url?: string
    email?: string
    company?: string
    location?: string
    blog?: string
    public_repos: number
  }
  repos?: {
    id: number
    name: string
    description?: string
    language?: string
    updated_at: string
  }[]
}

export default function Name({ user, repos }: Props) {
  return (
    <>
      <div className="user-contents-wrapper">
        <Profile user={user} />
        <Repositories user={user} repos={repos} />
      </div>
      <style jsx>{style}</style>
    </>
  )
}

interface StaticPropsQuery extends ParsedUrlQuery {
  name: string
  page?: string
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { name, page } = context.query as StaticPropsQuery

  try {
    const userRes = await fetch(`https://api.github.com/users/${name}`)
    const user = userRes.status === 200 ? await userRes.json() : undefined

    const repoRes = await fetch(
      `https://api.github.com/users/${name}/repos?sort=updated&page=${page ?? 1}&per_page=10`
    )
    const repos = repoRes.status === 200 ? await repoRes.json() : undefined

    return { props: { user, repos } }
  } catch (e) {
    console.log(e)
  }

  return { props: {} }
}
