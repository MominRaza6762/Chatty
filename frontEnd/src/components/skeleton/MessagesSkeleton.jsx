import { Skeleton, Space } from "antd";

const MessageSkeleton = () => {
  return (
    <div>
      {Array.from({ length: 10 }).map((_, index) => (
        <Space
          key={index}
          direction="vertical"
          style={{
            width: "100%",
            marginBottom: "20px",
            alignItems: index % 2 === 0 ? "flex-start" : "flex-end",
          }}
        >
          {/* Profile Image Skeleton */}
          <Skeleton.Avatar
            active
            shape="circle"
            size={40}
            style={{ alignSelf: index % 2 === 0 ? "flex-start" : "flex-end" }}
          />
          {/* Message Content Skeleton */}
          <Skeleton.Input
            active
            size="small"
            style={{
              width: "60%",
              borderRadius: "8px",
            }}
          />
        </Space>
      ))}
    </div>
  );
};

export default MessageSkeleton;
