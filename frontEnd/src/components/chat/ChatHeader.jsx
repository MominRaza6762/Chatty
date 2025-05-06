import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";
import { useThemeStore } from "../../store/useThemeStore";
import { X } from "lucide-react";

function ChatHeader() {
  const { onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();
  const { SelectedUser, setSelectedUser } = useChatStore();

  return (
    <div style={{display: "flex",alignItems : 'center',justifyContent:"space-between",width :"100%",padding : "10px"}}>

      {/* show user image and name and online status on left side */}
      <div style={{display:"flex",gap : "8px",alignItems : 'center'}}>
        <img
          src={SelectedUser?.profilePic || "/avatar.png"}
          alt={SelectedUser?.fullName || "User image"}
          style={{width : '40px',height : '40px',borderRadius : "50%"}}
        />
        <div>
          <h3 style={{color : theme.button,fontSize : "14px",fontWeight : '600'}}>{SelectedUser?.fullName}</h3>
          <p style={{color : theme.desc,fontSize : '10px'}}>
            {onlineUsers?.includes(SelectedUser?._id) ? "online" : "offline"}
          </p>
        </div>
      </div>

      {/* show close icon to close the chat */}
      <button onClick={() => setSelectedUser(null)} style={{
        display : 'flex',
        alignItems : 'center',
        justifyContent:'center',
        cursor : "pointer",
        border : "none",
        outline  : "none",
        backgroundColor : theme.button,
        borderRadius : "50%",
        width : "20px",
        height : "20px"
      }}>
        <X size={14}  style={{textAlign : 'center'}}/>
      </button>
    </div>
  );
}

export default ChatHeader;
