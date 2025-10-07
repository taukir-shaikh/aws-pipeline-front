import { Oval } from "react-loader-spinner";

const LoadingOverlay = ({ visible }) => {
  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 99999, // <-- make sure it's on top
      }}
    >
      <Oval
        height={80}
        width={80}
        color="#319795"
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#68D391"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
};

export default LoadingOverlay;
