import { TitlePropsType } from "@/types/ui";

export default function Title({ className, titleText }: TitlePropsType) {
  return (
    <h2 className={className}>
      {titleText}
    </h2>
  )
}
