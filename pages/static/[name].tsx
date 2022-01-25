import type { GetStaticPaths, GetStaticProps } from "next"
import type { ParsedUrlQuery } from "querystring"

interface Props {
  user?: { name: string }
  time: string
}

export default function Name({ user, time }: Props) {
  const userName = user && user.name

  return (
    <div>
      {userName}
      {time}
    </div>
  )
}

interface StaticPropsParams extends ParsedUrlQuery {
  name: string
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const params = context.params as StaticPropsParams

  try {
    const res = await fetch(`https://api.github.com/users/${params.name}`)

    if (res.status === 200) {
      const user = await res.json()
      return { props: { user, time: new Date().toISOString() } }
    }
  } catch (e) {
    console.log(e)
  }

  return { props: { time: new Date().toISOString() } }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { name: "js" } }],
    fallback: true,
  }
}
