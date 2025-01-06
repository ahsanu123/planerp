import "./UserBillInformation.css"

interface UserBillInformationProps {
  username?: string
}

interface RenderTableProps {
  title?: string,
  headData: Array<(string | number)[]>,
  bodyData: Array<(string | number)[]>,
}

const RenderTable = (props: RenderTableProps) => {

  const {
    title,
    headData,
    bodyData
  } = props

  return (
    <>
      <table
        title={title ?? ""}
      >
        <thead>
          {headData.map((container) => (
            <tr>
              {container.map((item) => (
                <td>
                  <b>
                    {item}
                  </b>
                </td>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {bodyData.map((container) => (
            <tr>
              {container.map((item) => (
                <td>
                  {item}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

      </table>
    </>
  )
}

export default function UserBillInformation(props: UserBillInformationProps) {

  return (
    <>
      <h4>Summary</h4>
      <details>
        <summary>
          Weekly
        </summary>
        <blockquote
          className="stack"
        >
          <b>Total Taken:</b>
          <p>value</p>
        </blockquote>
      </details>

      <RenderTable
        headData={[
          ["username", "total taken", "total bill"]
        ]}
        bodyData={[
          ["user 1", 100, "Rp.1.000.000"]
        ]}
      />
    </>
  )
}
