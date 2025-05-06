import { useRef, useState } from "react";
import { Image, X } from "lucide-react";
import toast from "react-hot-toast";
import {SendOutlined} from "@ant-design/icons"
import { useChatStore } from "../../store/useChatStore";
import { useThemeStore } from "../../store/useThemeStore";

function ChatInput() {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { theme } = useThemeStore();
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div style={{ padding: "4px", width: "100%" }}>
      {imagePreview && (
        <div style={{ position: "relative" }}>
          <img
            src={imagePreview}
            alt="picture to send"
            style={{
              width: "70px",
              height: "70px",
              backgroundSize: "cover",
              borderRadius: "20px",
            }}
          />
          <button
            type="button"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "10px",
              height: "10px",
              position: "absolute",
              top: "1px",
              left: "60px",
              borderRadius: "5px",
              border: "none",
              outline: "none",
              background: theme.button,
            }}
          >
            <X onClick={removeImage} />
          </button>
        </div>
      )}
      <form
        onSubmit={handleSendMessage}
        style={{ display: "flex", alignItems: "center", gap: "8px" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flex: 1,
            gap: "4px",
            padding: "8px 0",
          }}
        >
          <input
            type="text"
            style={{
              width: "100%",
              borderRadius: "8px",
              outline: "none",
              padding: "10px 12px",
              margin : "10px",
              color: theme.button,
              background: "transparent",
              border: `1px solid ${theme.desc}`,
            }}
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            style={{
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              outline: "none",
              background: theme.button,
              cursor: "pointer",
              backgroundSize: "cover",
            }}
          >
            <Image size={18} />
          </button>
        </div>
        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          style={{
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            outline: "none",
            background: theme.button,
            cursor: "pointer",
            backgroundSize: "cover",
          }}
        >
          <SendOutlined />
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
