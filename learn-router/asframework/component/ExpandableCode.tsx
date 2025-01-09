
interface ExpandaleCodeProps {
  title?: string
  code: string
}
export default function ExpandaleCode(props: ExpandaleCodeProps) {
  const {
    code,
    title,
  } = props

  return (
    <details>
      <summary>
        {title ?? "Expand Code"}
      </summary>

      <pre>
        <code>
          {code}
        </code>
      </pre>

    </details>
  )
}
