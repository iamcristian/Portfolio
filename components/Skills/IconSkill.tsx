import { IconType } from "react-icons";

interface IconSkillProps { 
  text: string;
  icon: IconType
}

const IconSkill = ({text, icon}: IconSkillProps) => {
  return (
    <div className="w-24 h-24 flex items-center justify-center flex-col">
      {icon({className: "text-5xl mx-auto mb-1"})}
      <p>{text}</p>
    </div>
  )
}

export default IconSkill