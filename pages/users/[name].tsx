import css from "styled-jsx/css"
import Profile from "../../components/Profile"
import formatDistance from "date-fns/formatDistance"
import type { GetServerSideProps } from "next"
import type { ParsedUrlQuery } from "querystring"

const style = css`
  .user-contents-wrapper {
    display: flex;
    padding: 20px;
  }

  .repos-wrapper {
    width: 100%;
    height: 100vh;
    overflow: scroll;
    padding: 0px 16px;
  }

  .repos-header {
    padding: 16px 0;
    font-size: 14px;
    font-weight: 600;
    border-bottom: 1px solid #e1d4e8;
  }

  .repos-count {
    display: inline-block;
    padding: 2px 5px;
    margin-left: 6px;
    font-size: 12px;
    font-weight: 600;
    line-height: 1;
    color: #586069;
    background-color: rgba(27, 31, 35, 0.08);
    border-radius: 20px;
  }

  .repository-wrapper {
    width: 100%;
    border-bottom: 1px solid #e1e4e8;
    padding: 24px 0;
  }

  a {
    text-decoration: none;
  }

  .repository-name {
    margin: 0;
    color: #0366d6;
    font-size: 20px;
    display: inline-block;
    cursor: pointer;
  }

  .repository-name:hover {
    text-decoration: underline;
  }

  .repository-description {
    padding: 12px 0;
    margin: 0;
    font-size: 14px;
  }

  .repository-language {
    margin: 0;
    font-size: 14px;
  }

  .repository-updated-at {
    margin-left: 20px;
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
    <div className="user-contents-wrapper">
      <Profile user={user} />
      <div className="repos-wrapper">
        <div className="repos-header">
          Repositories
          <span className="repos-count">{user?.public_repos}</span>
        </div>

        {user &&
          repos?.map((repo) => (
            <div key={repo.id} className="repository-wrapper">
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://github.com/${user.login}/${repo.name}`}
              >
                <h2 className="repository-name">{repo.name}</h2>
              </a>
              <p className="repository-description">{repo.description}</p>
              <p className="repository-language">
                {repo.language}
                <span className="repository-updated-at">
                  {formatDistance(new Date(repo.updated_at), new Date(), { addSuffix: true })}
                </span>
              </p>
            </div>
          ))}
      </div>
      <style jsx>{style}</style>
    </div>
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
