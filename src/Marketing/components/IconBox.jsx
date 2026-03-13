import { Users } from "lucide-react";

const IconBox = ({ icon: Icon = Users, bgColor = "#FDE8E8", iconColor = "#EF4444" }) => {
  return (
    <div
      className="flex items-center justify-center rounded-xl"
      style={{
        backgroundColor: bgColor,
        width: '40px',
        height: '40px',
        borderRadius: '12px'
      }}
    >
      <Icon
        size={20}
        style={{ color: iconColor }}
        strokeWidth={1.5}
      />
    </div>
  );
};

export default IconBox;