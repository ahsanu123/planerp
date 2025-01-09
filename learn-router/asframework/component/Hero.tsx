interface HeroProps {
  imageUrl: string
  text?: string
}

export default function Hero(props: HeroProps) {
  const {
    imageUrl,
    text,
  } = props
  return (
    <div
      style={{
        backgroundImage: `url(${imageUrl})`,
        height: "200px"
      }}
    >
      <b>
        {text}
      </b>
    </div>
  )
}
