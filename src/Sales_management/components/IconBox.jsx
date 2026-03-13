const IconBox = ({ icon: Icon, color = '#A60000', bgColor = '#FFE3E3' }) => {
  return (
    <div
      className="flex items-center justify-center rounded-xl"
      style={{ backgroundColor: bgColor, width: '40px', height: '40px', borderRadius: '12px' }}
    >
      <Icon size={20} style={{ color }} strokeWidth={1.5} />
    </div>
  );
};

export default IconBox;