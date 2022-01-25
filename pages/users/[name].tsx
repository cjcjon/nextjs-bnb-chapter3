import css from "styled-jsx/css"
import type { GetServerSideProps } from "next"
import type { ParsedUrlQuery } from "querystring"

const style = css`
  .profile-box {
    width: 25%;
    max-width: 272px;
    margin-right: 26px;
  }

  .profile-image-wrapper {
    width: 100%;
    border: 1px solid #e1e4e8;
  }

  .profile-image-wrapper .profile-image {
    display: block;
    width: 100%;
  }

  .profile-username {
    margin: 0;
    padding-top: 16px;
    font-size: 26px;
  }

  .profile-user-login {
    margin: 0;
    font-size: 20px;
  }

  .profile-user-bio {
    margin: 0;
    padding-top: 16px;
    font-size: 14px;
  }
`

interface Props {
  user?: {
    name: string
    bio: string
    avatar_url: string
    login: string
  }
}

export default function Name({ user }: Props) {
  if (!user) {
    return null
  }

  return (
    <>
      <div className="profile-box">
        <div className="profile-image-wrapper">
          <img className="profile-image" src={user.avatar_url} alt={`${user.name} 프로필 이미지`} />
        </div>
        <h2 className="profile-username">{user.name}</h2>
        <p className="profile-user-login">{user.login}</p>
        <p className="profile-user-bio">{user.bio}</p>
      </div>
      <style jsx>{style}</style>
    </>
  )
}

interface StaticPropsQuery extends ParsedUrlQuery {
  name: string
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { name } = context.query as StaticPropsQuery

  try {
    const res = await fetch(`https://api.github.com/users/${name}`)
    if (res.status === 200) {
      const user = await res.json()
      return { props: { user } }
    }
  } catch (e) {
    console.log(e)
  }

  return { props: {} }
}
