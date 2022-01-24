import { GetStaticProps } from "next"

interface Props {
  time: string
}

export default function StaticPage({ time }: Props) {
  return <div>{time}</div>
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  return { props: { time: new Date().toISOString() }, revalidate: 3 }
}
