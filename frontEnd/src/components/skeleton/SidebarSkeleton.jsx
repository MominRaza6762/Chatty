import { Skeleton, Space } from "antd";

const SidebarSkeleton = () => {
  return (
    <div style={{  padding: "20px" }}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Space key={index} direction="vertical" style={{ width: "100%", marginBottom: "20px" }}>
          {/* Image Skeleton */}
          <Skeleton.Avatar active shape="circle" size={40} />
          {/* Paragraph Skeleton */}
          <Skeleton.Input active size="small" style={{ width: "80%" }} />
        </Space>
      ))}
    </div>
  );
};

export default SidebarSkeleton;
