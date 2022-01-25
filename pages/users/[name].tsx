import type { GetServerSideProps } from "next"
import type { ParsedUrlQuery } from "querystring"

interface Props {
  user?: { name: string }
}

export default function Name({ user }: Props) {
  const userName = user && user.name

  return <div>{userName}</div>
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
